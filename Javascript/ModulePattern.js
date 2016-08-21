var myNamespace = (function() {

    var myPrivateVar = 0;
    var myPrivateMethod = function(someText) {
    	console.log(someText);
    };

    return {
        myPublicVar: 'public var',
        myPublicMethod: function(someText) {
           	myPrivateMethod(someText);
            return myPrivateVar++;
        }
    }

})();

