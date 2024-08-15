let clicks=0
var block=document.querySelector('img');
block.onclick=function() {
	var mysrc=block.getAttribute('src');
	if (mysrc==='block.png') {
		block.setAttribute('src', 'block2.png');
		setTimeout(()=>{block.setAttribute('src', 'block.png');},100);
	}
};
document.querySelector('html').onclick=()=>alert('Жми на блок')
	
		