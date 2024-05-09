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
		const response = await fetch('https://swapi.dev/api/people/');
		const data = await response.json();
		const people = data.results.slice(0, 6);

		subContainer.removeChild(pageLoader);
		renderData(people);
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

function renderData(people) {
	people.forEach((person) => {
		//CREATE ELEMENTS
		const personContainer = document.createElement('div');
		const infoSection = document.createElement('ul');
		const imageSection = document.createElement('div');
		const personName = document.createElement('li');
		const personBirthYear = document.createElement('li');
		const personEyeColor = document.createElement('li');
		const personGender = document.createElement('li');
		const personHeight = document.createElement('li');
		const personImage = document.createElement('img');

		//APPEND ELEMENTS
		subContainer.append(personContainer);
		personContainer.append(infoSection, imageSection);
		infoSection.append(
			personName,
			personBirthYear,
			personEyeColor,
			personGender,
			personHeight
		);
		imageSection.append(personImage);

		//SETTING CONTENT TO CREATED ELEMENTS
		personName.textContent = `Name: ${person.name}`;
		personBirthYear.textContent = `Birth Year: ${person.birth_year}`;
		personEyeColor.textContent = `Eye Color: ${person.eye_color}`;
		personGender.textContent = `Gender: ${person.gender}`;
		personHeight.textContent = `Height: ${person.height} cm`;

		//ADDING CLASSES TO THE ELEMENTS
		personContainer.classList.add('contentContainer');
		infoSection.classList.add('infoSection');
		imageSection.classList.add('imageSection');
		personName.classList.add('contentText');
		personBirthYear.classList.add('contentText');
		personEyeColor.classList.add('contentText');
		personGender.classList.add('contentText');
		personHeight.classList.add('contentText');
		personImage.classList.add('contentImage');

		//ADDING IMAGES
		const imageName = person.name.replace(/\s+/g, '-');
		personImage.src = `./assets/${imageName}.jpg`;
		personImage.alt = 'Different characters from Star Wars';
	});
}
