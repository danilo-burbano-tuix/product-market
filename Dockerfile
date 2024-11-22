FROM node:18
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3009
RUN yarn run:build
CMD ["yarn", "run", "start:prod"]