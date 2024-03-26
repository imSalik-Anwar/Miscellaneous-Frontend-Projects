// get the JSON array from the local storage
let array = localStorage.getItem("data")
// parse the array
let arr = JSON.parse(array) || []

let tableBody = document.getElementById("table-body")
let serialNum = 1;
// create a row in the table body with the details array
for(let obj of arr){
    // create a new row for evey object
    let row = document.createElement("tr")
    // create three cell for every row
    let serialNumber = document.createElement("td")
    let name = document.createElement("td")
    let email = document.createElement("td")
    let contact = document.createElement("td")
    // set values of cells 
    serialNumber.textContent = serialNum++
    name.textContent = obj.name
    email.textContent = obj.email
    contact.textContent = obj.contact
    // append cells to the row
    row.appendChild(serialNumber)
    row.appendChild(name)
    row.appendChild(email)
    row.appendChild(contact)
    // append row to the table body
    tableBody.appendChild(row)
}