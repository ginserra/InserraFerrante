var module = angular.module("app", ['ngAnimate']);
//
angular.module("app").controller("mainController", ['$scope','$http','$interval','$timeout',
    function ($scope,$http,$interval,$timeout) {


        // $scope.resultDescriptions=[];
        getDescriptionsHome();
        getDescriptionAbout();
        getProfiles();
        getDescriptionService();
        getServices();
        getWorks();
        getWorksType();
        // $scope.services=[
        //     {
        //         id: 1,
        //         image: "img/screenshots/1.png",
        //         title:"Website Design",
        //         content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
        //         "tempor incididunt ut labore et dolore magna."
        //     },
        //     {
        //         id: 2,
        //         image: "img/screenshots/2.png",
        //         title:"Brand Identity",
        //         content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
        //         "tempor incididunt ut labore et dolore magna."
        //     },
        //     {
        //         id: 3,
        //         image: "img/screenshots/3.png",
        //         title:"Web & Mobile Apps",
        //         content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
        //         "tempor incididunt ut labore et dolore magna."
        //     }
        //
        //     ];




        $scope.portofolio_visible = [{
            id_work: 1,
            image_main: "img/works/1.jpg",
            title: "TITLE1",
            description: "Duo te dico volutpat, unum elit oblique per id. Ne duo mollis sapientem intellegebat. Per at augue vidisse percipit, pri vocibus assueverit interesset ut",
            image_detail: "img/works/thumbs/1.jpg",
            visibility :false,
            style :""

        }, {
            id_work: 2,
            image_main: "img/works/2.jpg",
            title: "TITLE2",
            description: "Duo te dico volutpat, unum elit oblique per id. Ne duo mollis sapientem intellegebat. Per at augue vidisse percipit, pri vocibus assueverit interesset ut",
            image_detail: "img/works/thumbs/2.jpg",
            visibility:false,
            style :""
        },
            {
                id_work: 3,
                image_main: "img/works/3.jpg",
                title: "TITLE3",
                description: "Duo te dico volutpat, unum elit oblique per id. Ne duo mollis sapientem intellegebat. Per at augue vidisse percipit, pri vocibus assueverit interesset ut",
                image_detail: "img/works/thumbs/3.jpg",
                visibility :false,
                style :""
            },
            {
                id_work: 4,
                image_main: "img/works/4.jpg",
                title: "TITLE4",
                description: "Duo te dico volutpat, unum elit oblique per id. Ne duo mollis sapientem intellegebat. Per at augue vidisse percipit, pri vocibus assueverit interesset ut",
                image_detail: "img/works/thumbs/4.jpg",
                visibility :false,
                style :""
            },
            {
                id_work: 5,
                image_main: "img/works/5.jpg",
                title: "TITLE5",
                description: "Duo te dico volutpat, unum elit oblique per id. Ne duo mollis sapientem intellegebat. Per at augue vidisse percipit, pri vocibus assueverit interesset ut",
                image_detail: "img/works/thumbs/5.jpg",
                visibility: false,
                style :""
            }


        ];
        $scope.test = function () {
            console.log("ciaooooo");
        }


//------------------------------HOME---------------------------------

        function getDescriptionsHome(){
            $http.get('http://localhost/server1/php_server/getDescriptions.php')
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
                    console.log(response.data);
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
                    console.log(response.data);
                    $scope.resultServices= response.data;


                });

        }


        //------------------------------WORKS---------------------------------

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

        $scope.selected=0;
        $scope.classSelected="btn-my";
        $scope.classNoSelected="btn-default";
        $scope.clickButtonWork = function(id){
            console.log("CLICK: "+id);
            $scope.selected=id;
        }




    }
])//chiudo il controller

    .directive('work', function () {

        return {
            // controller:'workController',
            restrict: 'E',
            scope: {
                work: '=work',
                tags: "="
            },
            templateUrl: "directives/work.html",

            link: function (scope, element, attributes) {

                scope.close = function (work) {

                    work.visibility = false;
                    work.style="no_style";

                };

                scope.select = function (work) {


                    if(work.visibility){
                        work.visibility = false;
                        work.style="none";
                    }

                    else{
                        work.visibility =true;
                        work.style = "li_expanded";
                    }

                    closeOther(work.id_work);


                };

                closeOther = function (id_select) {
                    for(var i=0;i<scope.tags.length;i++){
                        if(id_select!=scope.tags[i].id_work){
                            scope.tags[i].visibility = false;
                            scope.tags[i].style = "no_style";
                        }


                    }
                }


            }

        };

    })

.animation('.tester',function() {
    return {
        leave:function(ele,done) {
            console.log(ele[0]);
            ele[0].style.opacity = 0;
            setTimeout(done,1500);
        }
    }
});


;