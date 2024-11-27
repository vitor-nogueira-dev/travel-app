FROM node:20.18.0 AS builder

WORKDIR /app-backend

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

FROM node:20.18.0-slim

WORKDIR /app-backend

COPY --from=builder /app-backend ./

COPY init-db.js /app-backend/init-db.js

USER node

EXPOSE 8080

ENTRYPOINT ["sh", "-c"]
CMD ["node /app-backend/init-db.js && npm run start"]