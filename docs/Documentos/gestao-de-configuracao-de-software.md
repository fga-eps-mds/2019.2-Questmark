# Gestão de configuração de Software
 
## 1. Introdução  
Este documento tem como finalidade fornecer apoio para o desenvolvimento de software. Ele elucida os procedimentos necessários para controlar mudanças e identificar o que será alterado, mecanismos para a gerência de diferentes versões do produto, auditando e relatando as transformaçõe realizadas, e a integração das ferramentas que serão utilizadas pela equipe para desenvolvimento, organização e comunicação.
 
## 2. Políticas
 
### 2.1 Política de Commits
Os *commits* devem ser escritos em português, iniciando o comentário com o número da *issue* em questão, seguido de uma descrição clara, objetiva e direta o que foi produzido.   
Deve-se utilizar verbos no particípio, omitir acentuações , iniciar a parte textual com letra maiúscula e finalizar com ponto final.  
Exemplo :  
 
>[#<Id da issue>]<Comentário.>  
>  
>[#12]Tópico 2.1 adicionado ao documento.
 
   
### 2.2 Política de Branches  
 
O *workflow* do projeto será baseado no [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/).
 
![Falha ao carregar imagem.](https://camo.githubusercontent.com/b12ce8394edc7e0f5d1e92b63bd64642e2ade5ee/687474703a2f2f692e696d6775722e636f6d2f357946774848492e706e67)
 
O repositório será composto de :  
* Branch **MASTER** : 
  * Será a branch estável do projeto;
  * **Nunca** deve receber *commits* diretamente;
  * Modificações na **MASTER** deverão vir, via *merge*, da *branch* **DEVELOP**.  
 
* Branch **DEVELOP** :  
    * Receberá as *features* que foram concluídas; 
    * **Nunca** deve receber *commits* diretamente;
    * Modificações na **DEVELOP** deverão vir, via *merge*, das *branches* de *features* que foram concluídas;
    * A *branch* fará *merge* na **MASTER** quando estiver estável e pronta para *release*.  
  
* Branches **FEATURE** :
    * Destinadas para a criação de novas funcionalidades e correção de *bugs*;
    * Devem ser baseadas na *branch* **DEVELOP** e não a **MASTER**;
    * O nome da *branch* deverá seguir o padrão :  
  
> <Número da issue relacionada>-<Propósito-da-branch> 
>      
> 12-Definir-política-de-branches
 
* Branches **FIX** :
    * Destinadas para a solução **imediata** de *bugs*;
    * Nomear conforme o padrão :  
 
> fix-*bug*/issue  
>
>fix-falha-Login  
>fix-12-Falha-Login    
  
* Branches **PLAYGROUND** :
    * Destinadas para criar e testar novas ideias;
    * A princípio não entrarão como *features*;
    * Nomear conforme o padrão :  
  
> playground-Ideia-incrível  
> playground-Testando-ideia-genial
 
## 3. Ferramentas
|Ferramenta|Descrição|
|:---:|:---:|
|Git| Ferramenta de versionamento|
|GitHub| Ferramenta de hospedagem de repositórios|
|ZenHub| Extensão com ferramentas de gerenciamento|
|ReactJS| Biblioteca JS para criação de interfaces de usuário|
|NodeJS| Interpretador JS no lado dos servidores|
|ExpressJS| Estrutura de servidor padrão para o NodeJS| 
|MongoDB| Software de banco de dados |
|Docker| Ferramenta de virtualização e configuração de ambiente via containers|
|Docker Compose| Ferramenta para gerenciamento de containers Docker|
|Telegram| Ferramenta para comunicação |
|Slack| Ferramenta para comunicação |
 
## Referências
 
>PRESSMAN, Roger S. (1995). Engenharia de Software. São Paulo : Pearson Makron Books  
 
 
## Histórico de Revisão
|Data|Versão|Descrição|Autor(es)|  
|:---:|:---:|:---:|:---:|   
|02/09/2019|0.1| Criação do documento| Nícalo Ribeiro |
|02/09/2019|0.2| Adição dos tópicos Introdução , Política de *commits* e Política de *branches* | Nícalo Ribeiro|
|03/09/2019|0.3| Adição do tópico Ferramentas | Nícalo Ribeiro|
|22/11/2019|0.4| Correção de erros ortográficos | Danillo Souza|
 

