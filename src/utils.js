module.exports = {
  hello: () => console.log("hello modules!"),
  getCurrentTabUrl: (callback) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      if (!tabs || tabs.length < 1) console.error("No active tab in this window");
      else callback(tabs[0].url);
    });
  },

  getCurrentTabId: (callback) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      if (!tabs || tabs.length < 1) console.error("No active tab in this window");
      else callback(tabs[0].id);
    });
  },

  reloadTabWithId: (id) => {
    chrome.tabs.reload(id)
  },

  createTabWithUrl: (destination) => {
    chrome.tabs.create({ url: destination });
  },

  getReviewRequest: (callback) => {},
};

// TODO chrome extension 함수들 util로 만들기