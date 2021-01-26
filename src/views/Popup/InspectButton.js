import React, { useState } from "react";
import { reloadTabWithId, getCurrentTabId, createTabWithUrl, isUrlAboutReview, statusCode, NetworkMontior } from "../../utils";
import API from "../../api";
import AwesomeButtonProgress from "react-awesome-button/src/components/AwesomeButtonProgress";
import styles from "react-awesome-button/src/styles/themes/theme-rickiest";

function InspectButton({ handleStatusChange }) {
  const getReviewInspectPage = (url, callback = () => null) => {
    API.getReviewInspectPage(
      url,
      (reviewInspectPageUrl) => {
        if (reviewInspectPageUrl !== "Hello") {
          createTabWithUrl(process.env.REACT_APP_WEB_URL + reviewInspectPageUrl);
          handleStatusChange(statusCode.SUCCEESS)
        }
          // TODO error 났을 때 아예 도달하지 못하도록 수정
      },
      callback
    );
  };


  const handlePress = async (element, next) => {
    handleStatusChange(statusCode.LOADING)
    try {
      getCurrentTabId(reloadTabWithId);
      console.log("get current tab id");

      const networkMontior = new NetworkMontior()
      let url = await networkMontior.waitForAllRequests()
      console.log(url)

      if (url) {
        if (!url.includes("page=")) url = url + "&page=1";
        getReviewInspectPage(url, next);
      }
      else {
        handleStatusChange(statusCode.INVALID_PAGE);
        console.log("유효한 탭이 아님");
      }
    }
    catch (e) {
      handleStatusChange(statusCode.NO_ACTIVE_TAB)
      console.error(e)
    }
  };

  const handleHello = () => {
    API.hello();
  };

  return (
    <AwesomeButtonProgress loadingLabel="기다려주세요" resultLabel="다 됐어요!" size="medium" type="primary" onPress={handlePress}>
      리뷰 분석
    </AwesomeButtonProgress>
  );
}

export default InspectButton;
