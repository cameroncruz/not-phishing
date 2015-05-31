//Routing
AppController = RouteController.extend({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'home',
  template: 'home',
  controller: 'AppController'
});

Router.route('/calculating', {
  name: 'calculating',
  template: 'loading',
  controller: 'AppController'
});

Router.route('/results', {
  name: 'results',
  template: 'results',
  controller: 'AppController'
});

Router.route('/arstoien', {
  name: 'arstoien',
  template: 'arstoien'
});