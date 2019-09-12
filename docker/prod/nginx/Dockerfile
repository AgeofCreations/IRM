FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY ./docker/prod/nginx/IRM.conf /etc/nginx/conf.d/
COPY ./app/frontend /app/frontend