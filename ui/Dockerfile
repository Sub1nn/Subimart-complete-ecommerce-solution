FROM node:20.11-alpine

WORKDIR /app/ui/

COPY package.json .

RUN npm install

COPY . .



CMD ["npm", "run", "dev"]