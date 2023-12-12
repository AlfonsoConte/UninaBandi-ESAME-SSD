FROM node:20-alpine3.18 as BUILD

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.24.0-alpine

COPY --from=BUILD /app/build /data/www

CMD ["nginx","-g","daemon off;"]