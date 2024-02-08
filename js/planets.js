const subContainer = document.querySelector('.sub-container');
const ul = document.querySelector('ul');

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
		const planetList = document.createElement('li');
		const planetName = document.createElement('span');
		const planetClimate  = document.createElement('span');
		const planetDiameter = document.createElement('span');
		const planetPopulation = document.createElement('span');
		const planetOrbit = document.createElement('span');
		const planetImage = document.createElement('img');

		//APPEND ELEMENTS
		ul.append(planetList);
		planetList.append(planetName, planetClimate, planetDiameter, planetPopulation, planetOrbit, planetImage);

		//SETTING CONTENT TO CREATED ELEMENTS
		planetName.textContent = planet.name;
        planetClimate.textContent = planet.climate;
		planetDiameter.textContent = planet.diameter;
		planetPopulation.textContent = planet.population;
		planetOrbit.textContent = planet.orbital_period;

		//ADDING CLASSES TO THE ELEMENTS
		planetList.classList.add('createdList');
		planetName.classList.add('planetName');
		planetClimate.classList.add('planetClimate');
		planetDiameter.classList.add('planetDiameter');
		planetPopulation.classList.add('planetPopulation');
		planetOrbit.classList.add('planetOrbit');
		planetImage.classList.add('planetImage');

		//ADDING IMAGES 
		const imageName = planet.name.replace(/\s+/g, '-');
        planetImage.src = `./assets/${imageName}.jpg`;
	});
}


