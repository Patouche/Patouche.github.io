---
layout: post
title: Stocker correctement des mots de passe
category:
  - Java
  - Jasypt
  - Security
---


Un jour, il y a quelques temps désormais, au cours d'une discussion nocturne avec d'autres personnes (on devait bien être une quizaine dont la moitié était des développeurs), j'ai été un peu surpris d'avoir été le seul à *taper du point sur la table* à la suite d'un mail. Pour que vous compreniez bien ma réaction, voici un extrait de la conversation :

- *Mail* : Si ton mot de passe est inférieur à 8 caractères (ie : si ton mot de passe est "toto", le mot de passe que tu dois rentrer est toto#### - avec 4 caractères “#”)
- *Patouche* : Put\*\*\*, c'est vraiment n'importe quoi ! Comment ça nos mots de passe sont en clair dans la base ??
- *Personne 2* : Bah oui ! Heureusement qu'ils sont cryptés...
- *Personne 1* : Mais non, ils sont pas en clair. Ils sont cryptés evidement.
- *Patouche* : Ils peuvent être cryptés, m'en fou... Ils devraient être hashés !!
- *Developpeur 1* : Bah, oui, ils sont hashés ...
- *Developpeur 2* : Evidemment qu'ils sont pas en clair. C'est des algos de hashage derrière ! On sait ce que l'on fait...
- *Patouche* : Heu... *(akward silence)*

Stocker des mots de passe. On pourrait dire que c'est un sujet au combien classique. Et pourtant, des fois, il semblerait que peu de monde comprenne comment cela fonctionne. Dans ces cas là, un petit retour au base semble plus que nécessaire pour bien comprendre ce qui se passe, ce que l'on fait et ce que cela implique derrière !!

Pour information, par rapport à la discussion précédement citée, je n'étais pas totalement à coté de la plaque malgré l'heure tardive... Les mots de passe étaient bien stockés en clair (même pas chiffré - car oui, le bon terme est chiffré). Cependant, la curiosité d'en savoir plus m'a poussée à demander plus d'information à un ami qui travaille dans la sécurité (oui, ça fait très *Qui veut gagner des millions*). À cette occasion, j'ai découvert les [Rainbow table](http://fr.wikipedia.org/wiki/Rainbow_table) et le principe de chercher à casser soi-même ses propres mots de passe pour en vérifier la fiabilité.

## Penser *Sécurité* ...

Quand il s'agit de mot de passe, en effet, il faut penser sécurité. Mais avant de penser sécurité, il convient de définir ce qu'est un mot de passe.

### Types de mot de passe & sécurité des données

En effet, on peut distinguer 2 types de mots de passe :

* Un mot de passe utilisateur
* Un mot de passe pour une application distante

Pourquoi distinguer ces *types* de mot de passe ? Et bien tout simplement car il ne faut les traiter de la même manière. Dans le premier cas, personne mis à part l'utilisateur n'a à connaitre le mot de passe. Dans le second cas, c'est l'application (et les administateurs de celle-ci) qui se doit de connaitre le mot de passe.

La sécurité des données sur ces différents types de mots de passe est essentielle. A aucun moment il ne faut la négliger. En fait, pour être tout à fait plus précis, il faut l'intégrer dès le départ d'un projet et y penser pendant toute la vie de celui-ci. Repousser l'échéance pour le faire à la fin et vous risquez malheureusement de le faire trop vite, d'en oublier des bouts ou pire, de ne pas le faire du tout.

Dans tous les cas, il est important de ne pas oublier qu'aucun mot de passe n'est *incassable*. Bien sûr, certains le sont plus facilement que d'autres. En effet, par *brute force*, n'importe quel mot de passe peut tomber. Cependant, il faut comprendre que certains sont plus facile que d'autres à trouver. Un nom commun ou une chaine comme `azerty` peut tomber en quelques secondes alors que `Jak\{W%A1c~PR^o$QCn4k=M` mettra bien plus de temps ! Pour plus de détails sur ces types d'attaques, je vous invite à suivre les liens suivants :

* brute force TODO
* dictionnaire TODO

### Sécurité des accès

Généralement, en cryptographie, l'attaquant s'appelle toujours Oscar. Cependant, Oscar n'est personne en particulier et tout le monde à la fois. Oscar peut désigner à la fois :

* Un administrateur du système
* Une personne n'aimant pas votre application
* Un groupe de personne dont le but vous est inconnu (ou pas)

La question essentielle à se poser alors est :

A quoi donc Oscar a-t-il bien pu avoir accès
{: .question }

Il convient de différencier différents cas. Mais peu importe la situation, ne rester pas à ne rien faire. Votre bâteau prend l'eau ! Après avoir écopé, il serait bon de colmater la brêche afin que ce genre de chose ne se reproduise pas.

#### Accès au serveur de base de données :

Clairement, vous êtes dans le cas le moins pire. Oscar n'a eu finalement qu'un accès assez *limité*. Bon, d'accord, il a ainsi pu récupérer l'intégralité de votre base. Cependant, les dégâts peuvent resté *relativement* limités en fonction de ce que votre base contenait.

Par la suite, on se placera dans ce cas ci uniquement. En effet, dans les autres cas les possibilités de vous *faire du mal* pouvant être assez variées.

#### Accès au serveur applicatif :

Détailer ce qu'Oscar aurait pu faire serait assez long. Je ne vais pas rentrer dans les détails mais Oscar a pu faire plein de choses ! Voici quelques exemples parmi les pires de ce qu'Oscar aurait pu  faire :

#### Accès au système :

Bon, autant vous le dire clairement, dans ce cas là, il reste plus grand chose à faire.

Brulez votre OS. Pleurer (mais non, faut pas ...). Reformater. Installer MacAffee (heu, non, ça aussi faut pas - :-) ). Changer vos mots de passe. Refaites votre config `netfilter`. Aller voir vos gentils gars du SI (parce que, si ça se trouve c'est uniquement votre faute). Rajouter `rkhunter`. Utiliser `stat` sur vos fichiers critiques. Faites un audit de sécurité de votre appli. Liser vos `/var/log/*.log`. Essayer de comprendre ce qui s'est passé, ce qui a été ouvert,... Bref, essayer de faire en sorte que cela ne se reproduise pas.

Et encore... En êtes vous conscients qu'*Oscar is in the place* ?

## Mot de passe utilisateur

### Principe d'une fonction de hachage

// TODO

### Les algos de la JVM

Pour hasher un texte en Java, il faut utiliser la classe `java.security.MessageDigest`. Mais comment utiliser `MessageDigest` ? Et bien, il faut commencer par connaitre les algorithmes proposé par la JVM. Pour cela, vous avec 2 choix :

* Chercher dans la [documentation Java](http://docs.oracle.com/javase/8/docs/technotes/guides/security/StandardNames.html#MessageDigest)
* Récuperer la liste des algorithmes que connait la JVM.

En fait, cette liste peut facilement être retrouvée avec un petit *oneliner* Java 8 :

{% highlight java %}
Arrays.stream(Security.getProviders())
        .flatMap(p -> p.getServices().stream())
        .filter(s -> "MessageDigest".equals(s.getType()))
        .map(Provider.Service::getAlgorithm)
        .forEach(System.out::println);
);
{% endhighlight %}

Comme on peut le constater, cette liste ressemble très fortement à celle de la documentation.

Ensuite, la création d'une instance de `java.security.MessageDigest` se fait facilement en utlisant `MessageDigest.getInstance(String)` et en précisant l'algorithme que l'on souhaite utiliser derrière.

Ainsi, pour hasher `toto` avec un *SHA-256*, voici un peu à quoi ressemblerait le code :

{% highlight java %}
package fr.patouche.soat;

import java.nio.charset.StandardCharsets;
import java.security.*;
import java.util.Arrays;

import com.google.common.io.BaseEncoding;
import org.apache.commons.codec.binary.Hex;
import org.junit.Test;
import org.slf4j.*;

public class HashTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(HashTest.class);

    @Test
    public void hashToto() throws Exception {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        byte[] digest = messageDigest.digest("toto".getBytes(StandardCharsets.UTF_8));
        // Représentation Hexa avec Guava
        LOGGER.info("Hash of 'toto' = '{}' using the Guava", BaseEncoding.base16().encode(digest));
        // Représentation Hexa avec les Apaches Commons (commons-codec)
        LOGGER.info("Hash of 'toto' = '{}' using the Apache Commons", Hex.encodeHexString(digest));
    }
}
{% endhighlight %}

Produira les logs suivant :

{% highlight bash %}
[INFO] [f.p.s.HashTest] Hash of 'toto' = '31F7A65E315586AC198BD798B6629CE4903D0899476D5741A9F32E2E521B6A66' using the Guava
[INFO] [f.p.s.HashTest] Hash of 'toto' = '31f7a65e315586ac198bd798b6629ce4903d0899476d5741a9f32e2e521b6a66' using the Apache Commons
{% endhighlight %}

Afin que l'exemple soit un peu plus parlant, j'y ai ajouté une représentation hexadécimal du tableau de bytes renvoyés par `MessageDigest.digest(byte[])`. Pour faire cela, voici les quelques dépendances maven necesaires :

{% highlight xml %}
<!-- Guava -->
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>18.0</version>
</dependency>
<!-- Apache commons -->
<dependency>
    <groupId>commons-codec</groupId>
    <artifactId>commons-codec</artifactId>
    <version>1.10</version>
</dependency>
{% endhighlight %}

### Les limites des hashs

Malgré votre politique de sécurité, Oscar a eu un accès complet à votre base, à la liste de tous vos utilisateurs, à leur mots de passe ainsi que leur adresse mail. Si vous avez bien hashé les mots de passe de vos utilisateurs, voici ce qu'Oscar a pu voir :

|----+-------+-------------------+------------------------------------------------------------------|
| ID | LOGIN | EMAIL             | PASSWORD                                                         |
|:--:|:-----:|:-----------------:|:----------------------------------------------------------------:|
| 1  | bob   | bob@example.com   | 2BD806C97F0E00AF1A1FC3328FA763A9269723C8DB8FAC4F93AF71DB186D6E90 |
| 2  | alice | alice@example.com | 81B637D8FCD2C6DA6359E6963113A1170DE795E4B725B84D1E0B4CFD9EC58CE9 |
| 3  | carol | carol@example.com | F2D81A260DEA8A100DD517984E53C56A7523D96942A834B9CDC249BD4E8C7AA9 |
| 4  | hugo  | hugo@example.com  | A23FAA7DFE648A785268264081AB85965FA3893109731F484EE42D8A8467ABB8 |
|====|=======|===================|==================================================================|
{: .table .table-bordered}

Au moins, Oscar ne peut pas lire en clair les mots de passe de vos utilisateurs. Déjà une bonne chose pour vos utilisateurs. Mais jusqu'où ce système est-il fiable ?

En effet, il peut exister différents types d'attaque afin de tenter de trouver le mot de passe d'origne de Bob, Alice, Carol. Par exemple, en utilisant des *lookup table* ou *table de hachage*, on peut probablement trouver quelques mots de passe. En effet, imaginé que l'on s'amuse à coté de la table `APP_USER` de faire une table `LOOKUP_TABLE` comme suit :

|----------------------+------------------------------------------------------------------|
| PASSWORD             | SHA_256                                                          |
|:--------------------:|:----------------------------------------------------------------:|
| 0000                 | 9AF15B336E6A9619928537DF30B2E6A2376569FCF9D7E773ECCEDE65606529A0 |
| abnégation           | 54C7FA4FA09F035C3099DF4F75B92D9FDA01B0930FCB467B6DE6B194E33FC8BF |
| azerty               | F2D81A260DEA8A100DD517984E53C56A7523D96942A834B9CDC249BD4E8C7AA9 |
| fleurs               | A23FAA7DFE648A785268264081AB85965FA3893109731F484EE42D8A8467ABB8 |
| test                 | 9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08 |
| ....                 | ...                                                              |
|======================|==================================================================|
{: .table .table-bordered}

Dans notre cas, et pour ne pas avoir trop de données, j'ai utilisé une table de hachage remplie à l'aide d'un dictionnaire en *lowercase*. Normalement, une table de hachage n'est pas constitué à partir de ce type d'enregistrement mais le nombre de données à considérer étant considérable, cette solution est reste accepatable.

Que ferait donc la requête SQL suivante ?
{: .question }

{% highlight sql %}
select
    u.LOGIN,
    l.PASSWORD
from
    APP_USER as u
    join LOOKUP_TABLE as l on l.SHA_256 = u.PASSWORD
;
{% endhighlight %}

Et bien, vous l'avez probablement compris mais Oscar connait désormais le mot de passe de Carol et d'Hugo !!

Il est à noté que, si vous aviez une politique de sécurité de mot de passe, vous n'auriez pas du accepter du tout des mots de passe aussi simple que *fleurs* ou *azerty*. En effet, il est tout à fait possible de demander à vos utilisateurs de n'utiliser que des mots de passe respectant les contraintes suivantes :

* Plus de 10 caratères
* Au moins 1 majuscule
* Au moins 1 minuscule
* Au moins 2 chiffres
* Au moins 2 caractères spéciaux

Les mots de passe comme *fleurs* ou *azerty* n'aurait pas pu être utilisé et la table précédente aurait ainsi été un peu plus difficile à construire...

### Etre manichéen ? Aimer le poivre et sel !!

Comme vous l'avez vu dans le précédent exemple, les mots de passe hashés ne sont pas toujours suffisant à assurer une bonne sécurité de notre application car il semble tout de même assez simple de casser certains de mots de passe utilisateur.

Pour contrer cela, il existe une solution : **le grain de sel**

L'idée du grain de sel est de concaténer le mot de passe avec un autre mot. L'idée est donc d'avoir la chaine suivante

{% uml %}

title Utilisation d'un grain de sel

(*) -right-> Mot de passe
note top
    Le mot de passe est en clair
end note

-right-> Password + Salt
note top
    Concaténation - en clair
end note

-right-> hash (Password + Salt)
note top
    Hash de la concanénation  
end note

-right-> (*)

{% enduml %}



Cependant, attention !! Comme il y a le bon et le mauvais chasseur, il y a le bon et le mauvais saleur. Seulement, là, on peut facilement dire pourquoi un *salage* est mauvais.



## Mot de passe à une application distante

### Principe de l'encryption

// TODO

{% highlight bash %}
git checkout tp-secu-2
{% endhighlight %}

### Stockage dans une base de données

// TODO

{% highlight bash %}
git checkout tp-secu-3
{% endhighlight %}

## The biggest breach !!

Bien sûr, il faut être conscient que la fiabilité de cette méthode repose sur 2 choses :

* La fiabilité de l'algorithme de hash utilisé.
* Les compétences du développeur.

Et bien en effet, la plus grosse faille est généralement l'interface chaise clavier ! Et oui, quand on se tente à vouloir faire de la sécurité, les lacunes se situent souvent au niveau de la compétence et des connaissances du développeur en terme de sécurité.

Voici donc une liste des choses auxquelles il faut bien faire attention quand on commence à faire ce genre de choses :

* Ne pas négliger vos utilisateurs et se dire *plus tard*.
* Ne pas avoir de logs tout pourri dans votre application.
* Toujours se poser des questions.

Pour la fiabilité de l'algorithme de hash, on considère aujourd'hui le MD5 comme trop facile à casser car on y a découvert des collisions il y a désormais quelques temps. Donc, tourner vous plutôt vers les nouveux algorithmes existant tels que :

* le SHA-2 : SHA-256 / SHA-512
* le SHA-3 : La nouvelle version du SHA (*Secure Hash Algorithm*)
* Whirlpool
* ...

Pour une liste plus complète, voici un article de wikipedia pouvant peut-être vous aider : [Comparison of cryptographic hash functions](http://en.wikipedia.org/wiki/Comparison_of_cryptographic_hash_functions)

De plus, attention, quand vous vous serez fixé sur une solution, il sera très difficile de changer votre algorithme en cours de route !! En effet, si vous souhaitez faire cela, vous devrez demandé à chacun de vos utilisateurs de réinitialiser leurs mots de passe et bizarrement, cela risque de faire assez peu d'heureux !

Enfin, pour finir sur ce point, il est très important de gardez en tête quelques choses de primordials : les logs...
