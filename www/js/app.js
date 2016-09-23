
angular.module('app', ['ionic'])

.controller('ListagemCtrl', function($scope, ChatService) {
  $scope.chats = ChatService.getChats();
})

.controller('AvisoCtrl', function($scope, $stateParams, ChatService) {
   $scope.chatId = $stateParams.chatId;
   $scope.chat = ChatService.getChat($scope.chatId);
})

.service('ChatService', function() {
 return {
   chats: [
     {
       id: "1",
       title: "Pedal 21/09/2016",
       message: "Pedal Gastronômico - 22Km HOJE (Quarta 21.09) Pizza na pedra"
     },
     {
      id: "2",
      title: "Pedal 20/09/2016",
      message: "Pedal Gastronômico - 22Km HOJE (Quarta 21.09) Pizza na pedra"
     },
     {
      id: "3",
       title: "Pedal Cancelado 19/09/2016",
       message: "Pedal Gastronômico - 22Km HOJE (Quarta 21.09) Pizza na pedra"
     },
     {
       id: "4",
       title: "Pedal 16/09/2016",
       message: "Pedal Gastronômico - 22Km HOJE (Quarta 21.09) Pizza na pedra"
     },
     {
       id: "5",
       title: "Pedal 15/09/2016",
       message: "Pedal Gastronômico - 22Km HOJE (Quarta 21.09) Pizza na pedra"
     }
   ],
   getChats: function() {
     return this.chats;
   },
   getChat: function(chatId) {
     for(i=0;i<this.chats.length;i++){
       if(this.chats[i].id == chatId){
         return this.chats[i];
       }
     }
   }
 }
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
