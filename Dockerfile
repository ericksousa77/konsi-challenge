# Imagem base do Node.js 16.14
FROM node:16.14

# Instala as dependências do Puppeteer

RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o código-fonte da aplicação para o diretório de trabalho
COPY . .

# Copia o script wait-for-it.sh para dentro do container
COPY wait-for-it.sh .

# Concede permissão de execução ao script
RUN chmod +x wait-for-it.sh

# Porta em que a aplicação estará escutando
ENV SERVER_PORT=${SERVER_PORT}

# Porta em que o servidor da aplicação estará escutando
EXPOSE ${SERVER_PORT}

# Comando para iniciar a aplicação
CMD ["./wait-for-it.sh", "rabbitmq-api:5672", "-t", "60", "--", "npm", "start"]
