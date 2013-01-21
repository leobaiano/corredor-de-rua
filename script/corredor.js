var corredorderua = {
	percurso: {
		posicaoatual: new google.maps.LatLng(0,0),
		mapa: [
			new google.maps.LatLng(0,0)
		]
	}
}
function posicao(x) {
	corredorderua.percurso.posicaoatual = new google.maps.LatLng(x.coords.latitude,x.coords.longitude);
}
window.navigator.geolocation.watchPosition(posicao);

var i = 0;
function atualizaLocalizacao() {
	corredorderua.percurso.mapa[i] = corredorderua.percurso.posicaoatual;
	i = i + 1;
}
var atualiza;
function iniciaCorrida() {
	document.getElementById("finalizar").style.display = "block";
	document.getElementById("iniciar").style.display = "none";	
	atualiza = window.setInterval("atualizaLocalizacao()", 5000);
}
function finalizaCorrida() {
	clearInterval(atualiza);
	var options = {
		zoom: 15,
		center: corredorderua.percurso.posicaoatual,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		navigationControl: false,
		streetViewControl: false
	}
	var map = new google.maps.Map(document.getElementById('mapa'), options);	
	var polyline = new google.maps.Polyline({
		path: corredorderua.percurso.mapa,
		map: map
	});
}