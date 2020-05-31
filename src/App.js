import React from "react";
import { ToastProvider } from "react-toast-notifications";
import "./App.scss";
import { BasePage } from "./Components/BasePage";
import { HomeScreen } from "./Components/HomePage";

class App extends React.Component {

  render() {
    return (
      <ToastProvider placement="top-center">
        <BasePage>
          <HomeScreen />
        </BasePage>
      </ToastProvider>
    );
  }
}

export default App;
