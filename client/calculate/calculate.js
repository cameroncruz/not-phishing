Template.calculateButton.events({
  'click #calculate-button': function (event) {
    storePasswords();
    calculateHackingChance();

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
  var userScore = 1;
  var optimalScore = 9.41*Math.pow(10, 26);
  var possibleCharacters = 36; //Change based on survey question, ask user if passwords contain capitalization and or symbols (base 36, caps add 26, symbols add 34)
  var passwordCache = Session.get('passwordCache');
  var numberOfPasswords = passwordCache.length;
  var passwordScore = 0;
  for (var i = 0; i < numberOfPasswords; i++) {
    passwordScore = passwordScore+Math.pow(possibleCharacters, passwordCache[i].length);
  }
  userScore = userScore*passwordScore*numberOfPasswords;
  if (userScore > optimalScore) {
    userScore = optimalScore;
  }
  var scoreQuotient = Math.round(userScore/optimalScore*100);

  //Add code here for answering survey questions, safest responses add points to scoreQuotient
  var filesharing = document.getElementById('survey-filesharing').value;
  var friends = document.getElementById('survey-friends').value;
  var antivirus = document.getElementById('survey-antivirus').value;
  var encryption = document.getElementById('survey-encryption').value;

  var surveyAnswers1 = [filesharing, friends, antivirus, encryption];

  for (i = 0; i < surveyAnswers1.length; i++) {
    if (surveyAnswers1[i] === "secure") {
      scoreQuotient = scoreQuotient+1;
    }
  }

  var percentChance = 100-scoreQuotient;

  //Throttling the result to adjust for the large numbers issue
  var throttle = 1.5*numberOfPasswords;
  for (i = 0; i < numberOfPasswords; i++) {
    throttle = throttle*passwordCache[i].length;
  }
  if (throttle > 94) {
    throttle = 94;
  }
  throttledPercentChance = percentChance - throttle;
  if (throttledPercentChance < 1) {
    throttledPercentChance = 1;
  }
  Session.set('percentChanceNumber', throttledPercentChance);

  //Create string from percentage and truncate
  var truncatedPercentChance = throttledPercentChance.toString();
  if (truncatedPercentChance.length > 5) {
    truncatedPercentChance = truncatedPercentChance.slice(0,5);
  }
  Session.set('percentChanceString', truncatedPercentChance);

  //Calculate stats for results page
  //
  var averagePasswordLength = 0;
  for (i = 0; i < numberOfPasswords; i++) {
   averagePasswordLength = averagePasswordLength+passwordCache[i].length; 
  }
  averagePasswordLength = Math.round(averagePasswordLength/numberOfPasswords);

  var stats = {
    'numberOfPasswords': numberOfPasswords,
    'averagePasswordLength': averagePasswordLength
  };

  Session.set('stats', stats);
}