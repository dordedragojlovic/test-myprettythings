FROM node:12
WORKDIR /usr/src/app
COPY src ./src/
COPY package.json yarn.lock tsconfig.json codegen.yml ./
RUN yarn install
RUN yarn global add pm2
RUN yarn run gen:types
RUN yarn run build
CMD ["pm2-runtime","/usr/src/app/dist/index.js"]
