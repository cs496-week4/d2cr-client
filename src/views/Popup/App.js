import React, { useState } from "react";
import "./App.css";

import InspectButton from "./InspectButton";
import GitHubButton from "./GitHubButton";
import { statusCode, tooltip } from "../../utils";

function App() {
  const [status, setStatus] = useState(statusCode.OK);

  const handleStatusChange = (code) => {
    console.log(code)
    setStatus(code);
  };

  return (
    <div class="container">
      <h1 class="title">리뷰 분석기 </h1>
      <div class="flex-container">
        <div class="flex-item">
          <InspectButton handleStatusChange={handleStatusChange} />
        </div>
        <div class="flex-item">
          <GitHubButton />
        </div>
      </div>

      {tooltip[status]}
    </div>
  );
}

export default App;
