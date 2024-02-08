const subContainer = document.querySelector('.sub-container');
const ul = document.querySelector('ul');

//MAKING BACK BUTTON FUNCTIONAL
const backButton = document.querySelector('.back-button');
backButton.addEventListener('click', ()=> {
	window.location.href = 'index.html';
});

//FETCHING FROM API
const getData = async () => {
	try {
		const response = await fetch('https://swapi.dev/api/people/');
		const data = await response.json()
		const people = data.results.slice(0, 6);
		console.log(people);

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
	};
}
getData();

function renderData(people) {
	people.forEach(person => {
		//CREATE ELEMENTS
		const peopleList = document.createElement('li');
		const personName = document.createElement('span');
		const birthYear  = document.createElement('span');
		const eyeColor = document.createElement('span');
		const personGender = document.createElement('span');
		const personHeight = document.createElement('span');
		const personImage = document.createElement('img');

		//APPEND ELEMENTS
		ul.append(peopleList);
		peopleList.append(personName, birthYear, eyeColor, personGender, personHeight, personImage);

		//SETTING CONTENT TO CREATED ELEMENTS
		personName.textContent = person.name;
        birthYear.textContent = person.birth_year;
		eyeColor.textContent = person.eye_color;
		personGender.textContent = person.gender;
		personHeight.textContent = person.height;

		//ADDING CLASSES TO THE ELEMENTS
		peopleList.classList.add('createdList');
		personName.classList.add('personName');
		birthYear.classList.add('birthYear');
		eyeColor.classList.add('eyeColor');
		personGender.classList.add('personGender');
		personHeight.classList.add('personHeight');
		personImage.classList.add('personImage');

		//ADDING IMAGES 
		const imageName = person.name.replace(/\s+/g, '-');
        personImage.src = `./assets/${imageName}.jpg`;
	});
}


