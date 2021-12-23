const snow = document.querySelector('.snow');

const sceneStart = document.querySelector('.scene.start');
const button = document.querySelector('.startbutton');

// スタートボタンで隠す
button.ontouchstart = function() {
    sceneStart.classList.add('hidden');

    const convertToMS = function(h, m, s) {
        return (
            (h * 60 * 60 * 1000) + 
            (m      * 60 * 1000) +
            (s           * 1000)
        );
    };
    window.app.timelimit = Date.now() + convertToMS(0, 0, 40);
    window.app.isGameStarted = true;
}

// 雪を複製する

const snowList = [];

for (let count = 0; count < 10; count += 1) {
    const snow = document.createElement('div');
    
    snow.classList.add('snow');
    sceneStart.appendChild(snow);
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    snow.style.left = `${x}px`;
    snow.style.top = `${y}px`;

    snowList.push(snow);
}


// 雪を動かす

const animateSnow = function() {
    for (let i = 0; i < snowList.length; i++) {
        const snow = snowList[i];
        
        let x = parseFloat(snow.style.left);// 'px' を取る
        let y = parseFloat(snow.style.top );// 'px' を取る
        
        const xMax = window.innerWidth + 20;
        const yMax = window.innerHeight + 20;
        
        // x += Math.random() * 10;
        y += Math.random() * 5;
        
        if (xMax <= x) {
            x -= xMax;
        }
        
        if (yMax <= y) {
            y -= yMax;
        }
        
        snow.style.left = `${x}px`;
        snow.style.top = `${y}px`;
    }
    
    requestAnimationFrame(animateSnow);
};

requestAnimationFrame(animateSnow);