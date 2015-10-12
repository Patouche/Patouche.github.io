/**
 * Label management
 */
(function($) {

    // Plugin definition
    $.label = function(lbl) {
        return new _label(lbl);
    };


    // Class definition
    var _label = function(lblAttr) {
        var $e = $("span.js-label[name='" + lblAttr + "']");
        log.debug("Element found :", $e);
        this.lbl = $e.text();
        log.debug("Unformatted label :", this.lbl);
    };

    _label.prototype.format = function(arr) {
            var o = this.lbl;
            for (var i = 0; i < arr.length; i++) {
                o = o.replace(new RegExp('\\{' + i + '\\}'), arr[i]);
            }
            log.debug("Formatted label :", o)
            return o;
    };

}(jQuery));
