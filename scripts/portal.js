let loggedInText = document.querySelector("p.logged-in-as-text");
let logOutLi = document.querySelector("li#log-out-li");
let manageGradesLink = document.querySelector("a#grades");
let settingsLink = document.querySelector("a#settings");
let dropDown = document.querySelector("select");
let studentTable = document.querySelector("#student-table");
let settingsSection = document.querySelector("section#settings");
let manageGradesSection = document.querySelector("section#manage-grades-content");



let id = localStorage.getItem("staffId");
let staffClassCodeList = JSON.parse(localStorage.getItem(`${id}ClassCodes`));
let allClassCodeList = JSON.parse(localStorage.getItem("classCodes"));
let studentData = JSON.parse(localStorage.getItem("studentData"));
let fName = localStorage.getItem("userFirstName");
let lName = localStorage.getItem("userLastName");

// Add in welcome text with the user's name.
loggedInText.textContent = `Welcome, ${fName} ${lName}!`;

logOutLi.addEventListener("click", function () {
    // When the user logs out, remove references of the user's name in local storage.
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("staffId"); // Change "userId" to "staffId"
    localStorage.removeItem("${id}ClassCodes");
    localStorage.removeItem("classCodes");

    // Save current state of student data to local storage.
    localStorage.setItem("studentData", JSON.stringify(studentData));
});

// Fetch class codes and staff data concurrently
for (const code of staffClassCodeList) {
    let option = document.createElement("option");
    option.value = code;
    option.textContent = `${code}: ${allClassCodeList[code]}`;
    dropDown.appendChild(option);
    console.log(`Adding ${code} to dropdown`);
}
  
// Event when in the Manage Grades page.
manageGradesLink.addEventListener("click", function() {
    // Hide the other sections.
    manageGradesSection.style.display = "block";
    settingsSection.style.display = "none";

    // Event listener for dropdown selection
    dropDown.addEventListener("change", function () {
        const selectedClassCode = dropDown.value;
        
        // Clear existing table rows
        const tbody = document.querySelector("#student-table tbody");
        while (tbody.hasChildNodes()) {
            tbody.removeChild(tbody.firstChild);
        }
    
        for (const student of studentData) {
            if (student.classCode === selectedClassCode) {
                const newRow = tbody.insertRow(-1);
                const cell1 = newRow.insertCell(0);
                const fullName = `${student.fName} ${student.lName}`;
                cell1.textContent = fullName;
            }
        }
});

});



  // Event listener for settings dropdown
  const settingsDropdown = document.querySelector("#settings-dropdown");
  const settingsButton = document.querySelector("#settings-button");

  settingsButton.addEventListener("click", function () {
      const selectedOption = settingsDropdown.value;

      if (selectedOption === "profile") {
          // Handle profile change logic (e.g., navigate to profile change page)
          alert("Changing Profile...");
      } else if (selectedOption === "password") {
          // Handle password change logic (e.g., navigate to password change page)
          alert("Changing Password...");
      }
  });
  
settingsLink.addEventListener("click", function() {
    manageGradesSection.style.display = "none";
    settingsSection.style.display = "block";
});

manageGradesLink.dispatchEvent(new Event("click"));
