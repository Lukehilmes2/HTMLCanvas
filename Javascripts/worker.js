
function readData() {
    var url = "https://rickandmortyapi.com/api/character";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {


        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            postMessage(obj.results);

           
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
readData();