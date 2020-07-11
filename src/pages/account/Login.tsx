import * as React from "react";
import BaseLogo from "./BaseLogo.png";
import Card from "@material-ui/core/Card";
import { isEmpty } from "lodash";
import "./Login.scss";
import Axios from "axios";
import { Typography } from "@material-ui/core";
import { NavLink, withRouter } from "react-router-dom";
import { saveLoggedInUserData } from "src/state/Utility";
import { saveLoggedInUserDetails } from "src/actions/App.Actions";
import * as AppActionCreators from "../../actions/App.Actions";

const LoginScreenImpl = (props: any) => {
  const [userName, setName] = React.useState("");
  const [enableOtp, setEnableOtp] = React.useState(false);
  const [otpError, setOtpError] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    AppActionCreators.closeDrawer();
    if (isEmpty(userName) || isEmpty(password)) {
      return;
    }
    if (userName === "Demo"){
      if(password === "demo") {
        saveLoggedInUserData({ userName });
        saveLoggedInUserDetails({ userName, isDealer: true, isDist: false });
        props.history.push({pathname: "/home", showStatsModal: true});
      }
      else{
        setOtpError(true);
      }
    } 
    if (userName === "DemoDist"){
      if(password === "demo") {
        saveLoggedInUserData({ userName });
        saveLoggedInUserDetails({ userName, isDealer: false, isDist: true });
        props.history.push({pathname: "/home", showStatsModal: true});
      }
      else{
        setOtpError(true);
      }
    }
  };

  const handleSignIn = async () => {
    try {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/api1/login.php`, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: userName,
            password: password
        }),
        method: "POST"
      }).then(r => {
        if (r.ok) {
            return r.json()
        } else {
            throw r
        }
      })
      if (data.status !== 200) {
          throw "Does not exist"
      }
      // else{
      //   setEnableOtp(true);
      // }
      console.log(data)
      saveLoggedInUserData({ userName });
      saveLoggedInUserDetails({ userName, isDealer: true, isDist: false });
      props.history.push({pathname: "/home", showStatsModal: true});
      return {}

    } catch (e) {
        console.error(e)
    }
  }

  const handlePassword = async (state, { getData, ...actions }, { values, formActions }) => {
    console.log("values",values)
    try {
        // const res = await fetch(`${process.env.REACT_APP_API_URL}/verify.php`, {
        const res = await fetch(`${process.env.REACT_APP_API_URL_ASF}/verify.php`, {
            body: JSON.stringify({
                "mobile_number": state.handleSignIn.username,
                "otp":values.password
            }),
            method: "POST"
        }).then(r => {
            if (r.ok) {
                return r.json()
            } else {
                throw r
            }
        })
        
        const userData = (await executeSQL({
            query: `SELECT * FROM salesforce.Pidilite_User__c Where MDIcode__c = '${state.handleSignIn.username}'`,
            token: res.token
        })).result[0];

        const recordTypeIds = (await executeSQL({
            query: `SELECT * FROM salesforce.RecordType Where Name = '${userData.user_division_name__c}'`,
            token: res.token
        }))
        //update last login

        console.log('recodtypeids', recordTypeIds)

        const user = {
            ...userData,
            department: "fv",
            token: res.token,
            recordTypeIds: recordTypeIds.result.map(r => ({ [r.sobjecttype]: r.sfid, })).reduce((r, currentVal) => ({ ...currentVal, ...r }))
        }

        localStorage.setItem("user", JSON.stringify(user))
        await actions.isLoggedIn()
        
        await actions.setState ({
            user: user
        })
        props.history.replace("/")
        return ({})
    } catch (e) {
        console.error(e)
        props.setFieldError('password', "Wrong password")
        return {}
    }
  }

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
          {/* {enableOtp ? */}
          <div className="input-conttainer">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              type="password"
              placeholder="Password"
            />
            {otpError ?
              <Typography
                variant="subtitle1"
                style={{
                  color: "red",
                  fontSize: "10px",
                  marginTop: "-18px",
                }}
                gutterBottom
              >
                <b> Invalid OTP </b>
              </Typography>
            : null}
          </div>
          {/* : null} */}
          <div
            onClick={() => props.history.push("/forgot-password")}
            className="forgot-password"
          >
            Forgot Password ?
          </div>
          <div>
            {/* {!enableOtp ?
            <button onClick={handleSignIn} className="login-button">
              Get OTP
            </button>
            : */}
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
            {/* } */}
          </div>
          <div className="forgot-password">Apply for Dealer/Distributor</div>
        </Card>
        <div className="account-note">
          Have not an account yet? <NavLink to="/signup"> Sign up</NavLink>
        </div>
      </div>
    </div>
  );
};

export const LoginScreen = withRouter(LoginScreenImpl);
