import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SignupForm from "./components/SignupForm";

const App: React.FC = () => {
  return (
    //<Provider store={store}>
      <div className="min-h-screen flex items-center justify-center">
        <SignupForm />
      </div>
    //</Provider>
  );
};

export default App;