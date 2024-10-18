document.addEventListener("DOMContentLoaded", function()
{
  //监听鼠标的按下、移动和松开事件，用于生成“球”模拟烟花的爆炸效果
  function clickEffect()
  {
    let balls = [];//每个球具有随机的属性（位置、速度、半径、颜色）
    let longPressed = false;
    let longPress;
    let multiplier = 0;
    let width, height;
    let origin;
    let normal;
    let ctx;
    const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);//创建了 canvas 元素并将其添加到 body,当按下鼠标时，在 canvas 上绘制球
    canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
    const pointer = document.createElement("span");
    pointer.classList.add("pointer");
    document.body.appendChild(pointer);

    if (canvas.getContext && window.addEventListener)
    {
      ctx = canvas.getContext("2d");
      updateSize();
      window.addEventListener('resize', updateSize, false);
      loop();
      window.addEventListener("mousedown", function(e)
      {
        pushBalls(randBetween(10, 20), e.clientX, e.clientY);
        document.body.classList.add("is-pressed");
        longPress = setTimeout(function()
        {
          document.body.classList.add("is-longpress");
          longPressed = true;
        }, 500);
      }, false);
      //下面是几个监听函数，用于捕获鼠标按下和松开，还有长按
      window.addEventListener("mouseup", function(e)
      {
        clearInterval(longPress);
        if (longPressed == true) {
          document.body.classList.remove("is-longpress");
          pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
          longPressed = false;
        }
        document.body.classList.remove("is-pressed");
      }, false);
      window.addEventListener("mousemove", function(e)
      {
        let x = e.clientX;
        let y = e.clientY;
        pointer.style.top = y + "px";
        pointer.style.left = x + "px";
      }, false);
    } else {
      console.log("canvas or addEventListener is unsupported!");
    }

    function updateSize()
    {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(2, 2);
      width = (canvas.width = window.innerWidth);
      height = (canvas.height = window.innerHeight);
      origin = {
        x: width / 2,
        y: height / 2
      };
      normal = {
        x: width / 2,
        y: height / 2
      };
    }

    class Ball//这里存储了每个球的基本属性
    {
      constructor(x = origin.x, y = origin.y) {
        this.x = x;
        this.y = y;
        this.angle = Math.PI * 2 * Math.random();
        if (longPressed == true) {
          this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
        } else {
          this.multiplier = randBetween(6, 12);
        }
        this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
        this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
        this.r = randBetween(8, 12) + 3 * Math.random();
        this.color = colours[Math.floor(Math.random() * colours.length)];
        this.color = colours[Math.floor(Math.random() * colours.length)] + "75"; // 加入透明度
      }
      update() //更新球位置的方法
      {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // 添加简单的重力效果

        this.x += this.vx - normal.x;
        this.y += this.vy - normal.y;
        normal.x = -2 / window.innerWidth * Math.sin(this.angle);
        normal.y = -2 / window.innerHeight * Math.cos(this.angle);
        this.r -= 0.3;
        this.vx *= 0.9;
        this.vy *= 0.9;
      }
    }

    // function pushBalls(count = 1, x = origin.x, y = origin.y)
    // {
    //   for (let i = 0; i < count; i++) {
    //     balls.push(new Ball(x, y));
    //   }
    // }

    function pushBalls(count = 1, x = origin.x, y = origin.y)
    {
      for (let i = 0; i < count; i++)
      {
        // 为每个生成的球生成更随机的属性
        balls.push(new Ball(x + Math.random() * 50 - 25, y + Math.random() * 50 - 25));
      }
    }

    function randBetween(min, max)
    {
      return Math.floor(Math.random() * max) + min;
    }

    function loop()//用于持续更新画布内容并调用更新球状态的函数
    {
      ctx.fillStyle = "rgba(255, 255, 255, 0)";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < balls.length; i++) {
        let b = balls[i];
        if (b.r < 0) continue;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
        ctx.fill();
        b.update();
      }
      if (longPressed == true) {
        multiplier += 0.2;
      } else if (!longPressed && multiplier >= 0) {
        multiplier -= 0.4;
      }
      removeBall();
      requestAnimationFrame(loop);//创建一个持续的动画循环，更新球的位置并绘制到画布上
    }

    function removeBall()//清理超出边界的球
    {
      for (let i = 0; i < balls.length; i++) {
        let b = balls[i];
        if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
          balls.splice(i, 1);
        }
      }
    }
  }

  clickEffect(); // 调用特效函数
});
