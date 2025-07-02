FROM node:20-alpine

RUN mkdir -p /var/www/pokemon-backend
WORKDIR /var/www/pokemon-backend

# Copiamos solo lo necesario para instalar dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

RUN npm run build


RUN adduser --disabled-password pokeuser
RUN chown -R pokeuser:pokeuser /var/www/pokemon-backend
USER pokeuser

RUN npm cache clean --force

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
