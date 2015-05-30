Template.calculateButton.events({
  'click #calculate-button': function (event) {
    storePasswords();

    Router.go('calculating');
    setTimeout(function () {
      Router.go('results');
    }, 6000);
  }
});


var fruits = ["Apple", "Banana", "Carrot", "Grapes", "Lemon", "Melon", "Orange", "Pear", "Pepper", "Pumpkin", "Radish", "Strawberry"];

function storePasswords () {
  var timestamp = new Date();
  var passwordCache = Session.get('passwordCache');
  var passwordArray = [];
  for (var i = 0; i < passwordCache.length; i++) {
    passwordArray.push(passwordCache[i].password);
  }

  var fruitToIndex = Passwords.find().count()%12;
  var fruit = fruits[fruitToIndex];
  Session.set('fruit', fruit);

  Passwords.insert({
    'timestamp': timestamp,
    'passwords': passwordArray,
    'fruit': fruit
  });

}

function calculateHackingChance () {
  
}