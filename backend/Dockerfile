# Primer stage: instalar dependencias
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Stage final: solo la carpeta necesaria
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app ./

EXPOSE 4000
CMD ["node", "server.js"]
