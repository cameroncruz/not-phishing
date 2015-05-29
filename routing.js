//Routing
AppController = RouteController.extend({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'home',
  template: 'home',
  controller: 'AppController'
});