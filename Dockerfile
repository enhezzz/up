FROM nginx:1.13.7
RUN mkdir -p /app
WORKDIR /app
COPY . /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.template /tmp/
CMD envsubst '$API_URL' < /tmp/nginx.template > /etc/nginx/nginx.conf && nginx -g "daemon off;"
# CMD ["nginx", "-g","daemon off;"]