FROM nginx:1.13.7
RUN mkdir -p /app
WORKDIR /app
COPY . /app
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx"]