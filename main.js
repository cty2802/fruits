'use strict';
let dataArray;
let dataArrayType;
let sortedAsc = false;
let globalFilterName;
let idCounter = 0;
let globalFilterType = false;

function loadJson() {
	dataArray = JSON.parse(data);
	dataArrayType = JSON.parse(dataType);
	for (let i = 0; i < dataArray.length; i++) {
		idCounter = idCounter + 1;
		dataArray[i].id = idCounter;
	}
}

function initPage() {
	loadJson();
	sortFruits();
	let typeForAdd = document.getElementById('selectTypeForAdd');
	const c1 = createFillingDropDown(typeForAdd);
	let typeForSort = document.getElementById('selectTypeforSort');
	createFillingDropDown(typeForSort);

	draw();
	document.getElementById('input').value = null;
	document.getElementById('newFruit').value = null;
	newFruit;
}

function sortFruits(but) {
	let asc = '\u2227';
	let desc = '\u2228';
	if (sortedAsc === false) {
		dataArray.sort(function(a, b) {
			return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
		});
	} else {
		dataArray.sort(function(a, b) {
			return a.name === b.name ? 0 : a.name > b.name ? -1 : 1;
		});
	}
	sortedAsc = !sortedAsc;
	if (but) {
		if (sortedAsc) {
			but.value = `sort ${asc}`;
		} else {
			but.value = `sort ${desc}`;
		}
	}
	draw();
}

function draw() {
	var filling = document.getElementById('filling');
	var fillingString = '';
	while (filling.firstChild) {
		filling.removeChild(filling.firstChild);
	}
	for (let i = 0; i < dataArray.length; i++) {
		var nameType = getTypeName(dataArray[i].type);
		if (
			(!globalFilterType || globalFilterType === dataArray[i].type) &&
			(!globalFilterName || dataArray[i].name.toLowerCase().indexOf(globalFilterName) > -1)
		) {
			fillingString =
				fillingString +
				`<tr><td ondblclick= "editFruit('${dataArray[i].id}', this)">${dataArray[i]
					.name}</td><td ondblclick="editType('${dataArray[i].id}',
					this)" style="text-align:center">${nameType}</td><td style="text-align:center"><button onclick="deleteFruit('${dataArray[
					i
				].id}')">delete</button></td></tr>`;
		}
	}
	filling.innerHTML = fillingString;
}

function createFillingDropDown(container) {
	let oldValue = container.innerHTML;
	let edit = document.createElement('select');
	edit.value = oldValue;
	container.innerHTML = null;
	container.appendChild(edit);
	// edit.addEventListener('keydown', function(event) {
	// 	if (event.key == 'Enter') {
	// 		updateFruit(edit.value);
	// 		container.innerHTML = edit.value;
	// 	}
	// 	if (event.key == 'Escape') {
	// 		updateFruit(edit.value);
	// 		container.innerHTML = oldValue;
	// 	}
	// });
	// edit.addEventListener('blur', function() {
	// 	container.innerHTML = oldValue;
	// });
	var stringOptions = '';
	for (let i = 0; i < dataArrayType.length; i++) {
		stringOptions =
			stringOptions +
			`<option label="${dataArrayType[i].name}" value="${dataArrayType[i].id}">${dataArrayType[i].name}</option>`;
	}
	edit.innerHTML = stringOptions;
	//console.log(edit);
	return edit;
}

function search(input) {
	let filter = input.value.toLowerCase();
	globalFilterName = filter;
	draw();
}

function deleteFruit(elem) {
	let ind = dataArray.findIndex((el) => {
		return el.id == elem;
	});
	dataArray.splice(ind, 1);
	idCounter = idCounter - 1;
	draw();
}

function getTypeName(number) {
	let ind = dataArrayType.findIndex((el) => {
		return el.id == number;
	});
	let nameType = dataArrayType[ind].name;
	return nameType;
}

function updateFruit(id, newName) {
	let ind = dataArray.findIndex((el) => {
		return el.id == id;
	});
	dataArray[ind].name = newName;
}

function editFruit(id, container) {
	let oldValue = container.innerHTML;
	let edit = document.createElement('input');
	edit.value = oldValue;
	container.innerHTML = null;
	container.appendChild(edit);
	edit.addEventListener('keydown', function(event) {
		if (event.key == 'Enter') {
			updateFruit(edit.value);
			container.innerHTML = edit.value;
		}
		if (event.key == 'Escape') {
			updateFruit(edit.value);
			container.innerHTML = oldValue;
		}
	});
	edit.addEventListener('blur', function() {
		container.innerHTML = oldValue;
	});
}

function selectTypeForSort(input) {
	let filter = input.value;
	globalFilterType = filter;
	draw();
}

function editType(id, container) {
	const edit = createFillingDropDown(container);
	edit.addEventListener('keydown', function(event) {
		if (event.key == 'Enter') {
			updateFruit(edit.value);
			container.innerHTML = edit.value;
		}
		if (event.key == 'Escape') {
			updateFruit(edit.value);
			container.innerHTML = oldValue;
		}
	});
	edit.addEventListener('blur', function() {
		container.innerHTML = oldValue;
	});
	changeType(container);
}

function createNewElement(input, but) {
	input = document.getElementById('newFruit');
	let idFruit = dataArray.length;
	let duplicate = false;
	for (let i = 0; i < dataArray.length; i++) {
		if (input.value === dataArray[i].name) {
			duplicate = true;
			alert('This is fruit does exist!');
			break;
		}
	}
	let typeName = document.getElementById('selectTypeForAdd');
	if (duplicate != true) {
		dataArray.push({
			name: input.value.charAt(0).toUpperCase() + input.value.slice(1),
			id: idFruit,
			type: typeName
		});
		if (sortedAsc === true) {
			sortedAsc = false;
		} else {
			sortedAsc = true;
		}
		sortFruits(but);
	}
	return idFruit;
}

function addFruits(newFruit) {
	let idFruit = createNewElement(newFruit);
	//let ind = dataArray.findIndex((el)=>{ return el.id == idFruit});
	idCounter = idCounter + 1;
	draw();
}

function changeType(select) {
	let edit = createFillingDropDown(select);

	//console.log(select, edit);
	edit.addEventListener('keydown', function(event) {
		if (event.key == 'Enter') {
			updateFruit(edit.value);
			input.innerHTML = edit.value;
		}
		if (event.key == 'Escape') {
			updateFruit(edit.value);
			input.innerHTML = oldValue;
		}
	});
	edit.addEventListener('blur', function() {
		input.innerHTML = oldValue;
	});
}
