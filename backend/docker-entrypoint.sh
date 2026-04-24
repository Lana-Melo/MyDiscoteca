#!/bin/sh
set -e

echo "Running database seed..."
node seed.js

echo "Starting backend server..."
exec node server.js
