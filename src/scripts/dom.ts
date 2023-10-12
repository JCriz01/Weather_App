function createDisplayer(): void {
	const container = document.querySelector('body');

	const elementBody = document.createElement('div');
	elementBody.classList.add('relative', 'w-2/3');
}

export function firstTimeDisplayer(): void {
	const displayer = document.querySelector('#first-time-displayer');
	const firstTimeBtn = document.querySelector('#first-time-btn');

	if (FirstVisit()) {
		displayer?.classList.remove('hidden');
	} else {
		displayer?.classList.add('hidden');
	}
}

function FirstVisit(): boolean {
	if (!localStorage.getItem('firstVisit')) {
		localStorage.setItem('firstVisit', 'true');
		return true;
	} else {
		localStorage.setItem('firstVisit', 'false');
		return false;
	}
}
