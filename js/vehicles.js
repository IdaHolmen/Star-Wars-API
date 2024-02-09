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
		const response = await fetch('https://swapi.dev/api/vehicles/');
		const data = await response.json()
		const vehicles = data.results.slice(0, 6);

		subContainer.removeChild(pageLoader);
		renderData(vehicles);
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

function renderData(vehicles) {
	//HAD TO ADD INDEX TO MANUALLY ADD IMAGE ON INDEX 3 (STARFIGHTER)
	vehicles.forEach((vehicle, index) => {
		//CREATE ELEMENTS
		const vehicleContainer = document.createElement('div');
		const vehicleText = document.createElement('div');
		const vehicleImage = document.createElement('img');

		//APPEND ELEMENTS
		subContainer.append(vehicleContainer);
		vehicleContainer.append(vehicleText, vehicleImage);

		//SETTING CONTENT TO CREATED ELEMENTS
		vehicleText.textContent = `Name: ${vehicle.name}, Model: ${vehicle.model}, Manufacturer: ${vehicle.manufacturer}, Crew: ${vehicle.crew}, Length: ${vehicle.length} meters`;

		//ADDING CLASSES TO THE ELEMENTS
		vehicleContainer.classList.add('contentContainer');
		vehicleText.classList.add('contentText');
		vehicleImage.classList.add('contentImage');

		//ADDING IMAGES 
		const imageName = vehicle.name.replace(/\s+/g, '-');
        vehicleImage.src = `./assets/${imageName}.jpg`;
		vehicleImage.alt = 'Vehicles';

		//ONE IMAGE HAS TO BE ADDED MANUALLY BECAUSE OF THE NAMING
		if (index === 3) {
			vehicleImage.src = '../assets/starfighter.jpg';
		}
	});
}


