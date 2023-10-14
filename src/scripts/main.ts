import { weatherObj, weather } from './weather';
import {
	isFirstVisit,
	createLoadingIndicator,
	deleteLoadingIndicator,
	createFirstTimePopUp,
	deleteFirstTimePopUp,
	DisplayFirstTimePopUp,
	showWeatherData
} from './dom';

const openBtn = document.getElementById('open-header-btn');

const container = document.getElementById('header-container');
const closeHeaderBtn = document.getElementById('close-header-btn');
const weatherBtn = document.getElementById('weather-search');
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
	closeHeaderBtn?.setAttribute('disabled', 'true');
	console.log(closeHeaderBtn?.hasAttribute('disabled'));

	if (isFirstVisit()) {
		DisplayFirstTimePopUp();
	}

	weatherBtn?.addEventListener('click', (Event) => {
		closeHeaderBtn?.removeAttribute('disabled');
		closeHeaderBtn?.classList.add('active:translate-y-1');
		console.log('clicked');

		if (isInputValid(weatherInput)) {
			Event.preventDefault();

			showWeatherData(weatherInput);
		}
	});

	openBtn?.addEventListener('click', (Event) => {
		openBtn?.classList.toggle('hidden');

		container?.classList.toggle('hidden');
	});

	closeHeaderBtn?.addEventListener('click', () => {
		console.log(closeHeaderBtn.hasAttribute('disabled'));
		if (!closeHeaderBtn.hasAttribute('disabled'))
			container?.classList.toggle('hidden');
		openBtn?.classList.toggle('hidden');
	});
}

main();
