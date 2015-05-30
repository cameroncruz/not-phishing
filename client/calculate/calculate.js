Template.calculateButton.events({
  'click #calculate-button': function (event) {
    storePasswords();
  }
});

function storePasswords () {
  var timestamp = new Date();
  var passwordCache = Session.get('passwordCache');
  var passwordArray = [];
  for (var i = 0; i < passwordCache.length; i++) {
    passwordArray.push(passwordCache[i].password);
  }

  Passwords.insert({
    'timestamp': timestamp,
    'passwords': passwordArray
  });

}

function calculateHackingChance () {
  
}