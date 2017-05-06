/**
 * Created by nutan on 04/05/17.
 */

// controller definition
myApp.controller('myController', function ($scope, $http) {
    $scope.companyCard = [];
    $scope.suggestedTags = [];
    $scope.searchAll = '';
    $scope.searchMarket = '';
    $scope.showCustomisedList = false;
    $scope.companyDetailsArr = [];
    $scope.cities = [{city: 'Delhi-NCR', checked: false}, {city: 'Bangalore', checked: false}, {city: 'Mumbai', checked: false}, {city: 'Hyderabad', checked: false}, {city: 'Chennai', checked: false}];
    $scope.markets = [{market: 'E-commerce', checked: false}, {market: 'Education', checked: false}, {market: 'Enterprise software', checked: false}, {market: 'Health Care', checked: false}, {market: 'Mobile', checked: false}];
    $scope.stages = [{stage: 'Series A', checked: false}, {stage: 'Series B', checked: false}, {stage: 'Series C', checked: false}, {stage: 'Series D', checked: false}, {stage: 'Late', checked: false}, {stage: 'Pre Series A', checked: false}];
    $scope.getCompaniesList = function () {
        $http.get("script.json")
            .then(function(response) {
                for(var i=0; i<response.data.length; i++) {
                    $scope.companyDetailsArr.push(response.data[i]);
                }
                $scope.customisedListArr = $scope.getCustomisedList();
            });
    };
    $scope.getCompaniesList();

    $scope.getCustomisedList  = function () {
      $scope.keys = Object.keys($scope.companyDetailsArr[0]);
        $scope.arr = [];

      for(var i=0; i<$scope.keys.length; i++) {
          $scope.arr.push(
              {
                  key: $scope.keys[i], checked: true
              }
          )
      }
      return $scope.arr;
    };
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
    };
    $scope.clearKeyword = function () {
      $scope.searchAll = '';
      $scope.suggestedTags = [];
    };
    $scope.clearTag = function (index) {

    };
    $scope.getDisplayedTitle = function (str) {
        var arr = str.split(/(?=[A-Z])/);
        for(var j=0; j<arr.length; j++) {
            arr[j] = arr[j].charAt(0).toUpperCase()+ arr[j].slice(1);
        }
        var newStr = arr.join(' ');
        return newStr;
    };
    $('#slide-left-column').on('click', function() {
        $('.company-details-wrapper .inner-wrapper').animate({
            scrollLeft: "-=150px"
        }, "slow");
    });
    $('#slide-right-column').on('click', function() {
        $('.company-details-wrapper .inner-wrapper').animate({
            scrollLeft: "+=150px"
        }, "slow");
    });

    $scope.getSearchedTags = function($event){
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13 ) {
            $scope.suggestedTags.push($scope.searchAll);
            $scope.matchSuggestedTags($scope.suggestedTags);
            $scope.searchAll = '';
        }
    };
    $scope.removeTag = function (index) {
        $scope.suggestedTags.splice(index, 1);
    };
    $scope.matchSuggestedTags = function (suggestedTags) {
        for(var i=0; i<suggestedTags.length; i++) {
            $scope.cities.forEach(function(currentValue, index, arr) {
                if($scope.cities[index].city.toLowerCase() == suggestedTags[i]) {
                    $scope.cities[index]['checked'] = true;
                }
            });
            $scope.markets.forEach(function(currentValue, index, arr) {
                if($scope.markets[index].market.toLowerCase() == suggestedTags[i]) {
                    $scope.markets[index]['checked'] = true;
                }
            });
            $scope.stages.forEach(function(currentValue, index, arr) {
                if($scope.stages[index].stage.toLowerCase() == suggestedTags[i]) {
                    $scope.stages[index]['checked'] = true;
                }
            });
        }
    }
});
