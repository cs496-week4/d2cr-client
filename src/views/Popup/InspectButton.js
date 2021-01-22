import React, { useState, useEffect } from "react";
import axios from "axios";
import Utils, { reloadTabWithId, getCurrentTabId } from "../../utils";
import API from "../../api";

function InspectButton() {
  const [flag, setFlag] = useState(false);
  const [requestUrl, setRequestUrl] = useState("");

  const getReviewInspectPage = (url) => {
    API.getReviewInspectPage(url, (reviewInspectPageUrl) => console.log(reviewInspectPageUrl)); // POST 메소드로 보내기
  };

  useEffect(() => {
    if (requestUrl && requestUrl.length > 0) {
      console.log("requesting...");
      getReviewInspectPage(requestUrl);
    }
  }, [requestUrl]);
  // }, [flag, requestUrl])

  const handleClick = () => {
    getCurrentTabId(reloadTabWithId);

    chrome.webRequest.onBeforeRequest.addListener(
      (details) => {
        if (details.type == "xmlhttprequest" && details.url.includes("review") && details.url.includes("page=")) {
          console.log(details.url);
          //   setFlag(true);
          setRequestUrl(details.url);
          // API.getReviewInspectPage(details.url, (reviewInspectPageUrl) => console.log(reviewInspectPageUrl)); // POST 메소드로 보내기
          //   API.getReviewInspectPage(details.url, (reviewInspectPageUrl) => Utils.createTabWithUrl(reviewInspectPageUrl)); // POST 메소드로 보내기
        }
      },
      { urls: ["<all_urls>"] },
      ["requestBody"]
    );
  };

  const handleHello = () => {
    API.hello();
  };

  return (
    <p>
      <button onClick={handleClick}> 검사하기 </button>
      <button onClick={handleHello}> 안녕 </button>
    </p>
  );
}

export default InspectButton;
