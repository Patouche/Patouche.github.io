---
layout: post
title: Editor atom = new Editor();
category:
  - Divers
  - Editor
  - Linux
---

Bon, aujourd'hui, j'ai décidé de me faire ma page github.io. Pour y raconter quoi, je ne sais pas trop encore... On verra !! Mais en attendant de voir de quoi on va parler, voici une petite présentation sur Atom.

En tout cas, mon premier réflexe après le traditionnel *git clone* fut de faire un *vi*. Alors, oui, vi, c'est top. Vraiment ! Mais, vous le comprenez très certainement, vi pour faire tout ça, je me suis dit qu'il existait probablement un outils un peu plus adapté. Alors, j'ai réfléchi (sisi, ça m'arrive :-) ). De mes maigres connaissances en editeur, en excluant Vi, il restait le choix entre :

* WebStorm fait pas JetBrains (vous connaissez probablement le magnifique IntelliJ)
* Aptana (Probablement trop peu connu, il s'agit d'une sorte d'eclipse dédié au dev Python, Ruby, JavaScript, ...)
* Geany
* Gedit
* Nano (non, je déconne !)

Bon, on le sent bien mais la solution n'est pas dans la liste précédente.

> Ah, mais tu te rappelles pas cette news sur l'editeur *made in Github* ??

Oh oui !! En effet, ça me dit, quelque chose... Et me voilà sur la page du [site d'atom](http://atom.io) !! Un *.deb*, parfait !!

{% highlight bash %}
dpkg -i atom-amd64.deb
{% endhighlight %}

Et c'est parti !! Bon, quelques minutes plus tard et moyennant quelques menus ajustements, je lance Atom. Et on peut dire que je ne suis pas déçu !! C'est ... beau. OK, mais au dela de la beauté. Et bien, c'est assez fonctionnel.

Très léger, voici un liste des fonctionnalités de l'IDE :

* Intégration git (partiel - les fichiers modifiés apparaissent en vert - les fichiers ignorés en grisés)
* Léger et peu consommateur en mémoire (5 Mo dans la RAM)
* Visualisation markdown en temps réelle
* Raccouris clavier entièrement customizable
* Recherche de fichier en mode Eclipse (Ctrl + P ou Ctrl + T)
* (Re-)Formatage automatique d'un fichier
* Configuration de tout via l'édition de certains scripts

Donc, même après un temps aussi court d'utilisation, il est clair que Github est parvenu à réaliser un produit extrément séduisant. Les  !
