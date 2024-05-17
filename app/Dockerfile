FROM node:20-alpine

ENV DATABASE_URL=postgresql://postgres:postgres@hackerton-database:5432/main?schema=public

RUN apk add --no-cache python3 py3-pip
RUN apk add py3-numpy py3-pandas py3-scikit-learn py3-openpyxl

WORKDIR /usr/src/app

RUN mkdir -p /workspace/.pnpm-store
RUN chown -R 1001:1001 /workspace/.pnpm-store

COPY package*.json/ ./

RUN npm install -g pnpm
RUN corepack enable
RUN corepack enable npm

RUN pnpm i
RUN pnpm i prisma

COPY . .

RUN npx prisma generate

RUN pnpm build