FROM node:16.13.0-alpine
WORKDIR /usr/src/app/acebook/api
COPY package*.json ./
COPY . .

RUN yarn

RUN yarn build
EXPOSE 4000

CMD ["yarn", "start:prod"]