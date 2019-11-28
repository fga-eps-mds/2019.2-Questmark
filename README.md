<!--Cabeçalho-->
<p align="center">
  <img src="https://raw.githubusercontent.com/fga-eps-mds/2019.2-Questmark/docs/docs/Imagens/Logo.png">
  <br/>
  <a href="https://fga-eps-mds.github.io/2019.2-Questmark/" target="_blank">Acesse QuestMark Docs</a>
</p>

<hr/>

## Sobre o projeto

   O QuestMark é uma plataforma para criar questionários a partir da sintaxe _markdown_. O _markdown_, tecnologia amplamente utilizada por desenvolvedores, permite a criação de textos elegantes de uma forma simples e intuitiva. Porém, o mesmo não permite a criação de um formulário por não ter sido programado com esse propósito.

  Foi utilizado um projeto _open source_ chamado [_WMD: The Wysiwym Markdown Editor_](https://github.com/brikis98/wmd) que implementa uma sintaxe bastante simples para criar campos de formulários. Apesar de existir um projeto que já inclui a sintaxe para criação de questionários, não há nenhuma plataforma que disponibilize essa aplicabilidade de uma maneira fácil ao público. Dessa forma, a equipe do projeto QuestMark, decidiu desenvolver uma plataforma que sana esse problema.

## Principais funcionalidades
* _CRUD_ de questionários;
* Permite a submissão de respostas para os questionários;
* Gerar iFrame para incorporação de questionários em outras páginas;
* Gerar arquivo _CSV_ a partir das respostas de um questionário;
* Gerar _dashboard_ a partir das respostas de um questionário;
* _API_ isolada que realiza o conversão de _markdown_,contendo a sintaxe para criar campos de formulários, para _html_. [Exemplo de utilização da _API_ ](https://github.com/fga-eps-mds/2019.2-Questmark/blob/develop/frontend/exemplo_utiliza%C3%A7%C3%A3o_api/exemplo_api_parse.html).

## Como contribuir
* [Código de conduta](https://github.com/fga-eps-mds/2019.2-Questmark/blob/develop/CODE_OF_CONDUCT.md)

* [Guia de contribuição](https://github.com/fga-eps-mds/2019.2-Questmark/blob/develop/.github/CONTRIBUTING.md)

## Guia de instalação

Para baixar o repositorio use o comando: `git clone https://github.com/fga-eps-mds/2019.2-Questmark.git`

Na pasta 2019.2-Questmark é necessário montar as imagens descritas pelos Dockerfiles utilizando o docker :

1. Construir as images: `docker-compose build`

2. Subir os containers: `docker-compose up`

3. O projeto estará acessível em: `localhost:3000/`

## Ambientes

### Homologação
https://masterquestmark.herokuapp.com/
### Produção
https://prodquestmark.herokuapp.com/
### Site
https://www.questmark.com.br

## Empacotamento
* Para desempacotar o .deb com sucesso é necessario ter instalado previamente na máquina os programas:
  * docker
  * docker-compose
* Link para instalação: https://docs.docker.com/v17.09/engine/installation/
* Após a instalação das dependências necessárias desempacote utilizando o comando
```
  sudo dpkg -i questmark_1.0_amd64.deb
```
* Após o passo anterior ter sido realizado, o projeto estará disponível na pasta /opt

## Equipe

|Nomes|Email|Github|
|---|---|---|
|Danillo Gonçalves|danillosouza1704@gmail.com|[DanilloGS](https://github.com/DanilloGS)||
|Gustavo Nogueira|gustavonr.13@gmail.com|[Gustavo-Nogueira](https://github.com/Gustavo-Nogueira)||
|Lucas Lopes|lucaslopes05597@gmail.com	|[Lucaslop](https://github.com/lucaslop)||
|Luiz Gustavo|lgpinheiro94@gmail.com|[Lgpinheiro94](https://github.com/lgpinheiro94)||
|Miguel Santos|miguelisdemir@gmail.com|[Miguelisdemir](https://github.com/Miguelisdemir)||
|Nicalo Ribeiro|nicalo63@gmail.com|[Nicaloribeiro](https://github.com/nicaloribeiro)||

## Licença 
[GLP-3.0](https://github.com/fga-eps-mds/2019.2-Questmark/blob/develop/LICENSE)

<hr/>
<p align="center"><b>Questmark</b></p>
<p align="center">Métodos de Desenvolvimento de Software (MDS) - 2019.2<br /><br />
<a href="https://fga.unb.br" target="_blank"><img width="230"src="https://4.bp.blogspot.com/-0aa6fAFnSnA/VzICtBQgciI/AAAAAAAARn4/SxVsQPFNeE0fxkCPVgMWbhd5qIEAYCMbwCLcB/s1600/unb-gama.png"></a>
</p>
