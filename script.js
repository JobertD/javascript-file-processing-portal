document.addEventListener("DOMContentLoaded", function () {
    // Load and parse the JSON file containing student data
    fetch("../students.json")
      .then((response) => response.json())
      .then((data) => {
        const loginForm = document.querySelector("form");
  
        loginForm.addEventListener("submit", function (e) {
          e.preventDefault();
  
          // Get the entered student ID and password
          const studentId = document.querySelector('#studentID').value;
          const password = document.querySelector('#password').value;
  
          // Check if the student ID and password match any entry in the JSON data
          const student = data.students.find(
            (student) => 
              student.studId === studentId && student.password === password
          );
  
          if (student) {
            // Successful login, you can redirect to another page or perform other actions here
            alert("Login successful!");
            // You can add code to redirect to another page here if needed.
          } else {
            // Failed login attempt
            alert("Invalid student ID or password. Please try again.");
          }
        });
      })
      .catch((error) => {
        console.error("Error loading student data:", error);
      });
  });
  