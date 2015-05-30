//Session Variables
Session.set('passwordCache', []);

//Variables
var passwordCacheArray = [];

Template.passwordInputs.events({
  'click #button-add-password': function (event) {
    var newPassword = document.getElementById('input-password').value;
    var newPasswordLength = newPassword.length;

    var newPasswordDots = "";
    for (var i = 0; i < newPasswordLength; i++) {
      newPasswordDots = newPasswordDots.concat("•");
    }

    var passwordStrength = "";
    var passwordStrengthColor = "";

    if (newPasswordLength < 6) {
      passwordStrength = "Weak";
      passwordStrengthColor = "alert";
    } else if (newPasswordLength > 12) {
      passwordStrength = "Strong";
      passwordStrengthColor = "success";
    } else {
      passwordStrength = "Mediocre";
      passwordStrengthColor = "warning";
    }

    var newPasswordObject = {
      "password": newPassword,
      "length": newPasswordLength,
      "dots": newPasswordDots,
      "number": passwordCacheArray.length + 1,
      "strength": passwordStrength,
      "strengthColor": passwordStrengthColor
    };

    passwordCacheArray.push(newPasswordObject);
    Session.set('passwordCache', passwordCacheArray);
    document.getElementById('input-password').value = "";
  }
});

Template.passwordInputs.helpers({
  'passwordCache': function () {
    return Session.get('passwordCache');
  }
});