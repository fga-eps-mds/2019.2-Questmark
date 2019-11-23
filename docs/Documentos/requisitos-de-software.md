# Requisitos de Software
 
|ID|Funcionalidades|Descrição|Sugestão de solução|Prioridade|
|:---:|:---:|:---:|:---:|:---:|
|RS01|Cadastro de usuários|||Must|
|RS02|Cadastro de usuários|||Must|
|RS03|Logoff de usuários|||Must|
|RS04|Recuperar senha de usuários|Gerar token de recuperação temporário e mandar por email.||Should|
|RS05|Criar questionário|||Must|
|RS06|Visualizar questionário (Owner)|||Must|
|RS07|Editar questionário (Owner)|||Should|
|RS08|Apagar questionário (Owner)|||Should|
|RS09|Listagem de questionários(Owner)|Listagem dos questionários de cada usuário fornecendo opções de CRUD,iFrame,Dashboard e Compartilhamento para cada questionário.||Must|
|RS10|Gerar Dashboard| Gerar Dashboard a partir das respostas de um questionário.|[Utilizar biblioteca ChartJS](https://www.chartjs.org/samples/latest/)|Should|
|RS11|Parse markdown para HTML||[Utilizando o projeto WMD](https://github.com/brikis98/wmd)|Must|
|RS12|Painel de Ajuda|Contendo manual do sistema e a sintaxe markdown utilizada.||Should|
|RS13|Gerar link compartilhável|Gerar link após finalização do cadastro do questionário no sistema.||Must|
|RS14|Salvar questionários|Persistir o html gerado para cada questionário em um banco de dados.||Must|
|RS15|Gerar CSV|Gerar CSV a partir das respostas recebidas para cada questionário.||Must|
|RS16|Gerar iFrame para embedded|Gerar iFrame dos questionários de forma que permita o usuário incorporar seus questionários em outras páginas.||Must|
|RS17|Submissão de repostas a partir do link|Qualquer um deve ser capaz de acessar o link compartilhável e submeter a sua resposta. Assim persistindo a resposta no banco de dados||Must|
 
 
## Histórico de Revisão
|Data|Versão|Modificação|Autor|
|:---:|:---:|:---:|:---:|
|04/09/2019|0.1|Abertura do documento|MDS (Todos)|
|05/09/2019|0.2|Levantamento dos requisitos|Gustavo Nogueira|
|16/11/2019|0.3|Atualização dos requisitos recebidos após a realese 1.|Gustavo Nogueira|
|22/11/2019|0.4|Correção de erros ortográficos|Danillo Souza|
