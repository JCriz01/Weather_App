import { weatherObj, weather } from './weather';
import { firstTimeDisplayer } from './dom';

const openBtn = document.getElementById('open-header-btn');

const container = document.getElementById('header-container');

const weatherBtn = document.getElementById('weather-search');

//get only input in html
const weatherInput = document.querySelector('input');

openBtn?.addEventListener('click', (Event) => {
	openBtn?.classList.toggle('hidden');

	container?.classList.toggle('hidden');
});

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

weatherBtn?.addEventListener('click', (Event) => {
	const weatherLocation = weatherInput?.value;
	getWeatherAPI(weatherLocation);
});

//refactoring everything above this line
firstTimeDisplayer();
