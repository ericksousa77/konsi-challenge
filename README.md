# konsi-challenge

[repositório do desafio](https://gist.github.com/gustavoaraujofe/265c43b8b1df2dc4d6dd7e28959371d4)

[site para crawlear](http://extratoclube.com.br/)

## Resumo do projeto:

Como o objetivo do projeto é crawlear uma página, utilizei a lib puppeter aliada ao nodejs para que fosse possivel fazer todas as manipulações na página em prol de obter os dados de cada usuário.

Abaixo segue uma imagem que visa sintetizar o fluxo de execução da aplicação:

<p align="center">
  <img src="diagrama-fluxo-atividades.png" alt="Diagrama de Atividades">
</p>



## Stack de tecnologia do backend:

* Nodejs (16.14)
* RabbitMQ (3.12.2)
* Elasticsearch (7.12.1)
* Redis (7.0.5)
* Docker
* Puppeter (20.9.0)

## Stack de tecnologia do frontend:

Como o frontend é bem simples optei por hostear no próprio backend uma rota que aponta para a view, sendo assim o frontend foi construido com as seguintes tecnologias:

* HTML
* CSS
* Javascript

## Definição das variáveis de ambiente:

Na raiz do projeto deve existir um arquivo **.env** definindo os valores para as variaveis de ambiente do projeto. A titulo de facilitar a execução do projeto, vou deixar um exemplo de **.env** logo abaixo onde basta copiar e colar, assim todas as variaveis de ambiente vão estar devidamente preechidas com seus respectivos valores.

OBS: Sei que não é seguro expor o arquivo .env, só estou fazendo isso para simplificar a execução do projeto e porque sei que não estou expondo nenhum dado que irá prejudicar alguem:

.env:

```
SERVER_PORT = 3000

ELASTIC_SEARCH_NODE = 'http://elasticsearch-api:9200'
ELASTIC_SEARCH_INDEX = 'matriculas'

RABBITMQ_URL= 'amqp://guest:guest@rabbitmq-api:5672'
RABBITMQ_QUEUE = 'matriculas_queue'

REDIS_HOST = 'redis-api'
REDIS_PORT = 6379
REDIS_PASSWORD ='redispw'
REDIS_CACHE_EXPIRATION_TIME_IN_SECONDS = 50 

EXTRATO_CLUBE_URL = 'http://extratoclube.com.br/'

ENCRYPTION_KEY = '9a4c8e301d2b7f59a2d76e73be1eb9d0'
ENCRYPTION_ALGORITHM = 'aes-256-cbc'

PUPPETEER_EXECUTABLE_PATH = '/usr/bin/google-chrome'

```
## Execução do projeto:

Para rodar o projeto basta executar o comando:

`docker compose --build -d`

Após executar esse comando o backend estará sendo executado em:

`http://localhost:3000/api`

E todos os outros serviços (**redis**, **elasticsearch**, **rabbitmq**) também ja estarão em execução.

## Endpoints:

1. ` método: POST - endpoint: /queue` : Esse é o endpoint que os dados são cadastrados para que posteriormente eles sejam processados. Aqui podemos cadastrar os dados de 1 ou mais usuários:

exemplo de body cadastrando os dados de um usuário:
```

[
    {
        "cpf": "123.123.123-12",
        "login": "login1",
        "senha": "senha1"
    }
]

```

exemplo de body cadastrando os dados de dois usuários:

```

[
    {
        "cpf": "123.123.123-12",
        "login": "login1",
        "senha": "senha1"
    },
    {
        "cpf": "456.456.456-45",
        "login": "login2",
        "senha": "senha2"
    }
]

```

2. ` método: GET - endpoint: /user-benefits` : Esse é o endpoint que os dados que foram processados anteriormente podem ser obtidos (direto na API). Os query params desse endpoint são:

    **cpf** (obrigatório): Deve ser enviado no formato xxx.xxx.xxx-xx . Exemplo: 123.123.123-12

    **pageSize** (opcional): Define a quantidade de itens que serão retornados pelo endpoint. Caso não seja enviado, o valor padrão é 10.

    **page** (opcional): Define a página atual dos itens retornados. Caso não seja enviado, o valor padrão é 1.  

3. ` método: GET - endpoint: /` : Esse é o endpoint padrão para carregar a página onde se pode obter (através de uma interface) os dados que foram processados anteriormente.


## Features do projeto:
- [x] - Inserir dados na fila (rabbitmq).
- [x] - Encriptar a senha do usuário antes de colocar na fila.
- [x] - Consumir a mensagens da fila.
- [x] - Descriptografar a senha do usuário para usar no login.
- [x] - Realizar login no portal.
- [x] - Navegar no portal para obter os dados.
- [x] - Salvar no cache (redis) os dados de um usuário que recentemente foi crawleado.
- [x] - Salvar no elasticsearch os dados do usuário que foram crawleados.
- [x] - Realizar a query no elastictsearch para obter os dados (por cpf).
- [x] - Montar uma interface para que o usuário possar digitar o cpf e obter os dados crawleados.
- [x] - Validação de erro no login.

## extras: 

- [x] - Validaçao de parametros nos endpoints.
- [ ] - Testes automatizados.
- [x] - Docker compose.
- [ ] - Criar um microserviço só para consumir a fila.
- [x] - Adicionar paginação nos dados provenientes do elasticsearch.
- [x] - Adicionar suporte a paginação no frontend.
- [x] - Adicionar validação para não salvar dados duplicados no elasticsearch.
