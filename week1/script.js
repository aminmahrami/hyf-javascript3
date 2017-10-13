let searchButton = document.getElementById('contributersBySearch');
searchButton.onclick = function(){httpGetAsync(getContByType(), render)};//type button
let searchContributers = document.getElementById('contributersBySelect');
searchContributers.onclick = function(){httpGetAsync(getContBySelect(), render)};//select button
function listOfRepos(){httpGetAsync(makeRequest(), reposList)};
listOfRepos();//this will make select options

//request
function httpGetAsync(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
      else if (xmlHttp.status == 404){error();}
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  let dataAmin = xmlHttp.responseText;
  return dataAmin;
}
//error
function error(){div.innerHTML= '<img src="https://68.media.tumblr.com/14dc06fb9898061c135bca44420ac457/tumblr_myzkt8Iwja1rzx1ieo1_500.jpg"/>';}

//make request for repos list
let theUrl = " ";
let searchTerm = " ";

function makeRequest(){
  let theUrl = 'https://api.github.com/orgs/HackYourFuture/repos'
  console.log(theUrl);
  return theUrl;
}

let div = document.createElement('div');
document.body.appendChild(div);

function render(data){
    let dataObj = JSON.parse(data);
    div.innerHTML= '<h2 id="title">Contributers are</h2>'; /// this will prevent from generating new content again and again.
    console.log(dataObj);
    let statics = dataObj.map((x)=>  x.login + "<br>" +" contributions : "+x.contributions );//functional programming
    console.log(statics);
    //loop
    for (let i in statics){
    let contbutersSection = document.createElement('h3');
    div.appendChild(contbutersSection);
    let linkToProfile = document.createElement('a');
    contbutersSection.appendChild(linkToProfile); 
    let urlToRepo =  'https://github.com/'+dataObj[i].login;
    linkToProfile.setAttribute('href', urlToRepo);  
    linkToProfile.setAttribute('target', 'blank');
    linkToProfile.innerHTML = statics[i];}//append object to li
  }

let searchTxt = document.getElementById('searchTxt');
let select = document.getElementById('select');

//making select options
function reposList(repos){
    let dataObj = JSON.parse(repos);
    console.log(dataObj);
  //loop
    for (let i in dataObj){
    let myOption = document.createElement('option');//make li
    select.appendChild(myOption);//append list to ul
    myOption.innerHTML = dataObj[i].name;//append object to li
    myOption.setAttribute('value', dataObj[i].name );}
}

function getContBySelect(){
let userChoice = select.value;

console.log(userChoice);
  let theUrl = 'https://api.github.com/repos/HackYourFuture/'+userChoice+'/contributors';
  return theUrl;
}
function getContByType(){
  let userType = searchTxt.value;

console.log(userType);
  let theUrl = 'https://api.github.com/repos/HackYourFuture/'+userType+'/contributors';
  return theUrl;
}
