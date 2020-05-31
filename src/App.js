import React from "react";
import { ToastProvider } from "react-toast-notifications";
import "./App.scss";
import { BasePage } from "./Components/BasePage";
import { LandingPage } from "./LandingPage";

class App extends React.Component {
  render() {
    return (
      <ToastProvider placement="top-center">
        <BasePage>
          <LandingPage />
        </BasePage>
      </ToastProvider>
    );
  }
}

export default App;
