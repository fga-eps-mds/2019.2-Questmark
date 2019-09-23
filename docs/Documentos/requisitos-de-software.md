# Requisitos de Software

|ID|Funcionalidades|Descrição|Sugestão de solução|Prioridade|
|:---:|:---:|:---:|:---:|:---:|
|RS01|Cadastro de usuários|||Must|
|RS02|Cadastro de usuários|||Must|
|RS03|Logoff de usuários|||Must|
|RS04|Recuperar senha de usuários|Gerar token de recuperação temporário e mandar por email||Should|
|RS05|Criar questionário|||Must|
|RS06|Visualizar questionário (Owner)|||Must|
|RS07|Editar questionário (Owner)|||Should|
|RS08|Apagar questionário (Owner)|||Should|
|RS09|Listar questinários na barra lateral (Owner)|||Must|
|RS10|Listar respostas para um dado questionário (Owner)|||Must|
|RS11|Gerar Dashboard para um dado questionário||[Utilizar biblioteca ChartJS](https://www.chartjs.org/samples/latest/)|Should|
|RS12|Parse markdown para HTML||[Fork do projeto WMD](https://github.com/brikis98/wmd)|Must|
|RS13|Busca de questionário na barra lateral|||Could|
|RS14|Painel de Ajuda|Contendo manual do sistema e a sintaxe markdown utilizada||Should|
|RS15|Gerar link compartilhável|Gerar link após finalização do cadastro do questionário no sistema||Must|
|RS16|Salvar questionários|Persistir no servidor arquivo hmtl de cada questionário de todos usuários|[Para criar arquivos HTML pode-se utilizar o EJS](https://www.devpleno.com/html-estatico-com-templates-ejs/)|Must|
|RS17|Fornecer templates de estilização de questionário|||Would|
|RS18|Notificações|Após login disponibilizar o acesso as novas respostas(quantidade para cada questionário) para os questionários do usuário||Would|
|RS19|Submissão de repostas a partir do link|Qualquer um deve ser capaz de acessar o link comapartilhável e submeter a sua resposta. Assim persistindo a resposta no banco de dados||Must|
|RS20|Conectar a plataforma Questmark com o Github|||Could|

## Histórico de Revisão
|Data|Versão|Modificação|Autor|
|:---:|:---:|:---:|:---:|
|04/09/2019|0.1|Abertura do documento|MDS (Todos)|
|05/09/2019|0.2|Levantamento dos requisitos|Gustavo Nogueira|