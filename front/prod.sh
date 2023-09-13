cd /var/www/coin/
sleep 1
sudo docker build . -t dcoin_front
sleep 1
cd /var/apps/d-coin-front
sudo docker compose up -d


