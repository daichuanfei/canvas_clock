var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;
function drawClockPlate(){
	ctx.save();//让画布原点回到默认位置，即左上角
	ctx.translate(r,r);//改变原点位置
	ctx.beginPath();
	ctx.arc(0,0,r-5,0,Math.PI*2);
	ctx.lineWidth = 10;
	ctx.strokeStyle = "#4B1518";
	ctx.stroke();
	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
	hourNumbers.forEach(function(number, index){
		var rad = Math.PI / 6 * index;
		var x = Math.cos(rad)*(r-40);
		var y = Math.sin(rad)*(r-40);
		ctx.font = "18px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		ctx.fillText(number,x,y);
	})
	//表盘刻度
	for (var i = 0; i < 60; i++){
		ctx.save();
		var rad = i * Math.PI / 30;
		ctx.beginPath();
		ctx.rotate(rad);
		ctx.lineWidth = 2;
		if (i % 5 == 0){
			ctx.strokeStyle = "red";
			ctx.moveTo(0,-r + 28);
			ctx.lineTo(0,-r + 15);
		}else{
			ctx.strokeStyle = "#333";
			ctx.moveTo(0,-r + 25);
			ctx.lineTo(0,-r + 15);
		}
		ctx.stroke();
		ctx.restore();
	}
	ctx.restore();
}


function clock_hand(){
	ctx.clearRect(0,0,width,height);//每一秒之后清除画布
	var day = new Date();
	var hours = day.getHours();
	var minutes = day.getMinutes();
	var seconds = day.getSeconds();
	drawClockPlate();

	//时钟
	ctx.save();//保存当前状态
	ctx.beginPath();
	ctx.translate(r,r);
	ctx.rotate((hours + minutes / 60) * Math.PI / 6);
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#000";
	ctx.moveTo(0, 3);
	ctx.lineTo(0, -r/2 - 20);
	ctx.stroke();
	ctx.restore();//还原保存的状态


	//分钟
	ctx.save();
	ctx.beginPath();
	ctx.translate(r,r);
	ctx.rotate(minutes*Math.PI/30 + seconds / 60 * Math.PI / 30);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#333";
	ctx.moveTo(0,5);
	ctx.lineTo(0,-r/3*2);
	ctx.stroke();
	ctx.restore();	

	//秒钟
	ctx.save();
	ctx.beginPath();
	ctx.translate(r,r);
	ctx.rotate(seconds*Math.PI/30);
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#f00";
	ctx.moveTo(0,8);
	ctx.lineTo(0,-r/3*2-15);
	ctx.stroke();
	ctx.restore();		
}

clock_hand();
setInterval(clock_hand, 1000);
			
			