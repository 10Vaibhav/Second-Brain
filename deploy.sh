# Put system paths first to use global PM2
export PATH=/usr/local/bin:/usr/bin:/usr/sbin:/sbin:$PATH


git pull origin main

cd Backend
npm install
npm run build
pm2 stop brainly-backend || true
pm2 delete brainly-backend || true
pm2 start dist/index.js --name brainly-backend
cd ..

cd Frontend
npm install
npm run build
pm2 stop brainly-frontend || true
pm2 delete brainly-frontend || true
pm2 start serve --name brainly-frontend -- -s dist -l 3000

pm2 save

echo "Deployment completed! App is running with PM2. okay bye."
