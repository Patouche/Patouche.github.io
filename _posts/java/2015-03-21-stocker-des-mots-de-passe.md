---
layout: post
title: Stocker correctement des mots de passe
category:
  - Java
  - Spring
  - Jasypt
  - Security
  - spring-security
---


Un jour, il y a quelques temps désormais, au cours d'une discussion nocturne avec d'autres personnes (on devait bien être une quizaine dont la moitié était des développeurs), j'ai été un peu surpris d'avoir été le seul à *taper du point sur la table* à la suite d'un mail. Pour que vous compreniez bien ma réaction, voici un extrait de la conversation :

- *Mail* : Si ton mot de passe est inférieur à 8 caractères (ie : si ton mot de passe est "toto", le mot de passe que tu dois rentrer est toto#### - avec 4 caractères “#”)
- *Patouche* : Put\*\*\*, c'est vraiment n'importe quoi ! Comment ça nos mots de passe sont en clair dans la base ??
- *Personne 1* : Mais non, ils sont pas en clair. Ils sont cryptés evidement.
- *Personne 2* : Bah oui ! Heureusement qu'ils sont cryptés...
- *Patouche* : Ils peuvent être cryptés, m'en fou... Ils devraient être hashé !!
- *Developpeur 1* : Bah, oui, ils sont hashés ...
- *Developpeur 2* : Evidemment qu'ils sont pas en clair. C'est des algos de hashage derrière ! On sait ce que l'on fait...
- *Patouche* : Heu... *(akward silence)*

Stocker des mots de passe. On pourrait dire que c'est un sujet au combien classique. Et pourtant, des fois, il semblerait que peu de monde comprenne comment cela fonctionne. Dans ces cas là, un petit retour au base semble plus que necessaire pour bien comprendre ce qui se passe, ce que l'on fait et ce que cela implique derrière !!

Pour information, par rapport à la discussion précédement citée, je n'étais pas totalement à coté de la plaque malgré l'heure tardive... Les mots de passe étaient bien stockés en clair (même pas cryptés). Cependant, la curiosité d'en savoir plus m'a poussée à demander plus d'information à un ami qui travaille dans la sécurité (oui, ça fait très *Qui veut gagner des millions*). À cette occasion, j'ai découvert les [Rainbow table](http://fr.wikipedia.org/wiki/Rainbow_table) et le principe de chercher à casser soi-même ses propres mots de passe pour en vérifier la fiabilité.

## Connection à une application par un utilisateur

### Principe général

Vous avez un utilisateur que vous souhaitez authentifier sur votre application. Dans ce cas, le mot de passe se doit d'être hashé. Une fois appliqué la fonction de hashage, il sera alors théoriquement impossible de déterminer le mot de passe de départ. En effet, l'idée même des fonctions de hashage repose sur l'idée qu'il n'existe pas de fonction *inverse*.

Donc, au lieu stocker des mots de passe en clairs, il suffit de stocker leurs hashs dans la base de données. L'authentification repose ensuite sur la comparaison des 2 hashs. On parle aussi de la comparaison d'empreintes. Si, au cours de l'authentification, l'empreinte stockée en base correspond bien à l'empreinte fournit par l'utilisateur, alors, on pourra considérer que le mot de passe fournie est identique à celui stocké en base. Et pourtant, dans la base, il n'y a aucune mot de passe. Juste des hashs !!

Le principe d'enregistrement et de connection est en fait assez simple. Voici quelques schémas afin que vous puissiez bien comprendre le principe de fonctionnement décrivant respectivement :

* L'enregistrement d'un nouvel utilisateur
* La connection d'un utilisateur enregistré


![Enregistrement]({{ site.url }}/assets/images/2015/03/application-registration-principle.png){: .center }

Cela conclue la manière dont doit se passer l'enregistrement d'un nouvel utilisateur. L'étape de vérification de l'unicité de l'identifiant ne doit pas être négligée. En effet, nous verrons par la suite qu'il est necessaire pour la suite que l'utilisateur Bob ne soit enregistré qu'une seule fois. Dans une base de données SQL, cela doit se traduire par une contrainte d'unicité sur la colonne *identifiant* de votre table des utilisateurs.


![Connection]({{ site.url }}/assets/images/2015/03/application-connection-principle.png){: .center }

Voici donc le principe de connection d'un utilisateur à une application. Sur les schémas, la manière de procéder peut sembler évidente. Pourtant, quand on en discute avec d'autres personnes, il semblerait cela n'est pas *évident* pour tout le monde.


### Et en Java ?

Pour hashé un mot de passe en Java, il faut utilisé la classe `java.security.MessageDigest`. Seulement, voilà, comment instancié un `MessageDigest` ? En effet, pour récupérer une instance de cette classe, il convient de connaitre les algorithmes connu de la JVM. Pour cela, vous avec 2 choix :

* Soit chercher dans la [documentation Java](http://docs.oracle.com/javase/8/docs/technotes/guides/security/StandardNames.html#MessageDigest)
* Récuperer la liste des algorithmes que connait la JVM.

Pour récupérer la liste, des différents algorithmes, un petit *oneliner* Java 8 suffit :

{% highlight java %}
Arrays.stream(Security.getProviders()).forEach(
        p -> p.getServices().stream().filter(s -> "MessageDigest".equals(s.getType()))
                .map(Provider.Service::getAlgorithm)
                .forEach(System.out::println)
);
{% endhighlight %}

Une fois que vous avez la liste (qui finalement, ressemble très fortement à celle de la documentation), il vous faut créer une instance de `java.security.MessageDigest`. Pour réaliser cela, il suffit juste d'utiliser un `MessageDigest.getInstance(String)` en précisant l'algorithme que l'on souhaite utiliser derrière.

Ainsi, pour hasher *toto* avec un *SHA-256*, voici un peu à quoi ressemblerait le code :

{% highlight java %}
try {
    MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
    byte[] digest = messageDigest.digest("toto".getBytes(StandardCharsets.UTF_8));

    // Si vous souhaitez avoir une représentation hexa :

    // Avec Guava
    LOGGER.info("Hash of 'toto' = '{}' using the Guava", BaseEncoding.base16().encode(digest));

    // Avec les Apaches commons (commons-codec)
    LOGGER.info("Hash of 'toto' = '{}' using the Apache Commons", Hex.encodeHex(digest));
} catch (NoSuchAlgorithmException e) {
    throw new RuntimeException("Error during hash generation : ", e);
}
{% endhighlight %}

Et les quelques dépendances maven necesaire à la représentation Hexadécimal :
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

Et voici un peu les logs de ce petit exemple :
{% highlight bash %}
[INFO] [f.p.s.HashTest] Hash of 'toto' = '31F7A65E315586AC198BD798B6629CE4903D0899476D5741A9F32E2E521B6A66' using the Guava
[INFO] [f.p.s.HashTest] Hash of 'toto' = '31f7a65e315586ac198bd798b6629ce4903d0899476d5741a9f32e2e521b6a66' using the Apache Commons
{% endhighlight %}


### Etre manichéen ? Aimer le poivre et sel !!

// TODO

### The biggest breach !!

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

Enfin, pour finir sur ce point, il est très important de gardez en tête quelques choses de primordials. Les logs...


### Et les méchants de l'histoire ??

Bien sûr, quand il s'agit de sécurité, il faut toujours penser aux méchants de l'histoire. Car , à quoi peut-elle bien avoir accès ce cher Oscar ?


#### Un accès à la base ?

// TODO

#### Un accès à au serveur ?

Bon, autant vous le dire clairement, dans ce cas là, il reste plus grand chose à faire.

Brulez votre OS. Pleurer (mais non, faut pas ...). Reformater. Installer MacAffee (heu, non, ça aussi faut pas - :-) ). Changer vos mots de passe. Refaites votre config netfilter. Aller voir vos *gentils* gars du SI (parce que, si ça se trouve c'est uniquement votre faute). Rajouter `rkhunter`. Faites un audit de sécurité de votre appli. Liser vos /var/log/*.log. Essayer de comprendre ce qui s'est passé. Ce qui a été ouvert...

{% highlight bash %}
# Donne des stats sur un fichier, un dossier.
stat /etc/passwd
{% endhighlight%}

Et encore... En êtes vous conscients que *Oscar is in the place* ?

## Utilisation de spring-security

Désolé, je n'ai pas encore écrit cette partie.

TP (en cours d'écriture) : [Soat-secu-password](https://github.com/Patouche/soat-samples/tree/master/soat-parent-code/soat-secu-password)

{% highlight bash %}
git checkout tp-secu-1
{% endhighlight %}

## Mot de passe à une application distante

### Dans les properties

// TODO

{% highlight bash %}
git checkout tp-secu-2
{% endhighlight %}

### Dans la base de données

// TODO

{% highlight bash %}
git checkout tp-secu-3
{% endhighlight %}

## Quelques considérations mathématiques

Parce que, oui, j'aime bien les maths... Et parce que j'ai l'impression de trop peu en faire désormais :-) !!!
