FROM node:14 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build


FROM node:14

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]