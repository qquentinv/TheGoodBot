# Bot discord

## Description

Ce projet a pour but de créer un bot discord qui a les fonctionnalités suivantes: 

- Lancer des alertes de stream twitch
- Lancer des reminders quand les personnes n'ont pas stream depuis un certain temps
- Crée un word à partir d'un channel grâce à la commande !word

[![pipeline status](https://gitlab.com/HuuwQ/discord-channel-to-word-bot/badges/main/pipeline.svg)](https://gitlab.com/HuuwQ/discord-channel-to-word-bot/-/commits/main)
[![Latest Release](https://gitlab.com/HuuwQ/discord-channel-to-word-bot/-/badges/release.svg)](https://gitlab.com/HuuwQ/discord-channel-to-word-bot/-/releases)

- [Bot discord](#bot-discord)
  - [Pré-requis](#pr--requis)
    - [Installation](#installation)
    - [Installer les dépendances](#installer-les-d-pendances)
  - [Lancer le projet](#lancer-le-projet)

## Pré-requis

### Logiciel

- Installer docker & docker compose

OU 

- Installer nodejs
- Installer npm

### Dépendances

Pour lancer le projet, il faut installer les dépendances :

- npm i

## Lancer le projet

### Docker 
Il suffit de lancer le conteneur docker à l'aide de la commande suivante : 

> docker compose up --build -d

### NodeJS
Il suffit de lancer la commande suivante avec l'environnement de chargé :

> npm start
