var module = angular.module("app", ['ngAnimate','ngMaterial']);
//
angular.module("app").controller("mainController", ['$scope','$http','$interval','$timeout','$mdDialog',
    function ($scope,$http,$interval,$timeout,$mdDialog) {


        getDescriptionsHome();
        getDescriptionAbout();
        getProfiles();
        getDescriptionService();
        getServices();
        getDescriptionWork();
        getWorks();
        getWorksType();


//------------------------------HOME---------------------------------

        function getDescriptionsHome(){
            $http.get('http://localhost/server1/php_server/home/getDescriptions.php')
                .then(function(response) {
                    //console.log(response.data);
                    var result = response.data;
                    $scope.resultDescriptions = result;
                    var count =0;

                    // if($scope.resultDescriptions.length>0){
                    //     console.log("ok");
                    // }
                });

        }


//------------------------------CHI SIAMO---------------------------------


        function getDescriptionAbout(){
            $http.get('http://localhost/server1/php_server/about/getDescription.php')
                .then(function(response) {
                    //console.log(response.data);
                    $scope.aboutDescription = response.data[0].description;

                });

        }

        function getProfiles(){
            $http.get('http://localhost/server1/php_server/about/getProfiles.php')
                .then(function(response) {
                    // console.log(response.data);
                    $scope.resultProfiles= response.data;


                });

        }


        //------------------------------SERVIZI---------------------------------


        function getDescriptionService(){
            $http.get('http://localhost/server1/php_server/services/getDescription.php')
                .then(function(response) {
                    //console.log(response.data);
                    $scope.serviceDescription = response.data[0].description;

                });

        }

        function getServices(){
            $http.get('http://localhost/server1/php_server/services/getServices.php')
                .then(function(response) {
                    // console.log(response.data);
                    $scope.resultServices= response.data;


                });

        }


        //------------------------------WORKS---------------------------------
        function getDescriptionWork(){
            $http.get('http://localhost/server1/php_server/works/getDescription.php')
                .then(function(response) {
                    // console.log("----WORKS----");
                    // console.log(response.data);
                    $scope.workDescription= response.data[0].description;


                });

        }



        function getWorks(){
            $http.get('http://localhost/server1/php_server/works/getWorks.php')
                .then(function(response) {
                    // console.log("----WORKS----");
                    // console.log(response.data);
                    $scope.resultWorks= response.data;


                });

        }

        function getWorksType(){
            $http.get('http://localhost/server1/php_server/works/getWorksType.php')
                .then(function(response) {
                    // console.log("----WORKS TYPE----");
                    // console.log(response.data);
                    $scope.resultWorksType= response.data;
                    $scope.selected=$scope.resultWorksType[0].id;

                    for (var i=0;i<$scope.resultWorksType.length;i++){
                        getWorksFromType(i,$scope.resultWorksType[i].id);
                    }


                });

        }

        $scope.selected=0;
        $scope.classSelected="btn-my";
        $scope.classNoSelected="btn-default";
        $scope.resultWorksFilter=[];
        $scope.filters=[];
        $scope.clickButtonWork = function(id,id_type){
            console.log("CLICK: "+id);
            $scope.selected=id_type;

            getWorksFilter(id_type);
        }

        function getWorksFromType(count,type){
            var payload = {
                id_type: type
            };

            $http.post('http://localhost/server1/php_server/works/getWorksFromType.php', payload)
                .then(
                    function(response){
                        // success callback
                        // console.log("FILTER: for: "+type);
                        // console.log("-------->",response.data);
                        if(count==0){
                            $scope.filters=response.data;
                            // angular.element(document.querySelector("#carousel-example-generic0")).addClass("carousel slide");
                        }



                        var obj={id_type:type,value:response.data};
                         console.log("-------->OBJ",obj);

                         $scope.resultWorksFilter.push( obj);
                        // console.log("-------->ALL FILTER", $scope.resultWorksFilter);
                    },
                    function(response){
                        // failure callback
                    }
                );
        }

        function getWorksFilter(id_type){

            for(var i=0;i<$scope.resultWorksFilter.length;i++){
                var obj=$scope.resultWorksFilter[i];
                console.log("OBJ--->",obj);
                if(obj.id_type == id_type){
                    console.log("VALUE-->",obj.value);
                    $scope.filters= obj.value;
                }
            }

        }

        $scope.openDialog = function (ev, filters,type,id_work) {
            $mdDialog.show({
                controller: DialogController,
                locals: { filters: filters,type:type,id_work:id_work},
                templateUrl: 'modal_carousel_works.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {
                    // console.log("CLOSEEEE");
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function (type) {

                });
        };

        function DialogController($scope, $mdDialog, filters,type,id_work) {



            $scope.filters = filters;
            $scope.type=type;
            $scope.id_work=id_work;
            console.log("DIALOG-->",id_work)
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function (icon) {

                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };


        }

    }
])//chiudo il controller


;