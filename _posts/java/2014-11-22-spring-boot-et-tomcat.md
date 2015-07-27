---
layout: post
title: Lancer un spring boot dans un tomcat
category:
  - Java
  - Spring-boot
---

Pendant quelques temps, j'ai cherché à pouvoir bien mixer spring-boot, tomcat & déploiement automatique dans IntelliJ. La manipulation reste dans l'esprit spring-boot. En effet, rassurez-vous, ça n'a rien de très compliqué. Il existe d'ailleurs quelques articles à ce sujet sur le site de spring :

* http://spring.io/blog/2014/03/07/deploying-spring-boot-applications
* https://spring.io/guides/gs/spring-boot/
* http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#build-tool-plugins-maven-packaging

Considérons que notre point de départ est une application spring boot déjà existante. Partons d'un pom.xml déjà existant :

{% highlight xml %}

<?xml version="1.0"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"
         xmlns="http://maven.apache.org/POM/4.0.0">

    <modelVersion>4.0.0</modelVersion>

    <parent>
        <!-- Your parent or the spring-boot parent pom -->
    </parent>

    <artifactId>sample-webapp</artifactId>
    <packaging>jar</packaging>
    <name>Sample application</name>

    <dependencies>

        <!-- List of your dependencies -->

    </dependencies>

</project>

{% endhighlight %}

Et maintenant, en quelque lignes, nous pouvons transformer notre application en un war pour tomcat sans perdre la faciliter de lancement via une ligne de commande.

{% highlight xml %}

<?xml version="1.0"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"
         xmlns="http://maven.apache.org/POM/4.0.0">

    <modelVersion>4.0.0</modelVersion>

    <parent>
        <!-- Your parent or the spring-boot parent pom -->
    </parent>

    <artifactId>sample-webapp</artifactId>
    <packaging>war</packaging>
    <name>Sample application</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <boot.main.class>fr.patouche.samle.WebappInitializer</boot.main.class>
        <spring-boot.version>1.1.7.RELEASE</spring-boot.version>
        <springloaded.version>1.2.1.RELEASE</springloaded.version>
    </properties>

    <build>
        <finalName>obs-webapp</finalName>
        <plugins>
            <!-- Don't fail when there is no web.xml -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>${maven-war.version}</version>
                <configuration>
                    <failOnMissingWebXml>false</failOnMissingWebXml>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>${spring-boot.version}</version>
                <dependencies>
                    <dependency>
                        <groupId>org.springframework</groupId>
                        <artifactId>springloaded</artifactId>
                        <version>${springloaded.version}</version>
                    </dependency>
                </dependencies>
                <configuration>
                    <mainClass>${boot.main.class}</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

    <dependencies>
        <!-- List of your dependencies -->
    </dependencies>

</project>

{% endhighlight %}

De plus, dans votre classe d'initialisation (celle contenant votre méthode *main*), il convient d'ajouter le code suivant :


{% highlight java %}
@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }

}
{% endhighlight %}

Et le tour est joué !! Pour plus d'information, voici une page qui pourrait vous aidez : [http://docs.spring.io/spring-boot/docs/current/reference/html/howto-traditional-deployment.html](http://docs.spring.io/spring-boot/docs/current/reference/html/howto-traditional-deployment.html)

Attention tout de même. Vous pourrez rencontrer des problèmes avec des dépendances apportées par votre tomcat (par exemple, votre driver jdbc, l'api servlet, ...). Donc, soyez tout de même prudent quant au war que vous générez.

Dans tous les cas, pensez à bien exploser votre war généré afin de vérifier ce qu'il contient et comment il a été packagé.

Happy coding !!
