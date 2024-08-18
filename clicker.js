let clicks=0
var block=document.querySelector('img');
function updt() {
	document.getElementById('clicks').textContent = 'Блоков: ' + clicks;
};
block.onclick=function() {
	var mysrc=block.getAttribute('src');
	if (mysrc==='block.png') {
		block.setAttribute('src', 'block2.png');
		setTimeout(()=>{block.setAttribute('src', 'block.png');},50);
		clicks+=1;
		updt();
	}
};
