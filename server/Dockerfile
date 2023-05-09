FROM node:18.15.0-alpine
WORKDIR /usr/src/server
RUN yarn global add @nestjs/cli typescript ts-node
COPY package.json .
RUN yarn install --production
RUN yarn add @types/multer -D
COPY . .
RUN yarn build
CMD ["yarn", "start:prod" ]