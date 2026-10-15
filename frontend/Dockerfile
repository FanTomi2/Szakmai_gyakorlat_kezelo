# 1. fázis: Építés (Build)
FROM node:20-alpine as build
WORKDIR /app

# Függőségek másolása és telepítése
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

#Kiszolgálás Nginx-szel
FROM nginx:alpine
# A lefordított fájlok másolása az Nginx mappájába
COPY --from=build /app/dist /usr/share/nginx/html

# Az Nginx alapértelmezetten a 80-as porton fut
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]