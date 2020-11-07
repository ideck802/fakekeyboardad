var canvas = document.getElementById('nokey'),
   can_w = parseInt(canvas.getAttribute('width')),
   can_h = parseInt(canvas.getAttribute('height')),
   ctx2 = canvas.getContext('2d');

// console.log(typeof can_w);

var ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      alpha: 1,
      phase: 0
   },
   ball_color = {
       r: 0,
       g: 184,
       b: 252
   },
   R = 2,
   balls = [],
   alpha_f = 0.03,
   alpha_phase = 0,

// Line
   link_line_width = 1,
   dis_limit = 260,
   add_mouse_point = true,
   mouse_in = false,
   mouse_ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      type: 'mouse'
   };

// Random speed
function getRandomSpeed(pos){
    var  min = -1,
       max = 1;
    switch(pos){
        case 'top':
            return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
            break;
        case 'right':
            return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
            break;
        case 'bottom':
            return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
            break;
        case 'left':
            return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
            break;
        default:
            return;
            break;
    }
}
function randomArrayItem(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumFrom(min, max){
    return Math.random()*(max - min) + min;
}
console.log(randomNumFrom(0, 10));
// Random Ball
function getRandomBall(){
    var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
    switch(pos){
        case 'top':
            return {
                x: randomSidePos(can_w),
                y: -R,
                vx: getRandomSpeed('top')[0],
                vy: getRandomSpeed('top')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'right':
            return {
                x: can_w + R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed('right')[0],
                vy: getRandomSpeed('right')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'bottom':
            return {
                x: randomSidePos(can_w),
                y: can_h + R,
                vx: getRandomSpeed('bottom')[0],
                vy: getRandomSpeed('bottom')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'left':
            return {
                x: -R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed('left')[0],
                vy: getRandomSpeed('left')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
    }
}
function randomSidePos(length){
    return Math.ceil(Math.random() * length);
}

// Draw Ball
function renderBalls(){
    Array.prototype.forEach.call(balls, function(b){
       if(!b.hasOwnProperty('type')){
           ctx2.fillStyle = 'rgba('+ball_color.r+','+ball_color.g+','+ball_color.b+','+b.alpha+')';
           ctx2.beginPath();
           ctx2.arc(b.x, b.y, R, 0, Math.PI*2, true);
           ctx2.closePath();
           ctx2.fill();
       }
    });
}

// Update balls
function updateBalls(){
    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b){
        b.x += b.vx;
        b.y += b.vy;

        if(b.x > -(50) && b.x < (can_w+50) && b.y > -(50) && b.y < (can_h+50)){
           new_balls.push(b);
        }

        // alpha change
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
        // console.log(b.alpha);
    });

    balls = new_balls.slice(0);
}

// loop alpha
function loopAlphaInf(){

}

// Draw lines
function renderLines(){
    var fraction, alpha;
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {

           fraction = getDisOf(balls[i], balls[j]) / dis_limit;

           if(fraction < 1){
               alpha = (1 - fraction).toString();

               ctx2.strokeStyle = 'rgba(0,184,252,'+1+')';
               ctx2.lineWidth = link_line_width;

               ctx2.beginPath();
               ctx2.moveTo(balls[i].x, balls[i].y);
               ctx2.lineTo(balls[j].x, balls[j].y);
               ctx2.stroke();
               ctx2.closePath();
           }
        }
    }
}

// calculate distance between two points
function getDisOf(b1, b2){
    var  delta_x = Math.abs(b1.x - b2.x),
       delta_y = Math.abs(b1.y - b2.y);

    return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
}

// add balls if there a little balls
function addBallIfy(){
    if(balls.length < 20){
        balls.push(getRandomBall());
    }
}

// Render
function render(){
    ctx2.clearRect(0, 0, can_w, can_h);

    renderBalls();

    renderLines();

    updateBalls();

    addBallIfy();

    window.requestAnimationFrame(render);
}

// Init Balls
function initBalls(num){
    for(var i = 1; i <= num; i++){
        balls.push({
            x: randomSidePos(can_w),
            y: randomSidePos(can_h),
            vx: getRandomSpeed('top')[0],
            vy: getRandomSpeed('top')[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10)
        });
    }
}
// Init Canvas
function initCanvas(){
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    can_w = parseInt(canvas.getAttribute('width'));
    can_h = parseInt(canvas.getAttribute('height'));
}
window.addEventListener('resize', function(e){
    console.log('Window Resize...');
    initCanvas();
});

function goMovie(){
    initCanvas();
    initBalls(20);
    window.requestAnimationFrame(render);
}
goMovie();

// Mouse effect
canvas.addEventListener('mouseenter', function(){
    console.log('mouseenter');
    mouse_in = true;
    balls.push(mouse_ball);
});
canvas.addEventListener('mouseleave', function(){
    console.log('mouseleave');
    mouse_in = false;
    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b){
        if(!b.hasOwnProperty('type')){
            new_balls.push(b);
        }
    });
    balls = new_balls.slice(0);
});
canvas.addEventListener('mousemove', function(e){
    var e = e || window.event;
    mouse_ball.x = e.pageX;
    mouse_ball.y = e.pageY;
    // console.log(mouse_ball);
});









