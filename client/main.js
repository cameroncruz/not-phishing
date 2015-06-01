Meteor.startup(function () {
  Session.set('arstoien', "none");
});

Template.results.helpers({
  'percentChance': function () {
    return Session.get('percentChanceString');
  },
  'resultColor': function () {
    if (Session.get('percentChanceNumber') > 69) {
      return "alert";
    } else if (Session.get('percentChanceNumber') < 45) {
      return "success";
    } else {
      return "warning";
    }
  },
  'stats': function () {
    return Session.get('stats');
  }
});

Template.results.events({
  'click #button-return': function () {
    Session.set('passwordCache', []);
  }
});