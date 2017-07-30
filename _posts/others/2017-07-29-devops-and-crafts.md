---
layout: post
title: 'DevOps & Craft : incompatibles ?'
image:
tags:
  - DevOps
  - Craft
  - Reflexion
---

Hier avait lieu [SysAdminDay](https://en.wikipedia.org/wiki/System_Administrator_Appreciation_Day)... L'occasion pour tout développeur de penser un peu à nos chers sysadmins ! Pour ma part, ce jour là, il m'est revenu en tête une question qui commence à me trotter en tête depuis quelques semaines ...

En tant que développeur, les mouvemenents du Craftsmanship & du DevOps ne me sont pas totalement inconnue... À ce jour, je constate que le travail fait dans le cadre de la mise en place d'une infrastructure, des méthodes de déploiements sont très éloignés des principes du craft. Mais pourquoi ces 2 mouvements s'ignorent royalement ?

## DevOps & Crafs ...

Si l'on en revient aux principes du Craft & du DevOps, ces 2 principes sont-ils antinomiques ??... Il me semble que non, bien au contraire !

En se basant sur le [craftsmanship manifesto](http://manifesto.softwarecraftsmanship.org/), on peut lister les 4 points suivants pour définir le principe du Craftsmanship  :

* Pas seulement des logiciels opérationnels, mais aussi **des logiciels bien conçus**.
* Pas seulement l'adaptation aux changements, mais aussi **l'ajout constant de la valeur**.
* Pas seulement les individus et leurs interactions, mais aussi **une communauté de professionnels**.
* Pas seulement la collaboration avec les clients, mais aussi **des partenariats productifs**.

D'un autre coté, il n'y a pas de manifeste DevOps comme pour le Craft. Le DevOps restant avant tout une **philosophie**, une définition précise du terme (ou un manifeste) n'a jamais été donnée. Ainsi le DevOps est définie comme suit sur [Wikipédia](https://fr.wikipedia.org/wiki/Devops) :

> Le devops est un mouvement visant à l'alignement de l'ensemble des équipes du système d'information sur un objectif commun, à commencer par les équipes de Dev chargés de faire évoluer le système d'information et les Ops responsables des infrastructures (exploitants, administrateurs système, réseau, bases de données,...).
{:cite='https://fr.wikipedia.org/wiki/Devops'}

Ainsi, dans la philosophie du DevOps, on cherche à créé une meilleure interaction entre les Dev & les Ops. De cette philosophie est née de grand principes comme par exemple le déploiement continu.

## Les Ops, ils savent pas coder ...

Si vous êtes un Dev, vous pensez peut-être ça ... Sauf que c'est bien loin d'être vrai !! Vos Ops ne développent peut-être pas dans votre langage de prédilection, certes. Mais cela ne veut pas pour autant dire qu'ils ne savent pas coder. Bon, comme vous êtes *DevOps (philosophie)*, heureusement, vous ne pensez pas comme ça !

![DevOps Wall](/assets/images/2017/devops-wall.png)
{:.center}

Le DevOps Wall ou l'illustration parfaite de 2 volontés différentes : Stabilité (Ops) vs Features (Devs). Parfois, ce mur est plus grand qu'il n'y parait ...

Comme on est DevOps, le Dev fait du dev, l'Ops de l'ops et parfois et, à mi-chemin, on se retrouve à commiter sur des projets en commun. Mais il faut quand même que ça reste *exceptionel* !! Des *petits* projets utilisés pour le déploiement, pour scripter l'infra, déclencher la machine à café depuis le Raspberry qui se trouve à coté, ... Bref, on se retrouve forcément à une étape où on écrit du code. Que ce soit un script python, un bout de shell ou même un script Node ...

Et pour un projet de ce type, on se retrouve bien souvent avec les caractèristiques suivantes :

* 6 mois d'existence
* 2500 lignes de code
* 0 test
* 0 refacto
* 9 committers
* 9 formatters de code différents ...

Les Devs n'avaient pas envie de faire des tests (et puis c'est pas vraiment du code puisque c'est du python). Les Ops, sous pression parce que *ça doit fonctionner rapidement* n'ont jamais pris le temps d'essayer d'améliorer le projet. Et puis, comme les Ops n'ont aucune idée de conception logiciel et que les Dev ne veulent pas en faire (sauf sur des *vrais* projets), au bout de 6 mois, le *projet infra* est incompréhensible ...

A la fin, le code pour les Ops, c'est un peu comme la Sécu : *on verra après ...*

Attends, mais le DevOps, c'est pas avant tout le produit avant le projet ? Et le fait qu'une partie de votre produit soit *mal* foutu, n'est ce pas un peu anti-crafts ?

En effet, si vous vous retrouvez dans l'un des 9 committers et que vous n'avez rien fait pour changer quoi que ce soit à l'état du *petit projet*, à mon humble avis, vous êtes dans une autre catégorie... Le [Ni-ni](https://fr.wikipedia.org/wiki/Ni-ni) :

* Ni DevOps
* Ni Crafs

## Pour conclure ...

Tester son infra reste de l'ordre du possible. Si vous parlez d'un code custom que vous avez écrit pour vos besoins, bien-sûr que c'est possible de le tester !! N'importe quel Dev devrait être en mesure d'y arriver. Si vous parler d'un code Puppet, Chef, Salt ou Ansible, les projet et les articles de blog à ce sujet sont souvent nombreux... Bref, dans un cas comme dans l'autre, vous pourrez avoir un code d'infrastructure *bien conçu* !!...

Si vous êtes DevOps, peu importe d'ou vous venez à la base, il vous sera aisé de demandé de l'aide et de parlez avec votre autre coté (obscure peut-être). Pour ma part, ces propos n'illustrent en rien mon mode de pensée quand au Dev ou au Ops. Il s'agit juste là d'un constat (assez triste il me semble) d'une application de l'anti Craft-Dev(Sec)Ops ...

Donc, pour conclure, j'en profite pour souhaiter à tous les Sysadmins que je connais & les autres, le meilleur des SysAdminDay !!
