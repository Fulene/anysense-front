FROM node:18 as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG CONFIGURATION=production
RUN npm run build:ssr --configuration=$CONFIGURATION
CMD ["node", "dist/anysense_front/server/main.js"]
