(function() {

    $.fn.customAccordion = function(options) {
        debug(this);

        var defaults = {
        	textColor: '#000',
        	backgroundColor: '#fff',
        	fontSize: '1em'
        };

        var settings = $.extend({}, defaults, options);

        return this.each(function(index, element) {
            var base = element,
                $base = $(element);

            base.init = function() {
             
                $base.             
                find('dd').
                css({
                	'color': settings.textColor, 
                	'background': settings.backgroundColor,
                	'font-size': settings.fontSize}).
                hide().
                end().
                find('dt').click(function() {
                    var ans = $(this).next();

                    if (ans.is(':visible')) {
                        base.closeQ(ans);
                        ans.trigger('questionClose');
                    } else {
                        base.openQ(ans);
                        ans.trigger('questionOpen');
                    }
                });
            };

            base.openQ = function(ans) {
                ans.show();
               
            };

            base.closeQ = function(ans) {
                ans.hide();
               
            };

            base.init();

        });
    };

    function debug(obj) {
        console.log(obj);
    };



})()


$(document).ready(function() {
    var tt = $('dl').customAccordion({
    	textColor: '#ff0000',
    	backgroundColor: '#000000',
    	fontSize: '2em'
    })

    $('dl').on('questionClose', function() {
        console.log('close');
    });

    $('dl').on('questionOpen', function() {
        console.log('open');
    });



});



