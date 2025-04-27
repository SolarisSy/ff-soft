# Usar uma imagem Node.js oficial
FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e package-lock.json (ou npm-shrinkwrap.json) para o diretório de trabalho
# Copiar ambos garante que usamos as versões corretas das dependências
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o resto do código da aplicação para o diretório de trabalho
COPY . .

# Expor a porta que a aplicação usa
EXPOSE 3001

# Comando padrão para rodar a aplicação (já definido no docker-compose.yml, mas bom ter aqui)
CMD [ "npm", "start" ] 