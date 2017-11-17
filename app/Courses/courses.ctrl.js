/**
 * Created by KevTS on 16/11/17.
 */


(function () {
    "use strict";

    function CoursesCtrl(CoursesSrv, $rootScope, $route) {

        $rootScope.title = $route.current.$$route.title;

        var courseCopy;
        var vm = this;
        vm.formMode = false;
        vm.editMode = false;
        vm.courses = [];
        vm.course = {id: "", name: "", desc: ""};

        vm.getcourses = getcourses;
        vm.openForm = openForm;

        vm.save = save;
        vm.cancel = cancel;
        vm.deleteCrs = deleteCrs;

        function getcourses() {
            CoursesSrv.get().then(function (response) {
                vm.courses = response;
                return vm.courses;
            });
        }


        function openForm(course) {
            vm.formMode = true;
            if (course) {
                courseCopy = angular.copy(course);
                vm.course = course;
                vm.editMode = true;
            }
        }

        function save(course) {
            if (vm.editMode) {
                vm.courses.forEach(function (crs) {
                    if (crs.id == course.id) {
                        crs.name = course.name;
                        crs.desc = course.desc;
                    }
                })
            }
            else {
                vm.courses.push(course);
            }

            vm.cancel(true);
        }

        function cancel(success) {
            vm.formMode = false;
            vm.editMode = false;

            if (courseCopy && !success) {
                vm.course.name = courseCopy.name;
                vm.course.desc = courseCopy.desc;
                courseCopy = undefined;
            }

            vm.course = {id: "", name: "", desc: ""};
        }

        function deleteCrs(course) {
            if (!confirm("Está seguro que desea eliminar el curso " + course.name + "?")) {
                return false;
            }
            var index = vm.courses.indexOf(course);
            vm.courses.splice(index, 1);
        }

    }


    angular.module("SchoolApp").controller("CoursesCtrl", CoursesCtrl);

})();