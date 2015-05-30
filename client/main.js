//Events and Helpers
Template.survey.helpers({
	getValue: function(){
		switch(getElementById('slider').value()){
			case 0:
				return "Never";
			case 50:
				return "Sometimes";
			case 100:
				return "Always";
		}
	}
})