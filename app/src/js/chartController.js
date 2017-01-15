
"use strict";
app.controller('chartController',[ 'dataService','$scope', function (dataService, $scope) {

    function getapidata(data)
    {
        $scope.value ="";
        var full_address = $scope.data.split(',');
        if(full_address.length >2)                          // Address should contain atleast 3 fields
        {
        var county = full_address[full_address.length-1] ;   // Get the County which is usually the last field
        county= county.toUpperCase();
        var townland = full_address[full_address.length-2];  // Get the townland
        townland= townland.toUpperCase();
        console.log(full_address, townland, county);
        var len= data.length;
        var x=0;
        // if((county.indexOf("CO CARLOW") !== -1))
        // console.log('got it');
        while(x<len)
        {
        if((county.indexOf(data[x].County) !== -1) && (townland.indexOf(data[x].English_name) !==-1))
        {
        // $scope.value = data[x].X +  ","+ data[x].Y + ","+  data[x].id + "," + data[x].OBJECTID;

        $scope.value = data[x].X +  ","+ data[x].Y
        console.log('data',data[x]);
        break;
        }
       // else console.log("hello"); 
       x++;
        }
        if($scope.value == "")
        $scope.value = "Incorrect address";
        }
        else $scope.value = "Incorrect address";

    }

$scope.get = function() {
        dataService.get_rest_data().then(function(result)
        {
            getapidata(result.data);
        });
}
        dataService.test;

        

}]);

