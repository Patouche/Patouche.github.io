/**
 * Tag page...
 */
(function($) {
    var query = URI.parseQuery(window.location.search).search;

    if(query && query != "") {
        $(document).ready(function() {
            new TagSearch(query).run();
        });
    }

    /**
     * Tag inner class
     */
    var TagSearch = function(tag) {
        log.debug("Searching tag :", tag);
        this.tag = tag;
    };

    /**
     * Run tag search
     */
    TagSearch.prototype.run = function() {

        $("h1").text($.label('tag.title').format([this.tag]));

        $.get("/tag.json", function(json) {
            log.debug("JSON data successfully loaded :", json);
            var data = json[this.tag];
            log.debug("Data for tag", this.tag, ":", data);
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    $('div.results').layout()
                        .article()
                        .add(data[i]);
                }
            }
        }.bind(this));
    };


})(jQuery);
