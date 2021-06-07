const btnNext=document.getElementById('btn-next');
const textlevel=document.getElementById('text-level');
const levelup=document.getElementById('levelup');
const levelcaption=document.getElementById('next_level');
const leveluptext=document.getElementById('leveltext');
const captionImg=document.getElementById('badimg');
const hearttest=document.getElementById('hearttext');
const pointtest=document.getElementById('pointtext');
const badheadimg1=document.getElementById('badhead01');
const badheadimg2=document.getElementById('badhead02');
const badheadimg3=document.getElementById('badhead03');
const bgm_audio=new Audio();
bgm_audio.src='./audio/bgmusic2.mp3';
const levelup_audio=new Audio();
levelup_audio.src='./audio/levelup3.mp3';
const gameover_audio=new Audio();
gameover_audio.src='./audio/gameover.mp3';
const victory_audio=new Audio();
victory_audio.src='./audio/yay.mp3';
let score=0;
let level=1;
let timer=0;
let countdown=15;
let monster_heart;
btnNext.onclick=()=>{
  btn_audio.play();
  bgm_audio.play();
  levelcaption.style.display="none";
  levelup.style.display="none";
  textScore.innerText=score;
  textlevel.innerText=level;

  if(level==1){
    countdown=15;
    timer=setInterval(game,2000);
  }else if(level==2){
    countdown=20;
    timer=setInterval(game,1500);
  }else if(level==3){
    countdown=30;
    timer=setInterval(game,1000);
  }else if(level==4){
    countdown=37;
    timer=setInterval(game,800);
  }

  updateHealthBar(heartVal);
  game();
}
const wait=(delay)=>{
  return new Promise((resolve,reject)=>{
    if(isNaN(delay)){
      reject(new Error('不是數字'))
    }
    
    setTimeout(()=>{
      resolve('過了'+delay+'毫秒')
    },delay)
  })
}
const game=async()=>{
  let monsternum=['1','2','3','4'];
  let hitmonstercount=0;
  for(const hole of holes){
    if(hole.style.background=='url("./images/bad01.png") center center / 140px 200px no-repeat' && level==1){
      hitmonstercount++  
    }else if(hole.style.background=='url("./images/bad02.png") center center / 140px 200px no-repeat' && level==2){
      hitmonstercount++  
    }else if(hole.style.background=='url("./images/bad03.png") center center / 140px 200px no-repeat' && level==3){
      hitmonstercount++  
    }else if(hole.style.background=='url("./images/bad04.png") center center / 140px 200px no-repeat' && level==4){
      hitmonstercount++  
    }

    hole.style.background="";
    hole.classList.remove('hit');
  }
  heartVal=heartVal-(0.5*hitmonstercount)
  updateHealthBar(heartVal);
  
  for(let i=0;i<3;i++){
    const random =Math.floor(Math.random()*9);
    const levelrandom=Math.floor(Math.random()*level);
    if(level==1){
      holes[random].style.background="url('./images/bad01.png') no-repeat center"
    }else if(level==2){ 
      holes[random].style.background="url('./images/bad0"+monsternum[levelrandom]+".png') no-repeat center";
    }else if(level==3){
      holes[random].style.background="url('./images/bad0"+monsternum[levelrandom]+".png') no-repeat center";
    }else if(level==4){
      holes[random].style.background="url('./images/bad0"+monsternum[levelrandom]+".png') no-repeat center";
    }
    holes[random].style.backgroundSize ="140px 200px";
  }
  countdown--
  
  if(countdown<=0){
    bgm_audio.pause();
    bgm_audio.currentTime = 0;
    levelup_audio.play();
    clearInterval(timer);
    for(const hole of holes){
      hole.style.background="";
    }
    levelup.style.display="block";
    await wait(3000)
    levelup.style.display="none";
    levelcaption.style.display="block";
    
    level++
    btnStart.disabled=false;
  }
  
  let finish_img
  let finish_text

  if(level==1){
    finish_img='./images/bad01-1.png';
    finish_text='GAME OVER';
    leveluptext.innerText='LEVEL UP';
  }else if(level==2){
    finish_img='./images/bad02-1.png';
    finish_text='GAME OVER';
    leveluptext.innerText='LEVEL UP';
    captionImg.src='./images/bad02.png';
    captionImg.style.transform='translate(85px, 170px)';
    hearttest.style.transform='translate(380px, -80px)'; 
    pointtest.style.transform='translate(380px, -10px)';
    pointtest.innerText='2'
    badheadimg1.style.transform='translate(370px, 40px)';
    badheadimg1.style.opacity='1';  
    btnNext.style.transform='translate(110px, 115px)';
  }else if(level==3){
    finish_img='./images/bad03-1.png';
    finish_text='GAME OVER';
    leveluptext.innerText='LEVEL UP';
    captionImg.src='./images/bad03.png';
    captionImg.style.transform='translate(85px, 140px)';
    hearttest.style.transform='translate(380px, -120px)'; 
    pointtest.style.transform='translate(380px, -50px)';
    pointtest.innerText='3'
    badheadimg1.style.transform='translate(370px, 0px)';
    badheadimg2.style.transform='translate(343px, 0px)';
    badheadimg1.style.opacity='1';  
    badheadimg2.style.opacity='1';  
    btnNext.style.transform='translate(110px, 75px)';
  }else if(level==4){
    finish_img='./images/bad04-1.png'
    finish_text='GAME OVER'
    leveluptext.innerText='VICTORY'
    captionImg.src='./images/bad04.png'
    captionImg.style.transform='translate(85px, 155px)';
    hearttest.style.transform='translate(380px, -100px)'; 
    pointtest.style.transform='translate(380px, -30px)';
    pointtest.innerText='4'
    badheadimg1.style.transform='translate(370px, 10px)';
    badheadimg2.style.transform='translate(343px, 10px)';
    badheadimg3.style.transform='translate(310px, 10px)';
    badheadimg1.style.opacity='1';  
    badheadimg2.style.opacity='1';
    badheadimg3.style.opacity='1';
    btnNext.style.transform='transform: translate(110px, 90px)';
  }else{
    finish_img='./images/finish.png'
    finish_text='STAGE CLEAR'
  }

    console.log(level);
  if(heartVal<=0 || level==5){
    clearInterval(timer);
    Swal.fire({
      title: finish_text,
      text: 'SCORE：'+score,
      imageUrl: finish_img,
      imageWidth: 200,
      imageHeight: 200,
    })
    bgm_audio.pause();
    bgm_audio.currentTime = 0;
    if(finish_text=='GAME OVER'){
      gameover_audio.play();
    }else{
      victory_audio.play();
    }
    levelcaption.style.display="none";
    levelup.style.display="none";
    btnStart.disabled=false;
    btnStart.style.display="block";
    captionImg.src='./images/bad01.png';
    captionImg.style.transform='translate(85px, 110px)';
    hearttest.style.transform='translate(380px, -150px)'; 
    pointtest.style.transform='translate(380px, -80px)';
    pointtest.innerText='1'
    badheadimg1.style.opacity='0';  
    badheadimg2.style.opacity='0';
    badheadimg3.style.opacity='0';
    for(const hole of holes){
      hole.style.background="";
    }
  }
}