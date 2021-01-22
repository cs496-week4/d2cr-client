import React from 'react'
import './App.css'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>Popup page</p>
//         <p>
//           Edit <code>src/views/Popup/App.js</code> and save.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import Users from "./Users";
import InspectButton from "./InspectButton"

function App() {
  return (
    <p>
      <InspectButton />
      <Users />
    </p>
  );
}

export default App
