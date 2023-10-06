
//Weather object that will store information from weather API
const weatherObj={
	location: {
		country: '',
		name: '',
		region: ''
	},
	forecast: [],
	currentInfo: {},
	imageURL: '',
	condition: ''
}


//getting api from the server
async function weather(locationString: string | undefined){

	const weatherInfo=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=05e85c466c42486698e164552230608&q=${locationString}&days=3`,
		{mode: "cors"
		});

	const json=await weatherInfo.json();
	weatherObj.imageURL=json.current.condition.icon;
	weatherObj.location.country=json.location.country;
	weatherObj.location.name=json.location.name;
	weatherObj.location.region=json.location.region;
	weatherObj.condition=json.current.condition.text;

	weatherObj.forecast=json.forecast.forecastday;

	console.log('This is the object from json',json);
	console.log('this is the object that we are using ',weatherObj);

}