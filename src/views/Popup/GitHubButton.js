import React from "react";
import styles from "react-awesome-button/src/styles/themes/theme-rickiest";
import { AwesomeButtonSocial } from "react-awesome-button";
import { createTabWithUrl, log } from "../../utils";

export default function GitHubButton() {
  const addBookmark = (hostName, pageUrl) => {
    const bg = chrome.extension.getBackgroundPage();
    bg.addBookmark(hostName, pageUrl)
  };

  const onPress = () => {
    addBookmark("깃헙", "https://github.com/cs496-week4/d2cr-client");
    createTabWithUrl(process.env.REACT_APP_GITHUB);
  };

  return <AwesomeButtonSocial type="github" size="small" onPress={onPress} />;
}
