FROM node:16.16

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY . .

RUN tsc

EXPOSE 5000

CMD [ "node", "dist/app.js" ]