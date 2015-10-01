---
layout: post
title: Les fichiers & les tests unitaires
tags:
  - Java
  - Testing
---

La gestion des fichiers dans les tests unitaires a toujours été un sujet a traiter avec précaution. En effet, après l'execution d'un test unitaire, il convient de laisser le système dans un état identique à celui de départ. Pourquoi cela ? A mon avis, il y a 2 raisons essentielles à cela :

* Etre répétable à l'infini.
* Etre propre vis à vis du système

En effet, considérons que l'on cherche à tester une création de fichier. Si à la fin de l'execution du test, le fichier créé n'est pas supprimé, que ce se passera t il à la prochaine execution du test ? Enfin, considérons que la méthode que l'on chercher à tester écrit un fichier "toto_2015-01-17_21h24m33.txt" de 10Mo. Et le jenkins qui execute les tests 50 fois par jour ? Au bout d'une semaine, ce sera juste 3Go en plus sur le système...

Bref, un test unitaire se doit d'être propre ! Et avec les fichiers, ce n'est pas une chose toujours facile...


## Le projet "Legacy"

Parfois, sur des projets un peu "legacy", on peut trouver des petites perles sorties tout droit de la 4ième dimension...

{% highlight java %}
import org.junit.Test;
import java.io.File;

public class MyClassTest extends TestCase {

    private File tmpFolder;

    public void setUp() {
        String path = System.getProperty("java.io.tmpdir") + File.separator + "test-folder";
        this.tmpFolder = new File(path);
        this.tmpFolder.mkdir();
    }

    public void tearDown() {
        // Code pour nettoyer le dossier proprement
        this.tmpFolder.delete();
    }

}

{% endhighlight %}

Et oui, avant, on pouvait trouver des choses dans le style pour gérer "proprement" les fichiers au sein d'un test unitaire. Bien sûr, c'est déjà mieux de trouver ça que de ne rien trouver du tout !!

Mais bon, aujourd'hui, ce n'est plus très à la mode...


## La Rule TemporaryFolder !

Afin de gerer correctement les fichiers, JUnit propose une solution avec la rule TemporaryFolder. Regardons donc de plus près comment tout cela fonctionne.

Pour une sortie console un peu plus détaillé, quelques méthodes ont été rajouté afin de bien comprendre ce qui se passe :

{% highlight java %}
import org.apache.commons.io.FileUtils;
import org.junit.*;
import org.junit.rules.TemporaryFolder;
import java.io.*;
import java.util.Arrays;

public class MyClassTest {

    @Rule
    public TemporaryFolder tmpFolder = new TemporaryFolder();

    public static void listFiles(String phase) {
        File[] files = FileUtils.getTempDirectory().listFiles((dir, name) -> name.startsWith("junit"));
        System.out.printf("Fichiers trouvés durant la phase %s : %s \n", phase, Arrays.asList(files));
    }

    @Before
    public void setUp() { listFiles("Before"); }

    @After
    public void tearDown() { listFiles("After"); }

    @BeforeClass
    public static void beforeClass() { listFiles("BeforeClass"); }

    @AfterClass
    public static void afterClass() { listFiles("AfterClass"); }

    @Test
    public void testSomething() throws IOException {
        String rootPath = tmpFolder.getRoot().getAbsolutePath();
        System.out.printf("Le dossier temporaire utilisé est situé : %s \n", rootPath);

        // Vous pouvez facilement créer des fichiers ...
        File file = tmpFolder.newFile("test-file.txt");
        System.out.printf("Le fichier créé est situé : %s \n", file.getAbsolutePath());

        // Manipuler ces fichiers ...
        try (OutputStream os = new FileOutputStream(file)) {
            os.write("toto".getBytes());
        }

        // Afin de pouvoir les utiliser dans votre test
        try (InputStream is = new FileInputStream(file)) {
            byte[] buffer = new byte[4];
            is.read(buffer);
            System.out.printf("Contenu du fichier test-file.txt : %s \n", new String(buffer));
        }

        // Et même créer des dossiers !
        File folder = tmpFolder.newFolder("test-folder");
        System.out.printf("Le dossier créé est situé : %s \n", folder.getAbsolutePath());
    }
}
{% endhighlight %}

Et après avoir executer le test, que se passe-t-il pour le dossier créé ? Et bien, il est tout simplement supprimé par JUnit afin de repartir sur un système propre. La rule `TemporaryFolder` essayera de supprimer (de manière récursive) le dossier temporaire qu'elle a créé. C'est à dire qu'elle regardera les fichiers créés et tentera de les supprimer. S'il s'agit de dossier, elle listera sont contenu et le supprimera avant de tenter de supprimer le dossier.

Et la sortie console associée à ce test :

{% highlight console %}
Fichiers trouvés durant la phase BeforeClass : []
Fichiers trouvés durant la phase Before : [/tmp/junit5059908560214684995]
Le dossier temporaire utilisé est situé : /tmp/junit5059908560214684995
Le fichier créé est situé : /tmp/junit5059908560214684995/test-file.txt
Contenu du fichier test-file.txt : toto
Le dossier créé est situé : /tmp/junit5059908560214684995/test-folder
Fichiers trouvés durant la phase After : [/tmp/junit5059908560214684995]
Fichiers trouvés durant la phase AfterClass : []
{% endhighlight %}


Attention, ces codes sont là pour servir d'exemple (ou pas) ! Dans vos tests, il faut bien sur ne pas faire "sysout" ;-) !!
{: .alert .alert-warning}
{:role="alert"}

Et bien sûr, happy coding !!
