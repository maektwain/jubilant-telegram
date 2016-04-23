FROM ubuntu:14.04
MAINTAINER Saransh Sharma <saransh@theupscale.in>, Upscale Team <team@theupscale.in>





RUN apt-get update

RUN apt-get install curl

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh

RUN source ~/.profile

RUN nvm install 0.12.0

RUN npm install npm@3.0.0

RUN apt-get install git

#Download the latest version of app from git
RUN rm -fr /app && git clone --depth=1 https://github.com/maektwain/jubilant-telegram.git /app

RUN cd /app && npm install

WORKDIR /app

ADD /app



ADD run.sh run.sh
RUN chmod +x run.sh


EXPOSE 3000

CMD ["start"]

ENTRYPOINT ["./run.sh"]
