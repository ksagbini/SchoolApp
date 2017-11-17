/**
 * Created by KevTS on 16/11/17.
 */

(function () {
    "use strict";


    function TeachersCtrl(TeachersSrv, $rootScope, $route) {

        $rootScope.title = $route.current.$$route.title;

        var teacherCopy;
        var vm = this;
        vm.formMode = false;
        vm.editMode = false;
        vm.teachers = [];
        vm.teacher = {id: "", name: "", lastname: "", gender: ""};

        vm.getTeachers = getTeachers;
        vm.openForm = openForm;

        vm.save = save;
        vm.cancel = cancel;
        vm.deleteTch = deleteTch;

        function getTeachers() {
            TeachersSrv.get().then(function (response) {
                vm.teachers = response;
                return vm.teachers;
            });
        }


        function openForm(teacher) {
            vm.formMode = true;
            if (teacher) {
                teacherCopy = angular.copy(teacher);
                vm.teacher = teacher;
                vm.editMode = true;
            }
        }

        function save(teacher) {
            if (vm.editMode) {
                vm.teachers.forEach(function (std) {
                    if (std.id == teacher.id) {
                        std.name = teacher.name;
                        std.lastname = teacher.lastname;
                        std.gender = teacher.gender;
                    }
                })
            }
            else {
                vm.teachers.push(teacher);
            }

            vm.cancel(true);
        }

        function cancel(success) {
            vm.formMode = false;
            vm.editMode = false;

            if (teacherCopy && !success) {
                vm.teacher.name = teacherCopy.name;
                vm.teacher.lastname = teacherCopy.lastname;
                vm.teacher.gender = teacherCopy.gender;
                teacherCopy = undefined;
            }

            vm.teacher = {id: "", name: "", lastname: "", gender: ""};
        }

        function deleteTch(teacher) {
            if (!confirm("Está seguro que desea eliminar el profesor " + teacher.name + "?")) {
                return false;
            }

            var index = vm.teachers.indexOf(teacher);
            vm.teachers.splice(index, 1);
        }


    }

    angular.module("SchoolApp").controller("TeachersCtrl", TeachersCtrl);


})();