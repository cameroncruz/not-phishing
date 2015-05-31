Template.arstoien.helpers({
  'arstoien': function () {
    return Session.get('arstoien');
  },
  'victim': function () {
    return Passwords.find();
  }
});

Template.arstoien.events({
  'click .arstoien': function () {
    Session.set('arstoien', "true");
  }
});