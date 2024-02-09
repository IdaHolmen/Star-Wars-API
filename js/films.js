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
		const filmContainer = document.createElement('div');
		const filmText = document.createElement('div');
		const filmImage = document.createElement('img');

		//APPEND ELEMENTS
		subContainer.append(filmContainer);
		filmContainer.append(filmText, filmImage);

		//I WANT JUST THE YEAR AND NOT THE DATE
		//USING SPLIT METHOD TO SEPERATE WHERE THE '-' IS AND JUST USING THE FIRST PART (YEAR)
		const releaseYear = film.release_date.split('-')[0];
		
		//SETTING CONTENT TO CREATED ELEMENTS
		filmText.textContent = `Title: ${film.title}, Year: ${releaseYear}, Director: ${film.director}, Producer: ${film.producer}, Characters: ${film.characters.length}`;

		//ADDING CLASSES TO THE ELEMENTS
		filmContainer.classList.add('contentContainer');
		filmText.classList.add('contentText');
		filmImage.classList.add('contentImage');
		
		//ADDING IMAGES 
		const imageName = film.title.replace(/\s+/g, '-');
        filmImage.src = `./assets/${imageName}.jpg`;
		filmImage.alt = 'Movie poster';
	});
}


