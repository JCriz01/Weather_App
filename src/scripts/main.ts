import { weatherObj, weather } from './weather';
import {
	isFirstVisit,
	createLoadingIndicator,
	deleteLoadingIndicator,
	createFirstTimePopUp,
	deleteFirstTimePopUp,
	DisplayFirstTimePopUp
} from './dom';

const openBtn = document.getElementById('open-header-btn');

const container = document.getElementById('header-container');
const closeHeaderBtn = document.getElementById('close-header-btn');
const weatherBtn = document.getElementById('weather-search');
const weatherDataElem = document.getElementById('weather-data');
const currWeather = document.querySelector('#current-weather-wrapper');
const forecastElem = document.querySelector('#forecast-wrapper');

//get only input in html
const weatherInput = document.querySelector('input');

async function getWeatherAPI(locationString: string | undefined) {
	const weatherJson = await weather(locationString);

	//replacing this with the function that will update the weather object
	weatherObj.imageURL = weatherJson.current.condition.icon;
	weatherObj.location.country = weatherJson.location.country;
	weatherObj.location.name = weatherJson.location.name;
	weatherObj.location.region = weatherJson.location.region;
	weatherObj.condition = weatherJson.current.condition.text;

	weatherObj.forecast = weatherJson.forecast.forecastday;

	console.log('This is the object from weatherJson', weatherJson);
	console.log('this is the object that we are using ', weatherObj);
}
//---------------------------------------------------------
//refactoring everything above this line

function isInputValid(input: HTMLInputElement | null): boolean {
	if (input?.validity.valueMissing) {
		input.setCustomValidity('Please enter a location');
	} else if (input?.validity.patternMismatch) {
		input.setCustomValidity('Please enter a valid location');
	} else {
		input?.setCustomValidity('');
	}

	return input?.checkValidity() ?? false;
}


function main() {
	if (isFirstVisit()) {
		DisplayFirstTimePopUp();
	}

	weatherBtn?.addEventListener('click', (Event) => {
		console.log('clicked');

		if (isInputValid(weatherInput)) {
			Event.preventDefault();

			const loadingIndicatiorPromise = createLoadingIndicator();
			const weatherPromise = getWeatherAPI(weatherInput?.value);

			Promise.all([loadingIndicatiorPromise, weatherPromise])
				.then(() => {
					deleteLoadingIndicator();
					weatherDataElem?.classList.remove('hidden');
					currWeather?.classList.remove('hidden');
					forecastElem?.classList.remove('hidden');
				})
				.catch(() => {
					//TODO: add error handling
					console.log('failed');
				});
		}
	});

	//TODO: add logic to disable hiding the header BEFORE the weather data is loaded from the API
	openBtn?.addEventListener('click', (Event) => {
		openBtn?.classList.toggle('hidden');

		container?.classList.toggle('hidden');
	});

	closeHeaderBtn?.addEventListener('click', () => {
		container?.classList.toggle('hidden');
		openBtn?.classList.toggle('hidden');
	});
}

main();
