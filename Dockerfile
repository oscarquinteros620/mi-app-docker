# 1. Usa la imagen oficial de Nginx como base
FROM nginx:latest

# 2. Elimina el archivo de configuración predeterminado de Nginx
# (Esto es opcional si no vas a modificar la configuración, pero es una buena práctica)
RUN rm /etc/nginx/conf.d/default.conf

# 3. Copia tu archivo de configuración de Nginx (si tienes uno personalizado)
# Si no necesitas una configuración personalizada, omite este paso.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 4. Copia tu archivo index.html (y otros archivos web)
# La ubicación predeterminada para archivos web en Nginx es /usr/share/nginx/html
# Asegúrate de que tu index.html está en la misma carpeta que el Dockerfile.
COPY index.html /usr/share/nginx/html/

# Si tienes otros archivos estáticos, puedes copiarlos también:
# COPY css /usr/share/nginx/html/css
# COPY js /usr/share/nginx/html/js

# 5. Define el puerto que expone el contenedor (por defecto 80 para Nginx)
EXPOSE 80

# 6. El comando de inicio predeterminado de Nginx ya está configurado
# No necesitas añadir un CMD a menos que quieras modificar el comportamiento de inicio.
