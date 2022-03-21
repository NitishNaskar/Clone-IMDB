const nowMovieId=["tt9848626","tt10083340","tt10872600","tt10895576","tt10295212","tt6264654","tt2463208","tt1877830"];
const cardIdNew=["now-movie-card-1","now-movie-card-2","now-movie-card-3","now-movie-card-4"];

const hindiMovieId=["tt8291224","tt10324144","tt4169250","tt7098658"];
const cardIdHindi=["hindi-movie-card-1","hindi-movie-card-2","hindi-movie-card-3","hindi-movie-card-4"];


if(localStorage["nitish_coding_ninja_ls"]===undefined){
    var nitish_coding_ninja_ls={};
    localStorage.setItem("nitish_coding_ninja_ls",JSON.stringify(nitish_coding_ninja_ls))
}

function addTofavourite(callmId,callcardId){
    var temp=JSON.parse(localStorage.getItem("nitish_coding_ninja_ls"));
    temp[callmId]=true;
    localStorage.setItem("nitish_coding_ninja_ls",JSON.stringify(temp));
    
    const callcardDom=document.getElementById(callcardId);
    callcardDom.getElementsByTagName("button")[0].className="btn btn-danger";
}

function searchApiCall(callapi){
    var xhrRequest=new XMLHttpRequest();
    xhrRequest.onload=function(){
        var resObj=JSON.parse(xhrRequest.response);
        console.log(resObj["Response"]);
        if(resObj["Response"]=="True"){
            var SearchArr=resObj.Search;
            var innerhtmltext="";
            for(let val of SearchArr){
                innerhtmltext=innerhtmltext+"<a href='./moviePage.html?"+val["imdbID"]+"' class='list-group-item list-group-item-action' target='_blank'>"+val["Title"]+"</a>";
            }
            document.getElementById("search-autocomplete-list").innerHTML=innerhtmltext;
        }else{
            document.getElementById("search-autocomplete-list").innerHTML="<a href='#' class='list-group-item list-group-item-action'>No Result Found</a>";
        }
    };
    xhrRequest.open('get',callapi);
    xhrRequest.send();
}

var ignoreClickOnMeElement = document.getElementById('search-autocomplete');

document.addEventListener('click', function(event) {
    var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
    if (!isClickInsideElement) {
        //Do something click is outside specified element
        document.getElementById("search-autocomplete-list").className="list-group fixed-top visually-hidden";
    }else{
        document.getElementById("search-autocomplete-list").className="list-group fixed-top";
        ignoreClickOnMeElement.addEventListener('input', function(eventInput) {
            var titleSer=eventInput.target.value;
            if(titleSer.length>1 && titleSer.length%2==0){
                var callapi='https://www.omdbapi.com/?apikey=5d12a71c&s='+titleSer;
                console.log(callapi);
                searchApiCall(callapi);
            }
        });
    }
});



function callMovieInformation(cardId,url){
    var xhrRequest=new XMLHttpRequest();
    
    xhrRequest.onload=function(){
        var resObj=JSON.parse(xhrRequest.response);

        const cardDom=document.getElementById(cardId);

        cardDom.getElementsByTagName("img")[0].src=resObj.Poster;
        cardDom.getElementsByTagName("h5")[0].innerText=resObj.Title;
        cardDom.getElementsByTagName("p")[0].innerText=resObj.Plot;
        cardDom.getElementsByTagName("a")[0].setAttribute("onclick","moveToInfo('"+resObj.imdbID+"')");
        var temp=JSON.parse(localStorage.getItem("nitish_coding_ninja_ls"));
        if(temp[resObj.imdbID]!==undefined){
            cardDom.getElementsByTagName("button")[0].className="btn btn-danger";
        }
        cardDom.getElementsByTagName("button")[0].setAttribute("onclick","addTofavourite('"+resObj.imdbID+"','"+cardId+"')");
    };

    xhrRequest.open('get',url);
    xhrRequest.send();
}

function moveToInfo(movieId){
    window.open("./moviePage.html?"+movieId);
}

let danArr=[];

while(danArr.length<4){
    var element=nowMovieId[Math.floor(Math.random()*nowMovieId.length)];
    var isPresent=false;
    for(let value of danArr){
        if(element==value){
            isPresent=true;
        }
    }
    if(!isPresent){
        danArr.push(element);
    }
    
}

for(let i=0;i<4;i++){
    var apiurl='https://www.omdbapi.com/?apikey=5d12a71c&i='+danArr[i];
    callMovieInformation(cardIdNew[i],apiurl);
    apiurl='https://www.omdbapi.com/?apikey=5d12a71c&i='+hindiMovieId[i];
    callMovieInformation(cardIdHindi[i],apiurl);
}

