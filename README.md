![](https://i.imgur.com/xG74tOh.png)

# **PDV Express** :desktop_computer::shopping_cart::shopping::moneybag:
Este projeto foi implementado no formato de desafio final para aprovação no curso de Desenvolvimento de Software com foco em Back-end ofertado pela Cubos Academy por meio da parceria com o Potência Tech - iFood.  

### **Descrição do desafio**
Construímos uma RESTful API para Pontos de Venda :moneybag:  
As funcionalidades disponíveis são:  
- Cadastrar Usuário
- Fazer Login
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado
- Listar categorias

### **Deploy**
O PDV Express foi implantado via Cyclic e pode ser acessado [por aqui](https://perfect-plum-pronghorn.cyclic.app/).

### **Requisitos**  
#### Rodando localmente  
- Nodejs instalado.
- Banco de Dados Postgres.
- Beekeeper Studio para, caso queira, interação com o banco de dados.
- Criação de banco de dados e disponibilização de suas informações em arquivo de variáveis de ambiente `.env` de acordo com o `.env.example`. Além disso, é preciso disponibilizar também a porta para comunicação e a senha de validação de token. 
- Criar tabelas por meio do `query.sql`.
- Insomnia para testes de rotas seguindo o passo a passo disponibilizado para os mesmos.

#### Rodando via Deploy  
- Insomnia para testes de rotas seguindo o passo a passo disponibilizado para os mesmos.

### **Teste de funcionalidades**  
#### Para rodar localmente:  
1. Clone o projeto:
```bash
git clone https://github.com/Daian4/PDVExpress.git
```  
2. Abrir a pasta do projeto:
```bash
cd PDVExpress
```
4. Instalar dependências:  
```bash
npm install
```  
5. Inicializar o servidor:
```bash
npm run start
```
Localmente, a aplicação estará disponível no endereço local: `http://localhost:3000`, caso a porta disponibilizada no `.env` seja a 3000 e poderá ser testada no insomnia normalmente apenas adicionando as rotas ao endereço mencionado, como no exemplo: 
<img src='./img/listarCategoriasLocal.png'>  

#### Via deploy
É possível realizar o teste das funcionalidades por meio do Insomnia e fazer uso das rotas. Para isso, basta importar o arquivo `rotasInsomnia_PDVExpress` no Insomnia.  
Ao utilizar o link do deploy, coloque-o da seguinte forma e em seguida faça uso das rotas que serão explicadas no tópico de Funcionalidades. No exemplo, foi feito uso da rota `/categoria`.  
<img src='./img/deploy.png'> 

### **Funcionalidades**
### Cadastrar usuário

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

- **Requisição**  
  O corpo (body) deverá possuir um objeto com as propriedades mostradas na imagem. O retorno desta requisição, em caso de sucesso, exibirá os dados de entrada (exceto a senha) junto ao ID do usuário.  
<img src='./img/cadastrarUsuario.png'>  

### Login do usuário

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

- **Requisição e Resposta**  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes). O retorno desta requisição, em caso de sucesso, exibirá os dados do usuário junto ao seu token de acesso às demais funcionalidades.  
<img src='./img/login.png'>  

### Como utilizar o token de acesso  
O token de acesso para as demais funcionalidades deve ser disponibilizado no header com o formato Bearer Token. No Insomnia, será da seguinte forma: 
<img src='./img/token.gif'>  
Quando enviado, o token é validado e também verificado qual usuário do banco está vinculado ao mesmo pelo ID.  

### Detalhar usuário  
#### `GET` `/usuario`

Essa é a rota para quando o usuario quiser obter os dados do seu próprio perfil.  
**Atenção:** Certificar-se de que o token de autenticação está sendo enviado. 

- **Requisição e Resposta**  
Neste caso, não deverá possuir conteúdo no corpo da requisição.    
Para esta funcionalidade, a resposta em caso de sucesso apresentará os dados do usuário com exceção de sua senha.  
<img src='./img/detalharUsuario.png'>  

### Atualizar usuário

#### `PUT` `/usuario`

Essa é a rota para quando o usuário quiser realizar alterações no seu próprio usuário.  
**Atenção:** Certificar-se de que o token de autenticação está sendo enviado.


- **Requisição e Resposta**
O corpo (body) deverá possuir um objeto contendo os novos dados de nome, email e senha. Nesta funcionalidade é certificado se o email informado já está cadastrado e por consequência não possa ser utilizado. Então, é enviado uma mensagem informando esta ocorrência. Em caso de sucesso, nenhuma mensagem é enviada.  
<img src='./img/alterarUsuario.png'>

### Listar categorias

#### `GET` `/categoria`

Essa é a rota para quando o usuario logado quiser listar todas as categorias cadastradas para consulta.  
**Atenção:** Certificar-se de que o token de autenticação está sendo enviado. 

- **Requisição**  
  Não é necessária nenhuma informação além do token de autenticação.  
  Como resposta, as categorias são exibidas em formato de array de objetos, tendo cada categoria o seu próprio ID de referência. 
<img src='./img/listarCategorias.png'>

## ✒️ Autoras
[Bianca Aparecida](https://github.com/biancaaparecida07)  
[Daiana Lima](https://github.com/Daian4)  
[Caroline Morais](https://github.com/CNakamura20)  
[Mariana Olaya](https://github.com/mariolayal)  
[Laís Oliveira](https://github.com/laisfrr)  
