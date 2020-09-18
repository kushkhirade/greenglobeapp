import { PersonPin } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import { Grid } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import * as React from "react";
import { connect } from "react-redux";
import { saveSelectData } from "src/actions/App.Actions";
import { getToken, isDealer } from "src/state/Utility";
import getData from "src/utils/getData";
import AppBar from "src/navigation/App.Bar";
import { ChangePhoneFormat } from "src/components/Format";
import "./profile.scss";

export interface IProfileProps { profileData?: any}
export class ProfileImpl extends React.PureComponent<IProfileProps, {}> {

  componentDidMount(){
    const loggedInUserDetails = getToken().data;
    this.getprofileData(loggedInUserDetails);
  }
  getprofileData = async (data) => {
    try{
      const getprofile = await getData({
        query: `SELECT *
        FROM Salesforce.account
        WHERE sfid = '${data.sfid}' `,
        token: data.token
      })
      console.log("getprofile => ", getprofile);
      saveSelectData(getprofile.result);
      // return getprofile.result;
    }
    catch(e){
      console.log(e);
    }
  }

  public render() {
    console.log("this.props: ", this.props)
    const { profileData } = this.props;

    return (
      <AppBar>
        {profileData && 
        <div className="profile-container">
          <div className="card-container no-hover">          
            <div className="profile-data">
              {isDealer()
                ? <b>Dealer ID : {profileData[0].id}</b>
                : <b>Distributor ID : {profileData[0].id}</b>
              }
            </div>

            <div className="profile-image-container">
              <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9iVZqj52z-rK9wftb91Fi_YD-59Lwb08nXw&usqp=CAU"} 
                  alt="bike" className="profile-img" />
              {/* <EditIcon style={{ marginLeft: "-25px"}}/> */}
            </div>
            {/* <Grid className="margin-10 dealer-card">
              <Grid item xs={6} className="profile-data">
                {isDealer()
                  ? <b>Dealer ID : {profileData[0].id}</b>
                  : <b>Distributor ID : {profileData[0].id}</b>
                }
              </Grid>
              <Grid item xs={6}>
              <img src={"https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} 
                  alt="bike" className="dealer-image"  style={{ width: 130, height: 130, borderRadius: "50%" }} />
              {/* <EditIcon onClick={() => this.fileUpload.click()} />
              </Grid>
            </Grid> */}
                <div className="profile-data">
                  <div style={{ marginTop: "10px" }}>
                    <PersonPin color="primary"/>
                    <span style={{ paddingRight: "5px" }}> </span>{profileData[0].name}{" "}
                  </div>
                  <div style={{ marginTop: "10px" }} >
                    <MailIcon color="primary" />
                    <span style={{ paddingRight: "5px" }}></span> {profileData[0].email__c}
                  </div>
                  <div style={{ marginTop: "10px" }} >
                    <PhoneIcon color="primary" />
                    <span style={{ paddingRight: "5px" }}></span> {profileData[0].phone && ChangePhoneFormat(profileData[0].phone)}
                  </div>
                  <div style={{ marginTop: "10px" }} >
                    <ChatIcon color="primary" />
                    <span style={{ paddingRight: "5px" }}></span> {profileData[0].whatsapp_no__c && ChangePhoneFormat(profileData[0].whatsapp_no__c)}
                  </div>
                  <div style={{ marginTop: "10px" }} >
                    <RoomIcon color="primary" />
                    <span style={{ paddingRight: "5px" }}></span> {profileData[0].billingstreet} {profileData[0].billingcity} {profileData[0].billingstate} {profileData[0].billingpostalcode} {profileData[0].billingcountry}
                  </div>
                  <div style={{ marginTop: "10px" }} >
                    <span style={{color: "black", fontWeight: "bold" }}> Account Manager : </span>
                    <span style={{ paddingRight: "5px" }}></span> {profileData[0].account_manager__c}
                  </div>
                  <div style={{ marginTop: "10px" }} >
                    <span style={{color: "black", fontWeight: "bold" }}> GST Number : </span>
                    <span style={{ paddingRight: "5px" }}></span> {profileData[0].gst_number__c}
                  </div>
                  <div style={{ marginTop: "10px" }} >
                    <span style={{color: "black", fontWeight: "bold" }}> Date of Birth : </span>
                    <span style={{ paddingRight: "5px" }}></span> {profileData[0].description}
                  </div>
                  <div style={{ marginTop: "10px" }} >
                    <span style={{color: "black", fontWeight: "bold" }}> Pin Code : </span>
                    <span style={{ paddingRight: "5px" }}></span> {profileData[0].billingpostalcode}
                  </div>
                </div>
          </div>
        </div>
       }
      </AppBar>
    );
  }
}
export function mapStateToProps(state) {
  return {
    profileData : state.users.get("selectdata"),
  };
}
export const Profile = connect<{}, {}, IProfileProps>(mapStateToProps)(
  ProfileImpl
);