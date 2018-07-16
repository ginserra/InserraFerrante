angular.module("appServer").controller("workController", ['$scope','$http',
    function ($scope,$http) {

        getWorks();
        getWorksType();

        function getWorks(){
            $http.get('http://localhost/server1/php_server/works/getWorks.php')
                .then(function(response) {
                    console.log("----WORKS----");
                    console.log(response.data);
                    $scope.resultWorks= response.data;


                });

        }

        function getWorksType(){
            $http.get('http://localhost/server1/php_server/works/getWorksType.php')
                .then(function(response) {
                    console.log("----WORKS TYPE----");
                    console.log(response.data);
                    $scope.resultWorksType= response.data;


                });

        }



    }
]);