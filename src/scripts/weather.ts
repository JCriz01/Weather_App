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

//getting api from the server
export async function weather(locationString: string | undefined) {
	const weatherInfo = await fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=05e85c466c42486698e164552230608&q=${locationString}&days=3`,
		{ mode: 'cors' }
	);

	const json = await weatherInfo.json();

	return json;
}
