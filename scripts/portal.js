

let loggedInText = document.querySelector("p.logged-in-as-text");
let fName = localStorage.getItem("userFirstName");
let lName = localStorage.getItem("userLastName");
let logOutLi = document.querySelector("li#log-out-li");

// Add in welcome text with the user's name.
loggedInText.textContent = `Welcome, ${fName} ${lName}!`;

logOutLi.addEventListener("click", function () {
    // When the user logs out, remove references of the user's name in localstorage.
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("userId");
});

