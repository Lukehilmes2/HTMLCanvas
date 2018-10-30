
$(function(){

    $.ajax({
        type:'GET',
        url: 'Data/experience.json',
        success: function(experience){
            $("#employerType").append($('<option>All</option>').text("All"));
            $.each(experience,function(i,e){
                var exists = false;
                $('#employerType option').each(function(){

                    if (this.value == e.Employer) {
                        
                        exists = true;
                    }


                    
                });
                if(exists==false){
                    $("#employerType").append($('<option>'+e.Employer+'</option>').text(e.Employer));
                    
                }

            });
        }
    });
   
    $("#submit").click(function () {
    
        $("#Username").css('background-color', 'white');
        $("#Password").css('background-color', 'white');

        if ($("#Username").val() == "") {
            $("#Username").css("background-color", "red");
        }
        else if ($("#Password").val() == "") {
            $("#Password").css("background-color", "red");
        }

        else {
            alert("Thanks for registering! You are now logged in.");
            
            $.cookie("Username", $("#Username").val(),{ expires : 365 });
            $.cookie("Password" , $("#Password").val(),{ expires : 365 });
            $.cookie("Employer",$("#employerType option:selected").text(),{ expires : 365 });
           
           
            $("#Username").css('background-color', 'white')
                .val("");
            $("#Password").css('background-color', 'white')
                .val("");
            
        }
    });

    $("#Username").click(function () {
        $("#Username").css('background-color', 'yellow');
        $("#Password").css('background-color', 'white');

    });

    $("#Password").click(function () {
        $("#Password").css('background-color', 'yellow');
        $("#Username").css('background-color', 'white');

    });



});

function checkPasswordStrength() {
    var number = /([0-9])/;
    var alphabets = /([a-zA-Z])/;
    var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
    if($('#Password').val().length<6) {
    $('#password-strength-status').removeClass();
    $('#password-strength-status').addClass('weak-password');
    $('#password-strength-status').html("Weak (should be at least 6 characters.)");
    } else {  	
    if($('#Password').val().match(number) && $('#Password').val().match(alphabets) && $('#Password').val().match(special_characters)) {            
    $('#password-strength-status').removeClass();
    $('#password-strength-status').addClass('strong-password');
    $('#password-strength-status').html("Strong");
    } else {
    $('#password-strength-status').removeClass();
    $('#password-strength-status').addClass('medium-password');
    $('#password-strength-status').html("Medium (should include alphabets, numbers and special characters.)");
    }}}