#!/usr/bin/env bash
# Automated Production Deployment Script for Settle Loan Expert on VPS
set -e

echo "=========================================================="
echo " Starting Settle Loan Expert VPS Deployment"
echo "=========================================================="

# Check if Docker or Node is installed
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "✔ Docker and Docker Compose detected. Deploying via Docker container..."
    docker-compose down || true
    docker-compose build --no-cache
    docker-compose up -d
    echo "✔ Docker containers started successfully!"
    docker ps | grep settle_loan_expert
else
    echo "ℹ Deploying via native Node.js / PM2..."
    npm install --production=false
    npx prisma generate
    npx prisma db push
    node prisma/seed.js || true
    node prisma/seed-seo.js || true
    npm run build

    if command -v pm2 &> /dev/null; then
        echo "✔ Restarting PM2 process..."
        pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js
        pm2 save
    else
        echo "⚠ PM2 not found. Install pm2 with 'npm install -g pm2' or run 'npm start'."
    fi
fi

echo "=========================================================="
echo " Settle Loan Expert is now running!"
echo " Public URL: http://localhost:3000 (or your configured domain)"
echo " Admin Panel: http://localhost:3000/admin"
echo " Default Admin: admin@settleloanexpert.in"
echo "=========================================================="
