FROM nginx:alpine

COPY ./build/ /var/www
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
