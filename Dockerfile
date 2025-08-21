# Imagen base Node.js
FROM node:18

# Carpeta de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "app.js"]