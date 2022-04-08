let timeoutID;
let timeout = 15000;

function setup() {
	document.getElementById("theButton").addEventListener("click", makePost);
	timeoutID = window.setTimeout(poller, timeout); //when time is up, call poller, every 15 seconds(15000 ms)
}

function makePost() {
	console.log("Sending POST request");
	const one = document.getElementById("a").value
	const two = document.getElementById("b").value
	const three = document.getElementById("c").value
	
	fetch("/new_item", { //go to /new_item post request
			method: "post", //post request
			headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" }, //form data
			body: `one=${one}&two=${two}&three=${three}` //what is sent
		}) //a string that looks like JSON
		.then((response) => {
			return response.json(); //returns a promise to .then(result)
		})
		.then((result) => { //update when the two promises are resolved
			updateTable(result);
			clearInput();
		})
		.catch(() => {
			console.log("Error posting new items!");
		});
}

function poller() {
	console.log("Polling for new items");
	fetch("/items") //polls for data
		.then((response) => { //puts the data in response
			return response.json();
		})
		.then(updateTable)
		.catch(() => {
			console.log("Error fetching items!");
		});
}

function updateTable(result) {
	console.log("Updating the table");
	const tab = document.getElementById("theTable");
	while (tab.rows.length > 0) {
		tab.deleteRow(0);
	}
	
	for (var i = 0; i < result.length; i++) {
		addRow(result[i]);
	}
	
	timeoutID = window.setTimeout(poller, timeout);
}

function addRow(row) {
	const tableRef = document.getElementById("theTable");
	const newRow = tableRef.insertRow();

	for (var i = 0; i < row.length; i++) {
		const newCell = newRow.insertCell();
		const newText = document.createTextNode(row[i]);
		newCell.appendChild(newText);
	}
}

function clearInput() {
	console.log("Clearing input");
	document.getElementById("a").value = "";
	document.getElementById("b").value = "";
	document.getElementById("c").value = "";
}

window.addEventListener("load", setup);
