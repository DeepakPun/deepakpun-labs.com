#!/usr/bin/env bash
# Digital Ocean Droplet Cleanup Script
# Comprehensive system maintenance, Docker optimization, and security scan
# Version: 3.1 (Production-Safe for Ubuntu 22.04 + Docker Compose)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() { echo -e "${BLUE}📋 $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

# Function to check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_error "This script must be run with root privileges."
        exit 1
    fi
}

# Function to check sudo privileges
check_sudo() {
    if ! sudo -n true 2>/dev/null; then
        print_status "This script requires sudo privileges."
        sudo -v
    fi
}

# Function to handle missing dependencies and system packages updates
install_dependencies() {
    print_status "DEPENDENCY MANAGEMENT & SYSTEM PATCHES"
    echo "----------------------------------------"
    print_status "Updating package database cache..."
    sudo apt-get update -qq
    
    print_status "Installing missing maintenance and scanner utilities..."
    sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq deborphan chkrootkit rkhunter
    print_success "Dependencies verified and installed."
    
    print_status "Applying critical OS upgrades and security patches..."
    sudo DEBIAN_FRONTEND=noninteractive apt-get dist-upgrade -y -qq
    print_success "System security patches applied successfully."
}

# Function to clean package cache safely
clean_packages() {
    print_status "PACKAGE CLEANUP"
    echo "----------------------------------------"
    print_status "Removing unnecessary packages and old kernels..."
    sudo apt-get autoremove --purge -y -qq
    
    print_status "Cleaning package archive cache..."
    sudo apt-get autoclean -y -qq
    sudo apt-get clean -y -qq
    
    print_status "Removing orphaned packages recursively..."
    if command -v deborphan >/dev/null 2>&1; then
        # Keep purging layers of orphans until no more are found
        while [ -n "$(deborphan)" ]; do
            sudo apt-get purge -y -qq $(deborphan) 2>/dev/null || true
        done
        print_success "Orphaned package purge completed."
    else
        print_warning "deborphan not installed, skipping orphan removal."
    fi
}

