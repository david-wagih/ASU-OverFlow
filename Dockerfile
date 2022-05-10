
FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD npm start