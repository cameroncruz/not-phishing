Template.fruitQuote.helpers({
  'userFruit': function () {
    return Session.get('fruit');
  },
  'quote': function () {
    var quotes = ["The number of cyber attacks against private companies and operated by criminal crews will continue to increase in 2015.", "A new exploit kit specifically developed to compromise mobile platforms will soon be available in the wild.", "The number of cyber attacks against devices of the Internet of Things will rise inexorably.", "Point-of-sale (PoS) malware will become one of the most common methods of stealing data and money.", "In 2014, ransomware attacks soared 113%, seemingly in response to the increasing potency of malware detection."];
    var random = Math.floor(Math.random() * (quotes.length - 0 )) + 0;

    return quotes[random];
  }

});