                            /// starting page  ///
var startbutton = document.querySelector('#start');
var bs=new Audio("button_sound.mp3");
startbutton.onclick = function () {
    console.log("Game Started");
    bs.play();
    startpage.style = "display:none";
    start_interval();
};

                           //again starting//
var again =document.querySelector('#start_again');
again.onclick= function (){
    console.log("Game Started");
    bs.play();
    parant.innerHTML='';
    alive_char='';
    missedball = 0;
    score=0;
    resultpage.style = "display:none";
    miss_index_color.style.background='';
    start_interval();
}



var startpage = document.querySelector('.start_page');
var resultpage =document.querySelector('.result');
var score=0;
var parant = document.getElementsByTagName('new')[0];

//// random charcter genrator
var chararr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function rendchar() {
    return chararr[Math.floor(Math.random() * 52)]
}
function rendint() {
    return Math.floor(Math.random() * 664)
}

///       append    ////
var alive_char = '';
var red_green_index=1;
function create() {
    newballchar = rendchar();
    alive_char += newballchar;
    console.log(alive_char);
    var newball = document.createElement(newballchar);
    parant.appendChild(newball);
    newball.className = "ball";
    newball.innerText = newballchar;
    
    {
        if(red_green_index==12)
        {
            newball.style.animation="godown 5s linear infinite";
            newball.style.backgroundColor="red";
            red_green_index=1;
            create();

        }
        else if (red_green_index==6) 
        {
            newball.style.animation="godown 7s linear infinite";
            newball.style.backgroundColor="green";
            red_green_index++;
            create();
        } 
        else 
        {
            red_green_index++;
        }
    }

    newball.style.right = rendint() + "px";
    missball(newball);
}
var startcreationinterval;
function start_interval() {
    create();
    startcreationinterval = setInterval(create, 1500);
}


//   e is an object of input key
var pause=0;
window.onkeydown = function (e) {
    alive_index = alive_char.indexOf(e.key);
    if (alive_index == -1){ 
        if(e.keyCode!=16 && e.keyCode!=32)
          { 
             score-=3; if(score<0)score=0;
             console.log(e.keyCode)}
        else if(e.keyCode!=16)
        {  if(pause){bs.play();run_game(); pause=0; startpage.style="display:none;"}
            else
            {bs.play();pause_game();pause=1;}
        }
        return;
    }
    score+=10;
    alive_char = alive_char.replace(e.key, '');
    var target = document.getElementsByTagName(e.key)[0];
    parant.removeChild(target);
}


///    typing over       ////

var missedball = 0;
var ms = new Audio('mbs.mp3');
var gos= new Audio('Game_Over.mp3');

function missball(newball) {
    newball.addEventListener("animationiteration", function () 
    {
        var target = newball;
        ms.play();
        parant.removeChild(target);
        alive_char = alive_char.replace(newball.innerText, '');
        missedball++;
        miss_color_change(missedball);
        console.log(missedball);
        ////     game over situation   /////
        if (missedball > 5) {
            console.log("Game Over");
            gos.play();
            pause_game();
            document.querySelector('#score').innerHTML=score;
          resultpage.style ="display:grid;"
        }
    })
}
/// to pause the game  ////
function pause_game(){
    clearInterval(startcreationinterval);
    var elements = document.getElementsByClassName('ball');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.animationPlayState = 'paused'; ///important line this is
    }
}
/// paused game again play  /////
function run_game(){
    start_interval();
    var elements = document.getElementsByClassName('ball');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.animationPlayState = 'running'; ///important line this is
    }
}        

var miss_index_color=document.querySelector('#miss_color');
var len=0;
function miss_color_change(i){
    len=i*17;
    miss_index_color.style.background=`linear-gradient( to right,red ${len}% ,#28ff28 0%)`;
}


window.addEventListener('blur', pause_game);
// ball.addEventListener("animationiteration",function(){
//         console.log("iteration happning");
// })




// window.addEventListener("keydown", function (e) {
//     var a =e.keyCode;
//     console.log(e.key);
//     if (e.keycode == "65") { console.log("rightkey"); }
//     console.log("input getten");
// })





            //   window.close();
            // window.stop();
            // clearInterval(interval);