FROM node:5-onbuild
MAINTAINER Saransh Sharma <saransh@theupscale.in>, Upscale Team <team@theupscale.in>


RUN  git clone https://github.com/maektwain/jubilant-telegram  app


RUN node -v

RUN cd app && ls &&  npm install

ADD run.sh app/run.sh
RUN chmod +x app/run.sh

RUN git clone https://gist.github.com/ea3ac0ca88638f641bbf716f0ecd5ca2.git

RUN cd ea3ac0ca88638f641bbf716f0ecd5ca2

COPY .env app/



EXPOSE 4000




CMD ["start"]


ENTRYPOINT ["app/run.sh"]
