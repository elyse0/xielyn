FROM ubuntu:20.04 as platform

RUN apt update
# Install node v16
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs
# Install python 3.10
RUN apt install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt update
RUN apt install -y python3.10
RUN apt install -y python3-pip
# Install ffmpeg
RUN apt install -y ffmpeg

FROM node:16 as monorepo-install

RUN npm install -g pnpm

COPY . /usr/sophire
WORKDIR /usr/sophire
RUN pnpm install

FROM monorepo-install as sophire-api-build

RUN npx turbo run build --filter=@sophire/api

WORKDIR /usr/sophire/apps/api
RUN pnpm run bundle

FROM platform

# Install yt-dlp
RUN pip install https://github.com/yt-dlp/yt-dlp/archive/master.tar.gz

COPY --from=sophire-api-build /usr/sophire/apps/api/bundled /usr/app
WORKDIR /usr/app

RUN npm install

USER 0
EXPOSE ${PORT}
CMD ["node", "dist/main.js"]
