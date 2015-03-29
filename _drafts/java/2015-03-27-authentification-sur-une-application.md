---
layout: post
title: L'authentification sur une application
category:
  - Java
  - Spring
  - Jasypt
  - Security
  - spring-security
---


### Principe général

Vous avez un utilisateur que vous souhaitez authentifier sur votre application. Dans ce cas, le mot de passe se doit d'être hashé. Une fois appliqué la fonction de hashage, il sera alors théoriquement impossible de déterminer le mot de passe de départ. En effet, l'idée même des fonctions de hashage repose sur l'idée qu'il n'existe pas de fonction *inverse*.

Donc, au lieu stocker des mots de passe en clairs, il suffit de stocker leurs hashs dans la base de données. L'authentification repose ensuite sur la comparaison des 2 hashs. On parle aussi de la comparaison d'empreintes. Si, au cours de l'authentification, l'empreinte stockée en base correspond bien à l'empreinte fournit par l'utilisateur, alors, on pourra considérer que le mot de passe fournie est identique à celui stocké en base. Et pourtant, dans la base, il n'y a aucune mot de passe. Juste des hashs !!

Le principe d'enregistrement et de connection est en fait assez simple. Voici quelques schémas afin que vous puissiez bien comprendre le principe de fonctionnement décrivant respectivement :

* L'enregistrement d'un nouvel utilisateur
* La connection d'un utilisateur enregistré

### L'enregistrement

L'enregistrement se passe d'une manière assez simple. L'utilisateur, Bob, fournit un coupe [ login / mot de passe ] afin de se créer un compte sur l'application. Si son login n'est pas déjà utilisé par quelqu'un d'autre, on enregistre le couple [ login / hash(mot de passe) ]. Sinon, on demande à Bob de choisir un autre login.

![Enregistrement]({{ site.url }}/assets/images/2015/03/application-registration-principle.png){: .center }

Cela conclue la manière dont doit se passer l'enregistrement d'un nouvel utilisateur. L'étape de vérification de l'unicité de l'identifiant ne doit pas être négligée. En effet, nous verrons par la suite qu'il est necessaire pour la suite que l'utilisateur Bob ne soit enregistré qu'une seule fois. Dans une base de données SQL, cela doit se traduire par une contrainte d'unicité sur la colonne *identifiant* de votre table des utilisateurs.


### La connection

![Connection]({{ site.url }}/assets/images/2015/03/application-connection-principle.png){: .center }

Voici donc le principe de connection d'un utilisateur à une application. Sur les schémas, la manière de procéder peut sembler évidente. Pourtant, quand on en discute avec d'autres personnes, il semblerait cela n'est pas *évident* pour tout le monde.


## Utilisation de spring-security

Désolé, je n'ai pas encore écrit cette partie.

TP (en cours d'écriture) : [Soat-secu-password](https://github.com/Patouche/soat-samples/tree/master/soat-parent-code/soat-secu-password)

{% highlight bash %}
git checkout tp-secu-1
{% endhighlight %}

## Utilisation d'un CAS

## Sur des Web Services

### Soap

### REST

## Le protocole OAuth
