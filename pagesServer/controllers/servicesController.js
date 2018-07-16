angular.module("appServer").controller("servicesController", ['$scope','$http','fileReader','$timeout','$compile','$location','$anchorScroll',
    function ($scope,$http, fileReader,$timeout,$compile, $location, $anchorScroll) {

        $scope.counterAdded=0;
        $scope.imageSrc = [];
        getDescription();
        getServices();

        function getDescription() {

            $http.get('http://localhost/server1/php_server/services/getDescription.php')
                .then(function (response) {
                    console.log("---->", response.data);
                    $scope.description=response.data[0].description;
                });
        }

        $scope.updateDescription= function () {

            // var new_desc = $scope.description.replace("'","/'");
            // console.log(new_desc);

            var payload = {
                description: $scope.description
            };
            console.log("PAT--->",payload);

            $http.post('http://localhost/server1/php_server/services/updateDescription.php', payload, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function(data, status, headers, config) {
                //success
                console.log("OKKKK-->",data);
                getDescription();
            }, function(data, status, headers, config) {
                //an error occurred
                console.log("ERROR");
            });

        }

        $scope.addDiv = function() {
            $scope.counterAdded = $scope.counterAdded +1;
            var divElement = angular.element(document.querySelector('#space-for-newDiv'));
            var appendHtml = $compile('<div counter="counterAdded" servicediv >serviceeee</div>')($scope);
            divElement.append(appendHtml);
            console.log("counter: "+$scope.counterAdded);
        }

        function getServices() {

            $http.get('http://localhost/server1/php_server/services/getServices.php')
                .then(function (response) {
                    console.log("---->", response.data);
                    var result = response.data;
                    $scope.resultServices = result;
                    for (var i = 0; i < result.length; i++) {
                        //$scope.imageSrc[i] = result[i].image;
                        $scope.imageSrc[i] = result[i].image;
                    }


                });
        }

        $scope.updateService = function (id, image, title, content, index_list) {


            var newImage = "";
            if (image == "")
                newImage = $scope.resultServices[index_list].image;
            else
                newImage = image;

            var newTitle = "";
            if (title == undefined)
                newTitle = $scope.resultServices[index_list].title;
            else
                newTitle = title;


            var newContent = "";
            if (content == undefined)
                newContent = $scope.resultServices[index_list].content;
            else
                newContent = content;

            console.log("--->" + id + "----->" + newImage);
            // console.log("INSERT PROFILE--->"+$scope.title+"--"+$scope.subtitle);

            var payload = {
                id: id,
                image: newImage,
                title: newTitle,
                content: newContent
            };

            $http.post('http://localhost/server1/php_server/services/updateService.php', payload, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function(data, status, headers, config) {
                //success
                console.log("OKKKK-->",data);
                getServices();
            }, function(data, status, headers, config) {
                //an error occurred
                console.log("ERROR");
            });

        }

        $scope.removeService = function (id) {


            console.log("--->" + id + "----->" );
            // console.log("INSERT PROFILE--->"+$scope.title+"--"+$scope.subtitle);

            var payload = {
                id: id
            };

            $http.post('http://localhost/server1/php_server/services/deleteService.php', payload, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function(data, status, headers, config) {
                //success
                console.log("OKKKK-->",data);
                getServices();
            }, function(data, status, headers, config) {
                //an error occurred
                console.log("ERROR");
            });
        }


    }
])

    .directive('servicediv', function($location,$anchorScroll,$http,$window) {
        return {
            scope: {
                counter: '='
            },
            templateUrl:'pagesServer/single_service.html',
            controller: function($rootScope, $scope, $element) {
                console.log("ciao service");
                $location.hash('bottomDiv');
                // // call $anchorScroll()
                $anchorScroll();

                $scope.localCounter = $scope.counter;

                $scope.removeDiv=function(counterToRemove){
                    console.log("REM");
                    console.log("counter centrale--->: "+$scope.counter+"----cremove"+counterToRemove);
                    var myEl = angular.element( document.querySelector( '#div_service_'+counterToRemove ) );
                    myEl.remove();   //removes element
                };

                $scope.addService=function(image,title,content){

                    var payload = {
                        image:image,
                        title: title,
                        content: content
                    };


                    console.log("--------------------ADD--------------------: ",payload);

                    $http.post('http://localhost/server1/php_server/services/insertService.php', payload, {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    }).then(function(data, status, headers, config) {
                        //success
                        console.log("OKKKK-->",data);
                        $window.location.reload();
                        // $location.hash('bottomDiv');
                        // // // call $anchorScroll()
                        // $anchorScroll();


                    }, function(data, status, headers, config) {
                        //an error occurred
                        console.log("ERROR");
                    });


                }

            }
        }
    });


