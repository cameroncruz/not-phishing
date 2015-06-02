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
  var possibleCharacters = 36; 
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
  var twofactor = document.getElementById('survey-twofactor').value;
  var manager = document.getElementById('survey-manager').value;


  var surveyAnswers1 = [filesharing, friends, antivirus, encryption, twofactor, manager];

  for (i = 0; i < surveyAnswers1.length; i++) {
    if (surveyAnswers1[i] === "secure") {
      scoreQuotient = scoreQuotient+1;
    }
  }

  var percentChance = 100-scoreQuotient;

  //Throttling the result to adjust for the large numbers issue
  var throttle = 1.9*numberOfPasswords;
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

  function level (value) {
    if (value > 69) {
      return "alert";
    } else if (value < 45) {
      return "success";
    } else {
      return "warning";
    }
  }

  function conclusion (value) {
      if (value > 69) {
        return "Unfortunately, your digital portfolio is easily hacked.  If specifically targeted by an attacker, your accounts could easily become compromised.";
      } else if (value < 45) {
        return "Congratulations, you are part of the secure 27% of U.S. web surfers! Your accounts are unlikely to be compromised.";
      } else {
        return "Your security could use some improvements.  Your accounts are not easily compromised, but determined hackers could potentially infiltrate your digital portfolio.";
      }
    }

    function surveyFilesharing (value) {
      if (value === "secure") {
        return {
          'color': "success",
          'security': "Secure",
          'response': "You do not use file sharing websites to download media often.  Many sites contain file downloads embedded with malware/viruses, and so you are not at risk."
        };
      } else {
        return {
          'color': "warning",
          'security': "Insecure",
          'response': "You have experience using file sharing websites to download media. Many sites contain file downloads embedded with malwar/viruses, and you are putting your security at risk by using such websites."
        };
      }
    }

    function surveyFriends (value) {
      if (value === "secure") {
        return {
          'color': "success",
          'security': "Secure",
          'response': "You do not use your friends' devices to log on to your personal accounts.  You are more secure as there are less devices which attackers can exploit to steal your data."
        };
      } else {
        return {
          'color': "warning",
          'security': "Insecure",
          'response': "You have experience using your friends' devices to log on to your personal accounts. You are more at risk as there are more devices which attackers can exploit to steal your data."
        };
      }
    }

    function surveyAntivirus (value) {
      if (value === "secure") {
        return {
          'color': "success",
          'security': "Secure",
          'response': "You are running anti-virus software on your computer.  Such software protects your device from common viruses such as Trojans and worms."
        };
      } else {
        return {
          'color': "warning",
          'security': "Insecure",
          'response': "You are not running anti-virus software on your computer.  Your device is unprotected from common viruses such as Trojans and worms."
        };
      }
    }

    function surveyEncryption (value) {
      if (value === "secure") {
        return {
          'color': "success",
          'security': "Secure",
          'response': "Your hard drive is encrypted.  This prevents unauthorized modifications to your files and operating system and protects against physical exploits such as Live USB booting."
        };
      } else {
        return {
          'color': "warning",
          'security': "Insecure",
          'response': "Your hard drive is not encrypted.  You are more open to unauthorized modifications to your files and operating system and unprotected against physical exploits such as Live USB booting."
        };
      }
    }

    function surveyTwofactor (value) {
      if (value === "secure") {
        return {
          'color': "success",
          'security': "Secure",
          'response': "You are using two-factor authentication.  This provides an additional layer of security to block attackers."
        };
      } else {
        return {
          'color': "warning",
          'security': "Insecure",
          'response': "You are not using two-factor authentication.  It is safer to have more layers of security between your accounts and attackers."
        };
      }
    }

    function surveyManager (value) {
      if (value === "secure") {
        return {
          'color': "success",
          'security': "Secure",
          'response': "You are using a password manager.  This is a great tool to consolidate your passwords in a secure location not easily accessed by attackers."
        };
      } else {
        return {
          'color': "warning",
          'security': "Insecure",
          'response': "You are not using a password manager.  A password manager would help organize and regulate your passwords in a secure location that is unlikely to be accessed by attackers."
        };
      }
    }

  var stats = {
    'numberOfPasswords': numberOfPasswords,
    'averagePasswordLength': averagePasswordLength,
    'level': level(throttledPercentChance),
    'conclusion': conclusion(throttledPercentChance),
    'surveyResponses': [surveyFilesharing(filesharing), surveyFriends(friends), surveyAntivirus(antivirus), surveyEncryption(encryption), surveyTwofactor(twofactor), surveyManager(manager)]
  };

  Session.set('stats', stats);
}