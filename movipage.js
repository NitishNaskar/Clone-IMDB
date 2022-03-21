var url=window.location.href;
var callapi='http://www.omdbapi.com/?apikey=5d12a71c&i='+url.split("?")[1];


function addTofavourite(callmId){
    var temp=JSON.parse(localStorage.getItem("nitish_coding_ninja_ls"));
    temp[callmId]=true;
    localStorage.setItem("nitish_coding_ninja_ls",JSON.stringify(temp));
}

function callMovieInformation(){
    var xhrRequest=new XMLHttpRequest();
    xhrRequest.onload=function(){
        var resObj=JSON.parse(xhrRequest.response);
        document.getElementById("Title").innerHTML=resObj.Title+" <span class='badge bg-warning text-wrap fs-6'><i class='bi bi-star-fill'></i>"+resObj.imdbRating+"</span>";
        document.getElementById("Plot").innerText=resObj.Plot;
        document.getElementById("actors").innerText=resObj.Actors;
        document.getElementById("writer").innerText=resObj.Writer;
        document.getElementById("director").innerText=resObj.Director;
        document.getElementById("awards").innerText=resObj.Awards;
        document.getElementById("genre").innerText=resObj.Genre;
        document.getElementById("poster").src=resObj.Poster;
        document.getElementById("released").innerText=resObj.Released;
        document.getElementById("runtime").innerText=resObj.Runtime;
        document.getElementById("boxOffice").innerText=resObj.BoxOffice;
        document.getElementById("language").innerText=resObj.Language;
        document.getElementById("addtofab").setAttribute("onclick","addTofavourite('"+resObj.imdbID+"')");
    };
    xhrRequest.open('get',callapi);
    xhrRequest.send();
}

callMovieInformation();
