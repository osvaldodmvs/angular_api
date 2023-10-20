FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ng build --prod

FROM nginx:1.21

COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 80