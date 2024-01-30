const getFilmData = async () => {
	const response = await fetch('https://swapi.dev/api/films/');
	const data = await response.json()

	const films = data.results;
	console.log(films);
}
getFilmData()

