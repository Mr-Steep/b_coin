cd /var/www/dev.bnxt.network/coin/front/
pm2 stop 0
sleep 1
cd ..
npx hardhat clean
sleep 1
npx hardhat run scripts/deploy.js --network localhost
sleep 1
cd front/
sleep 1
rm -rf .next /node_modules
sleep 1
npm i
sleep 1
npm run build
sleep 1
kill -9 $(lsof -t -i:3000)
sleep 1
npm run dev