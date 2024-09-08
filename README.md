# Bot discord

## Sommaire

- [Bot discord](#bot-discord)
  - [Description](#description)
  - [Commandes](#commandes)
  - [Pré-requis](#pré-requis)
    - [Logiciel](#logiciel)
    - [Dépendances](#dépendances)
  - [Configuration](#configuration)
  - [Lancer le projet](#lancer-le-projet)
  - [Réglages](#réglages)
  - [Développement](développement)
  - [Déploiement](#déploiement)

## Description

Ce projet a pour but de créer un bot discord qui a les fonctionnalités suivantes:

- Lancer des alertes de stream twitch
- Lancer des reminders quand les personnes n'ont pas stream depuis un certain temps
- Crée un word à partir d'un channel grâce à la commande !word

## Commandes

- !help
- !streamers (list all stream we follow)
- !add (add a stream to follow)
- !delete (unfollow a stream)
- !laststream (date of the last stream)
- !word (generate docx)

## Pré-requis

### Logiciel

- Installer nodejs
- Installer npm

### Dépendances

Pour lancer le projet, il faut installer les dépendances :

> npm i

## Configuration

Pour configurer le bot sur votre serveur discord, il vous faudra dupliquer le fichier `config-template.json` et le renommer en `config.json`.
Ensuite il vous faudra remplacer les valeurs de chaque variable avec les votres.

## Lancer le projet

Il suffit de lancer la commande suivante avec l'environnement de chargé :

> npm start

## Réglages

Le bot nécessite des configurations sur la [plateforme de développement de discord](https://discord.com/developers/applications).
C'est notamment ici que se passe la création de l'application, la modification du nom, de l'image et la génération du token.

## Développement

Pour développer TheGoodBot, nous utilisons `nodemon`, il se lance à l'aide de la commande

> npm run debug

Note : nous utilisons `node:sqlite` ainsi que l'import de `JSON modules` qui sont des fonctionnalités expérimentales de Node et qui peuvent changer à tout moment.

## Ressources

- [Discord.js](https://discordjs.guide/)

## Déploiement

Ce bot peut être déployé sur un VPS ou encore un raspberry.
Pour cela, j'utilise le package `pm2`. il permet de lancer des applications node en tant que service unix.
On peut le lancer grâce à la commande :

> pm2 start index.js

On peut consulter les différentes applications en cours de lancement grâce à la commande :

> pm2 status

On peut aussi relancer facilement le serveur grâce à la commande :

> pm2 restart index.js

On a même accès à un tableau de bord qui contient notamment les statistiques de performance et les logs avec la commande :

> pm2 dash

Pour obtenir seulement les logs, utiliser :

> pm2 log

Pour terminer, on peut arrêter le bot grâce à la commande :

> pm2 stop index.js
