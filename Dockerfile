FROM node:18 as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --only=production
COPY . .
RUN npm run build:ssr --configuration=production
CMD ["node", "dist/anysense_front/server/main.js"]
