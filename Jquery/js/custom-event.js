(function() {

    $.fn.customAccordion = function(options) {
        debug(this);

        var defaults = {
        	textColor: '#000',
        	backgroundColor: '#fff',
        	fontSize: '1em',
        	onShowQuestion: function(){},
        	onCloseQuestion: function(){},
            questionElement: 'dt',
            answerElement: 'dd'

        };

        var settings = $.extend({}, defaults, options);

        return this.each(function(index, element) {
            var base = element,
                $base = $(element);

            base.init = function() {
                var questionElement = '<dt>Example Question</dt>';
                var answerElement = "<dd>Answer</dd>";
                $base.prepend(answerElement).prepend(questionElement).               
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
                    } else {
                        base.openQ(ans);
                    }
                });
            };

            base.openQ = function(ans) {
                ans.show();
                settings.onShowQuestion.call(this);
            };

            base.closeQ = function(ans) {
                ans.hide();
                settings.onCloseQuestion.call(this);
            };

            base.init();

        });
    };

    function debug(obj) {
        console.log(obj);
    };



})()


$(document).ready(function() {
    $('dl').customAccordion({
    	onShowQuestion: function() {
    		console.log('show', this);
    	},
    	onCloseQuestion: function() {
    		console.log('close', this);
    	},
    	textColor: '#ff0000',
    	backgroundColor: '#000000',
    	fontSize: '2em'
    });
});



