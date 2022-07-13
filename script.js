let character = document.getElementById("player");
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));
let ground = document.getElementById("ground");
let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
let groundheight = parseInt(window.getComputedStyle(ground).getPropertyValue('height'));

let isJumping = false;
let upTime;
let downTime;
let displayScore = document.getElementById('points');
let score = 0;
function jump(){
    if(isJumping) return;
    upTime=setInterval(() => {
        if(characterBottom >=groundheight + 250){
            clearInterval(upTime);
            downTime=setInterval(()=>{
                if(characterBottom <= groundheight + 10){
                    clearInterval(downTime);
                    isJumping= false
                }
                characterBottom -= 10;
                character.style.bottom = characterBottom + 'px';  
            }, 20);
        }   
        characterBottom += 10;
        character.style.bottom = characterBottom + 'px'; 
        isJumping = true; 
    }, 20);
}

function showScore(){
    score++;
    displayScore.innerText = score;
}
setInterval(showScore,100);


function generateEnemy(){
    
    let enemies = document.querySelector('.enemies');
    let enemy = document.createElement('div');
    enemy.setAttribute('class', 'enemy');
    enemies.appendChild(enemy);
    console.log('test obstacle');

    let randomTimeout = Math.floor(Math.random() * 1000) + 1000;
    let enemyRight = -30;
    let enemyBottom = 100;
    let enemyWidth = 30;
    let enemyHeight = Math.floor(Math.random() * 50) + 50;
    enemy.style.backgroundColor = '#' + parseInt(Math.random() * 0xffffff).toString(16);


    function moveEnemy(){
        enemyRight += 5;
        enemy.style.right = enemyRight + 'px';
        enemy.style.bottom = enemyBottom + 'px';
        enemy.style.width = enemyWidth + 'px';
        enemy.style.height = enemyHeight + 'px';
        if(characterRight >= enemyRight - characterWidth && characterRight <= enemyRight + enemyWidth && characterBottom <= enemyBottom + enemyHeight){
            clearInterval(enemyInterval);
            clearTimeout(enemyTimeout);
            let sgameOver = document.querySelector('.sky');
            let gameOver = document.createElement('div');
            gameOver.setAttribute('class','gameOver');
            sgameOver.appendChild(gameOver);
            gameOver.innerText = "Game Over"
            stop();
                }
        
    }

    let enemyInterval = setInterval(moveEnemy, 20);
    let enemyTimeout = setTimeout(generateEnemy, randomTimeout) 
}


generateEnemy();

function control(e){

    if(e.key =='ArrowUp'|| e.key == ' '){
        jump();
        console.log('jump');
    }
}
                                         
document.addEventListener("keydown",control);