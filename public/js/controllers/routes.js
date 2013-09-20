angular.module('mean.routes')
.controller('RoutesController', 
  ["$scope", function ($scope) {
    $scope.steps = [
      {order: 1, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
      {order: 2, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
      {order: 3, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
      {order: 4, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
      {order: 5, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
      {order: 6, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
      {order: 7, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
      {order: 8, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
      {order: 9, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
      {order: 10, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
      {order: 11, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
      {order: 12, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
      {order: 13, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
      {order: 14, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
      {order: 15, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
      {order: 16, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
      {order: 17, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
      {order: 18, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
      {order: 19, instruction:'turn right', distance:'28mi', duration:'7 minutes'}
    ];
}]);