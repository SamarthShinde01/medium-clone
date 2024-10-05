FROM node:20-alpine

WORKDIR /src/app

COPY package* ./
RUN npm install

COPY prisma ./
RUN npx prisma generate

COPY . .

EXPOSE 5000
CMD ["npm", "run", "start:with-studio"]
