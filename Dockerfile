FROM node:20.18.0 AS builder

WORKDIR /app-frontend

COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./ 

RUN rm -rf node_modules package-lock.json

RUN npm install

COPY . .

RUN npm run build

FROM node:20.18.0-slim

WORKDIR /app-frontend

RUN chown -R node:node /app-frontend

USER node

COPY --from=builder --chown=node:node /app-frontend/package*.json ./
COPY --from=builder --chown=node:node /app-frontend/dist ./dist
COPY --from=builder --chown=node:node /app-frontend/vite.config.ts ./ 

RUN npm install --omit=dev

EXPOSE 80

CMD ["npm", "run", "preview", "--", "--port", "80", "--host", "0.0.0.0"]