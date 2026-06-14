
document.addEventListener('DOMContentLoaded', function () {
    // 彩蛋功能实现
    const easterEggTrigger = document.querySelector('.easter-egg-content');
    
    if (easterEggTrigger) {
        easterEggTrigger.addEventListener('click', function (e) {
            if (e.target.closest('.easter-egg-logo')) {
                // 触发彩蛋效果
                activateEasterEgg();
            }
        });
    }
});

function activateEasterEgg() {
    // 创建炫彩效果
    const container = document.querySelector('.easter-egg-content');
    if (!container) return;
    
    // 添加彩蛋动画类
    container.classList.add('easter-egg-active');
    
    // 生成粒子效果
    for (let i = 0; i < 30; i++) {
        createParticle(container);
    }
    
    // 播放声音或其他效果
    console.log('🎉 Easter Egg Activated!');
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    
    document.body.appendChild(particle);
    
    // 动画效果
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let vx = (Math.random() - 0.5) * 8;
    let vy = (Math.random() - 0.5) * 8 - 2;
    let life = 1;
    
    function animate() {
        x += vx;
        y += vy;
        vy += 0.2; // 重力效果
        life -= 0.02;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = life;
        
        if (life > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}
