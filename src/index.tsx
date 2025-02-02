import React from "react"; // Imports React library
import ReactDOM from "react-dom/client"; // Enables rendering in React
import { Provider } from "react-redux"; // Wraps the app with Redux store provider
import { store } from "./store/store"; // Imports the Redux store
import App from "./App"; // Imports the main App component
import "./index.css"; // Imports global styles (optional)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>
);
