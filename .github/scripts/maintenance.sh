#!/usr/bin/env bash

set -e
echo "🧹 Safe maintenance - no apt upgrade, no reboot"
docker image prune -f
docker builder prune -f
sudo journalctl --vacuum-time=7d
df -h /
echo "✅ Done - no reboot required"