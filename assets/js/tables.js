/**
 * Tag page...
 */
(function($) {

    /**
     * Run the yes no tables
     */
    $(document).ready(function() {
        $('table.yes-no-table').each(function() {
            new YesNoTable($(this)).run();
        });
    });

    /**
     * Class constructor.
     */
    var YesNoTable = function(table, options) {
        this.table = table;
        this.opts = $.merge(YesNoTable.Options, options || {});
    };

    YesNoTable.Options = {
        titleClass: 'td-title',
        yesClass: 'yes',
        noClass: 'no'
    };

    YesNoTable.prototype.run = function() {
        $(this.table).find('tr td').each(function(i, e) {
            var $e = $(e);
            if (!$e.is(':first-child')) {
                var t = $e.text();
                if (t.match(/^yes/i)) {
                    $e.addClass(this.opts.yesClass);
                } else if (t.match(/^no/i)) {
                    $e.addClass(this.opts.noClass);
                }
            }
        }.bind(this));
    };




})(jQuery);
