
angular.module('app', ['ionic'])

.controller('ListagemCtrl', function($scope, BackendService) {
    BackendService.getPercursos()
   .then(function(response) {
     $scope.chats = response;
   });

})

.controller('AvisoCtrl', function($scope, $stateParams, BackendService) {
   $scope.chatId = $stateParams.chatId;
   $scope.chat = BackendService.getPercurso($scope.chatId).then(function(response) {
     $scope.chat = response;
   });
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
