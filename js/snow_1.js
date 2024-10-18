function createSnowflake() {
  // 创建雪花元素
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';

  // 设置随机位置和大小
  const size = Math.random() * 10 + 5; // 雪花大小
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;

  // 使用背景颜色或SVG图形
  snowflake.style.backgroundColor = 'rgb(111,216,212)'; // 雪花颜色
  snowflake.style.borderRadius = '50%'; // 圆形雪花
  snowflake.style.left = `${Math.random() * window.innerWidth}px`; // 随机生成在横向位置

  // 设置下落的持续时间和随机消失
  const duration = Math.random() * 3 + 2; // 2到5秒
  snowflake.style.animationDuration = `${duration}s`;

  // 随机决定雪花是否在下落过程中消失
  if (Math.random() < 0.3) { // 30% 的概率消失
    snowflake.style.animation = `fall ${duration}s linear forwards, disappear 1s ease forwards`;
  } else {
    snowflake.style.animation = `fall ${duration}s linear forwards`;
  }

  // 添加雪花到文档中
  document.body.appendChild(snowflake);

  // 在动画结束后移除雪花
  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
  });
}

// 定时生成雪花
setInterval(createSnowflake, 200); // 每200毫秒生成一个雪花
