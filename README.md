# Bot discord

## Sommaire

- [Description](#description)
- [Commandes](#commandes)
- [Pré-requis](#pré-requis)
  - [Logiciel](#logiciel)
  - [Dépendances](#dépendances)
  - [Base de données](#base-de-données)
- [Configuration](#configuration)
- [Lancer le projet](#lancer-le-projet)
- [Réglages](#réglages)
- [Développement](#développement)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Ressources](#ressources)

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

> `npm i`

### Base de données

Pour mettre en place la base de données, il faut lancer la commande suivant :

> `npm run migrate`

Notre base de données fonctionne avec un système de migration.
Pour chaque changement que vous voulez faire dans notre base de données, il faut créer un fichier `XXXX-description.sql` avec `XXXX` qui correspond au nombre qui vont déterminer l'ordre d'exécution.

## Configuration

Pour configurer le bot sur votre serveur discord, il vous faudra dupliquer le fichier `config-template.json` et le renommer en `config.json`.
Ensuite il vous faudra remplacer les valeurs de chaque variable avec les votres.

## Lancer le projet

Il suffit de lancer la commande suivante avec l'environnement de chargé :

> `npm start`

## Réglages

### Discord

Le bot nécessite des configurations sur la [plateforme de développement de discord](https://discord.com/developers/applications).
C'est notamment ici que se passe la création de l'application, la modification du nom, de l'image et la génération du token.

### Twitch

Pour effectuer des appels API vers Twitch, il faut créer une application via le lien suivant [https://dev.twitch.tv/console/apps](https://dev.twitch.tv/console/apps).
Après la création de votre application, récupérez le "client id" et générez un secret.

## Développement

Pour lancer TheGoodBot, il suffit d'exécuter la commande. Grâce au paramètre `--watch`, le projet se relancera à chaque modification apportée au code.

> `npm run debug`

Note : nous utilisons `node:sqlite` qui est fonctionnalité expérimentale de Node.js et qui peut changer à tout moment.

### Migrer le fichier `config.json`

Depuis la mise en place de la BDD Sqlite, l'utilisation d'un fichier `.json` pour la configuration n'est plus nécessaire. Vous pouvez migrer vers un `.env.local` avec la commande `node .bin/convert-json-config-to-env.js`.

## Tests

Des tests unitaires sur certaines parties du code sont présents dans le dossier `tests` à la racine du projet.
Pour lancer les tests, il suffit d'éxécuter la commmande suivante :

> `npm run test`

## Déploiement

Ce bot peut être déployé sur un VPS ou encore un raspberry.
Pour cela, j'utilise le package `pm2`. il permet de lancer des applications node en tant que service unix.
On peut le lancer grâce à la commande :

> `pm2 start npm --name "TheGoodBot" -- start`

On peut consulter les différentes applications en cours de lancement grâce à la commande :

> `pm2 status`

On peut aussi relancer facilement le serveur grâce à la commande :

> `pm2 restart "TheGoodBot"`

On a même accès à un tableau de bord qui contient notamment les statistiques de performance et les logs avec la commande :

> `pm2 dash`

Pour obtenir seulement les logs, utiliser :

> `pm2 log`

Pour terminer, on peut arrêter le bot grâce à la commande :

> `pm2 stop "TheGoodBot"`

## Ressources

- [Discord.js](https://discordjs.guide/)
