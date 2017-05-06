/**
 * Created by nutan on 04/05/17.
 */

// controller definition
myApp.controller('myController', function ($scope, $http) {
    $scope.companyCard = [];
    $scope.showCustomisedList = false;
    $scope.companyDetailsArr = [];
    $scope.cities = ['Delhi-NCR', 'Bangalore', 'Mumbai', 'Hyderabad', 'Chennai'];
    $scope.markets = ['E-commerce', 'Education', 'Enterprise software', 'Health Care', 'Mobile'];
    $scope.stages = ['Series A', 'Series B', 'Series C', 'Series D', 'Late', 'Pre Series A'];
    $scope.getCompaniesList = function () {
        $http.get("script.json")
            .then(function(response) {
                for(var i=0; i<response.data.length; i++) {
                    $scope.companyDetailsArr.push(response.data[i]);
                }
            });
    };
    $scope.getCompaniesList();
    $scope.getCards = function (index) {
        $scope.companyCard[index] = true;
    };
    $scope.hideCards = function (index) {
        $scope.companyCard[index] = false;
    };
    $scope.loadMoreCompanyList = function () {
        $scope.getCompaniesList();
    };
    $scope.openCustomisedList = function () {
        $scope.showCustomisedList = true;
    };
    $scope.closeCustomisedList = function () {
        $scope.showCustomisedList = false;
    }
});
