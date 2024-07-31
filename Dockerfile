FROM node:20 AS builderStage
WORKDIR /app

COPY ./package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY . .
FROM node:20-slim

WORKDIR /app

COPY --from=builderStage /app .

ENV SECRET="AMANSHARMAISSECRET"
ENV PORT=3000
EXPOSE 3000

CMD [ "npm","run","start" ]