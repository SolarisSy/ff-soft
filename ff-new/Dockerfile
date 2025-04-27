# Usar uma imagem Node.js oficial
FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos de definição de dependências
COPY package.json yarn.lock* ./

# Instalar dependências com Yarn
RUN yarn install --frozen-lockfile

# Copiar o resto do código da aplicação
COPY . .

# Construir a aplicação Next.js para produção (se usasse `yarn start`)
# RUN yarn build

# Expor a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar em modo de desenvolvimento (definido no docker-compose.yml)
# CMD [ "yarn", "dev" ]
# Se fosse para produção, seria: CMD ["yarn", "start"] 