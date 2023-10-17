import {getWeatherAPIJson, weather, weatherObj} from './weather';

let intervalID: number;
const bodyContainer = document.querySelector('body');
const weatherDataElem = document.querySelector('#weather-data');
const forecastElem = document.querySelector('#forecast-wrapper');
const currWeatherElem = document.querySelector('#current-weather-wrapper');

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

	container.setAttribute('id', 'loading-indicator');
	imgElem.classList.add('animate-spin', 'w-7');
	imgElem.src = '/Weather_App/spinningArrows.svg';

	textElem.textContent = 'Loading...';

	container.appendChild(imgElem);
	container.appendChild(textElem);

	if (bodyContainer?.children[1].id === 'error-indicator') {
		deleteErrorIndicator();
	}

	bodyElem?.insertBefore(container, bodyElem.lastElementChild);
}

export function deleteLoadingIndicator() {
	const bodyElem = document.querySelector('body');

	const targetElem = bodyElem?.children[1];

	bodyElem?.removeChild(bodyElem?.children[1]!);
	console.log(bodyElem?.children);

	console.log('removing', targetElem);
}

function deleteErrorIndicator() {
	const bodyElem = document.querySelector('body');

	const targetElem = bodyElem?.children[1];

	bodyElem?.removeChild(bodyElem?.children[1]!);
	console.log(bodyElem?.children);

	console.log('removing', targetElem);
}

