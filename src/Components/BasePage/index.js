import React from "react";
import { LoginScreen } from "../LoginScreen";

export class BasePage extends React.Component {
  state = {
    isLoggedIn: false,
  };

  componentDidMount() {
    const isUserLoggedIn = localStorage.getItem("userData");
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
