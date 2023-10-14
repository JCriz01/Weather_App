import { weatherObj, weather } from './weather';

const weatherDataElem = document.querySelector('#weather-data');
const forecastElem = document.querySelector('#forecast-wrapper');
const currWeatherElem = document.querySelector('current-weather-wrapper');

export function createFirstTimePopUp() {
	const bodyElem = document.querySelector('body');
	const popUpElem = document.createElement('div');
	popUpElem.classList.add(
		'relative',
		'h-4/5',
		'w-2/3',
		'self-center',
		'flex',
		'flex-col',
		'items-center',
		'rounded-lg',
		'bg-zinc-900',
		'p-5'
	);
	popUpElem.setAttribute('id', 'first-time-displayer');

	const headerElem = document.createElement('h1');
	headerElem.classList.add('pb-5', 'text-xl');
	headerElem.textContent = 'Welcome to SkySavvy Weather App';

	const pInfoElem = document.createElement('p');
	pInfoElem.classList.add('pb-3', 'text-center');

	const pInfo2Elem = document.createElement('p');
	pInfo2Elem.classList.add('text-center');
	pInfo2Elem.textContent =
		'Weather display is currently empty, to search for an area with accurate date information press the Search button';
	const popUpBtn = document.createElement('button');
	popUpBtn.classList.add(
		'rounded-md',
		'px-3',
		'py-1',
		'text-base',
		'hover:scale-105',
		'active:translate-y-1'
	);
	popUpBtn.setAttribute(
		'style',
		'background: rgb(228,94,94); background: linear-gradient(198deg, rgba(228,94,94,1) 14%, rgba(51,136,138,1) 100%);'
	);

	popUpBtn.setAttribute('id', 'first-time-view-btn');

	popUpBtn.textContent = 'Sounds Good!';

	popUpElem.appendChild(headerElem);
	popUpElem.appendChild(pInfoElem);
	popUpElem.appendChild(pInfo2Elem);
	popUpElem.appendChild(popUpBtn);

	bodyElem?.insertBefore(popUpElem, bodyElem.lastElementChild);
}

export function deleteFirstTimePopUp() {
	const targetElem = document.querySelector('#first-time-displayer');
	console.log('removing', targetElem);
	targetElem?.remove();
}

export async function createLoadingIndicator() {
	const bodyElem = document.querySelector('body');
	const container = document.createElement('div');

	const imgElem = document.createElement('img');

	const textElem = document.createElement('p');
	textElem.classList.add('text-lg');

	container.classList.add(
		'flex',
		'w-1/2',
		'justify-evenly',
		'self-center',
		'absolute',
		'bottom-1/2',
		'bg-emerald-200',
		'text-black',
		'rounded-lg',
		'p-4'
	);
	imgElem.classList.add('animate-spin', 'w-7');
	imgElem.src = '/Weather_App/spinningArrows.svg';

	textElem.textContent = 'Loading...';

	container.appendChild(imgElem);
	container.appendChild(textElem);

	bodyElem?.insertBefore(container, bodyElem.lastElementChild);
}

export function deleteLoadingIndicator() {
	const bodyElem = document.querySelector('body');

	const targetElem = bodyElem?.children[1];

	bodyElem?.removeChild(bodyElem?.children[1]!);
	console.log(bodyElem?.children);

	console.log('removing', targetElem);
}

export function DisplayFirstTimePopUp(): void {
	const displayer = document.querySelector('#first-time-displayer');
	const closeHeaderBtn = document.querySelector('#close-header-btn');
	const searchBtn = document.querySelector('#weather-search');

	createFirstTimePopUp();
	const firstTimeBtn = document.querySelector('#first-time-view-btn');

	closeHeaderBtn?.classList.remove('animate-pulse', 'active:translate-y-1');
	searchBtn?.classList.remove('active:translate-y-1');

	firstTimeBtn?.addEventListener('click', () => {
		closeHeaderBtn?.classList.add('animate-pulse', 'active:translate-y-1');
		searchBtn?.classList.add('active:translate-y-1');

		deleteFirstTimePopUp();
	});
}

export function isFirstVisit(): boolean {
	if (!localStorage.getItem('firstVisit')) {
		localStorage.setItem('firstVisit', 'true');
		return true;
	} else {
		localStorage.setItem('firstVisit', 'false');
		return false;
	}
}

export function showWeatherData(input: HTMLInputElement) {
	const loadingIndicatorPromise = createLoadingIndicator();
	const weatherDataPromise = weather(input.value);

	Promise.all([loadingIndicatorPromise, weatherDataPromise]).then(() => {
		deleteLoadingIndicator();
		weatherDataElem?.classList.remove('hidden');
		currWeatherElem?.classList.remove('hidden');
		forecastElem?.classList.remove('hidden');
	});
}
