/**
 * Created by KevTS on 16/11/17.
 */


(function () {
    "use strict";

    function StudentsCtrl(StudentsSrv, $rootScope, $route) {

        $rootScope.title = $route.current.$$route.title;

        var studentCopy;
        var vm = this;
        vm.formMode = false;
        vm.editMode = false;
        vm.students = [];
        vm.student = {id: "", name: "", lastname: "", gender: ""};

        vm.getStudents = getStudents;
        vm.openForm = openForm;

        vm.save = save;
        vm.cancel = cancel;
        vm.deleteStd = deleteStd;

        function getStudents() {
            StudentsSrv.get().then(function (response) {
                vm.students = response;
                return vm.students;
            });
        }


        function openForm(student) {
            vm.formMode = true;
            if (student) {
                studentCopy = angular.copy(student);
                vm.student = student;
                vm.editMode = true;
            }
        }

        function save(student) {
            if(vm.editMode){
                vm.students.forEach(function (std) {
                    if(std.id == student.id){
                        std.name = student.name;
                        std.lastname = student.lastname;
                        std.gender = student.gender;
                    }
                })
            }
            else{
                vm.students.push(student);
            }

            vm.cancel(true);
        }

        function cancel(success) {
            vm.formMode = false;
            vm.editMode = false;

            if(studentCopy && !success){
                vm.student.name = studentCopy.name;
                vm.student.lastname = studentCopy.lastname;
                vm.student.gender = studentCopy.gender;
                studentCopy = undefined;
            }

            vm.student = {id: "", name: "", lastname: "", gender: ""};
        }

        function deleteStd(student){


            if(!confirm("Está seguro que desea eliminar el estudiante " + student.name + "?")){
                return false;
            }

            var index = vm.students.indexOf(student);
            vm.students.splice(index,1);

        }

    }


    angular.module("SchoolApp").controller("StudentsCtrl", StudentsCtrl);

})();