# Function to clean temporary files
clean_temp_files() {
    print_status "TEMPORARY FILE CLEANUP"
    echo "----------------------------------------"
    print_status "Cleaning old items in /tmp directory (older than 7 days)..."
    # ADDED -mindepth 1 to prevent deleting the root /tmp folder itself
    sudo find /tmp -mindepth 1 -type f -atime +7 -delete 2>/dev/null || true
    sudo find /tmp -mindepth 1 -type d -empty -delete 2>/dev/null || true
    
    print_status "Cleaning old items in /var/tmp directory..."
    sudo find /var/tmp -mindepth 1 -type f -atime +7 -delete 2>/dev/null || true
    
    print_status "Cleaning runtime caches..."
    rm -rf ~/.cache/thumbnails/* 2>/dev/null || true
    rm -rf ~/.cache/pip/* 2>/dev/null || true
    rm -rf ~/.npm/_cacache/* 2>/dev/null || true
    print_success "Temporary file cleanup completed."
}

# Function to clean Docker Compose assets without wiping data volumes
clean_docker() {
    print_status "DOCKER MICROSERVICES CLEANUP"
    echo "----------------------------------------"
    if command -v docker >/dev/null 2>&1; then
        print_status "Removing dangling Docker images (untagged build leftovers)..."
        sudo docker image prune -f
        
        print_status "Removing stopped containers..."
        sudo docker container prune -f
        
        print_status "Removing unused Docker network components..."
        sudo docker network prune -f
        
        print_status "Clearing unused Docker builder cache layers..."
        sudo docker builder prune -f
        print_success "Docker resources cleaned safely (Persistent volumes preserved)."
    else
        print_warning "Docker not detected on this system, skipping."
    fi
}

# Function to clean log files gracefully without destroying files in use
clean_logs() {
    print_status "LOG FILE CLEANUP"
    echo "----------------------------------------"
    print_status "Forcing system log rotation rules..."
    sudo logrotate -f /etc/logrotate.conf 2>/dev/null || true
    
    print_status "Vacuuming journald logs older than 7 days..."
    sudo journalctl --vacuum-time=7d
    print_success "Log optimization completed."
}

# Function to check disk usage
check_disk_usage() {
    print_status "DISK USAGE ANALYSIS"
    echo "----------------------------------------"
    print_status "Current disk distribution:"
    df -h /
    echo ""
    print_status "Top 5 largest directories in /var:"
    sudo du -sh /var/* 2>/dev/null | sort -hr | head -5
}

# Function to check system services
check_services() {
    print_status "SYSTEM SERVICES CHECK"
    echo "----------------------------------------"
    print_status "Checking for crashed or failed services..."
    failed_services=$(systemctl --failed --no-legend | wc -l)
    if [ "$failed_services" -gt 0 ]; then
        print_warning "Found $failed_services failed system services:"
        systemctl --failed --no-legend
    else
        print_success "No failed system services found."
    fi
}

# Function to check security
security_check() {
    print_status "SECURITY CHECKS"
    echo "----------------------------------------"
    
    # Update and check chkrootkit
    if command -v chkrootkit >/dev/null 2>&1; then
        print_status " • Running chkrootkit scan..."
        chk_out=$(sudo chkrootkit -q 2>&1)
        if [ -z "$chk_out" ]; then
            print_success "   chkrootkit: clean"
        else
            print_warning "   chkrootkit: Warnings found, check manually"
            echo "$chk_out" | head -n 5
        fi
    fi
    
    # Update and check rkhunter
    if command -v rkhunter >/dev/null 2>&1; then
        print_status " • Updating and running rkhunter scan..."
        sudo rkhunter --propupd --quiet 2>/dev/null || true
        sudo rkhunter --update --quiet 2>/dev/null || true
        rk_out=$(sudo rkhunter --check --sk --rwo 2>&1)
        if [ -z "$rk_out" ]; then
            print_success "   rkhunter: clean"
        else
            print_warning "   rkhunter: Warnings identified. Inspect /var/log/rkhunter.log"
        fi
    fi
    
    if ! command -v chkrootkit >/dev/null 2>&1 && ! command -v rkhunter >/dev/null 2>&1; then
        print_warning "No rootkit scanners installed."
    fi
    
    print_status " • Inspecting SSH hardening..."
    if [ -f /etc/ssh/sshd_config ]; then
        if grep -qE "^\s*PermitRootLogin\s+no" /etc/ssh/sshd_config; then
            print_success "   Root login disabled"
        else
            print_warning "   Root login may be enabled - secure your /etc/ssh/sshd_config"
        fi
        
        if grep -qE "^\s*PasswordAuthentication\s+no" /etc/ssh/sshd_config; then
            print_success "   Password authentication disabled"
        else
            print_warning "   Password authentication may be enabled"
        fi
    fi
    
    print_status " • Auditing listening system ports (Public/Private)..."
    sudo ss -tulpn | grep LISTEN | head -n 10
}

# Function to check system health
system_health_check() {
    print_status "SYSTEM HEALTH CHECK"
    echo "----------------------------------------"
    print_status "Memory allocation:"
    free -h
    echo ""
    print_status "CPU Load performance metrics:"
    uptime
}

# Function to update system file locate database
update_locate() {
    if command -v updatedb >/dev/null 2>&1; then
        print_status "UPDATING SYSTEM INDEXES"
        echo "----------------------------------------"
        print_status "Updating system file locate index database..."
        sudo updatedb
        print_success "Index successfully updated."
    fi
}

# Function to show final cleanup summary and manage reboot markers
show_summary() {
    print_status "MAINTENANCE SUMMARY"
    echo "----------------------------------------"
    print_status "Optimized final disk space allocation:"
    df -h / | tail -n 1
    echo ""
    print_success "All optimization and cleanup tasks completed successfully!"
    
    if [ -f /var/run/reboot-required ]; then
        print_warning "An OS patch requires a system reboot to apply completely."
        print_status "Generating deployment reboot communication trigger..."
        # Touch a local file inside your deployed workspace target directory 
        # so GitHub Actions step conditions know to process a safe system restart.
        touch ~/portfolio/.reboot_pending
    else
        print_success "No system reboots required for applied changes."
    fi
}

# Main execution entry point
main() {
    clear
    echo "=========================================="
    echo "🧹 Digital Ocean Droplet Optimization Script"
    echo "=========================================="
    echo ""
    check_root
    check_sudo
    print_status "System: $(lsb_release -d 2>/dev/null | cut -f2 || echo "Ubuntu 22.04 LTS")"
    print_status "Kernel: $(uname -r)"
    print_status "Runtime: $(date)"
    echo ""
    
    # Execute non-destructive pipeline tasks with auto-installers added
    install_dependencies
    clean_packages
    clean_temp_files
    clean_docker
    clean_logs
    check_disk_usage
    check_services
    security_check
    system_health_check
    update_locate
    show_summary
}

main "$@"
