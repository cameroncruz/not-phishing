Meteor.startup(function () {
  Session.set('arstoien', "none");
});

Template.results.helpers({
  'percentChance': function () {
    return Session.get('percentChanceString');
  },
  'resultColor': function () {
    return Session.get('stats').level;
  },
  'stats': function () {
    return Session.get('stats');
  },
  'surveyResponses': function () {
    return Session.get('stats').surveyResponses;
  }
});

Template.results.events({
  'click #button-return': function () {
    Session.set('passwordCache', []);
    Router.go("home");
    location.reload(true);
  }
});