function createErrorIndicator() {
	const bodyElem = document.querySelector('body');

	const parentElem = document.createElement('div');
	parentElem.classList.add(
		'bg-red-800',
		'flex',
		'flex-col',
		'w-1/2',
		'self-center',
		'absolute',
		'rounded-lg',
		'items-center',
		'bottom-1/2',
		'p-2'
	);

	parentElem.setAttribute('id', 'error-indicator');

	const headerElem = document.createElement('h1');
	headerElem.classList.add('text-2xl');
	headerElem.textContent = 'Error';

	const container = document.createElement('div');
	container.classList.add('flex');

	const errorImg = document.createElement('img');
	errorImg.classList.add('w-8');
	errorImg.src = '/Weather_App/error.svg';
	const pElem = document.createElement('p');
	pElem.classList.add('text-center');
	pElem.textContent = 'Unable to retrieve data, try again.';
	container.appendChild(errorImg);
	container.appendChild(pElem);

	parentElem.appendChild(headerElem);
	parentElem.appendChild(container);

	bodyElem?.insertBefore(parentElem, bodyElem.lastElementChild);
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

export async function showWeatherData(input: HTMLInputElement) {
	let isValid = false;
	function toggleWeatherData(isWeatherApiValid: boolean) {
		if (isWeatherApiValid) {
			weatherDataElem?.classList.remove('hidden');
			currWeatherElem?.classList.remove('hidden');
			forecastElem?.classList.remove('hidden');
		} else {
			weatherDataElem?.classList.add('hidden');
			currWeatherElem?.classList.add('hidden');
			forecastElem?.classList.add('hidden');
		}
	}

	try {
		const [loadingIndicatorPromise, weatherData] = await Promise.all([
			createLoadingIndicator(),
			weather(input.value)
		]);

		deleteLoadingIndicator();
		getWeatherAPIJson(weatherData);
		//console.log(weatherData);
		toggleWeatherData(true);

		updateWeatherDOM();
	} catch (error) {
		if (bodyContainer?.children[1].id === 'loading-indicator') {
			deleteLoadingIndicator();
		}
		createErrorIndicator();
		toggleWeatherData(false);
	}
}

export function updateWeatherDOM() {
	const mainTempElem = document.querySelector('#main-temperature-element');
	mainTempElem.textContent = `${weatherObj.currentInfo.temp_f}°F`;

	const subWeatherElem = document.querySelector('#sub-weather-element');
	subWeatherElem.textContent = `Feels Like ${weatherObj.currentInfo.feelslike_f}°F`;
	const weatherTempImg: HTMLImageElement =
		document.querySelector('#weather-image');

	const stringMatcher: string = weatherObj.condition;
	if (
		stringMatcher.includes('rain') ||
		stringMatcher.includes('Rain') ||
		stringMatcher.includes('Drizzle') ||
		stringMatcher.includes('drizzle')
	) {
		//TODO: Find better image for rain conditions
		weatherTempImg.src = '/Weather_App/sunny-forest.png';
	}
	if (stringMatcher.includes('Sunny') || stringMatcher.includes('sunny')) {
		weatherTempImg.src = '/Weather_App/sunny-forest.png';
	}
	if (stringMatcher.includes('cloudy') || stringMatcher.includes('Cloudy')) {
		weatherTempImg.src = '/Weather_App/moonlight_city.png';
	}
	if (
		stringMatcher.includes('Overcast') ||
		stringMatcher.includes('overcast')
	) {
		//TODO: Place holder for actual image source on overcast condition
		weatherTempImg.src = '/Weather_App/';
	}
	if (
		stringMatcher.includes('Snow') ||
		stringMatcher.includes('snow') ||
		stringMatcher.includes('Sleet') ||
		stringMatcher.includes('sleet')
	) {
		weatherTempImg.src = '/Weather_App/snowy-mountain.png';
	}

	function updateCurrentWeatherCardsDOM() {
		const windSpeedElem: HTMLDivElement = document.querySelector('#wind-speed');

		windSpeedElem.textContent = `${weatherObj.currentInfo?.gust_kph}Km/h`;

		const pressureElem = document.querySelector('#pressure');

		pressureElem.textContent = `${weatherObj.currentInfo.pressure_mb}MB`;

		const humidityElem = document.querySelector('#humidity');

		humidityElem.textContent = `${weatherObj.currentInfo.humidity}%`;

		const currentTempList: HTMLCollection | undefined = document.querySelector(
			'#current-temperature'
		)?.children;

		function currentDayHelper(cardElem: HTMLDivElement, index: number) {
			const weatherImg: HTMLImageElement | undefined = cardElem.children[1];

			const FIRST_DAY = 0;
			weatherImg.src =
				weatherObj.forecast[FIRST_DAY].hour[index].condition.icon;

			const currentDayTempElem: HTMLParagraphElement | undefined =
				cardElem.children[2];
			currentDayTempElem.textContent = `${weatherObj.forecast[FIRST_DAY].hour[index].temp_f}°F`;
		}

		currentDayHelper(currentTempList[0], 0);
		currentDayHelper(currentTempList[1], 1);
		currentDayHelper(currentTempList[2], 2);
		currentDayHelper(currentTempList[3], 3);
		currentDayHelper(currentTempList[4], 4);
	}

	updateCurrentWeatherCardsDOM();

	function updateThreeDayForecastElems() {
		const forecastList: HTMLCollection | undefined = document.querySelector(
			'#forecast-container'
		).children;

		function forecastHelper(
			cardElem: HTMLDivElement | undefined,
			index: number
		) {
			const imageELem: HTMLImageElement = cardElem.children[0];

			imageELem.src = weatherObj.forecast[index].day.condition.icon;

			const tempContainer = cardElem.children[1];

			const minTempElem = tempContainer.children[0];
			minTempElem.textContent = `${weatherObj.forecast[index].day.mintemp_f}°F`;

			const maxTempElem = tempContainer.children[2];
			maxTempElem.textContent = `${weatherObj.forecast[index].day.maxtemp_f}°F`;

			const condition = cardElem.children[2];

			condition.textContent = weatherObj.forecast[index].day.condition.text;
		}

		forecastHelper(forecastList[0], 0);
		forecastHelper(forecastList[1], 1);
		forecastHelper(forecastList[2], 2);
	}
	updateThreeDayForecastElems();
}