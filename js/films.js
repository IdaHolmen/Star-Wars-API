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
		const response = await fetch('https://swapi.dev/api/films/');
		const data = await response.json()
		const films = data.results;

		subContainer.removeChild(pageLoader);
		renderData(films);

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

function renderData(films) {
	films.forEach(film => {
		//CREATE ELEMENTS
		const filmList = document.createElement('li');
		const filmTitle = document.createElement('span');
		const filmYear = document.createElement('span');
		const filmDirector = document.createElement('span');
		const filmProducers = document.createElement('span');
		const filmCharacters = document.createElement('span');
		const filmImage = document.createElement('img');

		//APPEND ELEMENTS
		ul.append(filmList);
		filmList.append(filmTitle, filmYear, filmDirector, filmProducers, filmCharacters, filmImage);

		//SETTING CONTENT TO CREATED ELEMENTS
		filmTitle.textContent = film.title;
		//I WANT JUST THE YEAR AND NOT THE DATE
		//USING SPLIT METHOD TO SEPERATE WHERE THE '-' IS AND JUST USING THE FIRST PART (YEAR) 
		const releaseYear = film.release_date.split('-')[0];
        filmYear.textContent = releaseYear;
		filmDirector.textContent = film.director;
		filmProducers.textContent = film.producer;
		filmCharacters.textContent = film.characters.length;

		//ADDING CLASSES TO THE ELEMENTS
		filmList.classList.add('createdList');
		filmTitle.classList.add('filmTitle');
		filmYear.classList.add('filmYear');
		filmDirector.classList.add('filmDirector');
		filmProducers.classList.add('filmProducers');
		filmCharacters.classList.add('filmCharacters');
		filmImage.classList.add('filmImage');

		//ADDING IMAGES 
		const imageName = film.title.replace(/\s+/g, '-');
        filmImage.src = `./assets/${imageName}.jpg`;
	});
}


