const subContainer = document.querySelector('.sub-container');
const ul = document.querySelector('ul');

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
		const response = await fetch('https://swapi.dev/api/vehicles/');
		const data = await response.json();
		const vehicles = data.results.slice(0, 6);

		subContainer.removeChild(pageLoader);
		renderData(vehicles);
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

function renderData(vehicles) {
	//HAD TO ADD INDEX TO MANUALLY ADD IMAGE ON INDEX 3 (STARFIGHTER)
	vehicles.forEach((vehicle, index) => {
		//CREATE ELEMENTS
		const vehicleContainer = document.createElement('div');
		const infoSection = document.createElement('ul');
		const imageSection = document.createElement('div');
		const vehicleName = document.createElement('li');
		const vehicleModel = document.createElement('li');
		const vehicleManufacturer = document.createElement('li');
		const vehicleCrew = document.createElement('li');
		const vehicleLength = document.createElement('li');
		const vehicleImage = document.createElement('img');

		//APPEND ELEMENTS
		subContainer.append(vehicleContainer);
		vehicleContainer.append(infoSection, imageSection);
		infoSection.append(
			vehicleName,
			vehicleModel,
			vehicleManufacturer,
			vehicleCrew,
			vehicleLength
		);
		imageSection.append(vehicleImage);

		//SETTING CONTENT TO CREATED ELEMENTS
		vehicleName.textContent = `Name: ${vehicle.name}`;
		vehicleModel.textContent = `Model: ${vehicle.model}`;
		vehicleManufacturer.textContent = `Manufacturer: ${vehicle.manufacturer}`;
		vehicleCrew.textContent = `Crew: ${vehicle.crew}`;
		vehicleLength.textContent = `Length: ${vehicle.length} meters`;

		//ADDING CLASSES TO THE ELEMENTS
		vehicleContainer.classList.add('contentContainer');
		infoSection.classList.add('infoSection');
		imageSection.classList.add('imageSection');
		vehicleName.classList.add('contentText');
		vehicleModel.classList.add('contentText');
		vehicleManufacturer.classList.add('contentText');
		vehicleCrew.classList.add('contentText');
		vehicleLength.classList.add('contentText');
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
