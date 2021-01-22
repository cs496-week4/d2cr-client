import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from '../../background'
function InspectButton() {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect 실행!")
    chrome.webRequest.onBeforeRequest.addListener(
        (detail) => chrome.extension.getBackgroundPage().console.log(detail),
        {urls: ["<all_urls>"]}
    )   
  }, []);

  const handleClick = () => {
    // TODO 서버로 현재 url, request 보내기

    Background.log("제발 되라 ")
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
          console.log(tabs[0].url)
              chrome.tabs.create({ url: tabs[0].url });
      });
  };

  return (
    <p>
      <button onClick={handleClick}> Let's Inspect! </button>
    </p>
  );
}

export default InspectButton;
