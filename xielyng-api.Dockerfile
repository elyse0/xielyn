FROM node:16 as monorepo-install

RUN npm install -g pnpm

COPY . /usr/xielyng
WORKDIR /usr/xielyng
RUN pnpm install

FROM monorepo-install as xielyng-api-build

RUN npx turbo run build --filter=@xielyng/api

WORKDIR /usr/xielyng/apps/api
RUN pnpm run bundle

FROM node:16

COPY --from=xielyng-api-build /usr/xielyng/apps/api/bundled /usr/app
WORKDIR /usr/app

RUN npm install

USER 1000
EXPOSE ${PORT}
CMD ["dist/main.js"]
