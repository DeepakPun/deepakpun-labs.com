#!/bin/bash
set -e

MODE=$1

if [ "$MODE" != "dev" ] && [ "$MODE" != "prod" ] && [ "$MODE" != "stop" ] && [ "$MODE" != "clean" ]; then
    echo "❌ Error: Missing or invalid command mode."
    echo "💡 Usage: ./run.sh [dev|prod|stop|clean]"
    exit 1
fi

if [ "$MODE" == "dev" ]; then
    echo "🚀 Launching Deepak's MCU Labs in DEVELOPMENT Mode..."
    echo "🔄 Live-reloading (hot-reloading) is ACTIVE."
    docker compose -f compose.dev.yaml up --build

elif [ "$MODE" == "prod" ]; then
    echo "⚡ Launching Deepak's MCU Labs in PRODUCTION Mode..."
    echo "📦 Pulling optimized images from Docker Hub..."
    docker compose -f compose.yaml pull
    echo "🔄 Swapping container runtimes with zero downtime..."
    docker compose -f compose.yaml up -d
    echo "🧹 Cleaning up old, stale images from previous build..."
    docker image prune -f
    # FIXED: Updated success message to match your production domain and SSL setup
    echo "✅ Stack running silently in background. Access https://deepakpun-labs.com"

elif [ "$MODE" == "stop" ]; then
    echo "🛑 Halting all running services..."
    docker compose -f compose.dev.yaml down
    # FIXED: Replaced compose.prod.yaml with your actual production compose.yaml file
    docker compose -f compose.yaml down
    echo "✅ All project containers successfully halted."

elif [ "$MODE" == "clean" ]; then
    echo "🧹 Initializing safe clean of the Docker ecosystem..."
    docker compose -f compose.dev.yaml down --remove-orphans
    # FIXED: Replaced compose.prod.yaml with your actual production compose.yaml file
    docker compose -f compose.yaml down --remove-orphans
    docker system prune -f
    echo "✨ Clean complete! Stale containers and network loops cleared. Database data preserved."
fi
