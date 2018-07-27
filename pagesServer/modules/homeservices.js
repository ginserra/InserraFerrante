angular.module('appServer').factory('homeServices', function($http,addressServer){

     // console.log("CONS-->"+addressServer);

    return{
        getDescriptions : function(){
            return $http.get(addressServer+'home/getDescriptions.php');
        },
        updateDescription : function(obj){
            return $http.post(addressServer+'home/updateDescription.php',obj);
        }

        // getDetailBus : function(idBus){
        //     return $http.get('http://156.54.99.219/ecoctdev/api/buses/bus/'+idBus);
        // },
        // getBuseByName : function(nameBus){
        //     return $http.get('http://156.54.99.219/ecoctdev/api/buses/byName/'+nameBus);
        // },
        // getBusStops : function(idBus){
        //     return $http.get('http://156.54.99.219/ecoctdev/api/buses/getBusStops/' + idBus);
        // },
        //
        // findBusLineByPath : function(obj){
        //     return $http.post('http://156.54.99.219/ecoctdev/api/buses/findBusLineByPath',obj);
        // },
        // getPolyline : function(nameBus,obj){
        //     return $http.post('http://156.54.99.219/ecoctdev/api/buses/getPolyline/'+nameBus,obj);
        // },
        // getStations : function(filter){
        //     return $http.get('http://156.54.99.219/ecoctdev/api/buses/stations?filter='+filter);
        // },

    }
});
