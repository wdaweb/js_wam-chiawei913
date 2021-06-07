var heartSc=document.getElementById('health-score');
var heartVal=5;
var getHeartsHtml = function(healthCount) {
  var heartsHtml = '';
  var heartstyle='';
  for (var i = 0; i < 5; i++) {
    if(healthCount==i+0.5){
      heartstyle='nes-icon is-medium is-half heart';
    }else if(healthCount==i||healthCount<i){
      heartstyle='nes-icon is-medium is-transparent heart';
    }else{
      heartstyle='nes-icon is-medium heart';
    }
    heartsHtml += '<span class="'+heartstyle+'" id='+i+'></span>'
  }
  console.log(healthCount)
  return heartsHtml;
}
var updateHealthBar = function(healthCount) {
  heartSc.innerHTML=getHeartsHtml(healthCount);
}

heartVal.onchange=function() {
  updateHealthBar(this);
}
updateHealthBar(heartVal);