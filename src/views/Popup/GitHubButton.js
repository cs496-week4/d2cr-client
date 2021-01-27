import React from "react";
import styles from "react-awesome-button/src/styles/themes/theme-rickiest";
import { AwesomeButtonSocial } from "react-awesome-button";
import { createTabWithUrl } from "../../utils";

export default function GitHubButton() {

  // const createBookmark = () => {
  //   chrome.bookmarks.create({
  //     parentId: extensionsFolderId,
  //     title: "Extensions doc", // 현재 
  //     url: "http://code.google.com/chrome/extensions", // TODO 리뷰 url 로 바꾸기
  //   });
  // }

  const onPress = () => {
    // createBookmark()
    createTabWithUrl(process.env.REACT_APP_GITHUB);
  }


  return <AwesomeButtonSocial type="github" size="small" onPress={onPress} />;
}
