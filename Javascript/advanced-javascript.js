// Closure

function showName(firstName, lastName) {
    var nameIntro = "Your name is ";

    function makeFullName() {
        return nameIntro + firstName + ' ' + lastName;
    }

    return makeFullName();

};

function celebrityName(firstName) {
    var nameIntro = "This celebrity is ";

    function lastName(thisLastName) {
        return nameIntro + firstName + ' ' + thisLastName;
    }

    return lastName;
};

function celebrityID() {
    var celebrityID = 999;

    return {
        getID: function() {
            return celebrityID;
        },
        setID: function(newID) {
            celebrityID = newID;
        }
    }
};

/*clorure*/
function celebrityIDCreator(theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
        (function(j) {
            theCelebrities[j]["id"] = function() {
                return uniqueID + j;
            };
        }(i));

    }
    
    return theCelebrities;
}

var actionCelebs = [{
    name: "Stallone",
    id: 0
}, {
    name: "Cruise",
    id: 0
}, {
    name: "Willis",
    id: 0
}];

var createIdForActionCelebs = celebrityIDCreator(actionCelebs);
var stalloneID = createIdForActionCelebs[0];
console.log(stalloneID.id()); // 103

//////////////////////////////////////////
var count = 0;
for (var i = 0; i < 4; i++) {

(function(i) {
    setTimeout(
        function() {
            console.log('i ' + i);
            console.log('count ' + count++);

    }, i * 200);
})(i);
}


/////////////////////// Prototype ///////////////////////////

