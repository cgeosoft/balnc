FROM node:alpine as builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM node:alpine as server
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY package.json /app
ENV NODE_ENV=production
RUN npm install

EXPOSE 3000
CMD [ "node", "app.js" ]