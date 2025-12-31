#!/bin/bash

# Put system paths first to use global PM2
export PATH=/usr/local/bin:/usr/bin:/usr/sbin:/sbin:$PATH

git pull origin main

# Backend deployment
cd Backend
npm install
npm run build
pm2 stop brainly-backend || true
pm2 delete brainly-backend || true
pm2 start dist/index.js --name brainly-backend

cd ..

# Frontend deployment
cd Frontend
npm install

# Clear the dist folder completely before building
rm -rf dist

npm run build

# Force cache clearing by touching all JS and CSS files
find dist -name "*.js" -o -name "*.css" | xargs touch

pm2 stop brainly-frontend || true
pm2 delete brainly-frontend || true

# Restart with fresh process
pm2 start serve --name brainly-frontend -- -s dist -l 3000

pm2 save

# Reload nginx to clear any server-side caches
sudo nginx -t && sudo nginx -s reload

echo "Deployment completed! App is running with PM2. Cache cleared."