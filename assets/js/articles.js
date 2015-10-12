/**
* Layout management ...
*/
(function($) {

    $.fn.layout = function() {
        console.log("ici")
        return new Layout(this);
    };

    /**
     * Layout inner class
     */
    var Layout = function(elem) {
        this.elem = elem;
    };

    /**
     * Retrieve article layout management
     */
    Layout.prototype.article = function() {
        return new Article(this.elem);
    };

    /**
     * Retrieve pagination layout management
     */
    Layout.prototype.pagination = function() {
        return new Pagination(this.elem);
    };

    /**
     * Article inner class
     */
    var Article  = function(elem) {
        this.elem = elem;
    };

    /**
     * Add a article
     *
     * @param : the data as JSON format for the article to add
     */
    Article.prototype.add = function(data) {
        log.debug("Insert article :", data);

        // Title
        var $title = $('<h2/>', { class: 'post-title' })
            .append($('<a/>', { href: data.url, html: data.title }));

        // Post description
        var $pd = $('<div/>', { class: 'post-description illustrated' });
        $pd.append($('<div/>', { class: 'post-image' })
                .append($('<img/>', { src: data.image, title: data.title })));
        $pd.append($('<time/>', { text: data.date.long_string, datetime:data.date.xmlshema }));
        $pd.append($('<div/>', { class: 'post-excerpt', html: data.excerpt }));

        var $tag = $('<ul/>', { class: 'tags' });
        $(data.tags).each(function(i,t) { $tag.append($('<li/>').append($('<a/>', { text: t, href:'/tag/?search='+t }))); });
        $pd.append($tag);

        // Article wrapper
        var $a = $('<article/>', { class: 'post post-teaser'})
            .append($title)
            .append($pd)

        this.elem.append($a);
    };

    /**
     * Pagination inner class
     */
    var Pagination  = function(elem) {
        this.elem = elem;
    };



})(jQuery);
