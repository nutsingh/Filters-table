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

    /**
     * Fetch the JSON data of company
     */
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

    /**
     * maintained an array for customised column purpose
     * @return {Array}
     */
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

    /**
     * a company card is shown on mouse over
     * @param index integer
     */
    $scope.getCards = function (index) {
        $scope.companyCard[index] = true;
    };
    /**
     * a company card is hidden on mouse leave
     * @param index integer
     */
    $scope.hideCards = function (index) {
        $scope.companyCard[index] = false;
    };
    /**
     * Request more data on load more button
     */
    $scope.loadMoreCompanyList = function () {
        $scope.getCompaniesList();
    };
    /**
     * used to show the customised list of different categories of company
     */
    $scope.openCustomisedList = function () {
        $scope.showCustomisedList = true;
    };
    /**
     * hide the customised list of different categories of company
     */
    $scope.closeCustomisedList = function () {
        $scope.showCustomisedList = false;
    };
    /**
     * clear the entered keyword in input box
     */
    $scope.clearKeyword = function () {
      $scope.searchAll = '';
      $scope.suggestedTags = [];
    };
    /**
     * sanitize the title of different categories of company like (totalFunding to Total Funding) for display purpose
     * @param str string
     * @return {string}
     */
    $scope.getDisplayedTitle = function (str) {
        var arr = str.split(/(?=[A-Z])/);
        for(var j=0; j<arr.length; j++) {
            arr[j] = arr[j].charAt(0).toUpperCase()+ arr[j].slice(1);
        }
        var newStr = arr.join(' ');
        return newStr;
    };
    /**
     * slide the columns from right to left
     */
    $('#slide-left-column').on('click', function() {
        $('.company-details-wrapper .inner-wrapper').animate({
            scrollLeft: "-=150px"
        }, "slow");
    });
    /**
     * slide the columns from left to right
     */
    $('#slide-right-column').on('click', function() {
        $('.company-details-wrapper .inner-wrapper').animate({
            scrollLeft: "+=150px"
        }, "slow");
    });

    /**
     * get the searched tag on key enter
     * @param $event
     */
    $scope.getSearchedTags = function($event){
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13 ) {
            $scope.suggestedTags.push($scope.searchAll);
            $scope.matchSuggestedTags($scope.suggestedTags);
            $scope.searchAll = '';
        }
    };
    /**
     * used to remove the tag
     * @param index integer
     */
    $scope.removeTag = function (index) {
        $scope.suggestedTags.splice(index, 1);
    };
    /**
     * set the matched keywords in list to true
     * @param suggestedTags Array
     */
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
