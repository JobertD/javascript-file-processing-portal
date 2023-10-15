document.addEventListener("DOMContentLoaded", function () {
    // Load and parse the JSON file containing all class codes.
    fetch("../data/classCodes.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("Parsing classCodes.json");
      localStorage.setItem("classCodes", JSON.stringify(data.codes[0]));
    })
    .catch((error) => {
      console.log("Failed to parse classCodes.json: ", error);
    });

    // Load and parse the JSON file containing staff data
    fetch("../data/staff.json")
      .then((response) => response.json())
      .then((data) => {
        const loginForm = document.querySelector("form");
  
        loginForm.addEventListener("submit", function (e) {
          e.preventDefault();
  
          // Get the entered staff ID and password
          const staffId = document.querySelector('#staffID').value;
          const password = document.querySelector('#password').value;
  
          // Check if the staff ID and password match any entry in the JSON data
          const faculty = data.staff.find(
            (staff) =>  {
              if (staff.staffId === staffId && staff.password === password) {
                // Remember the details for the portal page.
                localStorage.setItem("userFirstName", staff.fName);
                localStorage.setItem("userLastName", staff.lName);
                localStorage.setItem("staffId", staffId);
                localStorage.setItem(`${staffId}ClassCodes`, JSON.stringify(staff.Classes));
                return true;
              }
            }
          );
  
          if (faculty) {
            // Successful login, you can redirect to another page or perform other actions here
            alert("Login successful!");
            // You can add code to redirect to another page here if needed.

            // Redirect to the page.
            location.assign("/pages/portal.html");


          } else {
            // Failed login attempt
            alert("Invalid staff ID or password. Please try again.");
          }
        });
      })
      .catch((error) => {
        console.error("Error loading staff data:", error);
      });

    // Load and parse the JSON file containing all student data,
    // but only if it does not exist in local storage yet.
    if (!localStorage.getItem("studentData")) {
      fetch("../data/students.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Parsing students.json");
        localStorage.setItem("studentData", JSON.stringify(data.students));
      })
      .catch((error) => {
        console.log("Failed to parse classCodes.json: ", error);
      })
  }
  });
  