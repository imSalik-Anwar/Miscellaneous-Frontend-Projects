let email = document.getElementById("mail")
let password = document.getElementById("password")
let group1 = document.getElementById("group1")
let group2 = document.getElementById("group2")
let submit = document.getElementById("btn")
// disable the button initially
submit.disabled = true

// create two p tags to show the messages for email and password feilds
let emailWarning = document.createElement("p")
emailWarning.className = "warning-tag"
emailWarning.innerHTML = "Make sure email is more than 3 characters and has @ and a ."
let passwordWarning = document.createElement("p")
passwordWarning.className = "warning-tag"
passwordWarning.innerHTML = "Make sure password is more than 8 characters."
// create a p tag consisting of success message
let successMessage = document.createElement("p")
successMessage.className = "success-message"
successMessage.innerHTML = "All good to go!"
// check if email is of at least length 3 and has @ and .
let regex = /^.{3,}@.*\..*$/
email.addEventListener("input", function() {
    // get email value
    let emailInput = email.value
    let passwordInput = password.value
    if(!regex.test(emailInput)){
        // append email warning to group 1
        group1.append(emailWarning)
        submit.disabled = true
        successMessage.remove()
    } 
    // remove warning if everything is fine
    if (regex.test(emailInput) || !emailInput){
        emailWarning.remove()
    }
    if(passwordInput.length >= 8 && regex.test(emailInput)){
        submit.disabled = false
        group2.append(successMessage)
        submit.addEventListener("click", submitForm)
    }
})

// check if password is of leangth 8 or not
password.addEventListener("input", function(){
    // get password value
    let passwordInput = password.value
    let emailInput = email.value
    if(passwordInput.length < 8){
        // append password warning to group 2
        group2.append(passwordWarning)
        successMessage.remove()
        submit.disabled = true
    } 
    // remove warning if everything is fine
    if (passwordInput.length >= 8 || !passwordInput){
        passwordWarning.remove()
    }
    if(passwordInput.length >= 8 && regex.test(emailInput)){
        submit.disabled = false
        group2.append(successMessage)
        submit.addEventListener("click", submitForm)
    }
})

let confirmationBox = document.getElementById("confirmation-box")

function submitForm(eventDetails){
    // prevent automatic form reload
    eventDetails.preventDefault()
    // show confirmation box
    confirmationBox.classList.remove("hide")
    // get okay button
    let okay = document.getElementById("okay")
    okay.addEventListener("click", function(){
        alert("Successful signup!")
        location.reload()
    })
    // get cancel button
    let cancel = document.getElementById("cancel")
    cancel.addEventListener("click", function(){
        confirmationBox.classList.add("hide")
        location.reload()
    })
}