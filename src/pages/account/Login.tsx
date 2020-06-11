import * as React from "react";
import BaseLogo from "./BaseLogo.png";
import Card from "@material-ui/core/Card";
import { isEmpty } from "lodash";
import "./Login.scss";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { saveLoggedInUserData } from "src/state/Utility";
import { saveLoggedInUserDetails } from "src/actions/App.Actions";

const LoginScreenImpl = (props: any) => {
  const [userName, setName] = React.useState("Demo");
  const [password, setPassword] = React.useState("demo");

  const handleLogin = async () => {
    if (isEmpty(userName) || isEmpty(password)) {
      return;
    }
    if (userName === "Demo" && password === "demo") {
      saveLoggedInUserData({ userName });
      saveLoggedInUserDetails({ userName, isDealer: true, isDist: false });
      props.history.push("/home");
    }
    if (userName === "DemoDist" && password === "demo") {
      saveLoggedInUserData({ userName });
      saveLoggedInUserDetails({ userName, isDealer: false, isDist: true });
      props.history.push("/home");
    }
  };

  return (
    <div className="main-container">
      <div className="login-main">
        <Card className="login-container">
          <div>
            <img src={BaseLogo} alt="login" height="100px" />
          </div>
          <div className="input-conttainer">
            <input
              onChange={(e) => setName(e.target.value)}
              className="login-input"
              value={userName}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="input-conttainer">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              type="password"
              placeholder="Password"
            />
          </div>
          <div
            onClick={() => props.history.push("/forgot-password")}
            className="forgot-password"
          >
            Forgot Password ?
          </div>
          <div>
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
          </div>
          <div className="forgot-password">Apply for Dealer/Distributor</div>
        </Card>
      </div>
    </div>
  );
};

export const LoginScreen = withRouter(LoginScreenImpl);
