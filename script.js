const score=document.querySelector(".score");
const startScreen=document.querySelector(".startScreen");
const gameArea=document.querySelector(".gameArea");
const game=document.querySelector(".game");
startScreen.addEventListener("click",start);
document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);

let player={speed:3}
let keys={ArrowUp:false,ArrowDown:false,ArrowRight:false,ArrowLeft:false}
function isCollide(a,b){

}

//function for moving lines
function moveLines(){
  let lines=document.querySelectorAll(".line");
  lines.forEach(function(item){
    console.log(item.y);
    if(item.y>1500){
      item.y-=1500;
    } 
    item.y+=player.speed;
    item.style.top=item.y+"px"; 
  })
}
function moveEnemy(){
  let ele=document.querySelectorAll(".enemy");
  ele.forEach(function(item){
    if(item.y>1500){
      item.y=-600;
      item.style.left=Math.floor(Math.random()*150)
      +"px";
    }
    item.y+=player.speed;
    item.style.top=item.y+"px"; 
  })
}


// Setting the start point for animation
function start(){
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  player.start=true;
  for(let x=0;x<10;x++){
    let lin=document.createElement("div");
    lin.classList.add("line");
    lin.y=x*160;
    lin.style.top=(x*150)+"px";
    gameArea.appendChild(lin);
  }
  window.requestAnimationFrame(playgame);
  let car =document.createElement("div"); 
  car.innerText="Car";
  car.setAttribute("class","car");
  gameArea.appendChild(car);
  player.x =car.offsetLeft;
  player.y=car.offsetTop;
  for(let x=0;x<3;x++){
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y=((x+1)*600)*-1;
    enemy.style.top=enemy.y+"px";
    enemy.style.left=Math.floor(Math.random()*90)+"px";
    enemy.style.backgroundColor="red";
    gameArea.appendChild(enemy);
  }}

function pressOn(e){
  e.preventDefault();
  keys[e.key]=true;
}
function pressOff(e){
  keys[e.key]=false;
  e.preventDefault();
}

function playgame() {
  console.log("inplay")
  let car=document.querySelector(".car");
  let road=gameArea.getBoundingClientRect();
  console.log(player.x);
  moveLines();
  moveEnemy();
  if(player.start){
    if(keys.ArrowUp){
      player.y -=player.speed;
    }
    if(keys.ArrowDown){
      player.y +=player.speed;
    }
    if(keys.ArrowLeft&&player.x>0)
    {
      player.x -=player.speed;
    }
    if(keys.ArrowRight&&player.x<(road.width-50))
    {
      player.x +=player.speed;
    }
    car.style.left=player.x+'px';
    car.style.top=player.y+'px';
    window.requestAnimationFrame(playgame);
 }
}
