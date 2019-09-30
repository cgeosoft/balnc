FROM node:10.16.0 as builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM node:10.16.0-alpine as server
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY . /app
ENV NODE_ENV=production
RUN npm install

EXPOSE 3000
CMD [ "node", "dist/app.js" ]