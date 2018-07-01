FROM node:10.5
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install
CMD node server.js
EXPOSE 4000
