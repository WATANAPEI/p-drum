FROM node:12.0.0

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
WORKDIR $HOME/p-drum

COPY package.json webpack* $HOME/p-drum/

RUN chown -R app:app $HOME/* 

RUN yarn install

COPY client $HOME/p-drum/client
RUN yarn build
#USER root
# COPY . $HOME/p-drum
#RUN chown -R app:app $HOME/*
#USER app

CMD ["tail", "-f", "/dev/null"]
#CMD ["yarn", "build"]


