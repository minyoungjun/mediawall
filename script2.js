  const width = window.innerWidth
|| document.documentElement.clientWidth
  || document.body.clientWidth;

const height = window.innerHeight
|| document.documentElement.clientHeight
  || document.body.clientHeight;

const holder = d3.select("body")
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
      .style("font-size", (30 + Math.random()*60) + "px")
      .style("opacity", Math.random()*0.7)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + left + "," + top +")")
      .attr("font-weight", "100")
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

// when the input range changes update the angle
