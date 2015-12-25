---
layout: post
title: A la découverte de Thymeaf !!
image: /assets/images/2015/11/
tags:
  - Database
  - Java
  - Maven
  - Testing
---

Ces dernières années, on nous a souvent parler d'Ember, de Backbone ou encore d'AngularJS pour réaliser sa couche de présentation... Certes, il est vrai que les SPA (Single Page Application) sont un peu l'avenir du développement front. Toutefois, il me semble important de ne pas oublier les autres solutions existantes. En effet, il arrive fréquement que l'on puisse nous demander de développer (ou d'intégrer) des pages htmls afin de réaliser un backoffice ou une petite application web très simple...

A ce moment là, sur une application Java, utiliser AngularJS ou l'une des autres solutions de SPA peut être assez contraignant et risque d'augmenter considérablement le temps de développement. Thymleaf et son intégration avec Spring MVC est alors la solution parfaite pour allier simplicité, facilité et rapidité ! D'ailleurs, à ce jour, il suffit de voir l'interêt de la solution pour comprendre que, pour qu'une application Spring & Thymeleaf est peut-être l'un des choix de demain !

// TODO : integrate google trends

Pas encore convaincu ?? Et bien, nous allons voir ensemble pourquoi Thymeleaf peut s'avérer être une solution de demain...

## Thymeleaf vs JSP & JSTL !!

*Battle start ...*

### ... ou pas !

En effet, entre de la JSP *old school* agrémenter de la JSTL ou Thymeleaf, il n'y a pas réelle comparaison... Personnellement, ma préférence va à Thymeleaf car cette solution nous apporte un réel avantage au niveau de la simplicité d'écriture du code HTML sur une application Spring MVC.

Si de temps en temps, vous écrivez de la JSP, vous devez probablement bien connaitre tous les tags de JSTL qui sont ajouté dans le code, sans compter, les imports ou .... pire, les functions que l'on peut créer directement au sein de sa vue ! Et oui, car pour rappel, les JSP (JavaServer Pages) sont compilés via le compilateur JSP et deviennent à la fin des servlets... Bref, même si bien souvent, on utilise les JSP comme des vues avec Spring MVC, il ne faut pas oublier d'où vient cette technologie et l'utilisation que l'on en fait dans nos applications Spring.

Ainsi, dans le cas d'une utilisation de Thymeleaf, il sera beaucoup plus aisé de visualiser les pages HTML dans le contenu d'un navigateur. En effet, Thymeleaf, est assez peu intrusif puisqu'il ne fait que s'ajouter au sein des tags HTML via des attributs qui lui sont propre. Si vous avec des pages HTML à intégrer, Thymeleaf est une solution faite pour vous car il suffira de rajouter les attributs afin de l'intégrer correctement avec Spring MVC.

En reprenant l'exemple du site de Thymeleaf, voici la comparaison entre la visualisation dans un browser d'une JSP et d'une page Thymeleaf :


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
* [SSP]()
* ...

Si à mon sens Thymeleaf est aujourd'hui une solution incontournable de par sa simplicité de mise en place et sa facilité d'écriture et de comprehension, il n'en résulte pas moins que certaines de ces solutions sont à surveiller avec attention !

En effet, comme on peut le voir sur le [benchmark](http://fr.slideshare.net/NLJUG/shootout-template-engines-on-the-jvm) réaliser par Jeroen Reijn, Thymeleaf apparait comme une solution assez peu performante face à ces concurrents.

// TODO

Toutefois, il ne faut pas s'arreter ! En effet, il est important de prendre en compte l'interet de l'outils parce que, Thymeleaf, reste un peu plus simple à utiliser que beaucoup de ses solutions.

Donc, en effet, si vous souhaitez faire un site public à fort traffic, Thymeleaf n'est peut-être pas la solution vers laquelle il faudra se tourner. Mais dans ce genre de cas, une solution de SPA est quand même peut-être une meilleur alternative à toute cette liste (Thymeleaf compris) !

## La syntaxe Thymealeaf

Bien sûr, comme tout langague, Thymeleaf possède sa propre syntaxe. Toutefois, comme je vous l'expliquais précédement, cette syntaxe n'est pas compliqué et s'apprend très facilement dès que l'on a quelques connaissances en HTML. Vous comprendrez rapidement ce dont je parle en découvrant la syntaxe de Thymeleaf ;-) !

Voici un exemple simpliste d'une JSP afin de vous montrer comment la transformer en un superbe template Thymeleaf

~~~~html
Write JSP
~~~~

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

### Les bonnes expressions Thymeleaf

Avec Thymeleaf, il existe, comme dans tous langagues, quelques expressions qu'il convient de maitriser afin d'avoir une bonne intégration au sein de son HTML.

A partir du controlleur suivant, voici un peu le résultat que cela donnerait en utilisant Thymeleaf.



et le modèle :

~~~~Java
public class Post {
    private Long id;
    private String title;
    private String content;
    private String author;
    public Post(Long id, String title, String content, String author) {
       /* Class constructor. */
    }
    // Setter & Getter
}
~~~~


#### Texte

|----------------------------+------------------------------------------------------------------|
| Template Thymeleaf         | Résultat                                                          |
|:--------------------------:|:----------------------------------------------------------------:|
| th:text="${content}"       |  |
|============================|==================================================================|

#### Conditions



#### URLs

|----------------------------+------------------------------------------------------------------|
| Template Thymeleaf         | SHA_256                                                          |
|:--------------------------:|:----------------------------------------------------------------:|
| 0000                       | 9AF15B336E6A9619928537DF30B2E6A2376569FCF9D7E773ECCEDE65606529A0 |
|============================|==================================================================|


### Customiser Thymeleaf ?


## Mise en place de Thymeleaf

Avant tout il parait

### Thymeaf & Spring-Boot

Dans le cas d'une nouvelle application, il est évident que Spring Boot se présente aujourd'hui comme un très bon socle technique afin de partir sur de bonne base pour développer son application. Avec Spring-Boot, le support de Thymeaf est natif et l'intégration encore plus aisée.

### Thymeaf & Spring-MVC


### Thymeaf & Play 2 ??

