let loggedInText = document.querySelector("p.logged-in-as-text");
let id = localStorage.getItem("staffId");
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
    localStorage.removeItem("staffId"); // Change "userId" to "staffId"
});

// Fetch class codes and staff data concurrently
Promise.all([
    fetch("/data/classCodes.json").then(response => response.json()),
    fetch("/data/staff.json").then(response => response.json())
])
.then(([classCodeData, staffData]) => {
    classCodeList = classCodeData.codes[0];
    staffList = staffData.staff;
    console.log("Adding Class code list to drop down...");

    const staff = staffList.find(prof => prof.userId == id);

    if (staff) {
        const cCodes = staff.Classes;

        for (const code in classCodeList) {
            if (cCodes.includes(code)) {
                let option = document.createElement("option");
                option.value = code;
                option.textContent = `${code}: ${classCodeList[code]}`;
                dropDown.appendChild(option);
                console.log(`Adding ${code} to dropdown`);
            }
        }
    }
})
.catch((error) => {
    console.log("Error loading class codes or staff data: ", error);
});
