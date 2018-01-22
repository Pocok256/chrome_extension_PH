function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var
        tab = tabs[0];
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function HideUser(user) {

  var script = '$(\'.msg.flc:has(> .hlist.head.flc p a:nth-child(2)[href="/tag/'+user+'.html"])\').hide();'

  chrome.tabs.executeScript({
    code: script
  });
}

function getSavedData(url, callback) {

  chrome.storage.sync.get(url, (items) => {
    callback(chrome.runtime.lastError ? null : items[url]);
  });
}

function saveUserName(url, user) {
  var items = {};
  items[url] = user;

  chrome.storage.sync.set(items);
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    var inputData = document.getElementById('text');


    getSavedData(url, (saveduser) => {
      if (saveduser) {
        HideUser(saveduser);
        inputData.value = saveduser;
      }
    });

    inputData.addEventListener('change', () => {
      HideUser(inputData.value);
      saveUserName(url, inputData.value);
    });
  });
});
