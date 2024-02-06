//FETCHING FROM API
const getFilmData = async () => {
	const response = await fetch('https://swapi.dev/api/films/');
	const data = await response.json()

	const films = data.results;
	console.log(films);
}
getFilmData()
//CREATING ALL ELEMENT NEEDED ON THE PAGE
const mainContainer = document.createElement('div');
mainContainer.classList.add('main-container');
document.body.appendChild(mainContainer);

const headline = document.createElement('div');
headline.classList.add('headline');
mainContainer.appendChild(headline);
headline.textContent = 'Films';

const backButton = document.createElement('button');
backButton.classList.add('back-button');
mainContainer.appendChild(backButton);
backButton.textContent = 'Back';

backButton.addEventListener('click', ()=> {
	window.location.href = 'index.html';
});

//SEPERATE CONTAINERS TO DISPLAY THE FILMS 
const filmContainer1 = document.createElement('div');
filmContainer1.classList.add('container-1');
mainContainer.appendChild(filmContainer1);

const filmContainer2 = document.createElement('div');
filmContainer2.classList.add('container-2');
mainContainer.appendChild(filmContainer2);

const filmContainer3 = document.createElement('div');
filmContainer3.classList.add('container-3');
mainContainer.appendChild(filmContainer3);

const filmContainer4 = document.createElement('div');
filmContainer4.classList.add('container-4');
mainContainer.appendChild(filmContainer4);

const filmContainer5 = document.createElement('div');
filmContainer5.classList.add('container-5');
mainContainer.appendChild(filmContainer5);

const filmContainer6 = document.createElement('div');
filmContainer6.classList.add('container-6');
mainContainer.appendChild(filmContainer6);
//ADDING CLASS TO FIX STYLING
filmContainer1.classList.add('content-container');
filmContainer2.classList.add('content-container');
filmContainer3.classList.add('content-container');
filmContainer4.classList.add('content-container');
filmContainer5.classList.add('content-container');
filmContainer6.classList.add('content-container');

