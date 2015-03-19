---
layout: post
title: "Petites manipulations d'openssl, keytool & others things"
category:
  - Security
  - Linux
---

Alors, je me suis posé une question récemment. Certes un peu bête comme question. Mais suis je vraiment le seul a me sentir un peu perdu quand on me place dans une même phrase "java", "openssl" et "certificats"

> Alors, suis-je vraiment le seul à être un peu pommé sur ce point ??

En fait, je me suis rendu compte que non. Bon, pour être honnête, ca m'a un peu rassuré mais pas tant que ça en réalité. De ces quelques mots là découlent souvent un autre mot. Le "keytool". Et "A tes souhaits" n'est pas la bonne réponse !!


## Généralités en matière de sécurité

### Dénomination...

Aujourd'hui, on parle encore beaucoup de SSL qui est l'acronyme pour Secure Sockets Layer. Cependant, il est bon de noté que SSL est un peu "mort" et a été remplacé par TLS qui est lui l'acronyme pour *Transport Layer Security*.

Dans la pratique (et surtout dans la théorie), ca ne change pas grand chose. Cependant, si on voulait être précis, il faudrait désormais utiliser le terme TLS à la place de SSL dans notre vocabulaire.

Par abus de langague, j'utiliserais dans la suite de cette article SSL bien souvent... Et oui, à l'oreille, ça fait plus de sens !

### A quoi ça sert ?

Alors, quand j'ai commencé à bossé sur ce point, il fallait un petit retour aux basiques. A quoi donc ça peut bien servir le SSL ?

De manière générale, on pourrait dire que SSL fournit un tunnel de communication sécurisé entre un client et un serveur. Bien sûr, cela n'est pas faux mais il faut rentrer dans les détails pour bien comprendre les différentes fonctionnalités derrière SSL.

Donc, pour faire simple, voici ce que permet SSL :

* *Authentification* : Il permet de s'assurer de l'identité du serveur avec qui on dialogue.
* *Intégrité* : Les données échangées sont vérifiées afin d'éviter toutes modifications de ces données lors de l'échange.
* *Confidentialité* : Les données circulent sur le réseau de manière indéchiffrable pour les personnes ne participant à l'échange.
* *Authentification (the return)* : Le serveur peut parfois demander au client de s'authentifier afin d'assurer au serveur l'identité du client avec qui il communique. Bien sûr, il s'agit d'une fonctionnalité totalement optionnelle.

Pour réalisé un échange avec SSL, il faut bien entendu utiliser un programme qui se placera de façon transparente au sein de la couche TCP/IP. Pour cela il existe différentes solutions mais la plus connu porte le nom d'OpenSSL. Pour une liste complètes des différentes solutions du marché, vous pouvez consulter la page suivante : [Comparison of TLS implementations](http://en.wikipedia.org/wiki/Comparison_of_TLS_implementations)

OpenSSL est Open Source et permet de réaliser une communication utilisant SSL afin de garantir les différents points précédents. Aujourd'hui, il s'est imposé comme un standard du marché.

Alors, dans le débat futile Open Source vs Propriétaire (oui, futile car on sait bien que le modèle Open Source est largement supérieure), certains pourraient croire que le fait qu'OpenSSL soit Open Source est problématique. En fait, c'est une croyance erronée en grande partie causée par une méconnaissance totale de "*comant ke ça marche*". L'avantage de ce logiciel réside dans la force des clefs créées bien plus que dans l'ouverture du code.

### Et dans une communication ?

Voyons un peu comment se passe un échange dans le cas où la communication utilise TLS (oui, oui, on ne peut pas parler de SSL). En fait, l'essentiel de la problématique consiste à se comprendre entre le client et le serveur. C'est donc à l'initialisation de la communication que l'essentiel du travail est fait. Dans la RFC de TLS, on appelle cela une *handshake* (comprendre poignée de main comme quand on dit bonjour en arrivant dans le bureau).

{% uml %}
Client -> Server : ClientHello : le client envoie un HELLO message
note right
    Informations contenus dans le message :
    * **Protocol version** : la version maximale du protocole que le client supporte
    * **ClientHello.random** : un numéro aléatoire
    * **Session ID** : l'id de de session (cette id pourra être réutilisé plus tard)
    * **Cipher Suite** : une liste de "cipher suites" que le client connait
    * **Compression Method** : une liste d'algorithme de compression que le client connait
end note

Client <- Server : ServerHello : le serveur répond au client part un HELLO message
note right
    Informations contenus dans le message :
    * **Protocol version** : la version du protocole que le client et le serveur utiliseront
    * **ServerHello.random** : un numéro aléatoire
    * **Session ID** : l'id de session de la connection
    * **Cipher Suite** : le cipher suite qui sera utilisé
    * **Compression Method** : l'algorithme de compression utilisé
end note

Client <- Server : Certificate : le serveur envoie au client son certificat
note right
    Ce certificat envoyé par le serveur contient sa clef publique. Cette clé publique sera
    par la suite utilsé pour crypté certains messages envoyé par le client au serveur.
end note

Client <- Server : Certificate Request
Client <- Server : ServerKeyExchange
Client <- Server : Server HELLO DONE
Client -> Server : Certificate
Client -> Server : Client Key Exchange
Server -> Server : Certificate Verify
Client -> Server : Change Cipher Spec
Client -> Server : Client Finished
Client <- Server : Change Cipher Spec
Client <- Server : Server Finished
Client <-> Server : Application data
{% enduml %}

### OpenSSL

{% highlight bash %}
man openssl
{% endhighlight %}

> Bah, à première vu, ça a l'air simple, non ??...

Et bien en fait pas tant que ça... Surtout si on part d'assez bas et que l'on y comprend pas forcément grand chose à comment tout cela interagit.

## Manipulation basique openssl

### Création d'une clef privée

### Création d'un certificat
