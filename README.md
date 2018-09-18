# Introdução

A aplicação simula um gerenciamento de clientes de um plano de previdencia
privada. Permite acompanhar os status dos clientes, resgate de saldos, e 
investimentos extras.

# Sobre o build

O app foi desenvolvido com a utilização da seguintes dependencias:

Para a Api/Backend:
- NodeJS
- Express
- MongoDB
- A api foi construida seguindo o medelo node restful utilizando o mongoose
para a criação e acesso aos schemas do banco

Para o frontend:
- React
- Redux
- ReduxForm
- Framework AdminLTE (Boostrap)

# Instalação e execução

Para que a aplicação funcione corretamente os seuintes sofwares devem estar
devidamente instalados na maquina: 

- NodeJS - versão 8.12 ou superior
- MongoDb - versão 3.6 ou superior

Para a executar a aplicação seguir os seguintes passos:

Para a Api/Backend:
- Acessar o diretório ../PrevApp/backend
- executar o comando "npm i" para instalação das depêndencias
- Após o fim da instalação executar o comando "npm run production" para executar 
a aplicação utilizando o módulo pm2 do node. 

Para o frontend:
- Acessar o diretório ../PrevApp/frontend
- executar o comando "npm i"
- Após o fim da instalação executar o comando "npm run dev" para iniciar a 
aplicação
- A aplicação roda localmente na porta 8080 (http://localhost:8080)
