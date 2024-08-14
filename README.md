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
    - [Logiciel](#logiciel)
    - [Dépendances](#d-pendances)
  - [Lancer le projet](#lancer-le-projet)
    - [Docker](#docker)
    - [NodeJS](#nodejs)
  - [Réglages](#r-glages)

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

## Réglages

Le bot nécessite des configurations sur la [plateforme de développement de discord](https://discord.com/developers/applications).
C'est notamment ici que se passe la création de l'application, la modification du nom, de l'image et la génération du token.

## Ressources

- [Discord.js](https://discordjs.guide/)