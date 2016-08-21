;
(function($) {
    var pluginName = 'detectDataChange';
    var version = '1.0.0';

    $.fn.greenify = function(options) {
        var settings = $.extend({}, $.fn.greenify.defaults, options);

        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        })

    };

    $.fn.greenify.defaults = {
        color: '#F90E0E',
        backgroundColor: '#FFFFFF'
    }

})(jQuery)


$(document).ready(function() {

    $.fn.greenify.defaults.color = '#11ECB1'

    $('h1').greenify({
        color: '#F3F60E'
    });
});
