FROM node:12.6.0-alpine

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT ["npm"]