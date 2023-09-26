FROM node:18 as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG BUILD_CMD
RUN $BUILD_CMD
CMD ["node", "dist/anysense_front/server/main.js"]
