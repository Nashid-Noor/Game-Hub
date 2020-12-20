const startScreen= document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const Score =document.querySelector('.Score');

let keys={ArrowUp: false, ArrowDown: false, ArrowRight:false,ArrowLeft:false}
let player={speed :5,score:0};

document.addEventListener('keydown',function(e){
    keys[e.key]=true;
});

document.addEventListener('keyup',function(e){
    keys[e.key]=false;
});

Score.classList.add('hide');
startScreen.addEventListener('click',function(){
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    Score.classList.remove('hide');

    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gameplay);
    for (let x=0;x<5;x++)
    {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class','roadLine');
        roadLine.y=x*150;
        roadLine.style.top =roadLine.y+'px';
        gameArea.appendChild(roadLine);
    }

    for (let x=0;x<3;x++){
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class','enemycar');
        enemycar.y=((x+1)*350)*-1;
        enemycar.style.top= enemycar.y+ 'px';
        enemycar.style.background='blue';
        enemycar.style.left=Math.floor(Math.random()*350) + 'px';
        gameArea.appendChild(enemycar);
        
    }

    let car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);
    player.x=car.offsetLeft;
    player.y=car.offsetTop;
});

function movelines()
{
    let lines = document.querySelectorAll('.roadLine');
    lines.forEach(function(item){
        if (item.y >= 620){
            item.y-=800;            
        }
        item.y+=player.speed;       
        item.style.top= item.y + 'px';        
    })
};

function endgame(){
    player.start=false;
    gameArea.innerHTML="";
    startScreen.classList.remove('hide') ;
    startScreen.innerHTML='Game over <br>' + 'Your Total Score is: ' + player.score + '<br> Click here to play again';     
}

function moveEnemy(car)
 {
    let enemycar = document.querySelectorAll('.enemycar');
    enemycar.forEach(function(item){
        if (collide(car,item)){
            endgame();
        }
        if (item.y >= 650){
            item.y=-300;
            item.style.left=Math.floor(Math.random()*350) + 'px';
        } 
        item.y+=player.speed;       
        item.style.top= item.y + 'px';        
    })
};

function collide(a,b){
    a=a.getBoundingClientRect()
    b=b.getBoundingClientRect();
    return !((a.top > b.bottom) || (a.bottom < b.top) || (a.right < b.left) || (a.left > b.right ) )
}

function gameplay(){  
    let car= document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    movelines();
    moveEnemy(car);
    if (player.start) {
   
        if (keys.ArrowUp && player.y>(road.top + 70)){ player.y-=player.speed }
        if (keys.ArrowLeft && player.x> 0){ player.x-=player.speed }
        if (keys.ArrowRight && player.x<road.width-50){ player.x+=player.speed }
        if (keys.ArrowDown && player.y<road.bottom-80){ player.y+=player.speed }
        car.style.top=player.y+'px';
        car.style.left=player.x+'px';
        player.score++;
        Score.innerText = 'Score: ' + player.score;
        window.requestAnimationFrame(gameplay)
    }
}; 


