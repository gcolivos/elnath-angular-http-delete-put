var app = angular.module('RestaurantApp', []);

app.controller('FoodController', ['$http', function ($http) {
    console.log('Food Controller has been loaded');
    var self = this;
    self.message = "Zip zap partner!";
    self.foodArray = [];

    self.newFood = { is_hot: false};

    self.getFood = function () {
        $http({
            method: 'GET',
            url: '/food'
        }).then(function(response){
            console.log('response', response.data);
            self.foodArray = response.data;

        })
    };

    self.getFood();

    self.addNewFood = function (newFood) {
        $http({
            method: 'POST',
            url: '/food',
            data: newFood
               
        }).then(function(response){
            console.log('response', response.data);
            self.newFood = { is_hot: false}; //to clear the form, we just set a new object to false. The two way binding automatically
            //clears the fields because the object is two way binding.
            //angular digest
            self.getFood();
        })
    };
}]);