
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


//function to create the main weather card on the top portion of the page
//making the main weather card
function createMainWeatherCard(){

	//getting parent container
	const parentContainer=document.querySelector('body');

	//creating the weather card
	const weatherDisplayElem=document.createElement('div');

	weatherDisplayElem.setAttribute('id','weather-display');
	//setting css
	weatherDisplayElem.classList.add('flex','flex-col','self-center',
	'shadow-xl', 'rounded-lg','bg-gray-100','mt-5','w-3/5','items-center');
	
	const image= new Image(128,128);
	const location=document.createElement('h3');
	location.textContent=weatherObj.location.name;
	location.classList.add('self-center')
	weatherDisplayElem.appendChild(location);

	image.src=weatherObj.forecast[0].day.condition.icon;
	weatherDisplayElem.appendChild(image);

	const info=document.createElement('h5');
	info.textContent=weatherObj.condition;
	weatherDisplayElem.appendChild(info);

	//check here
	const highTemperatureF=document.createElement('p');
	highTemperatureF.textContent=weatherObj.forecast[0].day.maxtemp_f;
	weatherDisplayElem.appendChild(highTemperatureF);

	if(parentContainer)
		parentContainer.appendChild(weatherDisplayElem);
}

//function to create a card based on the locations info
function dayCard(weatherCardElem: HTMLDivElement){

	const parentContainer=document.createElement('div');
	const container=document.createElement('div');
	const image=new Image(64,64);

	const temperatureElems=document.createElement('div');
	const maxTemp=document.createElement('div');
	const minTemp=document.createElement('div');

	if(weatherCardElem.firstElementChild?.textContent==='Today'){
		image.src=weatherObj.forecast[0].day.condition.icon;
		maxTemp.textContent=weatherObj.forecast[0].day.maxtemp_f;
		minTemp.textContent=weatherObj.forecast[0].day.mintemp_f
	}
	else if(weatherCardElem.firstElementChild?.textContent==='Tomorrow'){
		image.src=weatherObj.forecast[1].day.condition.icon;
		maxTemp.textContent=weatherObj.forecast[1].day.maxtemp_f;
		minTemp.textContent=weatherObj.forecast[1].day.mintemp_f
	}
	else{
		image.src=weatherObj.forecast[2].day.condition.icon;
		maxTemp.textContent=weatherObj.forecast[2].day.maxtemp_f;
		minTemp.textContent=weatherObj.forecast[2].day.mintemp_f
	}
	temperatureElems.appendChild(maxTemp);
	temperatureElems.appendChild(minTemp);

	container.appendChild(image);
	container.appendChild(temperatureElems);


	parentContainer.appendChild(container);
	weatherCardElem.appendChild(parentContainer);
}

//creating sub weather cards
function createDayWeatherCards(){
	const bodyContainer=document.querySelector('body');

	const parentContainer=document.createElement('div');

	parentContainer.classList.add('weather-day-cards');
	parentContainer.classList.add('flex','flex-col')

	const weatherDayOneCard=document.createElement('div');
	weatherDayOneCard.classList.add('flex','flex-col','self-center','shadow-xl',
	'rounded-lg','bg-gray-100','w-2/5','items-center','my-9');

	const title1=document.createElement('h4');
	title1.textContent='Today';
	weatherDayOneCard.appendChild(title1);
	dayCard(weatherDayOneCard);

	const weatherDayTwoCard=document.createElement('div');
	weatherDayTwoCard.classList.add('flex','flex-col','self-center','shadow-xl',
	'rounded-lg','bg-gray-100','w-2/5','items-center','my-9');

	const title2=document.createElement('h4');
	title2.textContent='Tomorrow';
	weatherDayTwoCard.appendChild(title2);
	dayCard(weatherDayTwoCard);

	const weatherDayThreeCard=document.createElement('div');
	weatherDayThreeCard.classList.add('flex','flex-col','self-center','shadow-xl',
	'rounded-lg','bg-gray-100','w-2/5','items-center','my-9');

	const title3=document.createElement('h4');
	title3.textContent=weatherObj.forecast[weatherObj.forecast.length-1].date;
	weatherDayThreeCard.appendChild(title3);
	dayCard(weatherDayThreeCard);

	parentContainer.appendChild(weatherDayOneCard);
	parentContainer.appendChild(weatherDayTwoCard);
	parentContainer.appendChild(weatherDayThreeCard);

	bodyContainer?.appendChild(parentContainer);
}

//function to create and show the weather cards on the webpage
function showWeatherInfo(){

	//getting the parent container
	const parentContainer=document.querySelector('body');

	//If there are aleady elements here after another API call, remove them.
	if(parentContainer)
		if(parentContainer.children.length>0){
			for(let i=parentContainer.children.length-1; i >0; i --){
				parentContainer.children[i].remove();
			}
		}

	createMainWeatherCard();
	createDayWeatherCards();

	//const container=document.querySelector('.weather-display');
	
}

function createExpandedWeatherInfo(){

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

	//showing weather cards
	showWeatherInfo();
}

//starting point of the program
export function start(){

	const searchBtn=document.querySelector('button');

	//adding event listener for seearch button
	if(searchBtn)
		searchBtn.addEventListener('click',(Event)=>{
			//getting the information from the input element
			let searchInput=document.querySelector('input');
			weather(searchInput?.value);
		});
}