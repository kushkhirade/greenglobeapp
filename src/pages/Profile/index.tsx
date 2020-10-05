import { PersonPin } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import { Grid, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import * as React from "react";
import { connect } from "react-redux";
import { saveSelectData } from "src/actions/App.Actions";
import { getToken, isDealer, changeValuesInStore } from "src/state/Utility";
import getData, { imageUpload } from "src/utils/getData";
import { getImageBase64 } from "./../../utils/getBase64";
import AppBar from "src/navigation/App.Bar";
import { ChangePhoneFormat } from "src/components/Format";
import { store } from "src/store/Store";
import "./profile.scss";

var loggedInUserDetails;

export interface IProfileProps { profileData?: any}
export class ProfileImpl extends React.PureComponent<IProfileProps, { profilePic: string; }> {
  constructor(props: IProfileProps) {
    super(props);

    this.state = {
      profilePic: ""
    };
  }
  componentDidMount(){
    loggedInUserDetails = getToken().data;
    this.getprofileData(loggedInUserDetails);
  }

  UpdateProfileImage = async (img) => {
    try{
      const updateProfilePic = await getData({
        query: `UPDATE salesforce.account SET Image__c = '${img}' RETURNING Id`,
        token: loggedInUserDetails.token
      });
      console.log("updateProfilePic =>", updateProfilePic);

    }catch(e){
      console.log(e);
    }
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
      this.setState({ profilePic: getprofile.result[0].image__c });
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
              <img src={this.state.profilePic && this.state.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9iVZqj52z-rK9wftb91Fi_YD-59Lwb08nXw&usqp=CAU"} 
                  alt="bike" className="profile-img" />
              <Button component="label">
                <EditIcon style={{ marginLeft: '-70px'}} /> 
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={ async(e) =>{
                    const fileData = e.target.files[0];
                    const baseImg = await imageUpload({
                      id: fileData.name + profileData[0].id,
                      img: await getImageBase64(fileData),
                      type: fileData.type
                    })
                    console.log("baseImg : ", baseImg);
                    await this.UpdateProfileImage(baseImg.url)
                    this.setState({ profilePic: baseImg.url });
                  }}
                />
              </Button>
              {/* <EditIcon style={{ marginLeft: "-25px"}}/> */}
            </div>

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
    profileData: state.users.get("selectdata"),
  };
}
export const Profile = connect<{}, {}, IProfileProps>(mapStateToProps)(
  ProfileImpl
);

const UploadContainer = (props: any) => {
  console.log("Props: ", props)
  const [file, setFile] = React.useState({
    name: `File${props.valKey}`,
    file: { name: "" }, 
  });
  const spllited = file.file.name.split(".");
  console.log("spllited: ", spllited)

  const ext = spllited[spllited.length - 1];
  console.log("ext: ", ext)

  const getDocURL = async(image, id) => {
    const documentURL = await imageUpload({
      id: image.name + id,
      img: await getImageBase64(image),
      type: image.type
    });
    console.log("documentURL : ", documentURL)

    return documentURL.url;
  }

  return (
    <div key={props.valKey} className="upload-container">
      <div className="upload-head">{props.heading}</div>
      <div className="upload-button">
        <label title="Click To Upload File" htmlFor="upload">
          Upload Photo
        </label>
        <input
          onChange={ async(e) => {
            const fileData = e.target.files[0];
            setFile({ name: file.name, file: fileData });
            const url = await getDocURL(e.target.files[0], props.id);
            props.onSelectImage(props.valKey, url);
          }}
          type="file"
          className="hidden-input"
          id="upload"
        />
        {}
        <span className="filename">{`${
          file.file.name.length > 10
            ? `${file.file.name.substr(0, 10)}...${ext}`
            : ""
        }`}</span> 
      </div>
    </div>
  );
};
