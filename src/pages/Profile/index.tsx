import ChatIcon from "@material-ui/icons/Chat";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import * as React from "react";
import { connect } from "react-redux";
export interface IProfileProps {}
export class ProfileImpl extends React.PureComponent<IProfileProps, {}> {
  public render() {
    return (
      <div className="profile-container">
        <div className="card-container">
          <div className="profile-data">
            <b>Dealer ID : 2555</b>
          </div>
          <div>
            Sachin T. <MailIcon /> Sachin@gmail.com
          </div>
          <div>
            <PhoneIcon /> &npbsp; 9876543210 <ChatIcon />
            &npbsp; 9876543210
          </div>
          <div>Indiabulls, Lower Parel 411093 Mumbai Maharashtra India</div>
        </div>
      </div>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const Profile = connect<{}, {}, IProfileProps>(mapStateToProps)(
  ProfileImpl
);
