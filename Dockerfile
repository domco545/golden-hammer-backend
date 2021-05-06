FROM node:14

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install --only=production

RUN npm run build

COPY . .

CMD ["node", "dist/main"]