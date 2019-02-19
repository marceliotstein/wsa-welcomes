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

function randomWelcome(welcomers) {
  var i = Math.floor(Math.random() * welcomers.length);
  return(welcomers[i]);
}

english = new Welcomer("English", "Welcome");
french = new Welcomer("French", "Bienvenue");
italian = new Welcomer("Italian", "Benvenuto");
czech = new Welcomer("Czech", "Vitej");
danish = new Welcomer("Danish", "Velkommen");
german = new Welcomer("German", "Willkomen");
greek = new Welcomer("Greek", "Kalos Orises");
bosnian = new Welcomer("Bosnian", "Dobrodosli");
chinese = new Welcomer("Chinese", "儿童游戏");
russian = new Welcomer("Russian", "добро пожаловать");
afrikaans = new Welcomer("Afrikaans","Welkom");
aleut = new Welcomer("Aleut","Qaĝaasakung huzuu haqakux̂");
amharic = new Welcomer("Amharic","እንኳን ደህና መጣሽ።");
arabic = new Welcomer("Arabic","أهلا بك");
mandarin = new Welcomer("Mandarin","歡迎光臨");
georgian = new Welcomer("Georgian","გამარჯობა");
gujurati = new Welcomer("Gujarati","સ્વાગત");
hindi = new Welcomer("Hindi","स्वागत हे");
irish = new Welcomer("Irish","Fáilte");
japanese = new Welcomer("Japanese","ようこそ");
korean = new Welcomer("Korean","환영");
lao = new Welcomer("Lao","ຍິນດີຕ້ອນຮັບ");
mongolian = new Welcomer("Mongolian","тавтай морил");
persian = new Welcomer("Persian","خوش آمدی");
polish = new Welcomer("Polish","Witamuy");
portuguese = new Welcomer("Portuguese","Bem-vinda");
punjabi = new Welcomer("Punjabi","ਸੁਆਗਤ ਹੈ");
sesotho = new Welcomer("Sesotho","amohela");
slovak = new Welcomer("Slovak","vitajte");
somali = new Welcomer("Somali","soo dhowow");
spanish = new Welcomer("Spanish","Bienvenido");
swahili = new Welcomer("Swahili","Kuwakaribisha");
turkish = new Welcomer("Turkish","Hoşgeldiniz");
urdu = new Welcomer("Urdu","خوش آمدید");
vietnamese = new Welcomer("Vietnamese","chào mừng");
xhosa = new Welcomer("Xhosa","Wamkelekile");
zulu = new Welcomer("Zulu","Wamukelekile");
lithuanian = new Welcomer("Lithuanian","Sveiki atvykę");
sanskrit = new Welcomer("Sanskrit","स्वागतम्");
romanian = new Welcomer("Romanian","Bine ai venit");
swedish = new Welcomer("Swedish","Välkomna");
telegu = new Welcomer("Telegu","సుస్వాగతం");
tibetan = new Welcomer("Tibetan","ཕེབས་པར་དགའ་བསུ་ཞུ།");
wolof = new Welcomer("Wolof","Merhbe");
uzbek = new Welcomer("Uzbek","Xush kelibsiz");
esperanto = new Welcomer("Esperanto","Bonvenon");

var welcomers = [english, french, italian, chinese, czech, danish, german,
                 russian, greek, bosnian, afrikaans, aleut, amharic, arabic,
                 mandarin, georgian, gujurati, hindi, irish, japanese, korean,
                 lao, mongolian, persian, polish, portuguese, punjabi, sesotho,
                 slovak, somali, spanish, swahili, turkish, urdu, vietnamese,
                 xhosa, zulu, lithuanian, sanskrit, romanian, swedish, telegu,
                 tibetan, wolof, uzbek, esperanto];

var fonts = ["Noto Sans","Noto Serif"];
var fontFactory = new RandomFontFactory(fonts);

var colors = ["black", "white"];
var colorFactory = new RandomColorFactory(colors);

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// most likely we will run this infinitely, but may use numLoops for testing
var total = 0;
var numLoops = 0;

async function sayWelcome(welcomers) {
  await sleep(2000);

  currentWelcome = randomWelcome(welcomers);

  // set message text and random styles
  $(".msg").text(currentWelcome.message);
  $(".msg").css("font-family", fontFactory.getOne());

  // because "animate" writes inline styles, we must use it again to reset animated styles
  $(".msg").animate({ 
  	"opacity": 1,
  	"font-size": "0em"
  }, 1, "swing");

  // make visible by setting color 
  $(".msg").css("color", colorFactory.getOne());

  // animate this message and initiate the next one 
  if ((numLoops==0) || (total < numLoops)) {
    $(".msg").animate({ 
  	"opacity": 0,
  	"font-size": "1.6em",
    }, 1900, "swing", sayWelcome(welcomers));
  } 
}

// put it in motion
$(document).ready(function(){
  sayWelcome(welcomers);
});
