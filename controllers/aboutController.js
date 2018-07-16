angular.module('appServer')
    .controller('aboutController',['$scope','$http','fileReader','$timeout','$compile','$location','$anchorScroll',
    function ($scope, $http, fileReader,$timeout,$compile, $location, $anchorScroll) {

    console.log("CIAO ABOUT");


    $scope.imageSrc = [];
    $scope.resultProfiles = [];
    $scope.selectImage = false;
    $scope.indexSelected = 0;
    $scope.counterAdded=0;

    getProfiles();
    getDescription();

    $scope.$on("fileProgress", function (e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });

    $scope.updateProfile = function (id, image, title, subtitle, content, index_list) {


        var newImage = "";
        if (image == "")
            newImage = $scope.resultProfiles[index_list].image;
        else
            newImage = image;

        var newTitle = "";
        if (title == undefined)
            newTitle = $scope.resultProfiles[index_list].title;
        else
            newTitle = title;

        var newSubtitle = "";
        if (subtitle == undefined)
            newSubtitle = $scope.resultProfiles[index_list].subtitle;
        else
            newSubtitle = subtitle;

        var newContent = "";
        if (content == undefined)
            newContent = $scope.resultProfiles[index_list].content;
        else
            newContent = content;

        console.log("--->" + id + "----->" + newImage);
        // console.log("INSERT PROFILE--->"+$scope.title+"--"+$scope.subtitle);

        var payload = {
            id: id,
            image: newImage,
            title: newTitle,
            subtitle: newSubtitle,
            content: newContent
        };

        $http.post('http://localhost/server1/php_server/about/updateProfile.php', payload, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function(data, status, headers, config) {
            //success
            console.log("OKKKK-->",data);
            getProfiles();
        }, function(data, status, headers, config) {
            //an error occurred
            console.log("ERROR");
        });

    }

        $scope.removeProfile = function (id) {


            console.log("--->" + id + "----->" );
            // console.log("INSERT PROFILE--->"+$scope.title+"--"+$scope.subtitle);

            var payload = {
                id: id
            };

            $http.post('http://localhost/server1/php_server/about/deleteProfile.php', payload, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function(data, status, headers, config) {
                //success
                console.log("OKKKK-->",data);
                getProfiles();
            }, function(data, status, headers, config) {
                //an error occurred
                console.log("ERROR");
            });
        }


    $scope.addDiv = function() {
        $scope.counterAdded = $scope.counterAdded +1;
        var divElement = angular.element(document.querySelector('#space-for-newDiv'));
        var appendHtml = $compile('<div counter="counterAdded" profilediv></div>')($scope);
        divElement.append(appendHtml);
        console.log("counter: "+$scope.counterAdded);

        //  angular.element(document.querySelector('#space-for-newDiv')).scrollIntoView({});
    }





    function getProfiles() {

        $http.get('http://localhost/server1/php_server/about/getProfiles.php')
            .then(function (response) {
                console.log("---->", response.data);
                var result = response.data;
                $scope.resultProfiles = result;
                for (var i = 0; i < result.length; i++) {
                    //$scope.imageSrc[i] = result[i].image;
                    $scope.imageSrc[i] = result[i].image;
                }


            });
    }


        $scope.updateDescription= function () {

            var payload = {
                description: $scope.description
            };

            $http.post('http://localhost/server1/php_server/about/updateDescription.php', payload, {
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

        function getDescription() {

            $http.get('http://localhost/server1/php_server/about/getDescription.php')
                .then(function (response) {
                    console.log("---->", response.data);
                    $scope.description=response.data[0].description;


                });
        }

}])

    .directive("ngFileSelect", function (fileReader, $timeout) {
        return {
            scope: {
                ngModel: '='
            },
            link: function ($scope, el) {
                function getFile(file) {

                    fileReader.readAsDataUrl(file, $scope)
                        .then(function (result) {
                            $timeout(function () {
                                $scope.ngModel = result;

                            });
                        });
                }

                el.bind("change", function (e) {

                    var file = (e.srcElement || e.target).files[0];
                    getFile(file);
                });
            }
        };
    })

    .directive('profilediv', function($location,$anchorScroll,$http,$window) {
        return {
            scope: {
                counter: '='
            },
            templateUrl:'pagesServer/profile.html',
            controller: function($rootScope, $scope, $element) {
                console.log("ciao profile");
                $location.hash('bottomDiv');
                // // call $anchorScroll()
                $anchorScroll();

                $scope.localCounter = $scope.counter;

                $scope.removeDiv=function(counterToRemove){
                    console.log("REM");
                    console.log("counter centrale--->: "+$scope.counter+"----cremove"+counterToRemove);
                     var myEl = angular.element( document.querySelector( '#div_profile_'+counterToRemove ) );
                     myEl.remove();   //removes element
                };

                $scope.addProfile=function(image,title,subtitle,content){


                    var payload = {
                        image:image,
                        title: title,
                        subtitle: subtitle,
                        content: content
                    };


                    console.log("--------------------ADD--------------------: ",payload);

                    $http.post('http://localhost/server1/php_server/about/insertProfile.php', payload, {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    }).then(function(data, status, headers, config) {
                        //success
                        console.log("OKKKK-->",data);
                        $window.location.reload();
                        $location.hash('bottomDiv');
                        // // call $anchorScroll()
                        $anchorScroll();


                    }, function(data, status, headers, config) {
                        //an error occurred
                        console.log("ERROR");
                    });


                }

            }
        }
    })


    .factory("fileReader", function ($q, $log) {
        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        var onProgress = function (reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress", {
                    total: event.total,
                    loaded: event.loaded
                });
            };
        };

        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };
    });





