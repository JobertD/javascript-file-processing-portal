let loggedInText = document.querySelector("p.logged-in-as-text");
let logOutLi = document.querySelector("li#log-out-li");
let selectedClassCode;
let manageGradesLink = document.querySelector("a#grades");
let dropDownAddStudents = document.querySelector("section#add-students-content select");
let dropDownClassGrades = document.querySelector("section#manage-grades-content select");
let dropDownClassRemoveStudents = document.querySelector("section#remove-students-content select");
let dropDownClassAddStudents = document.querySelector("section#add-students-content select")
let manageGradesSection = document.querySelector("section#manage-grades-content");
let removeStudentsSection = document.querySelector("section#remove-students-content");
let removeStudentsLink = document.querySelector("a#remove-students");
let removeStudentsButton = document.getElementById("remove-students-button");
let studentNames;
let addStudentsSection = document.querySelector("section#add-students-content");
let addStudentsLink = document.querySelector("a#add-students");
let addStudentsButton = document.querySelector("section#add-students-button");



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
    localStorage.removeItem("staffId");
    localStorage.removeItem("${id}ClassCodes");
    localStorage.removeItem("classCodes");

    // Save current state of student data to local storage.
    localStorage.setItem("studentData", JSON.stringify(studentData));
});

//  class codes and staff data concurrently
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

for (const code in allClassCodeList) {
    let option = document.createElement("option");
    option.value = code;
    option.textContent = `${code}: ${allClassCodeList[code]}`;
    dropDownAddStudents.appendChild(option);
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
    selectedClassCode = dropDownClassRemoveStudents.value;

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

                cell2Input.setAttribute("data-student-name", fullName);
        }

        document.querySelector("section#remove-students-content .student-table tbody").addEventListener("change", function(event) {
            const checkboxes = document.querySelectorAll("section#remove-students-content .student-table tbody input[type='checkbox']");
            const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
        
            if (checkedCheckboxes.length > 0) {
                studentNames = checkedCheckboxes.map(checkbox => checkbox.getAttribute("data-student-name"));
                console.log("Selected student names:", studentNames);
                removeStudentsButton.disabled = false;
            } else {
                removeStudentsButton.disabled = true;
            }
        });

        removeStudentsButton.addEventListener("click", function() {
            if (selectedClassCode) {
                studentData = studentData.map(student => {
                    if (studentNames.includes(`${student.lName}, ${student.fName}`) && student.classCode === selectedClassCode) {
                        delete student.classCode;
                    }
                    return student;
                });
                localStorage.setItem("studentData", JSON.stringify(studentData));
                console.log("studentData");
                dropDownClassRemoveStudents.dispatchEvent(new Event("change"));
            }
        });
        
    });
});
  
// Event when in the Manage Grades page
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
                        let final = Math.floor((prelimGrade*.3 + midtermGrade*.3 + finalGrade*.4));
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

addStudentsLink.addEventListener("click", function () {
    // Hide the other sections
    addStudentsSection.style.display = "block";
    manageGradesSection.style.display = "none";
    removeStudentsSection.style.display = "none";
  
    // Clear existing table rows
    const tbody = document.querySelector("section#add-students-content .student-table tbody");
    while (tbody.hasChildNodes()) {
      tbody.removeChild(tbody.firstChild);
    }
  
    const studentsWithNoClassCode = studentData.filter(students => !students.classCode || students.classCode.trim() === "");
  
    // Create an array of students in alphabetical order
    studentsWithNoClassCode.sort((a, b) => {
      let fullName1 = `${a.lName}, ${a.fName}`;
      let fullName2 = `${b.lName}, ${b.fName}`;
      return fullName1.localeCompare(fullName2);
    });
    console.log(studentsWithNoClassCode);
  
    for (const student of studentsWithNoClassCode) {
      const newRow = tbody.insertRow(-1);
      const cell1 = newRow.insertCell(0);
      const fullName = `${student.lName}, ${student.fName}`;
      cell1.textContent = fullName;
  
      const cell2 = newRow.insertCell(1);
      let cell2Input = document.createElement("input");
      cell2Input.type = "checkbox";
      cell2.appendChild(cell2Input);
      cell2Input.setAttribute("student-name", fullName);
    }
  
    const addStudentsButton = document.getElementById("add-students-button"); 
    document.querySelector("section#add-students-content .student-table tbody, section#add-students-content .class-code-dropdown").addEventListener("change", function(event) {
        const checkboxes = document.querySelectorAll("section#add-students-content .student-table tbody input[type='checkbox']");
        const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    
        const studentNames = checkedCheckboxes.map(checkbox => checkbox.getAttribute("student-name"));
        if (checkedCheckboxes.length > 0 && dropDownAddStudents.value != "Select a class code:") {
            console.log("Selected student names:", studentNames);
            addStudentsButton.disabled = false;
        } else {
            addStudentsButton.disabled = true;
        }
        addStudentsButton.addEventListener("click", function() {
            console.log("Add students button clicked");
            for (const stud of studentNames){
                nameSplit = stud.split(", ");
                last = nameSplit[0];
                first = nameSplit[1];

                console.log(last,"|",first)
                const target = studentData.find(student => student.lName === last && student.fName === first);
                target.classCode = dropDownAddStudents.value;
            }
            localStorage.setItem("studentData", JSON.stringify(studentData));
            addStudentsLink.dispatchEvent(new Event("click"));
        })
    })
  });
  
  manageGradesLink.dispatchEvent(new Event("click"));

