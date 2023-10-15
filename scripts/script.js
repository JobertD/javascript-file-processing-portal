document.addEventListener("DOMContentLoaded", function () {
    // Load and parse the JSON file containing staff data
    fetch("/data/staff.json")
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
            (staff) => 
              staff.staffId === staffId && staff.password === password
          );
  
          if (faculty) {
            // Successful login, you can redirect to another page or perform other actions here
            alert("Login successful!");
            // You can add code to redirect to another page here if needed.

            //Remember the account details and redirect to the page for the portal.
            localStorage.setItem("userId", staffId);
            location.replace("/pages/portal.html");


          } else {
            // Failed login attempt
            alert("Invalid staff ID or password. Please try again.");
          }
        });
      })
      .catch((error) => {
        console.error("Error loading staff data:", error);
      });
  });
  