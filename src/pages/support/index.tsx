import { Button, Fab, TextField, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";
import { BaseModal } from "src/components/BaseModal";
import { SubFormHeading } from "src/components/SubFormHeading";
import { FormComponent } from "src/components/FormComponent";
import AppBar from "src/navigation/App.Bar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getToken, changeValuesInStore } from "src/state/Utility";
import getData from "src/utils/getData";
import "./support.scss";
import { saveLoggedInUserDetails } from "src/actions/App.Actions";
import { url } from "inspector";

var LoggedInUserDetails;
const supportData = [
  {
    sr: "101",
    case: "Case 101",
    title: "Kit Replacement",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const caseFormOptions = [
  {
    label: "Subject Line",
    type: "text",
    model: ".caseSubject",
    required: true,
  },
  {
    label: "Message",
    required: true,
    type: "textarea",
    model: ".caseDesc",
  },
  {
    label : "Attach File",
    model : ".caseAttachment", 
    type: "image",
  },
];

export interface ISupportProps {}

export class SupportImpl extends React.Component<
  ISupportProps, 
  { isModalOpen: boolean; data: any; blobURLs: any} > {
    constructor(props: ISupportProps) {
      super(props);
      this.state = { isModalOpen: false, data: [], blobURLs: null }
    }

  async componentDidMount(){
    LoggedInUserDetails = getToken().data;
    const cases = await this.getAllSuppotCases(LoggedInUserDetails);
    const blobURLs = await this.getBLobData();
    
    this.setState({blobURLs});
    console.log(" this.state.blobURLs: ", this.state.blobURLs);
  }
  
  getAllSuppotCases = async (data) => {
    try{
      const getsupportcases = await getData({
        query: `SELECT *
        FROM salesforce.case 
        WHERE accountid like '%${data.sfid}%'`,
        token: data.token
      })
      console.log("getsupportcases => ", getsupportcases);
      this.setState({ data: getsupportcases.result });
      return getsupportcases.result;
    }
    catch(e){
      console.log(e);
    }
  }

  InsertSupportCase = async (data, values) => {
    console.log("data: ", data);
    console.log("values: ", values);

    try{
      const insertcase = await getData({
        query: `insert into salesforce.case
        (Subject, Description, Attacment__c	, Status, Priority, Origin, Accountid) 
        Values('${values.caseSubject}', '${values.caseDesc}', '${values.caseAttachment}', 'New', 'High', 'Email', '${data.sfid}')`,
        token: data.token
      });
      console.log("insertcase => ", insertcase);
      return insertcase.result;
    }
    catch(e){
      console.log(e);
    }
  }

  handleSubmit = async() => {
    this.InsertSupportCase(LoggedInUserDetails, this.state.sub, this.state.desc);
    const res = await this.getAllSuppotCases(LoggedInUserDetails);
    console.log(res);
    this.setState({ data: res });
    this.setState({
      isModalOpen: false,
    });
    // const d = this.state.data;
    // const last = this.state.data[this.state.data.length - 1];
    // d.push({
    //   casenumber: `Case ${last.sr + 1}`,
    //   sr: last.sr + 1,
    //   subject: this.state.sub,
    //   description: this.state.desc,
    // });
  };

  getBLobData = async () => {
    return Promise.all(this.state.data.map(item => this.imgtoBlob(item)))
  }

  imgtoBlob = async(cases) => { 
    let blob ;
    
      await fetch(cases.attacment__c).then(r => (r.blob()) ).then(blobData =>{
        blob = URL.createObjectURL(new Blob([blobData], { type: 'image/png' }) );
      });
      console.log(blob);
      return {blob: blob, sfid: cases.sfid};
  }

  public render() {
    const cases = this.state.data ? this.state.data.sort((a,b) => 
      // Number(a.casenumber.substr(a.casenumber.length - 3)) - Number(b.casenumber.substr(b.casenumber - 3))
      new Date(a.createddate) - new Date(b.createddate)
      ) : null;
    console.log("cases: ", cases.length);
    console.log("this.state.blobURLs: ", this.state.blobURLs && this.state.blobURLs.length);
    return (
      <AppBar>
        <div style={{ padding: "10px" }}>
          {/* <h3>Support Requests</h3> */}
          <Grid container>
            {this.state.blobURLs && cases && cases.map((sup) => {
              console.log("sup sfid : ", sup.sfid);
              console.log("this.state.blobUrls : ", this.state.blobURLs);
              const caseData = this.state.blobURLs && this.state.blobURLs.find(bu => sup.sfid === bu.sfid);
              const bloburl = caseData && caseData.blob;
              console.log("caseData : ", bloburl);
              return(
              <Grid item xs={12} sm={6} lg={6}>
                <div className="card-container no-hover">
                  <div className="case"> {sup.casenumber}</div>
                  <div className="title">
                    <span className="description-text">Case For:</span>{" "}
                    {sup.subject}
                  </div>
                  <div className="desc">{sup.description}</div>
                  <div className="view-attachment" >
                    <a href={bloburl  } target="_blank">
                      View Attachment
                    </a>
                  </div>
                </div>
              </Grid>
            )})}
          </Grid>
          <BaseModal
            className="support-modal"
            contentClassName="support-content"
            onClose={() => this.setState({ isModalOpen: false })}
            open={this.state.isModalOpen}
          >
            <Grid container spacing={1} className="">
              <SubFormHeading> Submit New Case </SubFormHeading>
              <Grid container className="modal-margin" xs={12} md={12}>
                <FormComponent
                  onCancel={() => this.setState({ isModalOpen: false })}
                  options={caseFormOptions}
                  onSubmit={(values)=> {
                    this.InsertSupportCase(LoggedInUserDetails, values);
                    console.log(">>v", values)
                    this.getAllSuppotCases(LoggedInUserDetails);
                    changeValuesInStore(`caseForm`, {})
                    this.setState({ isModalOpen: false });
                  }}
                  hasSubmit={true}
                  formModel="caseForm"
                />
              </Grid>
            </Grid>
            {/* <div className="head-title">Submit New Case</div>
            <form className="form-content" autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Subject Line"
                className="form-input"
                onChange={(e) => this.setState({ sub: e.target.value })}
                variant="outlined"
              />
              <TextField
                className="form-input"
                id="outlined-basic"
                label="Message"
                multiline={true}
                rows={4}
                variant="outlined"
                onChange={(e) => this.setState({ desc: e.target.value })}
              />
              <div style={{ maxWidth: "300px" }} className="description-text">
                {this.state.fileName}
              </div>
              <div className="button-container">
                <Button variant="contained" >
                  <input
                    onChange={(e) =>
                      this.setState({ fileName: e.target.files[0].name })
                    }
                    id="attachFile"
                    className="hidden"
                    type="file"
                  />
                  <label htmlFor="attachFile">Attach File</label>
                </Button>
                <span style={{ padding: "5px" }} />
                <Button
                  onClick={this.handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            </form> */}
          </BaseModal>
          <span
            style={{ position: "absolute", right: 20, bottom: 20 }}
            onClick={() => this.setState({ isModalOpen: true })}
          >
            <Fab color="secondary" aria-labelledby="add-ticket">
              <Add />
            </Fab>
          </span>
        </div>
      </AppBar>
    );
  }
}

export function mapStateToProps(){
  return {}
}

export const Support = withRouter(
  connect<{}, {}, ISupportProps>(mapStateToProps)(SupportImpl) as any
);

// export const SupportList = Promise.all( async(props: any) => {
//   const xyz = await imgtoBlob(props.attacment__c)
//   console.log("xyz :", xyz);
//   return(
//     <Grid item xs={12} sm={6} lg={6}>
//       <div className="card-container no-hover">
//         <div className="case"> {props.supportData.casenumber}</div>
//         <div className="title">
//           <span className="description-text">Case For:</span>{" "}
//           {props.supportData.subject}
//         </div>
//         <div className="desc">{props.supportData.description}</div>
//         <div className="view-attachment" >
//           <a href={props.supportData.attacment__c} target="_blank">
//             View Attachment
//           </a>
//         </div>
//       </div>
//     </Grid>
//   )
// })
