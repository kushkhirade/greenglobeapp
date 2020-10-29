import {
  Button,
  Fab,
  Grid,
  Typography,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { 
  Document, 
  PDFDownloadLink, 
  BlobProvider, pdf,
  Page,  
  View,
  Text,
  Image, 
  StyleSheet, 
  PDFViewer } from "@react-pdf/renderer";
import { Add, Edit, PersonPin, Phone } from "@material-ui/icons";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BaseModal } from "src/components/BaseModal";
import { isDealer, IHistory } from "src/state/Utility";
import { Tabs } from "src/components/Tabs";
import AppBar from "src/navigation/App.Bar";
import data from "../../data";
import "./rtoProcess.scss";
import { FormComponent } from "src/components/FormComponent";
import { getToken } from "src/state/Utility";
import getData from "src/utils/getData";
import {ChangePhoneFormat} from "src/components/Format";

var loggedInUserDetails;
var allCustomers;

export interface IRTOProcessProps {
  history: IHistory;
}

export class RTOProcessImpl extends React.PureComponent<
  IRTOProcessProps,
  {
    openEditModal: boolean;
    stage: string;
    vehicleDetails: string;
    customer: string;
    rtoDataMain: any;
    custVehicles: any;
    currentData: any;
    addNew: boolean;
  }
