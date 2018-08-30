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

// return a random move from -=20px to +=20px
function randomMove() {
	let size = Math.round(Math.random() * 20);
	let dir = Math.random();
	if (dir < .5) {
		pre = "-=";
	} else {
		pre = "+=";
	}
	let out = pre + size;
	//console.log("move " + out);
	return(out);
}

// return a random font size from 1rem to 2rem
function randomSize() {
	let size = Math.round((Math.random() * 2)+.5);
    let out = size + "rem";
    //console.log("size " + out);
    return(out);
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

var colors = ["purple", "green", "olive", "lime", "navy", "black"];
var colorFactory = new RandomColorFactory(colors);

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var total = 0;
var numLoops = 15;

async function sayWelcome(welcomers, i) {
	// stop callback loop at end of array
	console.log("next i = " + i + " total is " + total);
	await sleep(1000);
	$(".msg").text(welcomers[i].message);
	$(".msg").css("color", colorFactory.getOne());
	$(".msg").css("font-family", fontFactory.getOne());

	// because "animate" writes inline styles, we must use it again to reset these styles
	$(".msg").css("font-size", randomSize());
	$(".msg").animate({ 
	  	"opacity": 1,
	  }, 1, "linear");
	let next = i + 1;
	total++;
	if (next>=welcomers.length) {
	  console.log("RESET");
	  next = 0;
	}
	if (total < numLoops) {
	  $(".msg").animate({ 
	  	"left": randomMove(), 
	  	"top": randomMove(),
	  	"opacity": 0,
	  }, 1000, "linear", sayWelcome(welcomers,next));
    } else {
    	console.log("... welcomes all done");
    }
}

$(document).ready(function(){
  	sayWelcome(welcomers, 0);
  	console.log("welcomes begun ...");
});