import React, { useState } from "react";
import { reloadTabWithId, getCurrentTabId, createTabWithUrl, isUrlAboutReview, statusCode, NetworkMontior, getCurrentTabUrl, processUrl } from "../../utils";
import API from "../../api";
import AwesomeButtonProgress from "react-awesome-button/src/components/AwesomeButtonProgress";
import styles from "react-awesome-button/src/styles/themes/theme-rickiest";

function InspectButton({ handleStatusChange }) {
  const handlePress = async (element, next) => {
    handleStatusChange(statusCode.LOADING);

    try {
      getCurrentTabUrl((productUrl) => {
        getCurrentTabId(async (tabId) => {
          try {
            const isInspectable = await API.checkInspectable(productUrl);
            if (!isInspectable) {
              handleStatusChange(statusCode.INVALID_PAGE);
            } else {
              const networkMontior = new NetworkMontior();
              reloadTabWithId(tabId);
              let urlList = await networkMontior.getAllReviewRequests();
              console.log("networkMonitor returned: ", urlList);

              const reviewInspectPageUrl = await API.getReviewInspectPage(urlList, productUrl);
              createTabWithUrl(process.env.REACT_APP_WEB_URL + reviewInspectPageUrl);
            }
          } catch (e) {
            console.error(e);
            handleStatusChange(statusCode.SERVER_ERROR);
          }
        });
      });
    } catch (e) {
      console.error(e);
      handleStatusChange(statusCode.NO_ACTIVE_TAB);
    } finally {
      next();
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
