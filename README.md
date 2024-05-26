Clone the repo

git clone https://github.com/naveenkumarkosari/Testapp-backend.git

npm install


start database 

docker compose up -d

Copy over all .env.example files to .env

Update .env files everywhere with the right db url

start prisma 

npx prisma init
npx prisma migrate dev
npx prisma generate

start server
node bin.js
