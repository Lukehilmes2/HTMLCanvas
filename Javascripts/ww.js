var w;
var data;
var click = true;
function startWorker() {
    if (click){
    click = false;
    w = new Worker("Javascripts/worker.js");

    w.onmessage = function (event) {
        data = event.data;
        
        var col = [];
        for (var i = 0; i < 4; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    console.log(key + " " + data[i]);
                    col.push(key);
                }
            }
        }
        for (i = 0; i < data.length; i++) {

            tr = document.getElementById("table").insertRow();

            for (var j = 1; j < 4; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i][col[j]];
            }
        }
    };
}
}


