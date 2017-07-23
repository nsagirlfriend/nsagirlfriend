chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo && changeInfo.status == "complete"){
    if ((tab.url.indexOf("http://www.facebook.com/") !=-1 || 
    tab.url.indexOf("https://www.facebook.com/") !=-1) && changeInfo.status === 'complete') {
      chrome.tabs.sendMessage(tabId, {data: tab}, function(response) {
        console.log(response);
      });
    }       
  }
});