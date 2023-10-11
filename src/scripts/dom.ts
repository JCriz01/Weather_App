function createDisplayer(): void {
	const container = document.querySelector('body');

	const elementBody = document.createElement('div');
	elementBody.classList.add('relative', 'w-2/3');
}

export function firstTimeDisplayer(): void {
	const container = document.querySelector('body');

	console.log(container);

	if (FirstVisit()) {
	}
}

function FirstVisit(): boolean {
	if (!localStorage.getItem('firstVisit')) {
		localStorage.setItem('firstVisit', 'false');
		return false;
	} else {
		localStorage.setItem('firstVisit', 'true');
		return true;
	}
}
