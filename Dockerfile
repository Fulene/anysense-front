FROM node:18 as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG BRANCH_NAME=main
RUN if [ "$BRANCH_NAME" = "staging" ] ; then npm run build:ssr:staging ; else npm run build:ssr ; fi
CMD ["node", "dist/anysense_front/server/main.js"]
