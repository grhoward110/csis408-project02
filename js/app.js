$("#navbar").load("../include/navbar.html", function() {
    $.each($('#navbar').find('li'), function() {
        $(this).toggleClass('active', 
            window.location.pathname.indexOf($(this).find('a').attr('href')) > -1);
    }); 
    
});

function textCounter(field,field2,maxlimit) {
    var countfield = document.getElementById(field2);
    if ( field.value.length > maxlimit ) {
        field.value = field.value.substring( 0, maxlimit );
        return false;
    } else {
        countfield.value = maxlimit - field.value.length;
    }
}

var checkExist = setInterval(function() {
    if ($('.approvalStatus').length) {
       console.log("Exists!");
       clearInterval(checkExist);
            var i=0;
            $(".approvalStatus").change(function() {
                //console.log("Change detected" + i);
                $('#changeCounter').text("Submit " + (i+1) + " Change(s)");
                i++;
            });
    }
 }, 100);

