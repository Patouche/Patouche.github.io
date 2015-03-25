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

{% uml %}

title Enregistrement - Dans une application

actor User as "Bob"
participant App as "Application"
database DB as "Database"

note right User
    Comme Bob aime beaucoup votre application et Alice,
    il a décidé de s'enregistrer sur votre application avec
    le couple (identifiant = "Bob", mot de passe = "Alice")
end note

User -> App : Bob envoie un couple (identifiant, mot de passe) pour créer son compte\n[Bob/Alice]
App -> DB : Recherche de l'utilisateur par identifiant fournit\n[Bob]
DB -> App : La base retourne le nombre d'utilisateur "Bob" présent dans la base.

note right App
    En effet, on peut très bien se limiter au nombre d'utilisateur présent
    au lieu de retourner directement toutes la ligne.
end note

alt Un utilisateur "Bob" est présent dans la base

    App -> User : Un autre utilisateur est déjà enregistré avec l'identifiant "Bob"

else Aucun utilisateur "Bob" dans la base

    App -> App : Le mot de passe est hashé.\n[hash(Alice) = 3bc51....a3043]
    App -> DB : Enregistrement dans la base le couple (identifiant, hash(mot de passe))\n[Bob/3bc51....a3043]
    App -> User : L'utilisateur avec l'identifiant "Bob" a bien été créé

end

{% enduml %}{: .center }

Cela conclue la manière dont doit se passer l'enregistrement d'un nouvel utilisateur. L'étape de vérification de l'unicité de l'identifiant ne doit pas être négligée. En effet, nous verrons par la suite qu'il est necessaire pour la suite que l'utilisateur Bob ne soit enregistré qu'une seule fois. Dans une base de données SQL, cela doit se traduire par une contrainte d'unicité sur la colonne *identifiant* de votre table des utilisateurs.

{% uml %}

title Connection - Dans une application

actor User as "Bob"
participant App as "Application"
database DB as "Database"

note right User
    Bob checher à se connecter à l'application.
    Mais il n'est plus tout à fait sur du mot de passe utilisé.
end note

User -> App : L'utlisateur "Bob" demande à se connecter avec un mot de passe XXXX

App -> DB : Recherche de l'utilisateur par l'identifiant fournit par l'utilisateur\n[Bob]
DB -> App : Retourne la ligne de la table des utilisateurs filter par l'identifiant fourni\n[Bob]

alt Il n'y a pas d'utilisateur "Bob" dans la base de données

    App -> User : Il n'a pas été possible d'identifier "Bob"

else Il y a un utilisateur "Bob" dans la base de données

    note right App
        En toute logique, selon le principe de connection précédent,
        il ne peut y avoir au plus qu'un seul utilisateur "Bob" dans la base
        de données. La contrainte d'unicité nous assure de cela.
    end note

    App -> App : Le mot de passe est hashé.\n[hash(XXXX) = ....]

    alt hash(mot de passe) == hash base de données

        App -> App : Création de la session utilisateur
        App -> User : "Bob" est désormais identifié.

    else dans tous les autres cas

        note right App
            En réalité, Bob a fournit un mauvais mot de passe.
            Si son mot de passe avait été correcte, les hash auraient été identique.
        end note

        App -> User : Il n'a pas été possible d'identifier "Bob"

    end

end

{% enduml %}{: .center }

Voici donc le principe de connection d'un utilisateur à une application. Sur les schémas, la manière de procéder peut sembler évidente. Pourtant, quand on en discute avec d'autres personnes, il semblerait cela n'est pas *évident* pour tout le monde.


### Les algos de hash de la JVM

// TODO

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

Brulez votre OS. Pleurer (mais non, faut pas ...). Reformater. Installer MacAffee (heu, non, ça aussi faut pas - :-) ). Changer vos mots de passe. Refaites votre config netfilter. Aller voir vos *gentils* gars du SI (parce que, si ça se trouve c'est votre faute). Rajouter `rkhunter`. Faites un audit de sécurité de votre appli. Liser vos /var/log/*.log. Essayer de comprendre ce qui s'est passé. Ce qui a été ouvert...

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
