import React from "react";
import BaseLogo from "./BaseLogo.png";
import Card from "@material-ui/core/Card";
import { useToasts } from "react-toast-notifications";
import { isEmpty } from "ramda";

export const LoginScreen = (props) => {
  const [userName, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { addToast } = useToasts();

  const handleLogin = () => {
    if (isEmpty(userName) || isEmpty(password)) {
      addToast("Please fill all the fields", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    if (userName === "Demo" && password === "demo") {
      props.onLoginSuccess(userName, password);
    }
  };

  return (
    <div className="login-main">
      <Card className="login-container">
        <div>
          <img src={BaseLogo} alt="login" height="100px" />
        </div>
        <div className="input-conttainer">
          <input
            onChange={(e) => setName(e.target.value)}
            className="login-input"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="input-conttainer">
          <input
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
  );
};
