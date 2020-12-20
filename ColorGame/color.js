var numsquare=6;
var colorsArr=[];
var pickedColor;
var headingBackground=document.querySelector("h1");
var squares=document.querySelectorAll(".square");
var headingColor=document.querySelector('#headingColor');
var message =document.querySelector("#message");
var resetButton=document.querySelector("#resetButton");
var selected=document.querySelector('.selected');
var mode=document.querySelectorAll('.mode');

reset();



for(var i=0;i<mode.length;i++){
  mode[i].addEventListener('click',function(){
    mode[0].classList.remove('selected');
    mode[1].classList.remove('selected');
    this.classList.add('selected');
    this.textContent==='Easy' ? numsquare=3 : numsquare=6;
    reset();
  });
}


resetButton.addEventListener("click",function() {
    reset();
});


// reset funciton

function reset(){
  colorsArr=generateRandom(numsquare);
  pickedColor=pick(colorsArr);
  resetButton.textContent='New Colors';
  message.textContent='';
  headingColor.textContent=pickedColor;
   for(var i=0;i<squares.length;i++)
 {
 {
   squares[i].style.background=colorsArr[i]
 }

  squares[i].addEventListener("click",function(){
    var clickedColor=this.style.background;
    if (clickedColor===pickedColor){
        message.textContent='CORRECT';
        headingBackground.style.background=pickedColor;
        resetButton.textContent='Play Again';
        changeEachColor(pickedColor)
    }
    else{
        this.style.background="#232323";
        message.textContent='try again';

    }
    });
}
 headingBackground.style.background='steelblue';
}
//till here

//to match each square color with pickedColor
function changeEachColor(pickedColor){
  for (var i=0;i<squares.length;i++){
    squares[i].style.background=pickedColor;
  }
}
//till here

//random colors generation
function generateRandom(n){
  var arr=[];
  for (var i=0; i<n;i++){
    arr.push(random());
  }
  return arr;
}

function random(){
  var red=Math.floor(Math.random()*256);
  var green=Math.floor(Math.random()*256);
  var blue=Math.floor(Math.random()*256);
  return "rgb(" + red +", " +green+", " + blue + ")";
}
// till here

//pick random colors
function pick(arr){
  randompick=Math.floor(Math.random() * arr.length);
  return arr[randompick];
}
// till here
