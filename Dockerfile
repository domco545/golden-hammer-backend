FROM node:14

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

RUN npm install glob @nestjs/cli

COPY . .

RUN npm run build

COPY /usr/src/app/dist ./dist

CMD ["node", "dist/main"]