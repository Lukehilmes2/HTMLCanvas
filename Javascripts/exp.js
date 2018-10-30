
$(function (){
    var $photos = $("#imgDiv");
    var $table = $("#table");
    var $Employer = $.cookie("Employer");
    var jsonStr = "experience";
    if($Employer == "Manual Labor"){
        jsonStr = "manual";
    }
    else if($Employer == "Government"){
        jsonStr = "government";
    }
    else if($Employer == "College"){
        jsonStr = "college";
    }

    $.ajax({
        type:'GET',
        url: 'Data/'+jsonStr+'.json',
        success: function(experience){
            $.each(experience,function(i,e){
                var $tr = $('<tr>').append(
                    
                    $('<td>').text(e.Company),
                    $('<td>').text(e.TimeWorked),
                    $('<td>').text(e.JobTitle)
                ).appendTo($table);
                    var imgPath = "<img src = 'Photos/" + e.imgPath + "' height='240' width='320' >";
                    $photos.hide();
                    $photos.append(imgPath);
            });
        }
    });

    $("#table").click(function(){
        if($Employer == "Manual Labor"){
            $photos.fadeToggle('slow');
        }
        else if($Employer == "Government"){
            $photos.animate({
                height:'toggle'
            });
        }
        else if($Employer == "College"){
            $photos.slideToggle('slow');
        }
        else{
            $photos.animate({
                height:'toggle'
            });
            $photos.animate({height: '100px', opacity: '0.1'}, "slow");
            $photos.animate({width: '100px', opacity: '0.5'}, "slow");
            $photos.animate({height: '100%', opacity: '0.4'}, "slow");
            $photos.animate({width: '100%', opacity: '0.8'}, "slow");
        }
    });
   
});