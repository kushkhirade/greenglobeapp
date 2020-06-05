import ChatIcon from "@material-ui/icons/Chat";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import "./profile.scss";

export interface IProfileProps {}
export class ProfileImpl extends React.PureComponent<IProfileProps, {}> {
  public render() {
    return (
      <AppBar>
        <div className="profile-container">
          <div className="card-container no-hover">
            <div className="profile-data">
              <b>Dealer ID : 2555</b>
            </div>
            <div className="profile-data">
              Sachin T.{" "}
              <div>
                <MailIcon color="primary" />
                &nbsp; Sachin@gmail.com
              </div>
            </div>
            <div className="profile-data">
              <div>
                <PhoneIcon color="primary" /> &nbsp; 9876543210
              </div>
              <div>
                <ChatIcon className="sdfd" />
                &nbsp; 9876543210
              </div>
            </div>
            <div className="profile-data">
              Indiabulls, Lower Parel 411093 Mumbai Maharashtra India
            </div>
          </div>
        </div>
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const Profile = connect<{}, {}, IProfileProps>(mapStateToProps)(
  ProfileImpl
);
