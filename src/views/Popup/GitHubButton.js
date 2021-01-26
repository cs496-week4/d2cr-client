import React from "react";
import styles from "react-awesome-button/src/styles/themes/theme-rickiest";
import { AwesomeButtonSocial } from "react-awesome-button";
import { createTabWithUrl } from "../../utils";

export default function GitHubButton() {
  return (
    <AwesomeButtonSocial
      type="github"
      size="small"
      onPress={() => {
        createTabWithUrl(process.env.REACT_APP_GITHUB);
      }}
    />
  );
}
