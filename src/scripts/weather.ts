
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

let screenSize=window.innerWidth;
console.log(screenSize);

//function to create the main weather card on the top portion of the page
//making the main weather card
function createMainWeatherCard(size: number=screenSize){

	let parentElem=null;

	if(size > 640){

		const weatherContainer=document.createElement('div');
		weatherContainer.classList.add('flex','min-h-screen');

		weatherContainer.setAttribute('id','weather-container');

		parentElem=document.querySelector('body');
		parentElem?.appendChild(weatherContainer);

		parentElem=weatherContainer;

	}
	else{
		parentElem=document.querySelector('body');

	}
	
	//creating the weather card
	const weatherDisplayElem=document.createElement('div');

	weatherDisplayElem.setAttribute('id','weather-display');
	//setting css
	weatherDisplayElem.classList.add('flex','flex-col','self-center','p-1.5',
	'shadow-xl', 'rounded-lg','bg-gray-100','mt-5','w-3/4','items-center','h-1/3');

	weatherDisplayElem.classList.add('sm:w-2/5');

	const image= new Image(80,80);
	const location=document.createElement('h2');
	location.textContent=weatherObj.location.name;
	location.classList.add('self-center')
	weatherDisplayElem.appendChild(location);

	image.src=weatherObj.forecast[0].day.condition.icon;
	weatherDisplayElem.appendChild(image);

	const info=document.createElement('h5');
	info.textContent=weatherObj.condition;
	weatherDisplayElem.appendChild(info);


	const highTemperatureF=document.createElement('p');
	highTemperatureF.textContent=`Todays high is ${weatherObj.forecast[0].day.maxtemp_f}°`;
	weatherDisplayElem.appendChild(highTemperatureF);

	if(parentElem)
		parentElem.appendChild(weatherDisplayElem);
	
}

//function to create a card based on the locations info
function dayCard(weatherCardElem: HTMLDivElement){

	//parent container
	const parentContainer=document.createElement('div');

	parentContainer.classList.add('flex')
	const image=new Image(64,64);

	const temperatureContainer=document.createElement('div');
	temperatureContainer.classList.add('flex','flex-col','justify-between');

	const maxTemp=document.createElement('p');
	const minTemp=document.createElement('p');

	if(weatherCardElem.firstElementChild?.textContent==='Today'){
		image.src=weatherObj.forecast[0].day.condition.icon;

		maxTemp.textContent=`High, ${weatherObj.forecast[0].day.maxtemp_f}°`;
		minTemp.textContent=`Low, ${weatherObj.forecast[0].day.mintemp_f}°`;
	}
	else if(weatherCardElem.firstElementChild?.textContent==='Tomorrow'){
		image.src=weatherObj.forecast[1].day.condition.icon;

		maxTemp.textContent=`High, ${weatherObj.forecast[1].day.maxtemp_f}°`;
		minTemp.textContent=`Low, ${weatherObj.forecast[1].day.mintemp_f}°`;
	}
	else{
		image.src=weatherObj.forecast[2].day.condition.icon;

		maxTemp.textContent=`High, ${weatherObj.forecast[2].day.maxtemp_f}°`;
		minTemp.textContent=`Low, ${weatherObj.forecast[2].day.mintemp_f}°`;
	}
	temperatureContainer.appendChild(maxTemp);
	temperatureContainer.appendChild(minTemp);


	parentContainer.appendChild(image);

	parentContainer.appendChild(temperatureContainer);

	weatherCardElem.appendChild(parentContainer);
}

//creating sub weather cards
function createDayWeatherCards(size: number=screenSize){

	//helper function to add a class to a div element
	function addClass(element: HTMLDivElement){
		element?.classList.add('flex','flex-col','self-center','shadow-xl',
		'rounded-lg','bg-gray-100','w-3/5','items-center','my-9','h-1/3','justify-evenly');
	}
	let parentElem=null;
	if(size > 640){
		const bodyElem=document.getElementById('weather-container');
		const subWeatherCardsContainer=document.createElement('div');
		subWeatherCardsContainer.classList.add('flex','flex-col','w-full');
		bodyElem?.appendChild(subWeatherCardsContainer);
		parentElem=subWeatherCardsContainer;
	}
	else{
		parentElem=document.querySelector('body');
	}

	const weatherDayOneCard=document.createElement('div');
	addClass(weatherDayOneCard);

	const title1=document.createElement('h4');
	title1.textContent='Today';
	weatherDayOneCard.appendChild(title1);
	dayCard(weatherDayOneCard);

	const weatherDayTwoCard=document.createElement('div');
	addClass(weatherDayTwoCard);

	const title2=document.createElement('h4');
	title2.textContent='Tomorrow';
	weatherDayTwoCard.appendChild(title2);
	dayCard(weatherDayTwoCard);

	const weatherDayThreeCard=document.createElement('div');
	addClass(weatherDayThreeCard);
	const title3=document.createElement('h4');
	title3.textContent=weatherObj.forecast[weatherObj.forecast.length-1].date;
	weatherDayThreeCard.appendChild(title3);
	dayCard(weatherDayThreeCard);

	parentElem?.appendChild(weatherDayOneCard);
	parentElem?.appendChild(weatherDayTwoCard);
	parentElem?.appendChild(weatherDayThreeCard);
}
//start here
//function to create and show the weather cards on the webpage
function showWeatherInfo(size: number=screenSize){

	//getting the parent container
	const parentContainer=document.querySelector('body');

	//If there are aleady elements here after another API call, remove them.
	if(parentContainer)
		if(parentContainer.children.length>0){
			for(let i=parentContainer.children.length-1; i >0; i --){
				parentContainer.children[i].remove();
			}
		}
	createMainWeatherCard(size);
	createDayWeatherCards(size);
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
	showWeatherInfo(screenSize);
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


	window.addEventListener('resize',()=>{
		let currSize=window.innerWidth;
		console.log(currSize);
		if(weatherObj.forecast.length !==0){
			showWeatherInfo(currSize);
		}
	});
}