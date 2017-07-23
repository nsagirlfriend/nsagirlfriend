//$(document).on('ready', function() {
  //console.log(jQuery('#fb-timeline-cover-name').text());
  //console.log("ok")
//jQuery
//})

var name = document.getElementById("fb-timeline-cover-name").innerText;
console.log(name);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo,tab) {
    console.log(changeInfo);
    if ((tab.url.indexOf("http://www.facebook.com/") !=-1 || tab.url.indexOf("https://www.facebook.com/") !=-1) && changeInfo.status === 'complete') {
        chrome.tabs.executeScript(tabId, {file: "main.js"});
    }

var name = document.getElementById("fb-timeline-cover-name").innerText;
console.log(name);
});
