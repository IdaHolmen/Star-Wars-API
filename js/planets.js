const subContainer = document.querySelector('.sub-container');

//MAKING BACK BUTTON FUNCTIONAL
const backButton = document.querySelector('.back-button');
backButton.addEventListener('click', ()=> {
	window.location.href = 'index.html';
});

//ADDING PAGE LOADER
const pageLoader = document.createElement('div');
pageLoader.classList.add('loader');
subContainer.append(pageLoader);

//FETCHING FROM API
const getData = async () => {
	try {
		const response = await fetch('https://swapi.dev/api/planets/');
		const data = await response.json()
		const planets = data.results.slice(0, 6);
		console.log(planets);

		subContainer.removeChild(pageLoader);
		renderData(planets);
	} catch (error) {
		const errorMessage = document.createElement('div');
		errorMessage.classList.add('error-message');
		errorMessage.textContent = 'An error has occurred. Please try again!'
		subContainer.append(errorMessage);

		const refreshButton = document.createElement('button');
		refreshButton.classList.add('refresh-button');
		refreshButton.textContent = 'Refresh';
		subContainer.append(refreshButton);

		refreshButton.addEventListener('click', ()=> {
			window.location.reload()
		});
		subContainer.removeChild(pageLoader);
	};
}
getData();

function renderData(planets) {
	planets.forEach(planet => {
		//CREATE ELEMENTS
		const planetContainer = document.createElement('div');
		const planetText = document.createElement('div');
		const planetImage = document.createElement('img');

		//APPEND ELEMENTS
		subContainer.append(planetContainer);
		planetContainer.append(planetText, planetImage);

		//SETTING CONTENT TO CREATED ELEMENTS
		planetText.textContent = `Name: ${planet.name}, Climate: ${planet.climate}, 
		Population: ${planet.population}, Diameter: ${planet.diameter} km, Orbital Period: ${planet.orbital_period} days`;

		//ADDING CLASSES TO THE ELEMENTS
		planetContainer.classList.add('contentContainer');
		planetText.classList.add('contentText');
		planetImage.classList.add('contentImage');

		//ADDING IMAGES 
		const imageName = planet.name.replace(/\s+/g, '-');
        planetImage.src = `./assets/${imageName}.jpg`;
	});
}

