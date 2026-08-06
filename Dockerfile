FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./


FROM base AS development

ENV NODE_ENV=development

RUN npm ci

COPY . .

EXPOSE 3060

CMD ["npm", "run", "dev"]


FROM base AS test

ENV NODE_ENV=test

RUN npm ci

COPY . .

CMD ["npm", "test"]


FROM base AS production

ENV NODE_ENV=production

RUN npm ci --omit=dev

COPY index.js ./
COPY src ./src
COPY db ./db
COPY scripts ./scripts

USER node

EXPOSE 3060

CMD ["npm", "start"]