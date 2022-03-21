if(localStorage["nitish_coding_ninja_ls"]===undefined){
    var nitish_coding_ninja_ls={};
    localStorage.setItem("nitish_coding_ninja_ls",JSON.stringify(nitish_coding_ninja_ls))
}

var temp=JSON.parse(localStorage.getItem("nitish_coding_ninja_ls"));
var idArr=Object.keys(temp);

var strInnerText="";

function callMovieInformation(url){
    var xhrRequest=new XMLHttpRequest();
    
    xhrRequest.onload=function(){
        var resObj=JSON.parse(xhrRequest.response);
        strInnerText=strInnerText+"<div class='col'><div class='card h-100'><img  class='card-img-top' src='"+resObj.Poster+"' alt='Movies photo'><div class='card-body'><h5 class='card-title'>"+resObj.Title+"</h5><p class='card-text'>"+resObj.Plot+"</p><a href='moviePage.html?"+resObj.imdbID+"' class='btn btn-primary' target='_blank'>More Info >> </a>  <button type='button' class='btn btn-danger'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-heart-fill' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'></path></svg></button></div></div></div>";
    };

    xhrRequest.open('get',url,false);
    xhrRequest.send();
}

for(let val of idArr){
    var apiurl='http://www.omdbapi.com/?apikey=5d12a71c&i='+val;
    callMovieInformation(apiurl);
}

document.getElementById("myfavourt").innerHTML=strInnerText;