FROM node:18 as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG BUILD_CMD
RUN sh -c "$BUILD_CMD"
COPY sitemap.xml dist/anysense_front/browser/sitemap.xml
COPY robots.txt dist/anysense_front/browser/robots.txt
COPY logo-anysense-temp.png dist/anysense_front/browser/logo-anysense-temp.png
CMD ["node", "dist/anysense_front/server/main.js"]
