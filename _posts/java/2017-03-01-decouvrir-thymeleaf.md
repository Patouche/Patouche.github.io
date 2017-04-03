---
layout: post
title: A la découverte de Thymeleaf !!
image: /assets/images/2017/thymeleaf.png
tags:
  - Java
  - Thymeleaf
---

Ces dernières années, on nous a souvent parler d'Ember, de Backbone, de React, d'Angular ou plus récemment d'Angular 4 ou de VueJS pour réaliser son front... Certes, il est vrai que les SPA (Single Page Application) sont l'avenir du développement front. Toutefois, il me semble important de ne pas oublier les autres solutions existantes. En effet, il arrive fréquement que l'on puisse nous demander de développer (ou d'intégrer) des pages htmls afin de réaliser un backoffice ou une petite application web très simple...

A ce moment là, sur une application Java, utiliser Angular, React ou l'une des autres solutions de SPA peut être assez contraignant et risque d'augmenter considérablement le temps de développement. Thymeleaf et son intégration avec Spring MVC est alors la solution parfaite pour allier simplicité, facilité et rapidité ! D'ailleurs, à ce jour, il suffit de voir [l'interêt succiter par la solution](https://trends.google.fr/trends/explore?date=today%205-y&q=Thymeleaf,Freemarker,Apache%20Velocity) pour comprendre que, pour qu'une application Spring & Thymeleaf est peut-être l'un des choix de demain !

Pas encore convaincu ?? Et bien, nous allons voir ensemble pourquoi Thymeleaf peut s'avérer être une solution de demain...

## Thymeleaf vs ...

### La bonne vielle JSP !!

En effet, entre de la JSP *old school* agrémenter de la JSTL ou Thymeleaf, il n'y a pas réelle comparaison... Personnellement, ma préférence va à Thymeleaf car cette solution nous apporte un réel avantage au niveau de la simplicité d'écriture du code HTML sur une application Spring MVC.

Si de temps en temps, vous écrivez de la JSP, vous devez probablement bien connaitre tous les tags de JSTL qui sont ajouté dans le code, sans compter, les imports ou .... pire, les functions que l'on peut créer directement au sein de sa vue ! Et oui, car pour rappel, les JSP (JavaServer Pages) sont compilés via le compilateur JSP et deviennent à la fin des servlets... Bref, même si bien souvent, on utilise les JSP comme des vues avec Spring MVC, il ne faut pas oublier d'où vient cette technologie et l'utilisation que l'on en fait dans nos applications Spring.

Ainsi, dans le cas d'une utilisation de Thymeleaf, il sera beaucoup plus aisé de visualiser le rendu des pages HTML dans le contenu d'un navigateur. Thymeleaf est en effet assez peu intrusif puisqu'il ne fait que s'ajouter au sein des tags HTML via des attributs qui lui sont propre. Si vous avec des pages HTML à intégrer, Thymeleaf est une solution faite pour vous car il suffira de rajouter les attributs afin de l'intégrer correctement avec Spring MVC.

Par ce procéder, il en résulte donc l'impossibilité (comme c'est le cas dans de la JSP) de créér ses propres fonctions ou d'y ajouter du code Java au sein de ses couche de présentation. De plus, vous aurez également un code bien HTML bien plus léger et bien plus simple à lire que de la JSP ! De plus, de part son fonctionnement, il vous sera impossible de générer du code HTML *invalide* (au sens du DOM). Et oui, Thymeleaf est un peu contraignant la dessus puisque, de part sa solution de parser le DOM, il n'acceptera pas des tags non fermé.

Et bien oui, avec Thymeleaf, il est donc necessaire de bien faire les choses !

### Et les autres solutions de templating

Bien sûr, les solutions de templating en Java sont nombreuses et on peut citer entre autres les solutions suivantes :

* [Freemarker](http://freemarker.org/)
* [Struts](https://struts.apache.org/)
* [Velocity](http://velocity.apache.org/)
* [Mustache](http://mustache.github.io/) ([Mustache.java](https://github.com/spullara/mustache.java) ou [Trimou](http://trimou.org/))
* [JTwig](http://jtwig.org/)
* [Jade](http://jade-lang.com/)
* [Rythm](http://rythmengine.org/)
* [HTTL](http://httl.github.io/)
* [Pebble](http://www.mitchellbosecke.com/pebble/home)
* [Scalate](http://scalate.github.io/scalate/) with Scaml
* ...

Si à mon sens Thymeleaf est aujourd'hui une solution incontournable de par sa simplicité de mise en place et sa facilité d'écriture et de compr"hension, il n'en résulte pas moins que certaines de ces solutions sont à surveiller avec attention !

Toutefois, il ne faut pas s'arreter ! En effet, il est important de prendre en compte l'intérêt de l'outils parce que, Thymeleaf, reste un peu plus simple à utiliser que beaucoup de ses solutions mais de par son fonctionement (parser du XML), il est parfois un peu plus lent que certains autre des ses concurrents (ou que la bonne vieille JSP)

Donc, en effet, si vous souhaitez faire un site public à fort traffic, Thymeleaf n'est peut-être pas la solution vers laquelle il faudra se tourner. Mais dans ce genre de cas, une solution de SPA (comme Angular, React ou VueJS) est quand même peut-être une meilleur alternative à toute cette liste (Thymeleaf compris) !

## La syntaxe Thymealeaf

Bien sûr, comme tout langague, Thymeleaf possède sa propre syntaxe. Toutefois, comme je vous l'expliquais précédement, cette syntaxe n'est pas compliqué et s'apprend très facilement dès que l'on a quelques connaissances en HTML. Vous comprendrez rapidement ce dont je parle en découvrant la syntaxe de Thymeleaf ;-) !

Voici un exemple simpliste d'une JSP afin de vous montrer comment la transformer en un superbe template Thymeleaf : [Thymeleaf vs JSP](http://www.thymeleaf.org/doc/articles/thvsjsp.html)

### Les attributs de base

Comme je l'expliquais auparavant, Thymeleaf s'intégre dans votre DOM pour y ajouter du comportement grâce à des attributs commencant par `th:....`. Ces attributs vont modifier ceux existants sur le noeud courant de votre DOM afin d'y ajouter ou de modifier le contenu de ceux-ci.

Grâce à ces petits attributs Thymeleaf, votre HTML va alors être rendu dynamique via les valeurs que vous avez défini dans votre modèle !

Pour bien commencer, voici une petite liste des principaux attributs qui vous seront bien utile :

* `th:text="${text}"` : Ecrit au sein du tag la variable `text` du modèle
* `th:if="${boolean}"` : Affiche le tag courant que si la condition est vérifiée
* `th:unless="${boolean}"` : Affiche le tag courant que si la condition n'est pas vérifiée
* `th:href="@{/path}"` : Remplace le tag href courant par la valeur de l'url (dans une balise `a`)
* `th:action="@{/path}"` : Idem que la balise `th:href` pour un formulaire
* `th:class="${cssClass}"` : Définie la classe CSS selon la variable cssClass
* `th:each="item : ${items}"` : Itère sur un tableau, une liste, une collection ou un iterator

Bien sûr, je ne cite ici que l'essentiel car il existe bien d'autres attributs qui vont différer pour chacuns des tags HTML existant. Toutefois, pour chaque attributs HTML, l'idée reste toujours la même !!
