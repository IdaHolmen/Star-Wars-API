const subContainer = document.querySelector('.sub-container');

//MAKING BACK BUTTON FUNCTIONAL
const backButton = document.querySelector('.back-button');
backButton.addEventListener('click', () => {
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
		const data = await response.json();
		const planets = data.results.slice(0, 6);
		console.log(planets);

		subContainer.removeChild(pageLoader);
		renderData(planets);
	} catch (error) {
		const errorMessage = document.createElement('div');
		errorMessage.classList.add('error-message');
		errorMessage.textContent = 'An error has occurred. Please try again!';
		subContainer.append(errorMessage);

		const refreshButton = document.createElement('button');
		refreshButton.classList.add('refresh-button');
		refreshButton.textContent = 'Refresh';
		subContainer.append(refreshButton);

		refreshButton.addEventListener('click', () => {
			window.location.reload();
		});
		subContainer.removeChild(pageLoader);
	}
};
getData();

function renderData(planets) {
	planets.forEach((planet) => {
		//CREATE ELEMENTS
		const planetContainer = document.createElement('div');
		const infoSection = document.createElement('ul');
		const imageSection = document.createElement('div');
		const planetName = document.createElement('li');
		const planetClimate = document.createElement('li');
		const planetPopulation = document.createElement('li');
		const planetDiameter = document.createElement('li');
		const planetOrbitalPeriod = document.createElement('li');
		const planetImage = document.createElement('img');

		//APPEND ELEMENTS
		subContainer.append(planetContainer);
		planetContainer.append(infoSection, imageSection);
		infoSection.append(
			planetName,
			planetClimate,
			planetPopulation,
			planetDiameter,
			planetOrbitalPeriod
		);
		imageSection.append(planetImage);

		//SETTING CONTENT TO CREATED ELEMENTS
		planetName.textContent = `Name: ${planet.name}`;
		planetClimate.textContent = `Climate: ${planet.climate}`;
		planetPopulation.textContent = `Population: ${planet.population}`;
		planetDiameter.textContent = `Diameter: ${planet.diameter} km`;
		planetOrbitalPeriod.textContent = `Orbital Period: ${planet.orbital_period} days`;

		//ADDING CLASSES TO THE ELEMENTS
		planetContainer.classList.add('contentContainer');
		infoSection.classList.add('infoSection');
		imageSection.classList.add('imageSection');
		planetName.classList.add('contentText');
		planetClimate.classList.add('contentText');
		planetPopulation.classList.add('contentText');
		planetDiameter.classList.add('contentText');
		planetOrbitalPeriod.classList.add('contentText');
		planetImage.classList.add('contentImage');

		//ADDING IMAGES
		const imageName = planet.name.replace(/\s+/g, '-');
		planetImage.src = `./assets/${imageName}.jpg`;
		planetImage.alt = 'Planets';
	});
}
