import { isValidUrl} from "./api"

export const hello = () => console.log("hello modules!");
export const getCurrentTabUrl = (callback) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (!tabs || tabs.length < 1) throw new Error("[getCurrentTabUrl] No active tab in this window");
    else callback(tabs[0].url);
  });
};

export const getCurrentTabId = (callback) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (!tabs || tabs.length < 1) throw new Error("[getCurrentTabId] No active tab in this window");
    else callback(tabs[0].id);
  });
};

export const reloadTabWithId = (id) => {
  chrome.tabs.reload(id);
};

export const createTabWithUrl = (destination, callback = () => null) => {
  chrome.tabs.create({ url: destination }, callback());
};

// export const isUrlAboutReview = (url) => url.includes("iframe") && url.includes("product") && url.includes("reviews");
export const isUrlAboutReview = (url) => url.includes("reviews");

export const statusCode = {
  OK: "ok",
  SERVER_ERROR: "error",
  SUCCEESS: "success",
  LOADING: "loading",
  INVALID_PAGE: "invalid page",
  NO_ACTIVE_TAB: "no active tab",
};

export const tooltip = {
  [statusCode.OK]: (
    <div class="flex-container">
      <h2> {"😉  "}</h2>
      <h3 style={{ color: "#bbb" }}> 리뷰 분석 버튼을 눌러보세요! </h3>
    </div>
  ),

  [statusCode.INVALID_PAGE]: (
    <div class="flex-container">
      <h2> {"😅  "} </h2>
      <h3 style={{ color: "#bbb" }}> 분석기를 사용할 수 없는 페이지입니다 </h3>
    </div>
  ),

  [statusCode.SERVER_ERROR]: (
    <div class="flex-container">
      <h2> {"😱  "} </h2>
      <h3 style={{ color: "#bbb" }}> 에러가 발생했습니다 </h3>
    </div>
  ),

  [statusCode.NO_ACTIVE_TAB]: (
    <div class="flex-container">
      <h2> {"🤔  "} </h2>
      <h3 style={{ color: "#bbb" }}> 새로운 창을 띄워 접속해주시겠어요? </h3>
    </div>
  ),

  [statusCode.SUCCEESS]: (
    <div class="flex-container">
      <h2> 🤩 </h2>
      <h3 style={{ color: "#bbb" }}> 분석이 완료되었습니다! </h3>
    </div>
  ),

  [statusCode.LOADING]: (
    <div class="flex-container">
      <h2> 🙄 </h2>
      <h3 style={{ color: "#bbb" }}> 분석 중이에요 </h3>
    </div>
  ),
};

const DummyPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(), 3000)
})
export class NetworkMontior {
  constructor() {
    this.urlList = [];

    chrome.webRequest.onBeforeRequest.addListener(
      (details) => {
        if (isUrlAboutReview(details.url)) {
          this.urlList.push(details.url)
        }
      },
      { urls: ["<all_urls>"] },
      ["requestBody"]
    );
  }

  async getAllReviewRequests() {
    await DummyPromise; // wait for 3 seconds to gather request urls
    return this.urlList;
  }
}

export const processUrl = (url) => (url.includes("page=") ? url : url + "&page=1");
