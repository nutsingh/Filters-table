/**
 * Created by nutan on 04/05/17.
 */


// initializing app
var myApp = angular.module('myApplication', ['ngRoute']);


// config route
myApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'index.html',
        controller: 'controllers/companyController.js'
    })
});
