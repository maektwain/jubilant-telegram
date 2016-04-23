FROM node:0.12
MAINTAINER Saransh Sharma <saransh@theupscale.in>, Upscale Team <team@theupscale.in>



#Download the latest version of app from git
RUN rm -fr /app && git clone --depth=1 https://github.com/maektwain/jubilant-telegram.git /app


ADD run.sh run.sh
RUN chmod +x run.sh

EXPOSE 3000

CMD ["start"]

ENTRYPOINT["./run.sh"]
