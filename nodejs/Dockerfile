FROM node

ADD . /app/
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org/

EXPOSE 3000
VOLUME ["/app/public"]
CMD [ "npm", "start" ]
