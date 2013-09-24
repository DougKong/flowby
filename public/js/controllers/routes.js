angular.module('mean.routes')
.controller('RoutesController', 
  ["$scope", function ($scope) {
    $scope.oneAtATime = true;

    $scope.routes = [ 
      {
        shipmentName: "first shipment", 
        steps: [
          {step: 1, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
          {step: 2, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
          {step: 3, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
          {step: 4, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
          {step: 5, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
          {step: 6, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
          {step: 7, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
          {step: 8, instruction:'turn left', distance:'11mi', duration:'5 minutes'}
        ]
      },
      {
        shipmentName: '2nd shipment',
        steps: [
          {step: 1, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
          {step: 2, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
          {step: 3, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
          {step: 4, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
          {step: 5, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
          {step: 6, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
          {step: 7, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
          {step: 8, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
          {step: 9, instruction:'turn right', distance:'5mi', duration:'3 minutes'},
          {step: 10, instruction:'turn left', distance:'11mi', duration:'5 minutes'},
          {step: 11, instruction:'turn right', distance:'28mi', duration:'7 minutes'}]
      }
    ];
  $scope.myOptions = { data: 'route.steps' };
}]);