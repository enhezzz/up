FROM node:alpine
RUN mkdir -p /app
WORKDIR /app
COPY . /app
ENV NODE_ENV=production
ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["npm", "start"]