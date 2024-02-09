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
		const response = await fetch('https://swapi.dev/api/people/');
		const data = await response.json()
		const people = data.results.slice(0, 6);
		
		subContainer.removeChild(pageLoader);
		renderData(people);
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

function renderData(people) {
	people.forEach(person => {
		//CREATE ELEMENTS
		const personContainer = document.createElement('div');
		const personText = document.createElement('div');
		const personImage = document.createElement('img');

		//APPEND ELEMENTS
		subContainer.append(personContainer);
		personContainer.append(personText, personImage);

		//SETTING CONTENT TO CREATED ELEMENTS
		personText.textContent = `Name: ${person.name}, Birth Year: ${person.birth_year}, Eye Color: ${person.eye_color}, Gender: ${person.gender}, Height: ${person.height} cm`;

		//ADDING CLASSES TO THE ELEMENTS
		personContainer.classList.add('contentContainer');
		personText.classList.add('contentText');
		personImage.classList.add('contentImage');

		//ADDING IMAGES 
		const imageName = person.name.replace(/\s+/g, '-');
        personImage.src = `./assets/${imageName}.jpg`;
		personImage.alt = 'Different characters from Star Wars';
	});
}


