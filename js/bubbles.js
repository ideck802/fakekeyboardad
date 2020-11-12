limit=function(number,min,max){return Math.min(Math.max(number,min),max);}
random=function(min,max){return(Math.random()*((max)-min)+min);}
bellRand=function(b,a){return((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1))*b+a};

function gen(width, height) {
  var h = bellRand(10,185);
  return {  x : limit(bellRand(width/3, width/2),0,width),
            y : random(20,height-20),
            vel : random(-1,-0.5),
            radius : limit(bellRand(1,10),0,2),
            radius_big : limit(bellRand(1,10),0,3),
            fill : "hsla("+h+", 89%, 60%,0.3)",
            stroke : "hsla("+h+", 75%, 60%,0.5)"};
}


/* rising bubbles */
(function() {
  'use strict';

  var bubbles = [],
      c = document.getElementById("bubbles"),
      ctx = c.getContext("2d"),
      width = ctx.canvas.width  = window.innerWidth,
      height = ctx.canvas.height = window.innerHeight;

  for(var i=0;i<100;i++) {
    bubbles.push(gen(width, height));
  }

  function run() {
    if(ctx.canvas.width !== window.innerWidth || ctx.canvas.height !== window.innerHeight) {
      width = ctx.canvas.width = window.innerWidth;
      height = ctx.canvas.height = window.innerHeight;
    }

    ctx.clearRect(0,0,width,height);

    for(var i=0,l=bubbles.length;i<l;i++) {
      var b = bubbles[i];
      b.vel = limit(b.vel * 1.05, -10, 0);
      b.y += b.vel;
      ctx.fillStyle = "#00b8fc";
      ctx.strokeStyle = "#00b8fc";
      ctx.beginPath();
      ctx.arc(b.x,b.y,b.radius_big,0,Math.PI*2,true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      if(b.y < 0) {
        bubbles[i] = gen(width, height);
      }
    }

    setTimeout(run, 1000 / 30);
  }
  run();
}());


/* rising bubbles for smaller screens */
(function() {
  'use strict';

  var bubbles = [],
      c = document.getElementById("bubbles_small"),
      ctx = c.getContext("2d"),
      width = ctx.canvas.width = window.innerWidth,
      height = ctx.canvas.height = window.innerHeight;

  for(var i=0;i<100;i++) {
    bubbles.push(gen(width, height));
  }

  function run() {
    if(ctx.canvas.width !== window.innerWidth || ctx.canvas.height !== window.innerHeight) {
      width = ctx.canvas.width = window.innerWidth;
      height = ctx.canvas.height = window.innerHeight;
    }

    ctx.clearRect(0,0,width,height);

    for(var i=0,l=bubbles.length;i<l;i++) {
      var b = bubbles[i];
      b.vel = limit(b.vel * 1.05, -10, 0);
      b.y += b.vel;
      ctx.fillStyle = "#00b8fc";
      ctx.strokeStyle = "#00b8fc";
      ctx.beginPath();
      ctx.arc(b.x,b.y,b.radius,0,Math.PI*2,true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      if(b.y < 0) {
        bubbles[i] = gen(width, height);
      }
    }

    setTimeout(run, 1000 / 30);
  }
  run();
}());
