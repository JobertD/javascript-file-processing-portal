let loggedInText = document.querySelector("p.logged-in-as-text");
let id = localStorage.getItem("staffId");
let fName = localStorage.getItem("userFirstName");
let lName = localStorage.getItem("userLastName");
let logOutLi = document.querySelector("li#log-out-li");
let dropDown = document.querySelector("select");
let studentTable = document.querySelector("#student-table");
let staffClassCodeList = JSON.parse(localStorage.getItem(`${id}ClassCodes`));
let allClassCodeList = JSON.parse(localStorage.getItem("classCodes"));


// Add in welcome text with the user's name.
loggedInText.textContent = `Welcome, ${fName} ${lName}!`;

logOutLi.addEventListener("click", function () {
    // When the user logs out, remove references of the user's name in local storage.
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("staffId"); // Change "userId" to "staffId"
    localStorage.removeItem("${id}ClassCodes");
    localStorage.removeItem("classCodes");
});

// Fetch class codes and staff data concurrently
for (const code of staffClassCodeList) {
    let option = document.createElement("option");
    option.value = code;
    option.textContent = `${code}: ${allClassCodeList[code]}`;
    dropDown.appendChild(option);
    console.log(`Adding ${code} to dropdown`);
}
  
/*
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
*/


// Event listener for dropdown selection
dropDown.addEventListener("change", function () {
    const selectedClassCode = dropDown.value;
    
    // Clear existing table rows
    const tbody = document.querySelector("#student-table tbody");
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }

    // Fetch student data based on the selected class code and update the table
    fetch("/data/students.json") // Replace with the actual path to your students JSON file
        .then(response => response.json())
        .then(data => {
            data.students.forEach(student => {
                if (student.classCode === selectedClassCode) {
                    const newRow = tbody.insertRow(-1);
                    const cell1 = newRow.insertCell(0);
                    const fullName = `${student.fName} ${student.lName}`;
                    cell1.textContent = fullName;
                }
            });
            
        })
        .catch(error => {
            console.log("Error loading student data: ", error);
        });
});
