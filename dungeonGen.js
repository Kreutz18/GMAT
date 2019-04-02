angular.module('myApp').controller('dungeonCtrl', function($scope,fileReader, $http){
    $scope.postResults = "";
    var userParams = {};
    $scope.prePostResults = "";
    /*
This will be used for user params

    S$scope.sizes = ["Small", "Medium", "Large"];
    $scope.environments = ["Grass", "Cave", "Hills"];
    */

//takes user input if needed, calls php dungeon generator and outputs dungeon
    $scope.genDungeon = function(){
        $http.post('dungeonScript.php', userParams)
            .then(function(response){
                $scope.add(response.data);
		        //$scope.postResults = response.data;
                //$scope.postResults  += parseInt(response.data) + 3;
            });

    };

/*
was used for testing, no longer needed but has helpful code for passing userparams
    $scope.justChanged = function(){
        $scope.postResults = $scope.selected;
        console.log($scope.sizes);
        console.log($scope.environments);
        userParams.dungeonSize = $scope.size;
        userParams.dungeonEnvironment = $scope.environment;
    };
*/

//takes the dungeon data and adds it into the HTML view as new elements
    $scope.add = function(dungeonData){
        document.getElementById('dungeon').innerHTML = "<ol id=\"add\"></ol>";
        var rooms = formatOutput(dungeonData);
        //console.log(dungeonData);
        var node = document.getElementById('add');
        var message = "<ul>";
        for(var i=rooms.length-1; i >= 1; i--)
        {
            var message = message +'<li>' + rooms[i] + '</li>';
        }
        var message = message + '</ul>';
        node.insertAdjacentHTML('afterend', message);

        var message = '<li>' + rooms[0] + '</li>';
        node.insertAdjacentHTML('afterend', message);
    }
});

//takes the dungeonData and changes it into an array of strings
//todo: we'll need to make this put things into an object to deal with multiple rooms
function formatOutput(dungeonData){
    var roomData = dungeonData;
    console.log(roomData.length);
    var rooms = [];
//    var rooms = [dungeonData["starting"], dungeonData["chamber1"]];

    for (var i = 0; i < roomData.length; i++) {
        var obj = roomData[i];
        rooms.push(obj.data);
    }

    return rooms;
}

/*
This is stuff we should add

<option value="dungSize">Dungeon Size</option>
<option value="dungEnvironment">Dungeon Environment</option>
<option value="dungMonster">Dungeon Monsters</option>
<option value="dungItems">Dungeon Items</option>
*/