import React, { useState, useEffect } from "react";
import axios from "axios";
import Utils, { reloadTabWithId, getCurrentTabId } from "../../utils";
import API from "../../api";

function InspectButton() {
  const handleClick = () => {
    getCurrentTabId(reloadTabWithId);

    chrome.webRequest.onBeforeRequest.addListener(
      (details) => {
        if (details.type == "xmlhttprequest" && details.url.includes("review")) {
          console.log(details.url);
          API.getReviewInspectPage(details.url, (reviewInspectPageUrl) => Utils.createTabWithUrl(reviewInspectPageUrl)); // POST 메소드로 보내기
        }
      },
      { urls: ["<all_urls>"] },
      ["requestBody"]
    );
  };

  const handleHello = () => {
      API.hello()
  };

  return (
    <p>
      <button onClick={handleClick}> 검사하기 </button>
      <button onClick={handleHello}> 안녕 </button>
    </p>
  );
}

export default InspectButton;
