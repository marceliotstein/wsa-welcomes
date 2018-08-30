/*
 * welcomes.js
 */

var Welcomer = function(language, message) {
   this.language = language;
   this.message = message;
}

var RandomFontFactory = function(fonts) {
	this.fonts = fonts;
	this.len = fonts.length;
	this.getOne = function() {
		i = Math.round(Math.random() * this.len);
		return(this.fonts[i]);
	}
}

var RandomColorFactory = function(colors) {
	this.colors = colors;
	this.len = colors.length;
	this.getOne = function() {
		let i = Math.round(Math.random() * this.len);
		return(this.colors[i]);
	}
}

french = new Welcomer("French", "Bienvenue");
english = new Welcomer("English", "Welcome");
italian = new Welcomer("Italian", "Benvenuto");
czech = new Welcomer("Czech", "Vitej");
danish = new Welcomer("Danish", "Velkommen");
german = new Welcomer("German", "Willkomen");
greek = new Welcomer("Greek", "Kalos Orises");
bosnian = new Welcomer("Bosnian", "Dobrodosli");
chinese = new Welcomer("Chinese", "儿童游戏");
russian = new Welcomer("Russian", "добро пожаловать");

var welcomers = [french,english,italian,chinese,czech,danish,german,russian,greek,bosnian];

var fonts = ["Noto Sans","Noto Serif"];
var fontFactory = new RandomFontFactory(fonts);

var colors = ["purple", "green", "magenta", "olive", "brown", "navy"];
var colorFactory = new RandomColorFactory(colors);

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// most likely we will run this infinitely, but may use numLoops for testing
var total = 0;
var numLoops = 0;

async function sayWelcome(welcomers, i) {
	await sleep(2000);

	// set message text and random styles
	$(".msg").text(welcomers[i].message);
	$(".msg").css("color", colorFactory.getOne());
	$(".msg").css("font-family", fontFactory.getOne());

	// because "animate" writes inline styles, we must use it again to reset animated styles
	$(".msg").animate({ 
	  	"opacity": 1,
	  	"font-size": ".01em"
	  }, 1, "swing");


    // animate this message and initiate the next one 
	let next = i + 1;
	total++;
	if (next>=welcomers.length) {
	  next = 0;
	}
	if ((numLoops==0) || (total < numLoops)) {
	  $(".msg").animate({ 
	  	"opacity": 0,
	  	"font-size": "8em",
	  }, 2000, "swing", sayWelcome(welcomers,next));
    } 
}

// put it in motion
$(document).ready(function(){
  	sayWelcome(welcomers, 0);
});