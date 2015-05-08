/**
 * Created by zhouwenchaopom on 2015-4-18.
 */
var i=0;
var j=0;
var x=0;
var y=0;
var z=0;
var listClick=0;
var randomnum=0;
window.onload = function(){ 
	//加载进来显示声音中等，隐藏声音最大和最小
	$(".fa-volume-off,.fa-volume-up").hide();
	$(".fa-volume-down").show();
	//获取mp3的时间长度，并把秒转换成 ‘分：秒’格式的，并显示出来
	var length=parseInt($("audio")[0].duration);
　　var m=parseInt($("audio")[0].duration/60);
	var s=parseInt($("audio")[0].duration-60*m);
	var musicnow=$("audio")[0].currentTime;
	var time=m.toString()+":"+s.toString();
	//$($("#alltime")[0]).append("<span id='alltimespan' style='font-family : 微软雅黑,宋体;font-size: 3px;' >"+"0:00"+"</span>");
	$($("#nowtime")[0]).append("<span id='nowtimespan' style='font-family : 微软雅黑,宋体;font-size: 3px;' >"+"0:00"+"</span>");
	//var name=$("source")[0].src.split("/")[1].split(".")[0];
	//	-webkit-animation: load 3s ease-out infinite; 
	//加载进来的时候让播放进度条为o
	$($("#process")[0]).css("width","0%");
	//播放完成后让播放进度条置零
	if($("audio")[0].ended==true){
		$($("#process")[0]).css("width","0%");
	}
	
	var volume=$("audio")[0].volume;
	//音量图标点击次数
	i=0;
	//心型图标点击次数
	j=0;
	//loop点击次数
	x=0;
	//点击添加网路url的按钮次数
	y=0;
	//点击play的次数
	z=0;
	//列表按钮点击次数
	listClick=0;
	//点击random按钮次数
	randomnum=0;
	//setInterval("isCanPlay()", 1000);
	setInterval("isEnd()", 1000);
} 
function isCanPlay(){
	$("audio")[0].addEventListener('oncanplay', function(e){
        alert($("audio")[0].duration);
    }, false);
}
function isEnd(){
	if($("#nowtimespan").length!=0){
		$($("#nowtimespan")[0]).remove();
	}
	var length=parseInt($("audio")[0].duration);
	var musicnow=$("audio")[0].currentTime;
	var m=parseInt(musicnow/60);
	var s=parseInt(musicnow-60*m);
	if(s<10){
		s="0"+s.toString();
	}
	var time=m.toString()+":"+s.toString();
	$($("#nowtime")[0]).append("<span id='nowtimespan' style='font-family : 微软雅黑,宋体;font-size: 3px;' >"+time+"</span>");
	if(musicnow==length){
		$($("#process")[0]).css("width","0%");
	}
}
function play(){
	if(z-parseInt(z/2)*2==0){
		//移除钱一首歌的图片，并换上新歌的图片
		$($("#minPic")[0]).remove();
		$($("#musicPhoto")[0]).append("<img id='minPic' onclick='showPic()' src='img/非你不爱.jpg'>");
		//获取，MP3时间长度，并让播放进度条在MP3长度走完
		var length=parseInt($("audio")[0].duration);
		$($("#process")[0]).animate({
   			width:'100%'
 		}, length*1000);
 		$($("#iplay")[0]).css("display","none");
 		$($("#ipause")[0]).css("display","block");
		//开始播放
		$("audio")[0].play();
	}else{
		$($("#iplay")[0]).css("display","block");
 		$($("#ipause")[0]).css("display","none");
		$("audio")[0].pause();
	}
	

	$($("#process")[0]).css("animation-play-state","running");
	z=z+1;
}
function pause(){
	//暂停播放
	$("audio")[0].pause();
	$($("#process")[0]).css("animation-play-state","paused");
}
function voiceControl(){
	if(i-parseInt(i/2)*2==0){
		$("audio")[0].volume=0;//音量设置为0
		$(".fa-volume-down,.fa-volume-up").hide();//隐藏声音中等和最大图标
		$(".fa-volume-off").show();//显示声音关闭图标
		$($("#voiceInBar")[0]).css("width","0%");
		$("#voicerange")[0].valueAsNumber=0;
	}else{
		$("audio")[0].volume=1;//音量设置为1,1最大
		$(".fa-volume-down,.fa-volume-off").hide();//隐藏声音中等和关闭
		$(".fa-volume-up").show();//显示声音最大
		$($("#voiceInBar")[0]).css("width","100%");
		$("#voicerange")[0].valueAsNumber=1;
	}
	i=i+1;
	
}
function like () {
	if(j-parseInt(j/2)*2==0){
		$("#heart").css("color","#FD9393");
	}else{
		$("#heart").css("color","#989FA7");
	}
	j=j+1;
	
}
function light(value){
	var le=$(".fa-star-o").length;
	for(var l=0;l<le;l++){
		$($(".fa-star-o")[l]).css("color","#989FA7");
	}
	for(var l=0;l<value;l++){
		$($(".fa-star-o")[l]).css("color","#F6C15B");
	}
}
function loopmuisc(){
	if(x-parseInt(x/2)*2==0){
		$("audio")[0].loop=true;
		$($("#onlyOne")[0]).css("color","#F6C15B");
	}else{
		$("audio")[0].loop=false;
		$($("#onlyOne")[0]).css("color","#989FA7");
	}
	x=x+1;
}
function addmusic(){
	
	if(y-parseInt(y/2)*2==0){
		$($("#inputsrc")[0]).css("display","block");
	}else{
		$($("#inputsrc")[0]).css("display","none");
	}
	y=y+1;
}
function replacesrc(e){
	if(e=="13"||e==null){
		var src=$("#input")[0].value;
		src="../../../"+src;
		$("audio")[0].src=src;
		$("audio")[0].play();
	}
	
}
function setvolume(){
	var voice=$("#voicerange")[0].valueAsNumber;
	$("audio")[0].volume=voice;
	if(voice==0){
		$(".fa-volume-down,.fa-volume-up").hide();//隐藏声音中等和最大图标
		$(".fa-volume-off").show();//显示声音关闭图标
		$($("#voiceInBar")[0]).css("width","0%");
	}else if(voice>0.5){
		$(".fa-volume-down,.fa-volume-off").hide();//隐藏声音中等和关闭
		$(".fa-volume-up").show();//显示声音最大
		$($("#voiceInBar")[0]).css("width","100%");
	}else {
		$(".fa-volume-up,.fa-volume-off").hide();//隐藏声音中等和关闭
		$(".fa-volume-down").show();//显示声音最大
	}
}
function playMusic(value){
	$($("#minPic")[0]).remove();
	$($("#process")[0]).stop(true,true);
	$($("#process")[0]).css("width","0%");
	if(value==1){
		$("audio")[0].src="music/265_非你不爱.mp3";
		$("audio")[0].play();
		$("#playtitle")[0].textContent="非你不爱";
		$($("#musicPhoto")[0]).append("<img id='minPic' onclick='showPic()' name='非你不爱' src='img/非你不爱.jpg'>");
		$($("#iplay")[0]).css("display","none");
 		$($("#ipause")[0]).css("display","block");
	}else if(value==2){
		$("audio")[0].src="music/给我一个理由忘记.mp3";
		$("audio")[0].play();
		$("#playtitle")[0].textContent="给我一个理由忘记";
		$($("#musicPhoto")[0]).append("<img id='minPic' onclick='showPic()' name='给我一个理由忘记' src='img/给我一个理由忘记.jpg'>");
		$($("#iplay")[0]).css("display","none");
 		$($("#ipause")[0]).css("display","block");
	}else{
		$("audio")[0].src="music/有多少爱可以重来.mp3";
		$("audio")[0].play();
		$("#playtitle")[0].textContent="有多少爱可以重来";
		$($("#musicPhoto")[0]).append("<img id='minPic' onclick='showPic()' name='有多少爱可以重来' src='img/有多少爱可以重来.jpg'>");
		$($("#iplay")[0]).css("display","none");
 		$($("#ipause")[0]).css("display","block");
	}
	//$("audio").oncanplay=process();
	setTimeout('process()',1000);
}
function showList(){
	if(listClick-parseInt(listClick/2)*2==0){
		$("#musicList").css("display","block");
	}else{
		$("#musicList").css("display","none");
	}
	listClick=listClick+1;
	
}
function randomclick(){
	setInterval('randomMusic()',1000);
	if(randomnum-parseInt(randomnum/2)*2==0){
		$($("#random")[0]).css("color","#F6C15B");
		setInterval('randomMusic()',1000);
	}else{
		$($("#random")[0]).css("color","#989FA7");
		clearInterval(randomMusic());
	}
	randomnum=randomnum+1;
}
function randomMusic(){
	if($("audio")[0].ended==true){
		var num =Math.floor(Math.random()*3);
		playMusic(num+1);
	}
	
}
function process(){
	var length=parseInt($("audio")[0].duration);
	$($("#alltimespan")[0]).remove();
　　var m=parseInt($("audio")[0].duration/60);
	var s=parseInt($("audio")[0].duration-60*m);
	var time=m.toString()+":"+s.toString();
	$($("#alltime")[0]).append("<span id='alltimespan' style='font-family : 微软雅黑,宋体;font-size: 3px;' >"+time+"</span>");
	$($("#process")[0]).animate({
   		width:'100%'
 	}, length*1000);
}

function showPic(){
	var name=$("#minPic")[0].name;
	debugger
	if($("#maxImg").length==0){
			$($("#maxPic")[0]).append("<img id='maxImg' name='"+name+"' onclick='displayPic()' style='position:absolute;height:300px;width:400px' src='"+"img/"+name+".jpg'>");
	}else if($("#maxImg").length!=0){
		var imgName=$("#maxImg")[0].name;
		if(name==imgName){
			$($("#maxPic")[0]).css("display","block");
		}else{
			$($("#maxImg")[0]).remove();
			$($("#maxPic")[0]).append("<img id='maxImg' name='"+name+"' onclick='displayPic()' style='position:absolute;height:400px;width:500px;' src='"+"img/"+name+".jpg'>");
			$($("#maxPic")[0]).css("display","block");
		}
		
	}
}
function displayPic(){
	$($("#maxPic")[0]).css("display","none");
}