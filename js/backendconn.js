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
          console.log(result);
          return window.location.href = "requests.html";
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
          console.log(result);
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
      "approvalStatus": "Pending"
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

        if(item.approvalStatus == "Pending") {
          var $dropdown = $('<select>').toggleClass("form-control approvalStatus").append(
            new Option("Pending", "Pending"),
            new Option("Approved", "Approved"),
            new Option("Denied", "Denied"),
          );
        } else {
          var $dropdown = item.approvalStatus;
        }

        console.log(i);
          var $tr = $('#tabledata').append(
            $('<tr>').append(
            $('<td>').text(item._id),
            $('<td>').text(item.message),
            $('<td>').text(item.category),
            $('<td>').append($dropdown)
          )
        ); 
      })   
    }
  })
}

function updateRequests() {



  $('#requesttable').each(function(){
    $(this).find('tr').each(function(){
      
      row = [];

      row.push($(this).find("td:eq(0)").text());
      row.push($(this).find("td:eq(1)").text());
      row.push($(this).find("td:eq(2)").text());
      if($(this).find("td:eq(3)").text() =="Approved" || $(this).find("td:eq(3)").text() =="Denied") {
        row.push($(this).find("td:eq(3)").text());
      } else {
        console.log($(this).find("td:eq(3) option:selected").text());
        row.push($(this).find("td:eq(3) option:selected").text());
      }
      postUpdateRequests(row);
      row = [];
    })
})
}

function postUpdateRequests(data) {
  
  console.log("http://localhost:5000/api/requests/"+data[0]);

  var objectDataString = JSON.stringify({
    //"_id": data[0],
    "message": data[1],
    "category": data[2],
    "approvalStatus": data[3]
  });
  
  $.ajax({
    type: "PUT",
    crossDomain: true,
    url: "http://localhost:5000/api/requests/"+data[0],
    data: objectDataString ,
    error: function (e) {
      console.log(e);
     },
    dataType:"json",
    contentType: "application/json",
    success: function(result)
    {
      console.log(result);
      return window.location.href = "requests.html";
    },

});
}
