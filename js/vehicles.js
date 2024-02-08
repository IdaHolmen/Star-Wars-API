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
		const vehicleList = document.createElement('li');
		const vehicleName = document.createElement('span');
		const vehicleModel  = document.createElement('span');
		const vehicleManufacturer = document.createElement('span');
		const vehicleCrew = document.createElement('span');
		const vehicleLength = document.createElement('span');
		const vehicleImage = document.createElement('img');

		//APPEND ELEMENTS
		ul.append(vehicleList);
		vehicleList.append(vehicleName, vehicleModel, vehicleManufacturer, vehicleCrew, vehicleLength, vehicleImage);

		//SETTING CONTENT TO CREATED ELEMENTS
		vehicleName.textContent = vehicle.name;
        vehicleModel.textContent = vehicle.model;
		vehicleManufacturer.textContent = vehicle.manufacturer;
		vehicleCrew.textContent = vehicle.crew;
		vehicleLength.textContent = vehicle.length;

		//ADDING CLASSES TO THE ELEMENTS
		vehicleList.classList.add('createdList');
		vehicleName.classList.add('vehicleName');
		vehicleModel.classList.add('vehicleModel');
		vehicleManufacturer.classList.add('vehicleManufacturer');
		vehicleCrew.classList.add('vehicleCrew');
		vehicleLength.classList.add('vehicleLength');
		vehicleImage.classList.add('vehicleImage');

		//ADDING IMAGES 
		const imageName = vehicle.name.replace(/\s+/g, '-');
        vehicleImage.src = `./assets/${imageName}.jpg`;

		//ONE IMAGE HAS TO BE ADDED MANUALLY BECAUSE OF THE NAMING
		if (index === 3) {
			vehicleImage.src = '../assets/starfighter.jpg';
		}
	});
}