> {
  constructor(props: IRTOProcessProps) {
    super(props);
    this.state = {
      openEditModal: false,
      addNew: false,
      stage: "",
      vehicleDetails: "",
      customer: "",
      currentData: null,
      rtoDataMain: data.rto.data,
      custVehicles: [],
    };
  }
  
  async componentDidMount(){
    loggedInUserDetails = getToken().data;
    console.log("loggedInUserDetails: ", loggedInUserDetails);
    const rto = await this.getAllRTOProcesses(loggedInUserDetails);
    this.setState({ rtoDataMain: rto });
    const cust = await this.getAllCustomers(loggedInUserDetails);
    allCustomers = cust;
  }

  getAllRTOProcesses = async (data) => {
    console.log("data: ", data);
    let getRTOs;
    try{
      if(isDealer()){
        getRTOs = await getData({
          query: `SELECT *
          FROM  salesforce.RTO_and_Insurance_Process__c 
           `,
          token: data.token
        });
      }
      else{
        getRTOs = await getData({
          query: `SELECT *
          FROM  salesforce.RTO_and_Insurance_Process__c 
          WHERE Distributor__c like '%${data.sfid}%' `,
          token: data.token
       });
      }
      console.log("getRTOs => ", getRTOs);
      return getRTOs.result;
    }
    catch(e){
      console.log(e);
    }
  }

  getAllCustomers = async (data) => {
    try{
      let customerData;
      if(isDealer()){
        customerData = await getData({
          query: `SELECT sfid, name
          FROM salesforce.Contact 
          WHERE Assigned_Dealer__c LIKE '%${data.sfid}%' AND Recordtypeid = '0121s0000000WE4AAM'`,
          token: data.token
        })
      }
      else{
        customerData = await getData({
          query: `SELECT sfid, name
          FROM salesforce.Contact 
          WHERE contact.accountid LIKE '%${data.sfid}%' AND Recordtypeid = '0121s0000000WE4AAM'`,
          token: data.token
        })
    }
      console.log("customerData =>", customerData.result)
      return customerData.result;
    }
    catch(e){
      console.log(e);
    }
  }

  getCustomerVehicles = async (data, custSFID) => {
    try {
        const vehicles = await getData({
          query: `select * from salesforce.vehicle_detail__c where customer__c like '${custSFID}'`,
          token: data.token,
        });
      console.log("vehicles => ", vehicles)
      this.setState({ custVehicles: vehicles.result });
    } catch (e) {
      console.log(e);
    }
  };
  
  InsertRTOProcess = async (data, stage, customer, vehicleDetails) => {
    console.log("data: ", data);
    console.log("vehicleDetails: ", vehicleDetails);
    const vehicle = vehicleDetails;
    try{
      const insertRTO = await getData({
        query: `INSERT INTO salesforce.rto_and_insurance_process__c
        (customer__c, Vehicle_Number__c, vehicle_no__c, vehicle_make__c, vehicle_model__c, x3_or_4_wheeler__c, Stage__c) 
        Values('${customer}' ,'${vehicle.sfid}', '${vehicle.name}', '${vehicle.vehicle_make__c}', '${vehicle.vehicle_model__c}','${vehicle.x3_or_4_wheeler__c}', '${stage}') RETURNING Id`,
        token: data.token
      });
      console.log("insertRTO => ", insertRTO);
      return insertRTO.result;
    }
    catch(e){
      console.log(e);
    }
  }

  UpdateRTOStage = async (data, stage, sfid) => {
    console.log("data: ", data);
    try {
      const updatertostage = await getData({
        query: `UPDATE salesforce.RTO_and_Insurance_Process__c
        SET stage__c = '${stage}'
        WHERE sfid LIKE '%${sfid}%'`,
        token: data.token
      })

      console.log("updatertostage =>", updatertostage);
      // return updatertostage.result;
      
    } catch (e) {
        console.log('fetch Inventory Error', e)
    }
  }

  showEditPopup = (source) => {
    this.setState({
      openEditModal: true,
      currentData: source,
    });
  };

  handleStageSelect = (event) => {
    this.setState({
      stage: event.target.value,
    });
  };

  handleCustomerSelect = (event) => {
    const custSFID = event.target.value;
    this.setState({
      customer: custSFID,
    });
    this.getCustomerVehicles(loggedInUserDetails, custSFID)
  };

  handleVehicleSelect = (event) => {
    this.setState({
      vehicleDetails: event.target.value
    });
  };

  handleStatusUpdate = async() => {
    this.UpdateRTOStage(loggedInUserDetails, this.state.stage, this.state.currentData.sfid);
    const res = await this.getAllRTOProcesses(loggedInUserDetails);
    this.setState({rtoDataMain: res});
    this.setState({openEditModal: false, customer: "", stage: ""});
  };

  handleRTOInsert = async() => {
    console.log(this.state.customer)
    console.log(this.state.stage)
    this.InsertRTOProcess(loggedInUserDetails, this.state.stage, this.state.customer, this.state.vehicleDetails);
    const res = await this.getAllRTOProcesses(loggedInUserDetails);
    this.setState({rtoDataMain: res});
    this.setState({addNew: false, customer: "", stage: ""});
  };

  renderEditModal = () => {
    return (
      <BaseModal
        className="support-modal"
        contentClassName="support-content"
        onClose={() => this.setState({ openEditModal: false, customer: "", stage: "" })}
        open={this.state.openEditModal}
      >
        <Grid container className="modal-content">
          <Typography style={{ textAlign: "center", paddingBottom: "10px" }}>
            Change/Update Stage
          </Typography>
          <Grid item className="modal-margin" xs={12} md={12}>
            <FormControl variant="outlined" className="form-control">
              <InputLabel id="demo-simple-select-outlined-label">
                Select Stage
              </InputLabel>{" "}
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={this.state.stage}
                label="Select Stage"
                onChange={this.handleStageSelect}
                className="form-input"
              >
                <MenuItem value="Generate Document">Generate Document</MenuItem>
                <MenuItem value="Submitted to RTO">Submitted to RTO</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className="button-container">
          <Button
            onClick={(e) => this.setState({ openEditModal: false, customer: "", stage: "" })}
            variant="contained"
            color="default"
          >
            Cancel
          </Button>{" "}
          <Button 
            onClick={(this.handleStatusUpdate)}
            variant="contained" 
            color="primary"
          >
            Submit
          </Button>
        </div>
        {/* <div className="modal-buttons">
          <FormComponent
            hasSubmit={true}
            formModel="userForm"
            options={[]}
            onSubmit={this.handleStatusUpdate}
            onCancel={(e) => this.setState({ openEditModal: false })}
          />
        </div> */}
      </BaseModal>
    );
  };

  tabs = () => [
    {
      tabName: "Pending",
      component: (
        <Grid container={true}>
          <RTOList
            onClickEdit={this.showEditPopup}
            rtoDataMain={this.state.rtoDataMain && this.state.rtoDataMain.filter(
              (rto) => rto.stage__c !== "Closed"
            )}
          />
        </Grid>
      ),
    },
    {
      tabName: "Cleared",
      component: (
        <Grid container={true}>
          <RTOList
            onClickEdit={this.showEditPopup}
            rtoDataMain={this.state.rtoDataMain && this.state.rtoDataMain.filter(
              (rto) => rto.stage__c === "Closed"
            )}
          />
        </Grid>
      ),
    },
  ];

  renderAddNewRTODocModal = () => {
    return (
      <BaseModal
        className="support-modal"
        contentClassName="support-content"
        onClose={() => this.setState({ addNew: false, customer: "", stage: "" })}
        open={this.state.addNew}
      >
        <div style={{ minWidth: "300px" }}>
          <Typography style={{ textAlign: "center", paddingBottom: "10px" }}>
            Add New Customer
          </Typography>
          <Grid item className="modal-margin" xs={12} md={12}>
            <FormControl variant="outlined" className="form-control">
              <InputLabel id="demo-simple-select-outlined-label">
                Search Customer
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                // value={this.state.stage}
                label="Select Customer"
                onChange={this.handleCustomerSelect}
                variant="outlined"
                className="form-input"
              >
                {allCustomers && allCustomers.map(cust => {
                  return(
                    <MenuItem value={cust.sfid}>{cust.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item className="modal-margin" xs={12} md={12}>
            <FormControl variant="outlined" className="form-control">
              <InputLabel id="demo-simple-select-outlined-label">
                Search Vehicle
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                // value={this.state.stage}
                label="Select Vehicle"
                onChange={this.handleVehicleSelect}
                variant="outlined"
                className="form-input"
              >
                {this.state.custVehicles && this.state.custVehicles.map(vehicle => {
                  return(
                    <MenuItem value={vehicle}>{vehicle.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item className="modal-margin" xs={12} md={12}>
            <FormControl variant="outlined" className="form-control">
              <InputLabel id="demo-simple-select-outlined-label">
                Select Stage
              </InputLabel>{" "}
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                // value={this.state.stage}
                label="Select Stage"
                variant="outlined"
                onChange={this.handleStageSelect}
                className="form-input"
              >
                <MenuItem value="Generate Document">Generate Document</MenuItem>
                <MenuItem value="Submitted to RTO">Submitted to RTO</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <div className="button-container">
            <Button
              onClick={(e) => this.setState({ addNew : false, customer: "", vehicleDetails: "", stage: "" })}
              variant="contained"
              color="default"
            >
              Cancel
            </Button>{" "}
            <Button 
              onClick={this.handleRTOInsert}
              variant="contained" 
              color="primary"
            >
              Submit
            </Button>
          </div>
        </div>
      </BaseModal>
    );
  };

  render() {
    return (
      <AppBar>
        {this.renderAddNewRTODocModal()}
        {this.renderEditModal()}
        <Tabs tabsData={this.tabs()} />
        {isDealer() && 
          <span
            style={{ position: "absolute", right: 20, bottom: 20 }}
            onClick={() => this.setState({ addNew: true })}
          >
            <Fab color="secondary" aria-labelledby="add-ticket">
              <Add />
            </Fab>
          </span>
        }
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const RTOProcess = withRouter(
  connect<{}, {}, IRTOProcessProps>(mapStateToProps)(RTOProcessImpl) as any
);

const RTOList = (props: any) => {
  return props.rtoDataMain.map((rto: any, index: any) => {
    const rtoData = rto;
    return (
      <React.Fragment>
        <Grid key={index} item xs={12} md={6}>
          <div className="card-container ">
            <div className="rto-card-title">{rtoData.name}</div>
            <Grid key={index} container className="padding-6">
              <Grid item className="bold-font center" xs={6} md={6}>
                <PersonPin /> <span style={{ padding: "5px" }} />
                  {rtoData.contname__c}
              </Grid>
              <Grid className="bold-fon center" item xs={6} md={6}>
                <Phone /> <span style={{ padding: "5px" }} />
                  {rtoData.mobile_no__c && ChangePhoneFormat(rtoData.mobile_no__c)}
              </Grid>
            </Grid>
            <Grid container className="padding-6">
              <Grid item xs={6} md={6}>
                {rtoData.address__c}
              </Grid>
              <Grid item xs={6} md={6}>
                {rtoData.x3_or_4_wheeler__c}
              </Grid>
            </Grid>
            <Grid container className="padding-6">
              <Grid item xs={6} md={6}>
                {rtoData.vehicle_make__c}
              </Grid>
              <Grid item xs={6} md={6}>
                {rtoData.vehicle_model__c}
              </Grid>
            </Grid>
            <Grid container className="padding-6">
              <Grid item xs={6} md={6}>
                {/* {rtoData.chassis_no__c} */}
              </Grid>
              {!isDealer() ?
                <Grid item xs={6} md={6}>
                  {rtoData.dealname__c}
                </Grid>
              :
                <Grid item xs={6} md={6}></Grid>
              }
            </Grid>
            <Grid container>
              <Grid className="rto-status" item xs={6} md={6}>
                <span>{rtoData.stage__c || "Pending"}</span>
              </Grid>
              <Grid item xs={6} md={6}>
                {rtoData.stage__c !== "Closed" && (
                  <div className="edit-button-container">
                    <div
                      className="edit-button"
                      onClick={() => props.onClickEdit(rtoData)}
                    >
                      <Edit />
                    </div>
                  </div>
                )}
              
                {rtoData.stage__c === "Closed" && (
                  <div className="generate-doc">
                    <BlobProvider document={ <GenerateDocs /> }> 
                      { ({ blob, url, loading, error }) => {
                        console.log("blob : ", blob);
                        console.log("url : ", url);

                        return(
                          <a href={url} target="_blank">
                            <span>Generate Docs</span>{" "}
                          </a>
                        )}} 
                    </BlobProvider>
                     {/* <a href={"http://www.africau.edu/images/default/sample.pdf"} target="_blank"> 
                      <span>Generate Docs</span>{" "}
                    </a>  */}
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </React.Fragment>
    );
  });
};

const styles = StyleSheet.create({
  table: { display: "table", width: "auto", margin: "30px", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 }, 
  tableRow: { margin: "auto", flexDirection: "row" }, 
  tableColSr: { width: "15%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 }, 
  tableColDes: { width: "65%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 }, 
  tableColRt: { width: "20%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 }, 
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10, padding: 2 },
  subTable: { display: "table", width: "30%", margin: "10px", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 }, 
  subRow: {width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0},
});

const GenerateDocs = () => {
  return (
      <Document >
        <Page size="A4">
          <View style={{ margin: "10px", marginTop: "20px", textAlign: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold' }}>GRECOKITS FUEL SOLUTIONS</Text>
          </View>
          <View style={{ display: "table", width: "auto", height: "700px", margin: "10px", borderStyle: "solid", borderWidth: 1 }}>
          {/* <View style={{ textAlign: 'center' }}>
            <Text style={{fontSize: 12 }} >Plot No. 151, Brick Factory Compound, Shastri Nagar, Mulund colony, </Text>
            <Text style={{fontSize: 12 }}>Mumbai - 400802 India Tel: 022-25677775 Fax : 022-25900903</Text>
            <Text style={{fontSize: 12 }}>Mobile : 9519749360 / 70 / 90</Text>
            <Text style={{fontSize: 12 }}>E-mail : sales@greco.co.in  Website : www.greco.co.in</Text>
          </View> */}
          <View style={{ margin: "10px", textAlign: 'center' }}>
            <Text style={{fontSize: 16}}>RTO Basic Deatils and Documnets</Text>
          </View>
          
          <View style={{ margin: "1px", marginLeft: "30px", marginRight: "30px", flexDirection: 'row'}}>
            <Text style={{fontSize: 10, width: '10%' }}> Vehicle. No. :</Text>
            <Text style={{fontSize: 10, width: '40%' }}> MH-974 </Text>
            <Text style={{fontSize: 12, width: '17%'}}> Date : </Text>
            <Text style={{fontSize: 10, width: '33%' }}> 25/10/20 </Text>
          </View>
          <View style={{ margin: "1px", marginLeft: "30px", marginRight: "30px", flexDirection: 'row' }}>
            <Text style={{fontSize: 12, width: '50%'}}> To,</Text>
            <Text style={{fontSize: 12, width: '17%'}}> Vehicle Make: </Text>
            <Text style={{fontSize: 10, width: '33%'}}> Bajaj Auto Limited </Text>
          </View>
          <View style={{ margin: "1px", marginLeft: "30px", marginRight: "30px", flexDirection: 'row' }}>
            <Text style={{fontSize: 10, width: '50%'}}></Text>
            <Text style={{fontSize: 12, width: '17%'}}> Vehicle Model: </Text>
            <Text style={{fontSize: 10, width: '33%'}}> Bajaj RE Auto Rickshau Compact 4S </Text>
          </View>
          <View style={{ margin: "1px", marginLeft: "30px", marginRight: "30px", flexDirection: 'row' }}>
            <Text style={{fontSize: 10, width: '50%'}}></Text>
            <Text style={{fontSize: 12, width: '17%'}}> Running KMs: </Text>
            <Text style={{fontSize: 10, width: '33%'}}> 45 </Text>
          </View>
          <View style={{ margin: "1px", marginLeft: "30px", marginRight: "30px", flexDirection: 'row' }}>
            <Text style={{fontSize: 12, width: '10%'}}> E-mail : </Text>
            <Text style={{fontSize: 10, width: '40%'}}> anurag@gmail.com </Text>
            <Text style={{fontSize: 12, width: '17%'}}> Mobile No.: </Text>
            <Text style={{fontSize: 10, width: '33%'}}> 9999999999</Text>
          </View>
          
          {/* <View style={styles.table}>
            <View style={styles.tableRow}> 
              <View style={styles.tableColSr}> 
                <Text style={styles.tableCell}>Sr. No. </Text> 
              </View> 
              <View style={styles.tableColDes}> 
                <Text style={styles.tableCell}>Discription</Text> 
              </View> 
              <View style={styles.tableColRt}> 
                <Text style={styles.tableCell}>Rate</Text> 
              </View>
            </View> 
            <View style={styles.tableRow}> 
              <View style={styles.tableColSr}> 
                <Text style={styles.tableCell}>1</Text> 
              </View> 
              <View style={styles.tableColDes}> 
                <Text style={styles.tableCell}> This is Discription. </Text> 
              </View> 
              <View style={styles.tableColRt}> 
                <Text style={styles.tableCell}> 20% </Text> 
              </View>
            </View> 
            <View style={styles.tableRow}> 
              <View style={styles.tableColSr}> 
                <Text style={styles.tableCell}>2</Text> 
              </View> 
              <View style={styles.tableColDes}> 
                <Text style={styles.tableCell}> This is Discription. </Text> 
              </View> 
              <View style={styles.tableColRt}> 
                <Text style={styles.tableCell}> 10% </Text> 
              </View>
            </View> 
          </View> */}
          </View>
        </Page>
      </Document>
  );
}