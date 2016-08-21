(function() {
    var ev = new $.Event('display:changed');

    $.fn.customToggle = function() {
        var that = this;

        var onCompleteFn = function() {
            $(that).trigger(ev);
        };

        if (Array.prototype.slice) {
            console.log(arguments);
            var mainArguments = Array.prototype.slice.call(arguments);
            mainArguments.push(onCompleteFn);

            $.fn.toggle.apply(this, mainArguments);
        } else {

            console.log('Array.protoype.slice not supported for this old browser');
            $.fn.toggle.apply(this, arguments);

        }
        return this;
    };

})();




$(document).ready(function() {

    $('#btnToggle').click(function() {
        $('.element').customToggle(500, function(){console.log('hrllo')});
    });

    $('.element').on('display:changed', function() {
        console.log('event fired');
    });
});
