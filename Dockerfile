FROM node:18 as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:ssr --configuration=production
COPY sitemap.xml dist/anysense_front/browser/sitemap.xml
COPY robots.txt dist/anysense_front/browser/robots.txt
CMD ["node", "dist/anysense_front/server/main.js"]
