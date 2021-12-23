const santa = document.querySelector('.santa')

const buttonLeft = document.querySelector('.button.left');
const buttonRight = document.querySelector('.button.right');
const scenePlay = document.querySelector('.scene.play');

// サンタを動かす
// document.ontouchstart = function(event){
//     event.preventDefault();
// }
// document.ontouchend = function(event){
//     event.preventDefault();
// }
document.addEventListener('touchstart', function(event){
    event.preventDefault();
}, true);
document.addEventListener('touchend', function(event){
    event.preventDefault();
}, true);

let x = 40;
let santaSpeed = 0;
const handleButtonLeftDown =function(event){
    event.preventDefault();
    console.log("左ボタンが押されています!");
    santaSpeed = -0.5;
    santa.classList.remove("right" , "stand");
    santa.classList.add("left","run");
}
const handleButtonLeftUp =function(event){
    event.preventDefault();
    santaSpeed = 0;
    santa.classList.remove("run");
    santa.classList.add("stand");
}

const handleButtonRightDown =function(event){
    event.preventDefault();
    santaSpeed = 0.5;
    santa.classList.remove("left" , "stand");
    santa.classList.add("right","run");
}
const handleButtonRightUp =function(event){
    event.preventDefault();
    santaSpeed = 0;
    santa.classList.remove("run");
    santa.classList.add("stand");
}

const moveSanta =  function (){
    // console.log("左へ!");
    x += santaSpeed ;
    santa.style.left = `${x}vw`;
    requestAnimationFrame(moveSanta);
}
requestAnimationFrame(moveSanta);

buttonLeft.onmousedown = handleButtonLeftDown;
buttonLeft.ontouchstart = handleButtonLeftDown;
buttonLeft.onmouseup = handleButtonLeftUp;
buttonLeft.ontouchend = handleButtonLeftUp;

buttonRight.onmousedown = handleButtonRightDown;
buttonRight.ontouchstart = handleButtonRightDown;
buttonRight.onmouseup = handleButtonRightUp;
buttonRight.ontouchend = handleButtonRightUp;

santa.className = "santa left stand one"


// 服を複製する
const clothesList = [];
for(let count = 0; count < 10; count += 1){
    const clothes = document.createElement("div");
    clothes.classList.add("clothes");
    scenePlay.appendChild(clothes);

    const getClothesClassname = function(){
        const a = Math.random();
        if (a < 0.2){
            return "not";
        } else {
            return "yes";
        }
        // const clothes = [
        //     'yes',
        //     'not'
        // ];
    
        // const a = Math.random();
        // const b = a * 2;
        // const c = Math.floor(b);
    
        // return clothes[c];
        }
    clothes.className = 'clothes ' + getClothesClassname();

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    clothes.style.left = `${x}px`;
    clothes.style.top = `${y}px`;

    clothesList.push(clothes);
}

// 服を動かす

const scoreDiv = document.querySelector('.scoreBoard');

let score = 0;

scoreDiv.innerHTML = score;

const animateClothes = function() {
    
    requestAnimationFrame(animateClothes);
    if(!window.app.isGameStarted){
        return;
    }

    for (let i = 0; i < clothesList.length; i++) {
        const clothes = clothesList[i];
        
        let clothesX = parseFloat(clothes.style.left);// 'px' を取る
        let clothesY = parseFloat(clothes.style.top );// 'px' を取る

        const santaX = parseFloat(santa.style.left) / 100 * window.innerWidth;
        const santaY = 60 / 100 * window.innerHeight;

        const a = santaY - clothesY;
        const b = santaX - clothesX;
        
        const c = Math.sqrt(a*a + b*b);
        
        const yMax = window.innerHeight + 20;
    
        
        // 画面外から出た時
        if (yMax <= clothesY) {
            const x = Math.random() * window.innerWidth;
            const y =Math.random() * -200;
            clothes.style.left = `${x}px`;
            clothes.style.top = `${y}px`;
            clothes.classList.remove('hit');
        // 画面内に居る時
        } else {
            clothesY += Math.random() * 7;
            clothes.style.top = `${clothesY}px`;
        }

        if (50 < c) {
            continue;
        }

        

        if (
            clothes.classList.contains('hit')
        ){
            continue;
        }
        
        console.log('hit!!!');
        clothes.classList.add('hit');

        if(
            clothes.classList.contains('not')
        ){ 
            window.app.timelimit -= 2000;
            continue;
        }
        
        console.log('+1 POINT!!!');
        score += 1;
        scoreDiv.innerHTML = score;
        if (50 <= score){
            console.log("level5");
            document.body.classList.remove("one","two","three","four");
            document.body.classList.add("five");
        } else if (35 <= score){
            console.log("level4");
            document.body.classList.remove("one","two","three","five");
            document.body.classList.add("four");
        } else if (25 <= score){
            console.log("level3");
            document.body.classList.remove("one","two","three","four","five");
            document.body.classList.add("three");
        } else if (10 <= score){
            console.log("level2");
            document.body.classList.remove("one","two","three","four","five");
            document.body.classList.add("two");
        } else {
            console.log("level1");
            document.body.classList.remove("one","two","three","four","five");
            document.body.classList.add("one");
        }
                    
            
            
    }
    
    
};

requestAnimationFrame(animateClothes);



// タイマー

const timer = document.querySelector('.timer');



const showTime = function(t) {
    if (t < 0) {
        t = 0;
    }
    
    const hh = Math.floor(t / (60 * 60 * 1000)     ).toString().padStart(2, '0');
    const mm = Math.floor(t / (     60 * 1000) % 60).toString().padStart(2, '0');
    const ss = Math.floor(t / (          1000) % 60).toString().padStart(2, '0');
    
    timer.innerHTML = `${hh}:${mm}:${ss}`;
};

// const window.app.timelimit = Date.now() + convertToMS(0, 0, 30);
let requestId;

const calcTime = function() {  
    requestId = requestAnimationFrame(calcTime);
    if(window.app.isGameStarted){
        const currentTime = Date.now();
        showTime(window.app.timelimit - currentTime);
        if (window.app.timelimit <= currentTime) {
            console.log('時間切れだよ!');
            scenePlay.classList.add('hidden'); 
            const end = document.querySelector(".scene.end");
            end.classList.remove("hidden");
            cancelAnimationFrame(requestId);
            window.app.isGameStarted = false; 
        }
    }
};

requestId = requestAnimationFrame(calcTime);

const back = document.querySelector(".back");
back.ontouchstart = handleBack;

function handleBack (){
    console.log("押された");
    location.reload();
}
