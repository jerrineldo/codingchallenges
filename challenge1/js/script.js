//onload function
window.onload = function (e) {
  //create a XMLHttpRequest object 
  const xhr = new XMLHttpRequest();
  const container = document.getElementById("main-container");
  var html = "";
  xhr.onload = function () {
    if (this.status === 200) {
      const employeedetails = JSON.parse(xhr.responseText);
      //looping through each object in employeedetails
      for (var key in employeedetails) {
        if (employeedetails.hasOwnProperty(key)) {
          var person = {};
          person.employeefname = employeedetails[key].employeefname;
          person.employeelname = employeedetails[key].employeelname;
          person.employeeid = employeedetails[key].employeeid;
          person.employeebio = employeedetails[key].employeebio;
          person.employeehaspic = employeedetails[key].employeehaspic;
          person.employeeisfeatured = employeedetails[key].employeeisfeatured;
          person.roles = employeedetails[key].roles;
          //call the function to create the details of the employee
          var htmlreturned = divCreator(person);
          container.innerHTML = htmlreturned;
        }
      }
    } else {
      console.warn("Did not receive 200 OK from response!");
    }
  };

  //function to create the details of the employee
  function divCreator(employee) {
    var src = "";
    if (employee.employeehaspic) {
      src =
        "http://sandbox.bittsdevelopment.com/code1/employeepics/" +
        employee.employeeid +
        ".jpg";
    }
    html +=
      "<div class = 'employee-container' id='" + employee.employeeid + "'>";
    html += "<div class='image-container'>";

    html += "<img class='rounded' src='" + src + "'</>";
    if (employee.employeeisfeatured == 1) {
      html += "<div class='featured'>&#128081</div>";
    }
    html += "</div>";
    html += "<div class='details-container'>";
    html +=
      "<h2 class='name' id='name'>" +
      employee.employeefname +
      " " +
      employee.employeelname +
      "</h2>";
    html +=
      "<h3 class='bio' id='bio'>" +
      employee.employeebio +
      " " +
      employee.employeebio +
      "</h3>";
    for (var key in employee.roles) {
      if (employee.roles.hasOwnProperty(key)) {
        html +=
          "<button class='button' style='background-color:" +
          employee.roles[key].rolecolor +
          "'>" +
          employee.roles[key].rolename +
          "</button>";
      }
    }
    html += "</div></div>";
    return html;
  }

  //open the request
  xhr.open(
    "get",
    "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php"
  );
  xhr.setRequestHeader("Accept", "application/json");
  //send the request 
  xhr.send();
};
