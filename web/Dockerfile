FROM node:12
WORKDIR /usr/src/app
COPY pages ./pages/
COPY public ./public/
COPY page-components ./page-components/
COPY helpers ./helpers/
COPY components ./components/
COPY package.json yarn.lock tsconfig.json  ./
RUN yarn install
RUN yarn run build
EXPOSE 3000
CMD ["yarn","start"]
