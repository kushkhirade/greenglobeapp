import * as React from "react";
import BaseLogo from "./BaseLogo.png";
import Card from "@material-ui/core/Card";
import { isEmpty } from "lodash";
import "./Login.scss";
import { withRouter } from "react-router-dom";

const LoginScreenImpl = (props: any) => {
  const [userName, setName] = React.useState("Demo");
  const [password, setPassword] = React.useState("demo");

  const handleLogin = () => {
    if (isEmpty(userName) || isEmpty(password)) {
      return;
    }
    if (userName === "Demo" && password === "demo") {
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
              value={"Demo"}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="input-conttainer">
            <input
              value={"demo"}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const LoginScreen = withRouter(LoginScreenImpl);
