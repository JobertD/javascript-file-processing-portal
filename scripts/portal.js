let loggedInText = document.querySelector("p.logged-in-as-text");
let logOutLi = document.querySelector("li#log-out-li");
let manageGradesLink = document.querySelector("a#grades");
let settingsLink = document.querySelector("a#settings");
let manageStudentsLink = document.querySelector("a#students");
let dropDownClassGrades = document.querySelector("section#manage-grades-content select");
let dropDownClassStudents = document.querySelector("section#manage-students-content select");
let settingsSection = document.querySelector("section#settings");
let manageGradesSection = document.querySelector("section#manage-grades-content");
let manageStudentsSection = document.querySelector("section#manage-students-content");



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
dropDownClassStudents.appendChild(option);
console.log(`Adding ${code} to dropdown`);
}

for (const code of staffClassCodeList) {
let option = document.createElement("option");
option.value = code;
option.textContent = `${code}: ${allClassCodeList[code]}`;
dropDownClassGrades.appendChild(option);
console.log(`Adding ${code} to dropdown`);
}

// Event when in the Manage Students page.
manageStudentsLink.addEventListener("click", function() {
    // Hide the other sections.
    manageStudentsSection.style.display = "block";
    manageGradesSection.style.display = "none";
    settingsSection.style.display = "none";

});
  
// Event when in the Manage Grades page.
manageGradesLink.addEventListener("click", function() {
    // Hide the other sections.
    manageGradesSection.style.display = "block";
    manageStudentsSection.style.display = "none";
    settingsSection.style.display = "none";

    // Event listener for dropdown selection
    dropDownClassGrades.addEventListener("change", function () {
        const selectedClassCode = dropDownClassGrades.value;
        
        // Clear existing table rows
        const tbody = document.querySelector("section#manage-grades-content .student-table tbody");
        while (tbody.hasChildNodes()) {
            tbody.removeChild(tbody.firstChild);
        }
        
        // Create an array of students and sort them via alphabetical order.
        let students = [];
        for (const student of studentData) {
            if (student.classCode === selectedClassCode) {
                students.push(student);
            }
        }
        students.sort((a, b) => {
            let fullName1 = `${a.lName}, ${a.fName}`;
            let fullName2 = `${b.lName}, ${b.fName}`;
            return fullName1.localeCompare(fullName2);
        });
        console.log(students);
    
        // Set the cells for each student row and give them the grades if they are already set.
        for (const student of students) {
                const newRow = tbody.insertRow(-1);
                const cell1 = newRow.insertCell(0);
                const fullName = `${student.lName}, ${student.fName}`;
                cell1.textContent = fullName;

                // Add cells with input forms for grades.
                const cell2 = newRow.insertCell(1);
                let cell2Input = document.createElement("input");
                cell2Input.type = "number";
                cell2Input.min = "65";
                cell2Input.max = "99";
                if (student.prelimGrade) {
                    cell2Input.value = student.prelimGrade;
                }

                const cell3 = newRow.insertCell(2);
                let cell3Input = document.createElement("input");
                cell3Input.type = "number";
                cell3Input.min = "65";
                cell3Input.max = "99";
                if (student.midtermGrade) {
                    cell3Input.value = student.midtermGrade;
                }

                const cell4 = newRow.insertCell(3);
                let cell4Input = document.createElement("input");
                cell4Input.type = "number";
                cell4Input.min = "65";
                cell4Input.max = "99";
                if (student.finalGrade) {
                    cell4Input.value = student.finalGrade;
                }

                const cell5 = newRow.insertCell(4);
                if (student.final) {
                    cell5.textContent = student.final;
                }

                function cellInputHandler(event) {
                    let prelimGrade = Number(cell2Input.value);
                    let midtermGrade = Number(cell3Input.value);
                    let finalGrade = Number(cell4Input.value);

                    if ((prelimGrade !== "" && prelimGrade >= 65 && prelimGrade <= 99) &&
                    (midtermGrade !== "" && midtermGrade >= 65 && midtermGrade <= 99) &&
                    (finalGrade !== "" && finalGrade >= 65 && finalGrade <= 99)) {
                        //TODO: VERIFY FORMULA FOR FINAL GRADE
                        let final = Math.floor((prelimGrade + midtermGrade + finalGrade) / 3);
                        student.prelimGrade = prelimGrade;
                        student.midtermGrade = midtermGrade;
                        student.finalGrade = finalGrade;
                        student.final = final;
                        cell5.textContent = final;
                    }
                }

                cell2Input.addEventListener("change", cellInputHandler);
                cell3Input.addEventListener("change", cellInputHandler);
                cell4Input.addEventListener("change", cellInputHandler);

                cell2.appendChild(cell2Input);
                cell3.appendChild(cell3Input);
                cell4.appendChild(cell4Input);
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
    manageStudentsSection.style.display = "none";
    settingsSection.style.display = "block";
});

manageGradesLink.dispatchEvent(new Event("click"));
