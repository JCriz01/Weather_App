import {
	weatherObj,
	weather,
	enableWeatherApiCall,
	disableWeatherApiCall,
	FetchAndUpdateDOMFromApi,
	getWeatherDataFromStorage,
	addWeatherDataToStorage
} from './weather';
import {
	DisplayFirstTimePopUp,
	showWeatherData,
	updateWeatherDOM,
	toggleWeatherData
} from './dom';

const openBtn = document.getElementById('open-header-btn');

const container = document.getElementById('header-container');
const closeHeaderBtn = document.getElementById('close-header-btn');
const weatherBtn = document.getElementById('weather-search');
//get only input in html
const weatherInput = document.querySelector('input');

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

function isFirstVisit(): boolean {
	if (!localStorage.getItem('firstVisit')) {
		localStorage.setItem('firstVisit', 'true');
		return true;
	} else {
		localStorage.setItem('firstVisit', 'false');
		return false;
	}
}

function handleButtonEvents() {
	openBtn?.addEventListener('click', () => {
		openBtn?.classList.toggle('hidden');

		container?.classList.toggle('hidden');
	});

	closeHeaderBtn?.addEventListener('click', () => {
		if (!closeHeaderBtn.hasAttribute('disabled'))
			container?.classList.toggle('hidden');
		openBtn?.classList.toggle('hidden');
	});
}

function handleWeatherSearchBtnEvent() {
	weatherBtn?.addEventListener('click', (Event) => {
		console.log('clicked');

		//start here
		if (isInputValid(weatherInput)) {
			closeHeaderBtn?.removeAttribute('disabled');
			closeHeaderBtn?.classList.add('active:translate-y-1');

			Event.preventDefault();
			console.log('valid input');
			enableWeatherApiCall();
			showWeatherData(weatherInput);
			console.log(weatherInput?.value);
			FetchAndUpdateDOMFromApi(weatherInput?.value);
		}
	});
}

function main() {
	closeHeaderBtn?.setAttribute('disabled', 'true');
	console.log(closeHeaderBtn?.hasAttribute('disabled'));

	if (isFirstVisit()) {
		DisplayFirstTimePopUp();
	} else if (localStorage.getItem('weatherObj')) {
		getWeatherDataFromStorage();
		toggleWeatherData(true);
		updateWeatherDOM();
		FetchAndUpdateDOMFromApi(weatherObj.location.name);
	}

	handleWeatherSearchBtnEvent();

	weatherInput?.addEventListener('input', () => {
		disableWeatherApiCall();
	});

	handleButtonEvents();
}

main();
