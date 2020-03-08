// Login function
$("#loginForm").submit(function(event)
{
    var objectDataString = JSON.stringify({
      "email": document.getElementById('inputEmail').value,
      "password": document.getElementById('inputPassword').value  
    });

    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/users/login",
        data: objectDataString,
        error: function (e) {
          console.log(e);
         },
        dataType:"json",
        contentType: "application/json",
        success: function(result)
        {
          //add method to go to create request page
        },

    });
    return false;
})

// Signup function
$("#signupForm").submit(function(event)
{
    var objectDataString = JSON.stringify({
      "email": document.getElementById('inputEmail').value,
      "password": document.getElementById('inputPassword').value,
      //"isAdmin": false
    });

    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/users/signup",
        data: objectDataString,
        error: function (e) {
          console.log(e);
          console.log(e.responseText);
          $("#alert").load("../include/alertfail.html", function()
          {
            $(this).find(".alert").append(e.responseText);
          });
         },
        dataType:"json",
        contentType: "application/json",
        success: function(result)
        {
          $("#alert").load("../include/alertsuccess.html", function()
          {
            $('#signupForm').each(function(){
              this.reset();
            });  
            $(this).find(".alert").append("Signup Successful! Click <a href='login.html' class='alert-link'>Here</a> to go login.");
          });
        },

    });
    return false;
})

$("#requestForm").submit(function(event)
{
    var objectDataString = JSON.stringify({
      "message": document.getElementById('message').value,
      "category": document.getElementById('category').value,
      "approvalStatus": false
    });

    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/requests",
        data: objectDataString,
        error: function (e) {
          console.log(e);
         },
        dataType:"json",
        contentType: "application/json",
        success: function(result)
        {

          $('#requestForm').each(function(){
            this.reset();
          });

          $("#alert").load("../include/alertsuccess.html", function()
          {
            $(this).find(".alert").append("Your request has been submitted");

          });
        },

    });
    return false;
})

function loadRequests() {
  $.ajax({
    type: "GET",
    url: "http://localhost:5000/api/requests",
    //data: {get_param: "data"},
    dataType: "json",
    success: function (response) {

      $.each(response.data, function(i, item) {
        console.log(i);
          var $tr = $('#tabledata').append(
            $('<tr>').append(
            $('<td>').text(item._id),
            $('<td>').text(item.message),
            $('<td>').text(item.category),
            $('<td>').append(
              $('<select>').toggleClass("form-control approvalStatus").append(
                new Option("Pending Approval", null),
                new Option("Approved", true),
                new Option("Denied", false),
              ),
            )
          )
        ); 
      })   
    }
  })
}
