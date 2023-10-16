let loggedInText = document.querySelector("p.logged-in-as-text");
let logOutLi = document.querySelector("li#log-out-li");
let manageGradesLink = document.querySelector("a#grades");
let dropDownClassGrades = document.querySelector("section#manage-grades-content select");
let dropDownClassRemoveStudents = document.querySelector("section#remove-students-content select");
let manageGradesSection = document.querySelector("section#manage-grades-content");
let removeStudentsSection = document.querySelector("section#remove-students-content");
let removeStudentsLink = document.querySelector("a#remove-students");
let addStudentsSection = document.querySelector("section#add-students-content");
let addStudentsLink = document.querySelector("a#add-students");



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
dropDownClassRemoveStudents.appendChild(option);
console.log(`Adding ${code} to dropdown`);
}

for (const code of staffClassCodeList) {
let option = document.createElement("option");
option.value = code;
option.textContent = `${code}: ${allClassCodeList[code]}`;
dropDownClassGrades.appendChild(option);
console.log(`Adding ${code} to dropdown`);
}

// Event when in the Remove Students page.
removeStudentsLink.addEventListener("click", function() {
    // Hide the other sections.
    removeStudentsSection.style.display = "block";
    addStudentsSection.style.display = "none";
    manageGradesSection.style.display = "none";


    // Event listener for dropdown selection
    dropDownClassRemoveStudents.addEventListener("change", function() {
        const selectedClassCode = dropDownClassRemoveStudents.value;

        // Clear existing table rows
        const tbody = document.querySelector("section#remove-students-content .student-table tbody");
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

        // TODO: ADD CODE FOR ADDITION AND DELETION OF STUDENTS IN STUDENT DATA.
        // Set the cells for each student row and give them the grades if they are already set.
        for (const student of students) {
                const newRow = tbody.insertRow(-1);
                const cell1 = newRow.insertCell(0);
                const fullName = `${student.lName}, ${student.fName}`;
                cell1.textContent = fullName;

                const cell2 = newRow.insertCell(1);
                let cell2Input = document.createElement("input");
                cell2Input.type= "checkbox";
                cell2.appendChild(cell2Input);
        }

    });

});
  
// Event when in the Manage Grades page.
manageGradesLink.addEventListener("click", function() {
    // Hide the other sections.
    manageGradesSection.style.display = "block";
    addStudentsSection.style.display = "none";
    removeStudentsSection.style.display = "none";

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
                    student.prelimGrade = prelimGrade;
                    student.midtermGrade = midtermGrade;
                    student.finalGrade = finalGrade;

                    if ((prelimGrade !== "" && prelimGrade >= 65 && prelimGrade <= 99) &&
                    (midtermGrade !== "" && midtermGrade >= 65 && midtermGrade <= 99) &&
                    (finalGrade !== "" && finalGrade >= 65 && finalGrade <= 99)) {
                        //TODO: VERIFY FORMULA FOR FINAL GRADE
                        let final = Math.floor((prelimGrade + midtermGrade + finalGrade) / 3);
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




manageGradesLink.dispatchEvent(new Event("click"));
