# Démarrage

La liste des programmes qui se lancent tout seuls quand tu allumes le PC, avec un interrupteur pour chacun, exactement comme l'onglet Démarrage du Gestionnaire des tâches de Windows.

*English version: [README.en.md](README.en.md)*

## Comment l'utiliser

- Chaque ligne montre l'icône du programme, son nom, d'où il est lancé et la commande exacte qui le démarre. En haut : le nombre de programmes et combien sont activés.
- **Activé / Désactivé** : coupe ou remet le lancement automatique. Le changement compte **au prochain démarrage de Windows** ; un message le confirme.
- **Actualiser** relit la liste, par exemple après avoir installé un programme.

Désactiver un programme ne le désinstalle pas et ne le ferme pas : il ne démarre simplement plus tout seul. Tu peux le réactiver à tout moment.

## D'où viennent les programmes

Démarrage lit les mêmes endroits que Windows :

- **Ton compte** : les programmes lancés pour toi seul (registre et dossier Démarrage de ton profil). Tu peux les changer librement.
- **Tous les utilisateurs** : les programmes lancés pour tout le monde sur ce PC, en 64 et 32 bits, et le dossier Démarrage commun. Ils sont marqués **Admin** : seul un administrateur peut les changer, depuis le Gestionnaire des tâches → Démarrage.

L'activation passe par les mêmes réglages que le Gestionnaire des tâches : ce que tu changes ici s'y voit, et inversement. Les entrées ne sont jamais supprimées.

## Données et synchronisation

Rien n'est synchronisé : les programmes au démarrage sont ceux de ce PC. Le plugin demande l'accès au démarrage de Windows et aux informations du système.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Démarrage → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
