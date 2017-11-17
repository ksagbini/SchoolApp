/**
 * Created by KevTS on 14/11/17.
 */



(function () {
    "use strict";

    function config($routeProvider) {
        $routeProvider.when("/", {redirectTo: "/home"})
            .when("/login", {
                templateUrl: "app/Login/login.html",
                title: "Login",
                controller: "LoginCtrl",
                controllerAs: "login"
            })
            .when("/students", {
                templateUrl: "app/Students/students.html",
                title: "Estudiantes",
                controller: "StudentsCtrl",
                controllerAs: "std"
            })
            .when("/teachers", {
                templateUrl: "app/Teachers/teachers.html",
                title: "Profesores",
                controller: "TeachersCtrl",
                controllerAs: "tch"
            })
            .when("/courses", {
                templateUrl: "app/Courses/courses.html",
                title: "Cursos",
                controller: "CoursesCtrl",
                controllerAs: "crs"
            })
            .otherwise({redirectTo: "/home"});
    }

    angular.module("SchoolApp").config(config);


})();