var canvas2 = document.getElementById('nokey2'),
   can_w2 = parseInt(canvas2.getAttribute('width')),
   can_h2 = parseInt(canvas2.getAttribute('height')),
   ctx3 = canvas2.getContext('2d');

// console.log(typeof can_w);

var ball2 = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      alpha: 1,
      phase: 0
   },
   ball_color2 = {
       r: 0,
       g: 184,
       b: 252
   },
   R = 2,
   balls2 = [],
   alpha_f2 = 0.03,
   alpha_phase2 = 0,

// Line
   link_line_width2 = 1,
   dis_limit2 = 260,
   add_mouse_point2 = true,
   mouse_in2 = false,
   mouse_ball2 = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      type: 'mouse'
   };

// Random speed
function getRandomSpeed2(pos2){
    var  min2 = -1,
       max2 = 1;
    switch(pos2){
        case 'top':
            return [randomNumFrom2(min2, max2), randomNumFrom2(0.1, max2)];
            break;
        case 'right':
            return [randomNumFrom2(min2, -0.1), randomNumFrom2(min2, max2)];
            break;
        case 'bottom':
            return [randomNumFrom2(min2, max2), randomNumFrom2(min2, -0.1)];
            break;
        case 'left':
            return [randomNumFrom2(0.1, max2), randomNumFrom2(min2, max2)];
            break;
        default:
            return;
            break;
    }
}
function randomArrayItem2(arr2){
    return arr2[Math.floor(Math.random() * arr2.length)];
}
function randomNumFrom2(min2, max2){
    return Math.random()*(max2 - min2) + min2;
}
console.log(randomNumFrom2(0, 10));
// Random Ball
function getRandomBall2(){
    var pos2 = randomArrayItem2(['top', 'right', 'bottom', 'left']);
    switch(pos2){
        case 'top':
            return {
                x: randomSidePos2(can_w2),
                y: -R,
                vx: getRandomSpeed2('top')[0],
                vy: getRandomSpeed2('top')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom2(0, 10)
            }
            break;
        case 'right':
            return {
                x: can_w2 + R,
                y: randomSidePos2(can_h2),
                vx: getRandomSpeed2('right')[0],
                vy: getRandomSpeed2('right')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom2(0, 10)
            }
            break;
        case 'bottom':
            return {
                x: randomSidePos2(can_w2),
                y: can_h2 + R,
                vx: getRandomSpeed2('bottom')[0],
                vy: getRandomSpeed2('bottom')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom2(0, 10)
            }
            break;
        case 'left':
            return {
                x: -R,
                y: randomSidePos2(can_h2),
                vx: getRandomSpeed2('left')[0],
                vy: getRandomSpeed2('left')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom2(0, 10)
            }
            break;
    }
}
function randomSidePos2(length2){
    return Math.ceil(Math.random() * length2);
}

// Draw Ball
function renderBalls2(){
    Array.prototype.forEach.call(balls2, function(b2){
       if(!b2.hasOwnProperty('type')){
           ctx3.fillStyle = 'rgba('+ball_color2.r+','+ball_color2.g+','+ball_color2.b+','+b2.alpha+')';
           ctx3.beginPath();
           ctx3.arc(b2.x, b2.y, R, 0, Math.PI*2, true);
           ctx3.closePath();
           ctx3.fill();
       }
    });
}

// Update balls
function updateBalls2(){
    var new_balls2 = [];
    Array.prototype.forEach.call(balls2, function(b2){
        b2.x += b2.vx;
        b2.y += b2.vy;

        if(b2.x > -(50) && b2.x < (can_w2+50) && b2.y > -(50) && b2.y < (can_h2+50)){
           new_balls2.push(b2);
        }

        // alpha change
        b2.phase += alpha_f2;
        b2.alpha = Math.abs(Math.cos(b2.phase));
        // console.log(b.alpha);
    });

    balls2 = new_balls2.slice(0);
}

