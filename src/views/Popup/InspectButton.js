import React, { useState, useEffect } from "react";
import axios from "axios";
import Utils, { reloadTabWithId, getCurrentTabId } from "../../utils";

function InspectButton() {
  const handleClick = () => {
    getCurrentTabId(reloadTabWithId);

    chrome.webRequest.onBeforeRequest.addListener(
      (details) => {
        if (details.type == "xmlhttprequest" && details.url.includes("review")) {
          API.getReviewInspectPage(details.url, (reviewInspectPageUrl) => Utils.createTabWithUrl(reviewInspectPageUrl)); // POST 메소드로 보내기
        }
      },
      { urls: ["<all_urls>"] },
      ["requestBody"]
    );
  };

  return (
    <p>
      <button onClick={handleClick}> 검사하기 </button>
    </p>
  );
}

export default InspectButton;
