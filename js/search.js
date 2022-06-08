function searchCar(e){

	let search = document.querySelector('#searchInput').value;
	let searchMarca = document.querySelector("#searchMarca").value
	let searchModelo = document.querySelector("#searchModelo").value
	let searchTipo = document.querySelector("#searchTipo").value
	let searchLocal = document.querySelector("#searchLocal").value

	let data = [{
		'input': search,
		'marca': searchMarca,
		'modelo': searchModelo,
		'tipo': searchTipo,
		'local': searchLocal
	}];

	console.log(data);
}

// PEGA AS MARCAS DOS CARROS ASSIM QUE A PAGINA É ABERTA
const url = "https://e-carros-api.herokuapp.com/brands";

fetch(url).then(resp =>{ return resp.json()}).then(response => {
	let select = document.querySelector("#searchMarca");

	response.forEach(marca => {
		let option = new Option(marca.id, marca.id);
		select.add(option);
	});
	
});