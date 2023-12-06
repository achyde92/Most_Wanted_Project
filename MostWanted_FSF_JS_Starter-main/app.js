// PRO TIP: To quickly navigate to a function, right click on its name and select "Go to Definition"

function app(people) {
	debugger;
	displayWelcome();
	runSearchAndMenu(people);
	return exitOrRestart(people);
}

function displayWelcome() {
	alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
	const searchResults = searchPeopleDataSet(people);

	if (searchResults.length > 1) {
		displayPeople('Search Results', searchResults);
	} else if (searchResults.length === 1) {
		const person = searchResults[0];
		mainMenu(person, people);
	} else {
		alert('No one was found in the search.');
	}
}

function searchPeopleDataSet(people) {
	const searchTypeChoice = validatedPrompt(
		'Please enter in what type of search you would like to perform.',
		['id', 'name', 'trait'],
	);

	let results = [];
	switch (searchTypeChoice) {
		case 'id':
			results = searchById(people);
			break;
		case 'name':
			results = searchByName(people);
			break;
		case 'trait':
			results = searchByTraits(people);
			break;
		default:
			return searchPeopleDataSet(people);
	}

	return results;
}

function searchById(people) {
	const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
	const idToSearchForInt = parseInt(idToSearchForString);
	const idFilterResults = people.filter((person) => person.id === idToSearchForInt);
	return idFilterResults;
}

function searchByName(people) {
	const firstNameToSearchFor = prompt(
		'Please enter the the first name of the person you are searching for.',
	);
	const lastNameToSearchFor = prompt(
		'Please enter the the last name of the person you are searching for.',
	);
	const fullNameSearchResults = people.filter(
		(person) =>
			person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() &&
			person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase(),
	);
	return fullNameSearchResults;
}

function searchByTraits(people) {
	const traitToSearchFor = prompt("Select from the following traits: gender, height, weight, eye color, occupation");
	let results;
	traitsSearchResults = person.filter(function(el){
	if (traitToSearchFor === "gender"){
		return searchByGender(people);
	}
	else if(traitToSearchFor === "height"){
		return searchByHeight(people);
	}
	else if(traitToSearchFor === "weight"){
		return searchByWeight(people);
	}
	else if(traitToSearchFor === "eye color"){
		return searchByEyeColor(people);
	}
	else if(traitToSearchFor === "occupation"){
		return searchByOccupation(people);
	}})
	return traitsSearchResults;
}

function searchByGender(people){
	let genderToSearchFor = prompt ("male or female?");
	let results;
	results = person.filter(function(el){
		if(el.gender === genderToSearchFor){
			return true;
		}
		else{
			return false;
		}
	})
	return results;
}

function searchByHeight(people){
	let heightToSearchFor = prompt ("Please enter the height you are looking for.");
	let results;
	results = person.filter(function(el){
		if(el.height === heightToSearchFor){
			return true;
		}
		else{
			return false;
		}
	})
	return results;
}

function searchByWeight(people){
	let weightToSearchFor = prompt ("Please enter the weight you are looking for.");
	let results;
	results = person.filter(function(el){
		if(el.weight === weightToSearchFor){
			return true;
		}
		else{
			return false;
		}
	})
	return results;
}

function searchByEyeColor(people){
	let eyeColorToSearchFor = prompt ("Please enter an eye color.");
	let results;
	results = person.filter(function(el){
		if(el.eyecolor === eyeColorToSearchFor){
			return true;
		}
		else{
			return false;
		}
	})
	return results;
}

function searchByOccupation(people){
	let occupationToSearchFor = prompt ("Please enter an occupation.");
	let results;
	results = person.filter(function(el){
		if(el.occupation === occupationToSearchForToSearchFor){
			return true;
		}
		else{
			return false;
		}
	})
	return results;
}

function mainMenu(person, people) {
	const mainMenuUserActionChoice = validatedPrompt(
		`Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
		['info', 'family', 'descendants', 'quit'],
	);

	switch (mainMenuUserActionChoice) {
		case 'info':
			displayPersonInfo(person);
			break;
		case 'family':
			let personFamily = findPersonFamily(person, people);
			displayPeople('Family', personFamily);
			break;
		case 'descendants':
			// let personDescendants = findPersonDescendants(person, people);
			// displayPeople('Descendants', personDescendants);
			break;
		case 'quit':
			return;
		default:
			alert('Invalid input. Please try again.');
	}

	return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
	const formatedPeopleDisplayText = peopleToDisplay
		.map((person) => `${person.firstName} ${person.lastName}`)
		.join('\n');
	alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function displayPersonInfo(person){
	console.log("First Name:", person.firstName);
	console.log("Last Name:", person.lastName);
	console.log("Gender:", person.gender);
	console.log("DOB:", person.dob);
	console.log("Id:", person.id);
	console.log("Height:", person.height);
	console.log("Weight:", person.weight);
	console.log("Eye Color:", person.eyecolor);
	console.log("Occupation:", person.occupation);
	
	let personInfo = ""
}
function findPersonFamily(person, allPeople){
	let spouse = allPeople.find(p => p.id === person.currentSpouse);
	return{
		spouse
	}
}

function displayPeople(personFamily){
	console.log("Spouse:", personFamily.spouse)
}

function validatedPrompt(message, acceptableAnswers) {
	acceptableAnswers = acceptableAnswers.map((aa) => aa.toLowerCase());

	const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers
		.map((aa) => `\n-> ${aa}`)
		.join('')}`;

	const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

	if (acceptableAnswers.includes(userResponse)) {
		return userResponse;
	} else {
		alert(
			`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers
				.map((aa) => `\n-> ${aa}`)
				.join('')} \n\nPlease try again.`,
		);
		return validatedPrompt(message, acceptableAnswers);
	}
}

function exitOrRestart(people) {
	const userExitOrRestartChoice = validatedPrompt('Would you like to exit or restart?', [
		'exit',
		'restart',
	]);

	switch (userExitOrRestartChoice) {
		case 'exit':
			return;
		case 'restart':
			return app(people);
		default:
			alert('Invalid input. Please try again.');
			return exitOrRestart(people);
	}
}

