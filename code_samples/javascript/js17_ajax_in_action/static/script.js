function makePost() {
	console.log("creating and sending the post request");

	let xhr = new XMLHttpRequest();

	if (!xhr) { //checks if xhr is null
		console.log("Could not create an XMLHttpRequest instance");
		return false;
	}
			
	xhr.onreadystatechange = () => logResponse(xhr); //every time xhr changes state, logResponse is called
	
	xhr.open("POST", "/new_item"); //sends a post request to the server to /new_item
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	var data;
	data = `one=${document.getElementById("a").value}&two=${document.getElementById("b").value}&three=${document.getElementById("c").value}`;
	
	xhr.send(data);
}

function logResponse(xhr) {
	console.log(`readyState: ${xhr.readyState}`);
	if (xhr.readyState === XMLHttpRequest.DONE) {
		console.log(`status: ${xhr.status}`);
 		if (xhr.status === 200) {
			console.log("Value sent to server!");
		} else {
			console.log("There was a problem with the request.");
		}
	}
}

function setup() {
	document.getElementById("theButton").addEventListener("click", makePost);
}

window.addEventListener("load", setup);
