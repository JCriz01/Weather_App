//Weather object that will store information from weather API
export const weatherObj = {
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
	//replacing this with the function that will update the weather object
	weatherObj.imageURL = weatherJson.current.condition.icon;
	weatherObj.location.country = weatherJson.location.country;
	weatherObj.location.name = weatherJson.location.name;
	weatherObj.location.region = weatherJson.location.region;
	weatherObj.condition = weatherJson.current.condition.text;

	weatherObj.forecast = weatherJson.forecast.forecastday;

	console.log('This is the object from weatherJson', weatherJson);
	console.log('this is the object that we are using ', weatherObj);

	return weatherObj;
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
