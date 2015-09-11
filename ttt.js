$(document).ready(init); 

var xo = false; 
var gameover = false; 

function init() {
	$('#restart').click(restartClick); 
	$('#board').on('click', '.box',(tileClick)); 
};

function tileClick(event){
	event.stopPropagation();
	event.preventDefault();	
	var $this = $(this);
	var random = makeRGB();
	$this.css('background-color', random);
	$this.css('color', invertColor(random));
	if (!gameover && $this.text() === 'Click') {
		var mark = 'Click me';
		if (xo) {
			mark = 'X';
			xo = false; 
		} else {
			mark = 'O';
			xo = true; 
		}
		$this.text(mark); 		
		if (win(mark)) {
			gameover = true; 
			var $win = $('#win');
			var message = "Player " + mark + " wins!"
			$win.text(message); 
		};
	};
};

function restartClick(event){
	var $win = $('#win');
	var status = "Click"; 
	$('#t0').text(status); 
	$('#t1').text(status); 
	$('#t2').text(status); 
	$('#t3').text(status); 
	$('#t4').text(status); 
	$('#t5').text(status); 
	$('#t6').text(status); 
	$('#t7').text(status); 
	$('#t8').text(status); 
	xo = false; 
	gameover = false; 
	$win.text('');
}


var win = function(xo) {
	var $t0 = $('#t0'); 
	var $t1 = $('#t1'); 
	var $t2 = $('#t2'); 
	var $t3 = $('#t3'); 
	var $t4 = $('#t4'); 
	var $t5 = $('#t5'); 
	var $t6 = $('#t6'); 
	var $t7 = $('#t7'); 
	var $t8 = $('#t8'); 
	return(
		check($t0, $t1, $t2, xo) || 
		check($t3, $t4, $t5, xo) || 
		check($t6, $t7, $t8, xo) || 
		check($t0, $t3, $t6, xo) || 
		check($t1, $t4, $t7, xo) || 
		check($t2, $t5, $t8, xo) || 
		check($t0, $t4, $t8, xo) || 
		check($t2, $t4, $t6, xo) 
		);
};

var check = function(t, t1, t2, xo){
	return (t.text()===xo && t1.text()===xo && t2.text()===xo);
};

function makeRGB(){
	var hexString = (Math.floor(Math.random() * (parseInt('0xFFFFFF', 16) + 1))).toString(16);
	return "#" + ('00000' + hexString).slice(-6);
};

function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1);           
    color = parseInt(color, 16);          
    color = 0xFFFFFF ^ color;             
    color = color.toString(16);           
    color = ("000000" + color).slice(-6); 
    color = "#" + color;                  
    return color;
};