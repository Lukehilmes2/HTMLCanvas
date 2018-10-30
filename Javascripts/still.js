$(document).ready(function ($) {
    var canvas = document.getElementById("still");
    var ctx = canvas.getContext("2d");
    var y = 30;
    var data;
    var num = 1;
    ctx.font = "30px Arial";
    ctx.strokeText("Rank", 0, y);
    ctx.strokeText("Name", 100, y);
    ctx.strokeText("Score", 250, y);
    $.ajax({
        type:'GET',
        url: 'Data/highscores.json',
        success: function(highscores){
            data = highscores;
            data.sort(function(a,b){
                return b.score - a.score;
            });
        
        
            $.each(data,function(index,value){
                y = y + 25;
                ctx.font = "20px Arial";
                ctx.fillText(num + ".", 0, y);
                num +=1;
                ctx.fillText(value.name, 100, y);
                ctx.fillText(value.score, 270, y);
            });
        
        }
        
    });









});