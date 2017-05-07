(function () {
    'use strict';

    angular
        .module('CRM')
        .controller('CRMController', CRMController);

    CRMController.$inject = ['$scope'];

    function CRMController($scope) {
        //////////// scope functions //////////
        $scope.userCompleted = userCompleted;
        $scope.cancelButton = cancelButton;
        $scope.updateUser = updateUser;
        $scope.createNewUser = createNewUser;
        $scope.editUser = editUser;
        $scope.removeUser = removeUser;

        //////////// scope vars ////////////
        $scope.newUser = {};
        $scope.users = [];
        $scope.editing = false;
        $scope.studiesOptions = ['Primaria', 'Secundaria', 'Bachillerato', 'Ciclo o  Grado'];

        activate();

        ////////////////////////

        function activate() {
            loadLocalStorage();
        }

        function userCompleted() {
            return $scope.newUser.name && $scope.newUser.photo &&
                $scope.newUser.email && $scope.newUser.phone;
        }

        function cleanNewUser() {
            $scope.newUser = {};
            var form = $scope.editForm;
            form.$setUntouched();
            form.$setPristine();
        }

        function cancelButton() {
            if ($scope.editing) $scope.editing = false;
            cleanNewUser();
        }
        function createNewUser() {
            if (userCompleted()) {
                $scope.newUser.id = randId();
                $scope.users.push($scope.newUser);
                cleanNewUser();
                updateLocalStorage();
            }
        }

        function editUser(user) {
            $scope.newUser = angular.copy(user);
            $scope.editing = true;
        }

        function updateUser(user) {
            $scope.users.forEach(function (userToEdit, idx) {
                if (user.id == userToEdit.id) {
                    $scope.users[idx] = user;
                }
            });
            $scope.editing = false;
            cleanNewUser();
        }

        function removeUser(user) {
            var confirmation = prompt('Seguro que deseas borrar al usuario ?');
            if (confirmation == user.name) {
                $scope.users.forEach(function (userToRemove, idx) {
                    if (user.id == userToRemove.id) {
                        $scope.users.splice(idx, 1);
                    }
                });
                updateLocalStorage();
            }
        }

        //////// Storage /////
        function loadLocalStorage() {
            var customers = window.localStorage.getItem('customers');
            if (customers) {
                $scope.users = JSON.parse(customers);
            }
        }

        function updateLocalStorage() {
            window.localStorage.setItem('customers', JSON.stringify($scope.users));
        }
        ///////// end Storage ////////

        ///////// auxiliars  /////////
        function randId() {
            return Math.random().toString(36).substr(2, 20);
        }
    }
})();