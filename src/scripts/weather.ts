//Weather object that will store information from weather API
import { updateWeatherDOM } from './dom.ts';

export let weatherObj = {
	location: {
		country: '',
		name: '',
		region: ''
	},
	forecast: [],
	currentInfo: {},
	imageURL: '',
	condition: ''
};

export function getWeatherAPIJson(weatherJson) {
	console.log('This is the object from weatherJson', weatherJson);
	//replacing this with the function that will update the weather object
	weatherObj.imageURL = weatherJson.current.condition.icon;
	weatherObj.location.country = weatherJson.location.country;
	weatherObj.location.name = weatherJson.location.name;
	weatherObj.location.region = weatherJson.location.region;
	weatherObj.condition = weatherJson.current.condition.text;

	weatherObj.forecast = weatherJson.forecast.forecastday;

	weatherObj.currentInfo = weatherJson.current;

	console.log('This is the object from weatherJson', weatherJson);
	console.log('this is the object that we are using ', weatherObj);

	//return weatherObj;
}

//getting api from the server
export async function weather(locationString: string | undefined) {
	try {
		const weatherApiResponse = await fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=05e85c466c42486698e164552230608&q=${locationString}&days=3`,
			{ mode: 'cors' }
		);

		if (!weatherApiResponse.ok) {
			if (weatherApiResponse.status === 400) {
				throw new Error(`Bad Request: status 400`);
			}
			throw new Error('Request Failed');
		}

		const json = await weatherApiResponse.json();
		return json;
	} catch (error) {
		throw error;
	}
}

let isIntervalCalled: boolean = false;

export async function callWeatherApi(locationString: string | undefined) {
	console.log('this is the location string, ', locationString);

	await new Promise((resolve, reject) => {
		fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=05e85c466c42486698e164552230608&q=${locationString}&days=3`,
			{ mode: 'cors' }
		)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				getWeatherAPIJson(json);
				console.log('calling api');
				addWeatherDataToStorage();
				resolve(weatherObj);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export async function FetchAndUpdateDOMFromApi(location: string | undefined) {
	console.log(location);
	if (!isIntervalCalled) {
		isIntervalCalled = true;

		try {
			await callWeatherApi(location);
		} catch (error) {
			console.error('api call error: ', error);
		} finally {
			isIntervalCalled = false;
			updateWeatherDOM();
			console.log('api call finished, calling again');

			setTimeout(() => {
				FetchAndUpdateDOMFromApi(location);
			}, 7000);
		}
	}
}

export function disableWeatherApiCall() {
	isIntervalCalled = true;
	console.log('stopping api call');
}

export function enableWeatherApiCall() {
	isIntervalCalled = false;
	console.log('allowing api call');
}

export function addWeatherDataToStorage() {
	localStorage.setItem('weatherObj', JSON.stringify(weatherObj));
}

export function getWeatherDataFromStorage() {
	weatherObj = JSON.parse(localStorage.getItem('weatherObj'));
}
