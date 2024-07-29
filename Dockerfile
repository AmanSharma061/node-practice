FROM node:20.6.0
RUN npm install -g nodemon
WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","run","start" ]