

let loggedInText = document.querySelector("p.logged-in-as-text");
let fName = localStorage.getItem("userFirstName");
let lName = localStorage.getItem("userLastName");
let logOutLi = document.querySelector("li#log-out-li");
let dropDown = document.querySelector("select");

// Add in welcome text with the user's name.
loggedInText.textContent = `Welcome, ${fName} ${lName}!`;

logOutLi.addEventListener("click", function () {
    // When the user logs out, remove references of the user's name in localstorage.
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("userId");
});


// Add the list of class codes to the dropdown list.
let classCodeList;  
fetch("/data/classCodes.json")
    .then(response => response.json())
    .then(data => {
        classCodeList = data.codes[0]
        console.log("Adding Class code list to drop down...");

        for (const code in classCodeList) {
            let option = document.createElement("option");
            option.value = code;
            option.textContent = `${code}: ${classCodeList[code]}`;
            dropDown.appendChild(option);
            console.log(`Adding ${code} to dropdown`);
        }})
    .catch((error) => {
        console.log("Error loading class codes data: ", error);
    });

