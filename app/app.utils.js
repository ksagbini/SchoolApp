/**
 * Created by KevTS on 14/11/17.
 */

(function () {
    "use strict";

    var cnst = {};
    cnst.apiUrl = "http://localhost/SchoolApp/";
    cnst.user = {
        username: "admin",
        password: "admin"
    };

    angular.module("SchoolApp").constant("appConfig", cnst);
    
})();