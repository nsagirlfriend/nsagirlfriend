const phoneNumber = "+16476423455";

function getFirstName(str) {
  let spacePosition = str.indexOf(' ');
  if (spacePosition === -1)
    return str;
  else
    return str.substr(0, spacePosition);
};

function getGender(name){
  const firstName = getFirstName(name);
  makeHttpRequest("GET", "https://api.genderize.io/?name=" + firstName, null, function(data){
    if (data.gender === "female"){
      makeHttpRequest("POST", "https://localhost:3000", { number:phoneNumber, name:name, timestamp: new Date().toISOString() }, 
       (response) => {
        console.log(response);
      })
    } // data.gender can be null
  });
}

function serialize(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}


function makeHttpRequest(type, url, data, responseCallback){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      responseCallback(JSON.parse(this.responseText));
    }
  };
  xhttp.open(type, url, true);

  if (type === "POST"){
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    const encodedData = serialize(data);
    xhttp.send(encodedData);
  } else {
    xhttp.send();
  }
}

var currentName = "";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //here we get the new 
    console.log("URL CHANGED: " + request.data.url);
    var name = document.getElementById("fb-timeline-cover-name").innerText;
    if (name !== "" && name !== currentName){
      getGender(name);
    }
});

