FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Run migrations with delay script
# RUN npm run migrate

CMD ["sh", "-c", "sleep 8 && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm start"]
