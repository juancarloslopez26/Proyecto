FROM node:16-alpine
WORKDIR /app
COPY . /app
RUN npm install

EXPOSE 4001
CMD [ "node","app.js" ]