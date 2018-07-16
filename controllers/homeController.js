angular.module('appServer').controller('homeController', function($scope,$http) {

    $scope.resultDescriptions=[];
    getDescriptions();
    getCount("/img/bgslides/");

    $scope.saveDescription = function(type){

        var description = "";
        var subdescription = "";
        var id=0;

        if(type == 1){
            description = $scope.desc1;
            subdescription = $scope.minidesc1;
            id=resultDescriptions[0].id;
        }
        if(type == 2){
            description = $scope.desc2;
            subdescription = $scope.minidesc2;
            id=resultDescriptions[1].id;
        }
        if(type == 3){
            description = $scope.desc3;
            subdescription = $scope.minidesc3;
            id=resultDescriptions[2].id;
        }

        var payload = {
            id:id,
            type:type,
            description:description,
            subdescription:subdescription
        };

        $http.post('http://localhost/server1/php_server/updateDescription.php', payload, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function(data, status, headers, config) {
            //success
            console.log("OKKKK-->",data);
            getDescriptions();
        }, function(data, status, headers, config) {
            //an error occurred
            console.log("ERROR");
        });


    }



    function getDescriptions() {

        $http.get('http://localhost/server1/php_server/getDescriptions.php')
            .then(function(response) {
                console.log(response.data);
                var result = response.data;
                resultDescriptions = result;
                for(var i =0;i<result.length;i++){
                    var row = result[i];
                    if(row.type == 1){
                        $scope.desc1 = row.description;
                        $scope.minidesc1=row.subdescription;
                    }
                    if(row.type == 2){
                        $scope.desc2 = row.description;
                        $scope.minidesc2=row.subdescription;
                    }
                    if(row.type == 3){
                        $scope.desc3 = row.description;
                        $scope.minidesc3=row.subdescription;
                    }
                }


            });

    }

    function getCount(foldername)
    {

    }


});