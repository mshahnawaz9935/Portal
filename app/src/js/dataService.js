
"use strict";
app.service('dataService', ['$http','$q', dataService]);

function dataService($http,$q){

  // Add the list of endpoints for reach get
    var get_rest_data = function(){
    return $http.get('http://localhost:56446/api/Townlands').then(function (response) {
      console.log(response);
           return response;
    })
}
return {get_rest_data};


}



