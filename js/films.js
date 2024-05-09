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
		const response = await fetch('https://swapi.dev/api/films/');
		const data = await response.json();
		const films = data.results;

		subContainer.removeChild(pageLoader);
		renderData(films);
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

function renderData(films) {
	films.forEach((film) => {
		//CREATE ELEMENTS
		const filmContainer = document.createElement('div');
		const infoSection = document.createElement('ul');
		const imageSection = document.createElement('div');
		const filmTitle = document.createElement('li');
		const filmYear = document.createElement('li');
		const filmDirector = document.createElement('li');
		const filmProducer = document.createElement('li');
		const filmCharacters = document.createElement('li');
		const filmImage = document.createElement('img');

		//APPEND ELEMENTS
		subContainer.append(filmContainer);
		filmContainer.append(infoSection, imageSection);
		infoSection.append(
			filmTitle,
			filmYear,
			filmDirector,
			filmProducer,
			filmCharacters,
			filmImage
		);
		imageSection.append(filmImage);

		//I WANT JUST THE YEAR AND NOT THE DATE
		//USING SPLIT METHOD TO SEPERATE WHERE THE '-' IS AND JUST USING THE FIRST PART (YEAR)
		const releaseYear = film.release_date.split('-')[0];

		//SETTING CONTENT TO CREATED ELEMENTS
		filmTitle.textContent = `Title: ${film.title}`;
		filmYear.textContent = `Year: ${releaseYear}`;
		filmDirector.textContent = `Director: ${film.director}`;
		filmProducer.textContent = `Producer: ${film.producer}`;
		filmCharacters.textContent = `Number of Characters: ${film.characters.length}`;

		//ADDING CLASSES TO THE ELEMENTS
		filmContainer.classList.add('contentContainer');
		infoSection.classList.add('infoSection');
		imageSection.classList.add('imageSection');
		filmTitle.classList.add('contentText');
		filmYear.classList.add('contentText');
		filmDirector.classList.add('contentText');
		filmProducer.classList.add('contentText');
		filmCharacters.classList.add('contentText');
		filmImage.classList.add('contentImage');

		//ADDING IMAGES
		const imageName = film.title.replace(/\s+/g, '-');
		filmImage.src = `./assets/${imageName}.jpg`;
		filmImage.alt = 'Movie poster';
	});
}
