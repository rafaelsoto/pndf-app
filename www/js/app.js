
angular.module('app', ['ionic'])

.controller('ListagemCtrl', function($scope, BackendService, $ionicLoading) {
    
    $ionicLoading.show({
        template: 'Loading...'
    });
    
    BackendService.getPercursos()
   .then(function(response) {
     $scope.chats = response;
   });
    $ionicLoading.hide();

})

.controller('AvisoCtrl', function($scope, $stateParams, BackendService, $ionicLoading) {
   $scope.chatId = $stateParams.chatId;
    
     $ionicLoading.show({
        template: 'Loading...'
    });
    
   $scope.chat = BackendService.getPercurso($scope.chatId).then(function(response) {
     $scope.chat = response;
   });
    
    $ionicLoading.hide();
})



.config(function($stateProvider, $urlRouterProvider) {

 $stateProvider
   .state('listagem', {
     url: "/listagem",
     templateUrl: "templates/listagem.html",
     controller: "ListagemCtrl"
   })
   .state('aviso', {
     url: "/aviso/:chatId",
     templateUrl: "templates/aviso.html",
     controller: "AvisoCtrl"
   });

 $urlRouterProvider.otherwise("/listagem");
})

.service('BackendService', function($http) {
 return {
   getPercursos: function() {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.get('https://glacial-thicket-18823.herokuapp.com/percursos')
       .then(function (response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Get Post', response);
         return response.data;
       });
   },
   getPercurso: function(percursoID) {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.get('https://glacial-thicket-18823.herokuapp.com/percurso/'+percursoID)
       .then(function (response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Get Post', response);
         return response.data;
       });
   } 
 };
})
