(function() {
  var canvas2 = document.getElementById("dots")
  var ctx = canvas2.getContext('2d');

  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight/2;

  var stars = [], // Array that contains the stars
    FPS = 60, // Frames per second
    x = canvas2.width/3; // Number of stars

  // Push stars to array
  for (var i = 0; i < x; i++) {
    stars.push({
      x: Math.random() * canvas2.width,
      y: Math.random() * canvas2.height,
      radius: Math.random(),
      vx: Math.floor(Math.random() * 10) - 5,
      vy: Math.floor(Math.random() * 10) - 5
    });
  }

  // Draw the scene
  function draw() {
    ctx.clearRect(0,0,canvas2.width,canvas2.height);
    ctx.globalCompositeOperation = "lighter";

    for (var i = 0, x = stars.length; i < x; i++) {
      var s = stars[i];

      ctx.fillStyle = "#00b8fc";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius * 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // Update star locations
  function update() {
    for (var i = 0, x = stars.length; i < x; i++) {
      var s = stars[i];

      s.x += s.vx / FPS;
      s.y += s.vy / FPS;

      if (s.x < 0 || s.x > canvas2.width) s.x = -s.x;
      if (s.y < 0 || s.y > canvas2.height) s.y = -s.y;
    }
  }

  // Update and draw
  function tick() {
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight/2;
    draw();
    update();
    requestAnimationFrame(tick);
  }
  tick();
}());
