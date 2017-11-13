  const width = window.innerWidth
|| document.documentElement.clientWidth
  || document.body.clientWidth;

const height = window.innerHeight
|| document.documentElement.clientHeight
  || document.body.clientHeight;

const holder = d3.select("#main")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

// draw the text
var framerate = 60;
var frame = 1;
var count = 0;

const oneframe = () => {
  if (frame > framerate){
    frame = 1;
  }

  if (count < 50){
    
    let left = Math.random()*width;
    let top = Math.random()*height;
  
    holder.append("text")
      .style("fill", "white")
      .style("font-size", (40 + Math.random()*60) + "px")
      .style("opacity", Math.random()*0.7)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + left + "," + top +")")
      .attr("font-weight", 100 + Math.random()*500)
      .text("안녕하세요");

      count = count + 1;
  }else{
    holder.select('text').remove();
    count = count - 1;
  }
 
  holder.selectAll('text').each(function(d,i){
    let thisText = d3.select(this);
    let trans = d3.transform(thisText.attr("transform")).translate;
   
    let x = trans[0];
    let y = trans[1];

    thisText.attr("transform", "translate(" + (x + 1) + "," + y + ")");

    if (frame%4 == 0){
      let opacity = thisText.style("opacity");
      thisText.style("opacity", opacity - 1/60);
      if (thisText.opacity < 0.01 || x > width){
        thisText.remove();
        count = count - 1;
      }
    }



  });

  frame = frame + 1;
}

setInterval(oneframe, framerate);

function randInt(min, max) {
  return Math.floor((Math.random() * max) + min);
}
//==============================================================
//FADE IN FUNCTION USED FOR GRADIENT & COLOUR OVERLAY INFO
//==============================================================
var gradBg = document.querySelector(".gradient-background");

function fadeIn(el, ms) {
    var opacity = 0,
        interval = 10,
        gap = interval / ms;
    el.style.opacity = opacity;
    el.style.display = 'inline-block';

    function func() {
        opacity += gap;
        el.style.opacity = opacity;
        if (opacity >= 1) {
            window.clearInterval(fading);
        }
    }
    var fading = window.setInterval(func, interval);
}

fadeIn(gradBg, 600);

//==============================================================
//RGB GENERATOR
//==============================================================  
//random 0 to 255 number for rgb values
var redTop = randInt(0, 100);
var greenTop = randInt(0, 100);
var blueTop = randInt(0, 100);
var rgbTop = "rgb(" + redTop + "," + greenTop + "," + blueTop + ")";

var redBottom = randInt(0, 100);
var greenBottom = randInt(0, 100);
var blueBottom = randInt(0, 100);
var rgbBottom = "rgb(" + redBottom + "," + greenBottom + "," + blueBottom + ")";


var degrees = randInt(0, 360) + "deg";  

//==============================================================
//REVERSE RGB VALUE FOR CONTRAST TEXT COLOUR
//==============================================================  
//get the 'reverse' value for the displayed rgb value
function reverseRgb(rgbValue) {
    var revRgbValue = 255 - rgbValue;
    return revRgbValue;
}

var reverseRedTop = reverseRgb(redTop);
var reverseGreenTop = reverseRgb(greenTop);
var reverseBlueTop = reverseRgb(blueTop);
var reverseRgbTop = "rgb(" + reverseRedTop + "," + reverseGreenTop + "," + reverseBlueTop + ")";

var reverseRedBottom = reverseRgb(redBottom);
var reverseGreenBottom = reverseRgb(greenBottom);
var reverseBlueBottom = reverseRgb(blueBottom);
var reverseRgbBottom = "rgb(" + reverseRedBottom + "," + reverseGreenBottom + "," + reverseBlueBottom + ")";

//==============================================================
//CONVERT RGB TO HEX
//==============================================================
//convert rgb to hex
function rgbToHex(rgbValue) {
    //convert passed number to hexadecimal
    var rgbConverted = rgbValue.toString(16);
    //prefix a "0" if required
    return rgbConverted.length == 1 ? "0" + rgbConverted : rgbConverted;
};

var redHexTop = rgbToHex(redTop);
var greenHexTop = rgbToHex(greenTop);
var blueHexTop = rgbToHex(blueTop);
var hexTop = "#" + redHexTop + "" + greenHexTop + "" + blueHexTop;

var redHexBottom = rgbToHex(redBottom);
var greenHexBottom = rgbToHex(greenBottom);
var blueHexBottom = rgbToHex(blueBottom);
var hexBottom = "#" + redHexBottom + "" + greenHexBottom + "" + blueHexBottom;



//==============================================================
//SETTING TEXT VALUES
//==============================================================



//==============================================================
//SETTING COLOUR VALUES
//==============================================================
//set it so that if the buttons are at the bottom they are the bottom colours




//==============================================================
//SETTING THE MAIN GRADIENT
//==============================================================
document.querySelector(".gradient-background").style.backgroundImage = "linear-gradient(to bottom, " + rgbTop + "," + rgbBottom + ")";


//==============================================================
//SETTING BG TO BOTTOM COLOUR SO ITS NOT A JARRING FADE IN
//==============================================================
//bottom is used so that on ios devices the bottom colour shows
//through the bottom menu bar for continuity
document.querySelector("body").style.background = rgbBottom;


//==============================================================
//BLOCK OF COLOUR IN THE OVERLAYS
//==============================================================

