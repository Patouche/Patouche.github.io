---
layout: post
title: Spring-boot in a nutshell
category:
  - Java
  - Spring-boot
  - Maven
---

Il y a désormais quelques temps, un simple [tweet](https://twitter.com/rob_winch/status/364871658483351552) a fait du bruit dans le monde Java & dans le monde du web. Dans ce tweet, tiens toute la philosophie spring-boot une application Java en moins de 140 caractères !!

> Quoi une application Java dans un tweet ??

Et oui, avec spring-boot c'est possible !! Cependant, pour un developpeur normalement constitué, on a souvent envie d'aller un peu plus loin que le [Hello world](http://www.commitstrip.com/en/2013/09/20/hello-world-ne-suffit-pas/).

Alors, comment mettre en place une application spring-boot facilement ?

Bon, vous avez très probablement lu 42 manière de faire une *todo list*. Même si l'exemple est souvent très éducatif, il en devient quelque peu lassant à force. Donc, pour l'exemple, nous partirons sur un projet factice (ou pas) un peu plus attrayant : un petit *réseau social d'entreprise*.

Pour commencer un projet spring-boot, il y a 2 philosophies qui se respectent chacune. L'une commencant par un `touch pom.xml`. L'autre par un `mvn archetype:generate`. Franchement, il est difficile d'appliquer la seconde sans connaitre la première (à moins de se limiter au *Hello World*)... Et vice-versa.

Si l'on lance la commande cité précédement, voici le résultat :

{% highlight bash %}
$ mvn archetype:generate | grep 'org.springframework.boot'
1099: remote -> org.springframework.boot:spring-boot-sample-actuator-archetype (Spring Boot Actuator Sample)
1100: remote -> org.springframework.boot:spring-boot-sample-actuator-log4j-archetype (Spring Boot Actuator Log4J Sample)
1101: remote -> org.springframework.boot:spring-boot-sample-actuator-noweb-archetype (Spring Boot Actuator Non-Web Sample)
1102: remote -> org.springframework.boot:spring-boot-sample-actuator-ui-archetype (Spring Boot Actuator UI Sample)
1103: remote -> org.springframework.boot:spring-boot-sample-amqp-archetype (Spring Boot AMQP Sample)
1104: remote -> org.springframework.boot:spring-boot-sample-aop-archetype (Spring Boot AOP Sample)
1105: remote -> org.springframework.boot:spring-boot-sample-batch-archetype (Spring Boot Batch Sample)
1106: remote -> org.springframework.boot:spring-boot-sample-data-jpa-archetype (Spring Boot Data JPA Sample)
1107: remote -> org.springframework.boot:spring-boot-sample-data-mongodb-archetype (Spring Boot Data MongoDB Sample)
1108: remote -> org.springframework.boot:spring-boot-sample-data-redis-archetype (Spring Boot Data Redis Sample)
1109: remote -> org.springframework.boot:spring-boot-sample-data-rest-archetype (Spring Boot Data REST Sample)
1110: remote -> org.springframework.boot:spring-boot-sample-integration-archetype (Spring Boot Integration Sample)
1111: remote -> org.springframework.boot:spring-boot-sample-jetty-archetype (Spring Boot Jetty Sample)
1112: remote -> org.springframework.boot:spring-boot-sample-profile-archetype (Spring Boot Profile Sample)
1113: remote -> org.springframework.boot:spring-boot-sample-secure-archetype (Spring Boot Security Sample)
1114: remote -> org.springframework.boot:spring-boot-sample-servlet-archetype (Spring Boot Servlet Sample)
1115: remote -> org.springframework.boot:spring-boot-sample-simple-archetype (Spring Boot Simple Sample)
1116: remote -> org.springframework.boot:spring-boot-sample-tomcat-archetype (Spring Boot Tomcat Sample)
1117: remote -> org.springframework.boot:spring-boot-sample-traditional-archetype (Spring Boot Traditional Sample)
1118: remote -> org.springframework.boot:spring-boot-sample-web-jsp-archetype (Spring Boot Web JSP Sample)
1119: remote -> org.springframework.boot:spring-boot-sample-web-method-security-archetype (Spring Boot Web Method Security Sample)
1120: remote -> org.springframework.boot:spring-boot-sample-web-secure-archetype (Spring Boot Web Secure Sample)
1121: remote -> org.springframework.boot:spring-boot-sample-web-static-archetype (Spring Boot Web Static Sample)
1122: remote -> org.springframework.boot:spring-boot-sample-web-ui-archetype (Spring Boot Web UI Sample)
1123: remote -> org.springframework.boot:spring-boot-sample-websocket-archetype (Spring Boot WebSocket Sample)
1124: remote -> org.springframework.boot:spring-boot-sample-xml-archetype (Spring Boot XML Sample)
{% endhighlight %}

Bon, dans notre application, on va devoir avoir les éléments suivants :

* Une base de données
* Des JSP ou tout autre système de template
* Et pour le reste, on verra plus tard...

L'archetype `spring-boot-sample-data-jpa-archetype` semble bien correspondre à nos besoins. Donc, il est évident que comme point de départ, ça semble pas mal !!

{% highlight bash %}
$ mvn archetype:generate \
    -DarchetypeGroupId=org.springframework.boot \
    -DarchetypeArtifactId=spring-boot-sample-data-jpa-archetype \
    -DgroupId=fr.patouche.netco \
    -DartifactId=netco \
    -Dversion=1.0.0-SNAPSHOT \
    -DinteractiveMode=false
{% endhighlight %}

Après avoir fait cela, qu'est ce que ça peut bien donné à la compilation ?? Et bien, après un petit `mvn install`, on se rend tout de suite compte qu'il y a des tests... Alors, qu'est ce que ça donne si on lance le tout ??

> Et d'ailleurs, comment on lance une appli spring boot ??

Et bien, comme c'est dans la philosophie spring-boot, c'est très simple. Au choix vous pouvez faire :

{% highlight bash %}
$ java -jar $VOTRE_JAR$
$ mvn spring-boot:run
{% endhighlight %}

Et comme par magie vous verrez votre application démarrer avec déjà quelques données en mémoire !

Bon, ok, c'est joli mais pour le moment il manque tout la couche templating ... Spring-boot propose une intégration facile avec différents frameworks. Au choix, on peut intégrer rapidement :

* Groovy
* Velocity
* Freemarker
* Thymeleaf

Bon, pour l'exemple, j'ai choisi Thymeleaf. Pourquoi ? Parce que je trouve que c'est un système de templating assez sympa. Bien sur, on est pas obligé et on peut tout à fait faire une couche REST et du AngularJS au dessus. Si vous souhaitez partir la dessus, je vous recommande fortement de tester le très bon projet [jhipster](https://jhipster.github.io/) créer par Julien Dubois.

Bon, revenons à Thymeleaf et à comment l'intégrer dans cette application :

// TO FINISH

A vous de customiser un peu cette application pour en faire un vrai réseau social d'entreprise.
