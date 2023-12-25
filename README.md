# Busca de endereços próximos

A aplicação em questão visa realizar a busca de endereços próximos de outros endereços, ou seja, realizar o mapeamento do perímetro próximo de endereços desejados.

## Recursos utilizados

- API de GEOCODE do Google Cloud;
- API da Overpass;
- Biblioteca de geração de arquivos em excel.

## Instalação

Dado todo cenário de recursos e custos envolvidos, para essa aplicação, estamos utilizando o Node JS, com o superset do JS, o Typescript. Portanto, é necessário que você possua o [NodeJS][nodejs] instalado.

Após a instalação do Node JS e a conta AWS preparada para utilização, basta executar os comandos abaixo para iniciar o projeto.

Clonando o repositório e entrando na pasta:

```sh
git clone https://github.com/gugamainchein/address-close-specific-streets
cd address-close-specific-streets
```

Instalando dependências e executando o projeto:

```sh
yarn
yarn dev
```

## Variáveis de ambiente

Após as realizações dos passos acima e a inicialização do projeto com sucesso, você está pronto para integrá-lo com os recursos de sua conta Google Cloud, por meio das variáveis de ambiente abaixo:

- GCP_KEY: Chave gerada no portal de liberação de APIs da GCP;

## Sobre o projeto

O back-end deste repositório, tem como propósito a realização da busca de alguns endereços próximos às seguintes localizações: Rua Cristóvão Gonçalves, 48 / Largo dos pinheiros, 81 / Largo dos pinheiros, 75. Pensando nisso, temos a seguinte estrutura de diretórios e arquivos:

- Arquivo principal:

  - O arquivo `./src/index.ts` contém todas as funções principais do projeto.

- Documentos finais:

  - O diretório onde serão gerados todos os arquivos de excel, encontram-se em `./docs/resultas_{street}.xlsx`.

## Histórico de mudanças

- 0.1.0
  - Primeira versão da aplicação

## Sobre o criador

Gustavo Mainchein – [@gugamainchein](https://www.instagram.com/gugamainchein) – gustavomainchein@outlook.com

[Veja mais sobre mim](https://github.com/gugamainchein)

## Faça sua contribuição

1. Realize o fork do projeto (<https://github.com/gugamainchein/serverless-framework-typescript/fork>)
2. Crie a nova feature em uma branch (`git checkout -b feature/fooBar`)
3. Faça o commit das suas mudanças (`git commit -am 'Add some fooBar'`)
4. Realize o push para a branch (`git push origin feature/fooBar`)
5. Crie um novo pull request

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://docs.npmjs.com/cli/v8
[nodejs]: https://nodejs.org/en/
