#!/bin/bash

set -e

cd "$(dirname "$0")"

echo "Starting SleekInvoices..."

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    pnpm install
fi

# Optionally seed database (uncomment if needed)
# echo "Seeding database..."
# node scripts/seed-complete.mjs

echo "Starting dev server..."
pnpm dev
