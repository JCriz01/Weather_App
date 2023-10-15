import { weatherObj, weather } from './weather';
import { isFirstVisit, DisplayFirstTimePopUp, showWeatherData } from './dom';

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

	openBtn?.addEventListener('click', () => {
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
