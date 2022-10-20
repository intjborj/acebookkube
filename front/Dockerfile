FROM node:16.13.0-alpine
WORKDIR /usr/src/app/acebook/front
COPY package*.json ./
COPY . .


RUN yarn

RUN yarn build:gql
EXPOSE 3000

CMD ["yarn", "start"]

