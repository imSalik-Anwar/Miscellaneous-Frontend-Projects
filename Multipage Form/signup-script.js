let firstNameField = document.getElementById("first-name")
let lastNameField = document.getElementById("last-name")
let emailField = document.getElementById("email")
let contactField = document.getElementById("contact")
let resetbtn = document.getElementById("reset")
let submitbtn = document.getElementById("submit")

// array of JSON objects to store objects in local storage
let arr = [] 

// add event listener on submit
submitbtn.addEventListener("click", submitForm)

// write submitForm function
function submitForm(eventDetails){
    eventDetails.preventDefault()

    // extract value from the form fields
    let firstName = firstNameField.value;
    let lastName = lastNameField.value;
    let email = emailField.value;
    let contact = contactField.value
    // give an alert if form values are not expected
    if(!firstName || !lastName || !email || !contact){
        alert("Empty field(s).")
        return
    }
    if(contact.length != 10){
        alert("Invalid contact.")
        return
    }
    // Show submitted details
    document.querySelector("p").innerHTML = `Name: ${firstName} ${lastName} <br>
    Email: ${email} <br>
    Contact: ${contact}`

    // Send this info to the database page
    // Create an object with required details
    let obj = {
        name : firstName+" "+lastName,
        email : email,
        contact : contact
    }
    // store the obj into array
    arr.push(obj)
    // convert the array into JSON
    let jasonArray = JSON.stringify(arr)
    // store the JSON array into local storage
    localStorage.setItem("data", jasonArray)

    // use this JSON array on Database page
}