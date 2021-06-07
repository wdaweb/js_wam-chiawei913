const btnStart=document.getElementById('btn-start');
const holes=document.getElementsByClassName('holes');
const textScore=document.getElementById('text-score');
const audio=new Audio();
audio.src='./audio/hit.mp3';
const btn_audio=new Audio();
btn_audio.src='./audio/button.mp3';

btnStart.onclick=()=>{
  btn_audio.play();
  btnStart.disabled=true;
  btnStart.style.display="none";
  levelcaption.style.display="block";
  score=0;
  level=1;
  textScore.innerText=score;
  textlevel.innerText=level;
  countdown=15;
  heartVal=5;
  updateHealthBar(heartVal);
}
document.onkeydown=(event)=>{
  if(!isNaN(event.key) && event.code.includes('Numpad')){
    audio.play();
    const target=document.getElementById(`hole${event.key}`);
    console.log(target.id.slice(3,5))
    var hitnum=target.id.slice(3,5);
    var imgName=target.style.background.slice(14, 19);
    if(target!==null && imgName=="bad01" && level==1){
      target.style.background="url('./images/bad01-1.png') no-repeat center";
      score++;
    }else if(target!==null && imgName=="bad02" && level==2){
      target.style.background="url('./images/bad02-1.png') no-repeat center";
      score=score+2;
    }else if(target!==null && imgName=="bad03" && level==3){
      target.style.background="url('./images/bad03-1.png') no-repeat center";
      score=score+3;
    }else if(target!==null && imgName=="bad04" && level==4){
      target.style.background="url('./images/bad04-1.png') no-repeat center";
      score=score+4;
    }else{
      target.style.background="url('./images/"+imgName+"-1.png') no-repeat center";
      heartVal=heartVal-0.5;
      updateHealthBar(heartVal);
    }
    target.style.backgroundSize ="140px 200px";
    textScore.innerText=score;
    if(hitnum=="e7"){
      document.getElementById("e7").style.display="block"
    }else if(hitnum=="e8"){
      document.getElementById("e8").style.display="block"
    }else if(hitnum=="e9"){
      document.getElementById("e9").style.display="block"
    }else if(hitnum=="e4"){
      document.getElementById("e4").style.display="block"
    }else if(hitnum=="e5"){
      document.getElementById("e5").style.display="block"
    }else if(hitnum=="e6"){
      document.getElementById("e6").style.display="block"
    }else if(hitnum=="e1"){
      document.getElementById("e1").style.display="block"
    }else if(hitnum=="e2"){
      document.getElementById("e2").style.display="block"
    }else if(hitnum=="e3"){
      document.getElementById("e3").style.display="block"
    }
  }
}
document.onkeyup=(event)=>{
  audio.pause();
  audio.currentTime = 0;
  if(!isNaN(event.key) && event.code.includes('Numpad')){
    const target=document.getElementById(`hole${event.key}`);
    target.classList.remove('down');
    for(i=1;i<=9;i++){
      document.getElementById("e"+i).style.display="none"
    }
  }
}