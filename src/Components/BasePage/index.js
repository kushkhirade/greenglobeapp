import React from "react";
import { LoginScreen } from "../LoginScreen";

export class BasePage extends React.Component {
  state = {
    isLoggedIn: false,
  };

  componentDidMount() {
    const isUserLoggedIn = localStorage.getItem("userData");
    console.log('>> isuserLoggedIn', isUserLoggedIn);
    if (JSON.parse(isUserLoggedIn)) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  onLoginSuccess = (userName, password) => {
    localStorage.setItem("userData", JSON.stringify({ userName, password }));
    this.setState({ isLoggedIn: true });
  };

  render() {
    console.log(">> this.state.isLoggedIn", this.state.isLoggedIn);
    return (
      <div className="App">
        <div className="main-container">
          {this.state.isLoggedIn ? (
            this.props.children
          ) : (
            <LoginScreen onLoginSuccess={this.onLoginSuccess} />
          )}
        </div>
      </div>
    );
  }
}
