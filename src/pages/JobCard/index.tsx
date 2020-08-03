import { Button, Grid, Typography, Fab, TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { Edit, Add } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import * as React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import Image, { Shimmer } from "react-shimmer";
import { BaseModal } from "src/components/BaseModal";
import { FormComponent } from "src/components/FormComponent";
import { TableWithGrid } from "src/components/TableWithGrid";
import AppBar from "src/navigation/App.Bar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Stepper } from "../BuyOrders/Stepper";
import {
  addressDetails,
  leadDealer,
  leadSource,
  options,
  streetInputs,
  vehicleInputs,
  gstDetails,
} from "../Customers/customerInputs";
import "./jobCard.scss";
import { isDealer } from "src/state/Utility";
import { Tabs } from "src/components/Tabs";
import { GSelect } from "src/components/GSelect";
import data from "./../../data";
import { getToken } from "src/state/Utility";
import getData from "src/utils/getData";
import { AnyCnameRecord } from "dns";
import { LabelList } from "recharts";
var loggedInUserDetails;
const detailsObj = [
  // {
  //   sNumber: 1,
  //   subject: "Call",
  //   dueDate: "4/30/2020",
  //   rating: "Hot",
  //   priotiy: "Normal",
  //   status: "Open",
  //   callResult: "Spoke with Customer ",
  //   comments: "Customer Intrested",
  // },
  // {
  //   sNumber: 2,
  //   subject: "Call",
  //   dueDate: "4/30/2020",
  //   rating: "Hot",
  //   priotiy: "Normal",
  //   status: "Open",
  //   callResult: "Spoke with Customer ",
  //   comments: "Customer Intrested",
  // },
  // {
  //   sNumber: 3,
  //   subject: "Call",
  //   dueDate: "4/30/2020",
  //   rating: "Hot",
  //   priotiy: "Normal",
  //   status: "Open",
  //   callResult: "Spoke with Customer ",
  //   comments: "Customer Intrested",
  // },
];

export interface IAddNewJobCardProps { }

const closedColumns = [
  {
    name: "itemName",
    label: "Item Name",
  },
  {
    name: "unitCost",
    label: "Unit Cost",
  },
  {
    name: "qty",
    label: "Quantity",
  },
  {
    name: "amount",
    label: "Amount",
  },
];

const products = [
  {
    value: "open",
    label: "Open",
  },
];

export class AddNewJobCardImpl extends React.Component<
  IAddNewJobCardProps,
  { openEditModal: boolean; activeTab: number; activeStep: number,jobCardCheckboxesChanged:boolean, OpenAddJobCard: boolean, jobCardCheckboxes: any, allCustAndLeads: any, complainCheckList: any,}
  > {
  constructor(props: IAddNewJobCardProps) {
    super(props);
    this.state = {
      openEditModal: false,
      activeTab: 0,
      activeStep: 0,
      OpenAddJobCard: false,
      jobCardCheckboxesChanged:false,
      complainCheckList: {
        "Low Average / Mileage": false,
        "Late Starting Problem": false,
        "Jerking / Missing / Low Pick": false,
        "Changeover - Switch / Pressure Gauge Indication Problem": false,
        "Vehicle Not Changing over to CNG": false,
        "GVehicle Not starting in Petrol": false,
        "Engine Shutdown in Idleing mode / Return to idle from high RPM": false,
        "Less/Slow Gas Filling in Tank": false,
        "Check Engine Light on Cluster": false,
        "Petrol Consumption even when car running on CNG": false,
        "Noise after/due to CNG Kit Fittment": false,
        "Gas Leakage / Sound / Smell": false,
        "Switch Not Working(No lights on switch)": false,   
        "Buzzer Noise on Switch": false,   
      },
      jobCardCheckboxes: {
      "CNG TUNE UP": false,
      "KIT SERVICE": false,
      "KIT REMOVE": false,
      "KIT REFITTING": false,
      "CYLINDER REMOVE": false,
      "CYLINDER REFITTING": false,
      "GRECO ACE KIT FITTING": false,
      "GRECO PRO KIT FITTING": false,
      "DICKY FLOOR REPAIR": false,
      "WIRING REPAIR": false,
      "WIRING REMOVE & REFITTING": false,
      "REDUCER R/R": false,
      "REDUCER SERVICE": false,
      "CARBURETTOR SERVICE": false,
      "THROTTLE BODY CLEANING": false,
      "AIR FILTER R/R": false,
      "SPARK PLUG R/R": false,
      "INGNITION COILS R/R": false,
      "INGNITION COIL CODE R/R": false,
      "PICK UP COIL R/R": false,
      "CNG SEQ. KIT TUNE UP": false,
      "ECM R/R": false,
      "MAP SENSOR R/R": false,
      "MAF/MAP SENSOR CLEAN": false,
      "GRECO INJECTOR R/R": false,
      "PETROL INJECTOR R/R": false,
      "TEMPRESURE SENSOR R/R": false,
      "TIMING ADVANCE PROCESS R/R": false,
      "FILLER VALVE R/R": false,
      "FILLER VALVE REPAIR": false,
      "LOW PRESSURE HOSE R/R": false,
      "PRESSURE GAUGE R/R": false,
      "HIGH PRESSURE PIPE R/R": false,
      "CYLINDER VALVE R/R": false,
      "SWITCH R/R": false,
      "COOLANT REPLACE": false,
      "TAPPET SETTING": false,
      "OIL & OIL FILTER REPLACE": false,
      "HEIGHT PAD FITMENT": false,
      "O2 SENSOR R/R	": false,
      "O2 SENSOR CLEAN": false,
      "ENGINE TUNE UP": false,
      "ENGINE COMPRESSION CHECK": false,
      "FUEL PUMP R/R": false,
      "FUEL FILTER R/R": false,
      "FUEL PUMP RELAY R/R": false,
      "ANNUAL MAINTAINANACE CONTRACT": false,
      "CNG LEAKAGE CHECK": false,
      "EMULATOR R/R": false,
      "MIXER R/R": false,
      "1ST STAGE REGULATOR R/R": false,
      "2ND STAGE REGULATOR R/R": false,
      "CYLINDER HYDROTESTING": false,
      "1ST STAGE REGULATOR ORING R/R": false,
      "INJECTOR NOZZLE R/R": false,
      "GENERAL LABOUR CHARGES": false,
      "CAR SCANNING": false,
      "GAS FILLTER R/R": false,
      "CYLINDER BRACKET R/R": false,
      "1ST FREE SERVICE": false,
      "2ND FREE SERVICE": false,
      "3RD FREE SERVICE": false,
      "TAPPET COVER PACKING REPLACE": false,
      "VACCUM HOSE PIPE R/R	": false,
      "FUEL GAUGE CORRECTOR FITMENT": false,
      "RAIL BRACKET R/R": false,
      "ECM BRACKET R/R": false,
      "REDUCER BRACKET R/R": false,
      "BLOCK PISTON R/R": false,
      },
      allCustAndLeads: [],
    };
  }

  componentDidMount(){
    loggedInUserDetails = getToken().data;
    this.getCustAndLeads(loggedInUserDetails)
  }

  getCustAndLeads = async(data) => {
    console.log("data: ", data)
    let custLeadsDataArr;
    try {
      if(isDealer()){
        const custData = await getData({
          query: `SELECT Name, sfid FROM salesforce.Contact 
          WHERE Assigned_Dealer__c LIKE '%${data.sfid}%' AND RecordtypeId ='0121s0000000WE4AAM' AND Name is not null`,
          token: data.token
        });
        custLeadsDataArr = custData.result;

        const leadsData = await getData({
          query: `SELECT name FROM salesforce.Lead 
          WHERE Assigned_Dealer__c LIKE '%${data.sfid}%' AND RecordTypeId = '0122w000000chRpAAI' AND Name is not null`,
          token: data.token
        });
        leadsData.result.map(l => custLeadsDataArr.push(l) );
      }
      else{
        const custData = await getData({
          query: `SELECT Name ,sfid  FROM salesforce.Contact 
          WHERE contact.accountid LIKE '%${data.sfid}%' and RecordtypeId ='0121s0000000WE4AAM'  AND Name is not null`,
          token: data.token
        });
        custLeadsDataArr = custData.result;
  
        const leadsData = await getData({
          query: `SELECT name,sfid FROM salesforce.Lead 
          WHERE Assigned_Distributor__c LIKE '%${data.sfid}%' AND RecordTypeId = '0122w000000chRpAAI' AND Name is not null`,
          token: data.token
        });
        leadsData.result.map(l => custLeadsDataArr.push(l) );
      }
      console.log("custLeadsDataArr: ", custLeadsDataArr);
      this.setState({ allCustAndLeads: custLeadsDataArr});

    } catch (e) {
      console.log(e);
    }
  }

  InsertJobCardDealer = async (data, leadForm) => {
    const { firstName, middleName, lastName, email, company, whatsAppNumber, leadType, leadSource, leadStatus, subLeadSource,
      rating, street, city, state, zip, country, vehicleNumber, fuelType, wheeles, vehicleMek, vehicleModel, usage, vehicleType, dailyRunning,
      registration, mfg, chassis, gstNumber } = leadForm;
      const{jobCardCheckboxes} = this.state;
    try {
      const insertJobCard = await getData({
        query: `INSERT INTO salesforce.Contact
        (FirstName, MiddleName, LastName, Company__c,Email,Whatsapp_number__c,
          Lead_Type__c,Lead_Source__c,Lead_Status__c,Sub_Lead_Source__c,Lead_Rating__c,
          MailingStreet,  MailingCity ,MailingState ,MailingCountry,MailingPostalCode,
          Vehicle_no__c,Fuel_Type__c,X3_or_4_Wheeler__c,Vehicle_Make__c, Vehicle_Model__c,
          Usage_of_Vehicle__c,Engine_Type__c, Daily_Running_Kms__c,Registration_Year__c,Year_of_Manufacturing__c,Chassis_No__c,
          GST_Number__c,Assigned_Dealer__c,RecordTypeId,CNG_TUNE_UP__c,KIT_SERVICE__c,KIT_REFITTING__c,CYLINDER_REFITTING__c,CYLINDER_REMOVE__c,
          GRECO_ACE_KIT_FITTING__c,GRECO_PRO_KIT_FITTING__c)
         Values('${firstName ?? ""}','${middleName ?? ""}','${lastName ?? ""}','${company ?? ""}','${email ?? ""}','${whatsAppNumber ?? 0}','${leadType ?? ""}',
         '${leadSource ?? ""}','${leadStatus ?? ""}','${subLeadSource ?? ""}','${rating ?? ""}','${street ?? ""}','${city ?? ""}','${state ?? ""}','${country ?? ""}','${zip ?? ""}',
         '${vehicleNumber ?? ""}','${fuelType ?? ""}','${wheeles ?? ""}','${vehicleMek ?? ""}','${vehicleModel ?? ""}','${usage ?? ""}','${vehicleType ?? ""}',
         ${dailyRunning ?? 0},'${registration ?? "4/5/2019"}',${mfg ?? 2010},'${chassis ?? ""}','${gstNumber ?? ""}','${data.sfid}','0121s0000000WE4AAM',
         ${jobCardCheckboxes['CNG TUNE UP']},${jobCardCheckboxes['KIT SERVICE']},${jobCardCheckboxes['KIT REFITTING']},
         ${jobCardCheckboxes['CYLINDER REFITTING']},
         ${jobCardCheckboxes['CYLINDER REMOVE']},${jobCardCheckboxes['GRECO ACE KIT FITTING']},${jobCardCheckboxes['GRECO PRO KIT FITTING']}) RETURNING Id`,
        token: data.token
      });
``
      console.log("insertJobCard => ", insertJobCard);
      return insertJobCard.result;
    }
    catch (e) {
      console.log(e);
    }
  }

  handleJobCardDealerInsert = async () => {
    this.InsertJobCardDealer(loggedInUserDetails, this.props.leadForm);
    //  this.props.history.push("/leads")
  };
  handleToggle = (event, isInputChecked) => {
    let fieldName = event.target.name;
    let jobCardCheckboxes = this.state.jobCardCheckboxes;
    jobCardCheckboxes[fieldName] = isInputChecked;
    const jobCardCheckboxesChanged = !this.state.jobCardCheckboxesChanged;
    this.setState({
      jobCardCheckboxesChanged,
      jobCardCheckboxes,
    })
    console.log(this.state.jobCardCheckboxes)
  };


  // Basic Details Form
  public renderForm = () => {
    return (
      <div className="job-card-container">
      <React.Fragment>
        <SubFormHeading>Lead Basic Details</SubFormHeading>
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
          }}
          formModel="leadForm"
          hasSubmit={false}
          options={options}
        />
        <SubFormHeading>Lead Source and Rating Details</SubFormHeading>
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
          }}
          formModel="leadForm"
          hasSubmit={false}
          options={leadSource}
        />
        <SubFormHeading>Address Details</SubFormHeading>
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
          }}
          formModel="leadForm"
          hasSubmit={false}
          options={streetInputs}
        />
        <SubFormHeading>Vehicle Details</SubFormHeading>
        <FormComponent
          onSubmit={(v: any) => {
            this.setState({
              activeStep: this.state.activeStep + 1,
            });
            console.log(">> v", v);
          }}
          formModel="leadForm"
          hasSubmit={true}
          options={vehicleInputs}
          submitTitle="Next"
          cancelTitle="Previous"
        />
      </React.Fragment>
      </div>
    );
  };

  renderRelated = () => {
    return (
      <SubFormHeading>
        Opportunities{" "}
        <Button variant="contained" color="primary">
          New
        </Button>{" "}
      </SubFormHeading>
    );
  };

  // RTO Docs Form
  renderDocsForRTO = () => {
    return (
      <React.Fragment>
        <SubFormHeading >
          Documents Required for RTO
        </SubFormHeading>
        <UploadContainer valKey={1} heading="Original R.C. Book" />
        <UploadContainer
          valKey={2}
          heading="Bank NOC In case of Hypothecation"
        />
        <UploadContainer valKey={3} heading="Valid Insurance Photocopy" />
        <UploadContainer valKey={4} heading="Permit" />
        <UploadContainer valKey={5} heading="Tax" />
        <UploadContainer valKey={6} heading="Passing" />
        <SubFormHeading >
          KYC Documents
        </SubFormHeading>
        <UploadContainer valKey={7} heading="Aadhaar Card" />
        <UploadContainer valKey={8} heading="PAN Card" />{" "}
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
            this.setState({
              activeStep: this.state.activeStep + 1,
            });
          }}
          formModel="leadForm"
          hasSubmit={true}
          options={[]}
          submitTitle="Next"
          cancelTitle="Previous"
        />
      </React.Fragment>
    );
  };

  // Negotiation Form
  renderNegotitation = () => {
    return (
      <div className="negotitation-container">
        <div style={{ textAlign: "right" }}>
          <Button variant="contained" color="default">
            Generate Proposal
          </Button>
        </div>
        <div className="negotitation-content">
          <div className="heading">Green Globe Fuel Solutions</div>
          <div className="info-container">
            <div className="image-container">
              {" "}
              <Image
                src="https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png"
                fallback={<Shimmer width={300} height={300} />}
              />
            </div>
            <div className="details">
              <div className="detail">
                <span className="description-text">Created On:</span>
                06/05/2020
              </div>
              <div className="detail">
                <span className="description-text">Expiration Date:</span>
                03/11/2020
              </div>
              <div className="detail">
                <span className="description-text">Contact Name:</span>
                Nothing
              </div>
            </div>
          </div>
        </div>{" "}
        <FormComponent
          onSubmit={(v: any) => {
            this.setState({
              activeStep: this.state.activeStep + 1,
            });
            console.log(">> v", v);
          }}
          submitTitle="Next"
          cancelTitle="Previous"
          formModel="leadForm"
          hasSubmit={true}
          options={[]}
        />
      </div>
    );
  };

  // Closed
  renderClosedTab = () => {
    return (
      <div style={{ width: "100%" }}>
        <TableWithGrid
          title={"Products Sold"}
          data={[
            {
              itemName: "Item 1",
              unitCost: 100,
              qty: 2,
              amount: 200,
            },
            {
              itemName: "Item 1",
              unitCost: 100,
              qty: 2,
              amount: 200,
            },
            {
              itemName: "Item 1",
              unitCost: 100,
              qty: 2,
              amount: 200,
            },
            {
              itemName: "Item 1",
              unitCost: 100,
              qty: 2,
              amount: 200,
            },
          ]}
          columns={closedColumns}
          options={{ responsive: "scrollMaxHeight" }}
        />{" "}
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
            this.setState({
              activeStep: this.state.activeStep + 1,
            });
          }}
          formModel="leadForm"
          hasSubmit={true}
          options={[]}
          submitTitle="Next"
          cancelTitle="Previous"
        />
      </div>
    );
  };

  checkboxInputs = [
    "CNG TUNE UP",
    "KIT SERVICE",
    "KIT REFITTING",
    "CYLINDER REMOVE",
    "CYLINDER REFITTING",
    "GRECO ACE KIT FITTING",
    "GRECO PRO KIT FITTING",
  ];

  renderJobCard = () => {
    return (
      <div className="job-card-container">
        <SubFormHeading>GST Details</SubFormHeading>
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
            this.setState({
              activeStep: this.state.activeStep + 1,
            });
          }}
          formModel="leadForm"
          hasSubmit={false}
          options={gstDetails}
        />
        <div>
          <SubFormHeading>Complaint Checklist</SubFormHeading>
          <Grid container>
            {Object.keys(this.state.complainCheckList).map((key, value) => {
              // const isChecked = this.state.dealerCheckboxes[key];
              return (
                <React.Fragment>
                  <Grid
                    className="checkbox-container"
                    item
                    xs={6}
                    md={6}
                    lg={6}
                    sm={6}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div className="label-text">{key}</div>
                      <div>
                        <Checkbox
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          onChange={this.handleToggle}
                          key={key}
                          name={key}
                          // value={isChecked}
                          // {...this.state.id && { checked: isChecked }}
                        />
                      </div>
                    </div>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
        </div>
        <div>
          <SubFormHeading>Job Card</SubFormHeading>
          <Grid container>
          {Object.keys(this.state.jobCardCheckboxes).map((key, value) => {
              const isChecked = this.state.jobCardCheckboxesChanged[key];
              return (
                <React.Fragment>
                  <Grid
                    className="checkbox-container"
                    item
                    xs={6}
                    md={6}
                    lg={6}
                    sm={6}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div className="label-text">{key}</div>
                      <div>
                        <Checkbox
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          onChange={this.handleToggle}
                          key={key}
                          name={key}
                          value={isChecked}
                          {...this.state.id && { checked: isChecked }}
                        />
                      </div>
                    </div>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
          <div className="right-button">
            <Button color="default" variant="contained">
              Close Job Card
            </Button>
          </div>
        </div>
        <SubFormHeading>
          Request Customer Feedback{" "}
          <div className="right-button">
            <Button color="default" variant="contained">
              Request
            </Button>
          </div>
        </SubFormHeading>{" "}
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
            this.handleJobCardDealerInsert()
          }}
          formModel="leadForm"
          hasSubmit={true}
          submitTitle="Save"
          options={[]}
        />
      </div>
    );
  };

  renderActivitySection = () => {
    return (
      <div className="job-card-container">
        <SubFormHeading>
          Upcoming Tasks
          <div className="right-button">
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.setState({ openEditModal: true })}
            >
              New
            </Button>
          </div>
        </SubFormHeading>
        <Grid container>
          {detailsObj.map((dData) => {
            return (
              <Grid item xs={12} md={12} lg={12}>
                <div className="activity-card card-container">
                  <div className="details-text">
                    <span className="description-text">S. No</span>{" "}
                    {dData.sNumber}
                  </div>
                  <div className="details-text">
                    <span className="description-text">Subject</span>{" "}
                    {dData.subject}
                  </div>
                  <div className="details-text">
                    <span className="description-text">Due Date</span>
                    {dData.dueDate}
                  </div>
                  <div className="details-text">
                    <span className="description-text">Rating</span>{" "}
                    {dData.rating}
                  </div>
                  <div className="details-text">
                    <span className="description-text">Priority</span>
                    {dData.priotiy}
                  </div>
                  <div className="details-text">
                    <span className="description-text">Status</span>{" "}
                    {dData.status}
                  </div>
                  <div className="details-text">
                    <span className="description-text">Call Result</span>
                    {dData.callResult}
                  </div>
                  <div className="details-text">
                    <span className="description-text">Comments</span>
                    {dData.comments}
                  </div>
                  <div className="edit-button">
                    <Edit />
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  public renderFormForActivity = () => {
    return (
      <div className="lead-modal-form">
        <Grid container spacing={4}>
          <div className="product-selection">
            <Grid xs={12} md={5} sm={5}>
              <GSelect
                className="r-select"
                placeholder="Subject"
                options={products}
              />
            </Grid>{" "}
            <span style={{ padding: "10px" }} />
            <Grid xs={12} md={5} sm={5}>
              <input type="date" className="r-select" />{" "}
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={4}>
          <div className="product-selection">
            <Grid xs={12} md={5} sm={5}>
              <GSelect
                className="r-select"
                placeholder="Rating"
                options={products}
              />
            </Grid>{" "}
            <span style={{ padding: "10px" }} />
            <Grid xs={12} md={5} sm={5}>
              <GSelect
                className="r-select"
                placeholder="Status"
                options={products}
              />{" "}
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={4}>
          <div className="product-selection">
            <Grid xs={12} md={5} sm={5}>
              <GSelect
                className="r-select"
                placeholder="Call Result"
                options={products}
              />
            </Grid>{" "}
            <span style={{ padding: "10px" }} />
            <Grid xs={12} md={5} sm={5}>
              <TextField
                multiline
                rows={3}
                className="r-select textarea-full"
                placeholder="Comments"
                variant="outlined"
              />{" "}
            </Grid>
          </div>
        </Grid>
        <div className="button-container">
          <Button
            onClick={() => this.setState({ openEditModal: false })}
            variant="contained"
            color="default"
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </div>
      </div>
    );
  };

  renderModal = () => {
    return (
      <BaseModal
        className="leads-modal"
        contentClassName="leads-content"
        onClose={() => this.setState({ openEditModal: false })}
        open={this.state.openEditModal}
      >
        <Grid container spacing={1} className="">
          <Grid item className="modal-margin" xs={12} md={12}>
            Add New Task
          </Grid>
          {this.renderFormForActivity()}
        </Grid>
      </BaseModal>
    );
  };

  renderStepper = () => {
    return (
      <Stepper
        activeStep={this.state.activeStep}
        onChangeStep={ (index) =>  this.setState({ activeStep: index })}
        stepData={[
          {
            label: "Basic Details",
            component: this.renderForm(),
          },
          // {
          //   label: "Documents Collection",
          //   component: this.renderDocsForRTO(),
          // },
          // {
          //   label: "Negotiation",
          //   component: this.renderNegotitation(),
          // },
          // {
          //   label: "Closed",
          //   component: this.renderClosedTab(),
          // },
          {
            label: "Job Card",
            component: this.renderJobCard(),
          },
        ]}
      />
    );
  };

  public tabData = () => [
    {
      tabName: "Details",
      component: this.renderStepper(),
      onTabSelect: (tabName: any) => this.setState({ activeTab: tabName }),
    },
    {
      tabName: "Activity",
      component: this.renderActivitySection(),
      onTabSelect: (tabName: any) => this.setState({ activeTab: tabName }),
    },
  ];

  render() {
    return (
      <AppBar>
        <div className="card-container no-hover add-leads-page" style={{ paddingBottom: 500 }}>
          {this.renderModal()}
          {!this.state.OpenAddJobCard &&
            <Select 
            className="r-select"
            classNamePrefix="r-select-pre"
            placeholder="Select Customer / Lead"
            options={this.state.allCustAndLeads.map(p => ({
              label: p.name,
              value: p.sfid
            }))}
            />
          }
          {this.state.OpenAddJobCard &&
            <div className="">
              <Typography variant="h5" color="inherit" >
                Add New Job Card
            </Typography>

              {this.renderStepper()}
            </div>}
        </div>
        {!this.state.OpenAddJobCard &&
          <span
            onClick={() => this.setState({ OpenAddJobCard: true })}
            style={{ position: "absolute", right: 20, bottom: 20 }}
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
export function mapStateToProps(state) {
  const { leadForm } = state.rxFormReducer;
  return { leadForm };
}
export const AddNewJobCard = connect<{}, {}, IAddNewJobCardProps>(mapStateToProps)(
  AddNewJobCardImpl
);

const SubFormHeading = (props: any) => (
  <div style={props.style} className="sub-form-heading">
    {props.children}
  </div>
);

const UploadContainer = (props: any) => {
  const [file, setFile] = React.useState({
    name: `File${props.valKey}`,
    file: { name: "" },
  });
  const spllited = file.file.name.split(".");
  const ext = spllited[spllited.length - 1];
  return (
    <div key={props.valKey} className="upload-container">
      <div className="upload-head">{props.heading}</div>
      <div className="upload-button">
        <label title="Click To Upload File" htmlFor="upload">
          Upload Photo
        </label>
        <input
          onChange={(e) => {
            const fileData = e.target.files[0];
            setFile({ name: file.name, file: fileData });
          }}
          type="file"
          className="hidden-input"
          id="upload"
        />
        <span className="filename">{`${
          file.file.name.length > 10
            ? `${file.file.name.substr(0, 10)}...${ext}`
            : ""
          }`}</span>
        <div>
          <VisibilityIcon />
          <DeleteIcon
            key={props.valKey}
            onClick={() => {
              setFile({ name: "", file: { name: "" } });
            }}
          />
        </div>
      </div>
    </div>
  );
};
