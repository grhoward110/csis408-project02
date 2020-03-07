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
          alert('Request Submitted!');
        },

    });
    return false;
})