FROM node:18-alpine as nuxi-app

ARG DATABASE_URL

ARG MAILER_HOST
ARG MAILER_PORT
ARG MAILER_USER
ARG MAILER_PASSWORD

ARG AUTH_TOKEN_SECRET
ARG AUTH_TOKEN_EXPIRATION

ARG APP_URL
ARG APP_ENV

ARG TMDB_API_KEY
ARG TMDB_ACCESS_TOKEN

ARG SUPABASE_URL
ARG SUPABASE_KEY

ARG LINEAR_API_KEY

WORKDIR /app

COPY . .

RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python

RUN npm install --force

RUN npx prisma generate

RUN npx nuxi build

CMD ["node", ".output/server/index.mjs"]

EXPOSE 3000