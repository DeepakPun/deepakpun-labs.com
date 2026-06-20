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
    # This deletes ONLY dangling images (the old :latest layers left behind)
    # It safely leaves your database volumes and active running layers completely untouched.
    docker image prune -f
    
    echo "✅ Stack running silently in background. Access http://localhost:3000"

elif [ "$MODE" == "stop" ]; then
    echo "🛑 Halting all running services..."
    docker compose -f compose.dev.yaml down
    docker compose -f compose.prod.yaml down
    echo "✅ All project containers successfully halted."

elif [ "$MODE" == "clean" ]; then
    echo "🧹 Initializing safe clean of the Docker ecosystem..."
    docker compose -f compose.dev.yaml down --remove-orphans
    docker compose -f compose.prod.yaml down --remove-orphans
    docker system prune -f
    echo "✨ Clean complete! Stale containers and network loops cleared. Database data preserved."
fi
