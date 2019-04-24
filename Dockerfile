FROM node:8.10.0

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json webpack.config.js $HOME/p-drum/
COPY client $HOME/p-drum/client

RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/p-drum
RUN yarn install
RUN yarn build

USER root
COPY . $HOME/p-drum
RUN chown -R app:app $HOME/*
USER app

CMD ["yarn", "dev"]


