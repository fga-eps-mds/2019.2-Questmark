# Documento de Arquitetura de Software 
## 1. Introdução
### 1.1 Finalidade
Este documento tem como objetivo informar, de uma forma geral, a arquitetura do projeto Questmark. Tanto o comportamento do software, quanto as tecnologias utilizadas para o desenvolvimento do mesmo devem ser expostas de forma clara, explicativa e objetiva para o leitor. 

### 1.2 Escopo
Questmark é uma plataforma que irá possibilitar a criação de formulários em Markdown, de uma forma descomplicada, para qualquer usuário que fizer cadastro no mesmo. O projeto também dá ao cliente a comodidade de visualizar um dashboard, de simples entendimento, com as respostas dadas em seu formulário por um terceiro usuário. O documento apresentará toda a parte arquitetural para a confecção do Questmark, a fim de tornar claras as características arquiteturais do projeto.

### 1.3 Definições, Acrônimos e Abreviações
* FGA: Faculdade do Gama - Campus da Universidade de Brasília localizado no Gama
* MDS: Métodos de desenvolvimento de software
* UnB: Universidade de Brasília
* Markdown: Linguagem de marcação

### 1.4 Referências
>André; Gabriel; Guilherme; ALMEIDA; Weyler. Cidade Democrática: Documento de Arquitetura. Disponível em: https://github.com/fga-gpp-mds/2016.2-CidadeDemocratica/wiki/Documento-de-Arquitetura

### 1.5 Visão Geral
O documento, através de dez principais tópicos e suas ramificações, visa detalhar a arquitetura e os requisitos do software do projeto. Tendo como objetivo facilitar o desenvolvimento e esclarecendo dúvidas a respeito deste.

- Estrutura do documento:
    - Introdução;
    - Representação da Arquitetura;
    - Metas e Restrições de Arquitetura;
    - Visão de Casos de Uso;
    - Visão Lógica;
    - Visão de Processos;
    - Visão de Implantação;
    - Visão de Dados;
    - Tamanho e Desempenho;
    - Qualidade;

## 2. Representação da Arquitetura
### 2.1 Tecnologias
#### 2.1.1 NodeJs
NodeJs é uma plataforma de aplicação, na qual você escreve seus programas com Javascript que serão compilados, otimizados e interpretados pela máquina virtual V8. Essa VM é a mesma que o Google utiliza para executar Javascript no browser Chrome, e foi a partir dela que o criador do Node.js, Ryan Dahl, criou o projeto. Foi a tecnologia que atendeu as necessidades da equipe 

#### 2.1.2 Express
É framework web mais famoso para Node.js. Inclui suporte a diferentes view engines, funciona no padrão MVC, possui JSON e HTTP na caixa, trabalha com URLs amigáveis nativamente e muito mais, sem deixar de ser bem leve, o tornando indispensável para APIs e aplicações web escritas em Node

#### 2.1.3 Mongoose
Mongoose é uma biblioteca do Nodejs que proporciona uma solução baseada em esquemas para modelar os dados da sua aplicação. Ele possui sistema de conversão de tipos, validação, criação de consultas e hooks para lógica de negócios. O Mongoose fornece um mapeamento de objetos do MongoDB similar ao ORM (Object Relational Mapping), ou ODM (Object Data Mapping) no caso do Mongoose. Isso significa que o Mongoose traduz os dados do banco de dados para objetos JavaScript para que possam ser utilizados pela aplicação.

#### 2.1.4 Handlebars
Handlebars é um template engine. Está baseado na sintaxe de "Mustache Templates", às que foram agregadas algumas funcionalidades extras como estruturas condicionais e de repetição. Permitindo gerar conteúdos dinâmicos de forma simples.

#### 2.1.5 HTML
HTML (abreviação para a expressão inglesa HyperText Markup Language, que significa Hipertexto de Marcação de Linguagem) é uma linguagem de marcação utilizada na construção de páginas na Web. Documentos HTML podem ser interpretados por navegadores. A tecnologia é fruto da junção entre os padrões HyTime e SGML.

#### 2.1.6 CSS
CSS (Cascading Style Sheets) significa Folhas de Estilo em Cascata é uma linguagem de estilo utilizada para definir a apresentação de documentos escritos em uma linguagem de marcação, como HTML ou XML

#### 2.1.7 Bootstrap
Bootstrap é uma biblioteca open-source CSS framework direcionada á responsividade, mobile-first front-end web development. Com diversos tipos de formularios, botãoes, navbar entre outras interfaces e componente

#### 2.1.8 React 
O React é uma biblioteca JavaScript de código aberto para criar interfaces de usuário. É mantido pelo Facebook, Instagram e uma comunidade de desenvolvedores individuais e outras empresas. De acordo com o serviço de análise de JavaScript Libscore o React está sendo usado nos sites da Netflix, Imgur, Feedly, Airbnb, SeatGeek, HelloSign, Walmart e outros.

## 3. Metas e Restrições de Arquitetura
As restrições de arquitetura do projeto são a utilização de um Banco de Dados MongoDB para cada serviço interno, Logo um banco onde irá armazenar informações sobre os usuários cadastrados e seus respectivos formulários.
Utilização da ferramenta Docker para a virtualização dos ambientes de forma prática e adequada para a realização do projeto ( Conexão com a internet é necessária) 
As metas do projeto são disponibilizar a criação de um questionário com entrada em markdown  , por ser uma marcação simples e disponibilizar o questionário criado a todos os usuários sem cadastro prévio. Além disso, disponibilizar ao criador do questionário um dashboard com dados analiticos do questionario, para análise das respostas.

<!-- ## 4. Diagrama de Pacotes -->

## 4. Qualidade
O software suporta os seguintes requisitos de qualidade:

- Interface amigável e funcional
- Sistema objetivo para o usúario
- Ser capaz de mostrar dados fiéis ao usuário.

## Histórico de Revisão
|Data|Versão|Modificação|Autor(es)|
|:---:|:---:|:---:|:---:|
|06/09/2019|0.1|Tópicos e subtópicos de 1, 2, 3 e 4 adicionados|Lucas Lopes| 

