---
layout: post
title: Un code HTML simple avec Thymeleaf
tags:
  - HTML
  - Java
  - KISS
---

Il y a quelques temps, j'ai eu l'occasion de mettre en place et de tester [Thymeleaf]() sur une application que je devais mettre en place. En l'occurrence, je cherchais une solution de templating qui devait répondre à certains critères. Après une rapide passe sur les solutions existantes, j'ai finalement décidé d'opter pour Thymeleaf qui, pour le besoin en question, répondait le mieux à l'ensemble des critères.

Au départ, voici les critères à laquelle la solution devait répondre :

* Intégration avec les IDE Eclipse et IntelliJ
* Intégration facile avec Spring-MVC
* Facilité et simplicité d'écriture des pages HTML
* Pas trop de JavaScript

En effet, les pages allant être développées par des développeurs backend, il ne fallait pas que la solution requiert beaucoup de connaissance en JavaScript comme c'est le cas avec les frameworks comme AngularJS / Ember et Backbone. Certes des solutions comme Vaadin, Wicket, JSF, [...] aurait été tout à fait envisageable mais cela aurait ajouté trop de complexité pour 
