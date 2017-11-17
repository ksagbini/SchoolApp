/**
 * Created by KevTS on 16/11/17.
 */

(function () {
    "use strict";

    function TeachersSrv($http){

        var srv = {};

        srv.data = [];
        srv.get = get;
        return srv;

        function get(){
            return $http.get("data/teachers-data.json").then(function(response){
                return response.data;
            });
        }

    }

    angular.module("SchoolApp").factory("TeachersSrv", TeachersSrv);

})();