// loop alpha
function loopAlphaInf2(){

}

// Draw lines
function renderLines2(){
    var fraction2, alpha2;
    for (var i = 0; i < balls2.length; i++) {
        for (var j = i + 1; j < balls2.length; j++) {

           fraction2 = getDisOf2(balls2[i], balls2[j]) / dis_limit2;

           if(fraction2 < 1){
               alpha2 = (1 - fraction2).toString();

               ctx3.strokeStyle = 'rgba(0,184,252,'+1+')';
               ctx3.lineWidth = link_line_width2;

               ctx3.beginPath();
               ctx3.moveTo(balls2[i].x, balls2[i].y);
               ctx3.lineTo(balls2[j].x, balls2[j].y);
               ctx3.stroke();
               ctx3.closePath();
           }
        }
    }
}

// calculate distance between two points
function getDisOf2(b12, b22){
    var  delta_x2 = Math.abs(b12.x - b22.x),
       delta_y2 = Math.abs(b12.y - b22.y);

    return Math.sqrt(delta_x2*delta_x2 + delta_y2*delta_y2);
}

// add balls if there a little balls
function addBallIfy2(){
    if(balls2.length < 20){
        balls2.push(getRandomBall2());
    }
}

// Render
function render2(){
    ctx3.clearRect(0, 0, can_w2, can_h2);

    renderBalls2();

    renderLines2();

    updateBalls2();

    addBallIfy2();

    window.requestAnimationFrame(render2);
}

// Init Balls
function initBalls2(num2){
    for(var i = 1; i <= num2; i++){
        balls2.push({
            x: randomSidePos2(can_w2),
            y: randomSidePos2(can_h2),
            vx: getRandomSpeed2('top')[0],
            vy: getRandomSpeed2('top')[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom2(0, 10)
        });
    }
}
// Init Canvas
function initCanvas2(){
    canvas2.setAttribute('width', window.innerWidth);
    canvas2.setAttribute('height', window.innerHeight);

    can_w2 = parseInt(canvas2.getAttribute('width'));
    can_h2 = parseInt(canvas2.getAttribute('height'));
}
window.addEventListener('resize', function(e){
    console.log('Window Resize...');
    initCanvas2();
});

function goMovie2(){
    initCanvas2();
    initBalls2(20);
    window.requestAnimationFrame(render2);
}
goMovie2();

// Mouse effect
canvas2.addEventListener('mouseenter', function(){
    console.log('mouseenter');
    mouse_in2 = true;
    balls2.push(mouse_ball2);
});
canvas2.addEventListener('mouseleave', function(){
    console.log('mouseleave');
    mouse_in2 = false;
    var new_balls2 = [];
    Array.prototype.forEach.call(balls2, function(b2){
        if(!b2.hasOwnProperty('type')){
            new_balls2.push(b2);
        }
    });
    balls2 = new_balls2.slice(0);
});
canvas2.addEventListener('mousemove', function(e2){
    var e2 = e2 || window.event;
    mouse_ball2.x = e2.pageX;
    mouse_ball2.y = e2.pageY;
    // console.log(mouse_ball);
});







$(".span").mouseover(function(){
  $(".receiver10").addClass("w3-show")
});

$(".span").mouseout(function(){
  $(".receiver10").removeClass("w3-show")
});

$(".span").mouseover(function(){
  $(".receiver20").addClass("w3-show")
});

$(".span").mouseout(function(){
  $(".receiver20").removeClass("w3-show")
});

$(".span").mouseover(function(){
  $(".receiver30").addClass("w3-show")
});

$(".span").mouseout(function(){
  $(".receiver30").removeClass("w3-show")
});

$(".span2").mouseover(function(){
  $(".button10").addClass("w3-show")
});

$(".span2").mouseout(function(){
  $(".button10").removeClass("w3-show")
});

$(".span2").mouseover(function(){
  $(".button20").addClass("w3-show")
});

$(".span2").mouseout(function(){
  $(".button20").removeClass("w3-show")
});

$(".span2").mouseover(function(){
  $(".button30").addClass("w3-show")
});

$(".span2").mouseout(function(){
  $(".button30").removeClass("w3-show")
});
