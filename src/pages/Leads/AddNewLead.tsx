import { Button, Grid, Typography, TextField, Fab,  FormControl, InputLabel} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DownloadIcon from "@material-ui/icons/FontDownload";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Checkbox from "@material-ui/core/Checkbox";
import { Edit } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import * as React from "react";
import { connect } from "react-redux";
import { Control, Form } from "react-redux-form";
// import Select from "react-select";
import { Shimmer } from "react-shimmer";
import { BaseModal } from "src/components/BaseModal";
import { FormComponent } from "src/components/FormComponent";
import { TableWithGrid } from "src/components/TableWithGrid";
import AppBar from "src/navigation/App.Bar";
import { Stepper } from "../BuyOrders/Stepper";
import moment from "moment";
import {
  addressDetails,
  leadDealer,
  leadSource,
  options,
  streetInputs,
  vehicleInputs,
  gstDetails,
  rtoDocs,
  companyDetails,
  kycDocs,
  activityForm,
} from "../Customers/customerInputs";
import "./leads.scss";
import { isDealer } from "src/state/Utility";
import { store } from "../../store/Store";
import { Tabs } from "src/components/Tabs";
// import { GSelect } from "src/components/GSelect";
import { getToken } from "src/state/Utility";
import getData, { imageUpload, pdfUpload } from "src/utils/getData";
import { getPDFBase64fromURL } from "src/utils/getBase64";
import { getImageBase64 } from "./../../utils/getBase64";
import { changeValuesInStore } from "src/state/Utility";
import { modelReducer, actions } from "react-redux-form";
import {
  // leadForm,
  leadForm as leadFormInitObj,
  // userForm,
  userForm as userFormInitObj,
} from "../../reducers/CombinedReducers";
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
import BaseLogo from "src/pages/account/BaseLogo.png"

var loggedInUserDetails;

export interface IAddNewLeadProps {
  leadForm: any;
  userForm: any;
  leadTaskForm: any;
}

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

const invoiceData = {
  orderID: "IN915426",
  dateOfIssue: "10/02/2020",
  billedTo: "GGFS",
  address: "Indiabulls, Lower Parel, Mumbai, MH 411093, India",
  totalItems: 25,
  orderTotal: 23123213,
  billHeads: ["  ", "Item Name", "Unit Cost", "Quantity", "Amount"],
  billData: [
    {
      itemName: "Item 1 ",
      unitCost: "200",
      qty: "2",
      amount: "400",
    },
    {
      itemName: "Item 1 ",
      unitCost: "200",
      qty: "2",
      amount: "400",
    },
    {
      itemName: "Item 1 ",
      unitCost: "200",
      qty: "2",
      amount: "400",
    },
    {
      itemName: "Item 1 ",
      unitCost: "200",
      qty: "2",
      amount: "400",
    },
  ],
};

let intervalId = null;

export class AddNewLeadImpl extends React.Component<
  IAddNewLeadProps,
  {
    openEditModal: boolean;
    activeTab: String;
    activeStep: number;
    dealerCheckboxes: any;
    allTasks: any;
    id: number;
    complainCheckList: any;
    dealerCheckboxesChanged: boolean;
    currentInsertEmail: string;
    currentInsertId: string;
    currentNewSfid: string;
    productPriceList: any;
    statusLead: number;
    openImg: string;
    workshopImages: any;
  }
> {
  constructor(props: IAddNewLeadProps) {
    super(props);
    this.state = {
      openEditModal: false,
      activeTab: "Details",
      activeStep: 0,
      allTasks: [],
      id: 0,
      dealerCheckboxesChanged: false,
      currentInsertEmail: "",
      currentInsertId: "",
      currentNewSfid: "",
      productPriceList: [],
      statusLead: 0,
      openImg: "",
      workshopImages: 
        [
        //  {url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png'},
        //  {url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/IumpHh.png'},
        //  {url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/HdqHLP.png'},
        ],
      complainCheckList: {
        "Low Average / Mileage": false,
        "Late Starting Problem": false,
        "Jerking / Missing / Low Pick": false,
        "Changeover - Switch / Pressure Gauge Indication Problem": false,
        "Vehicle Not Changing over to CNG": false,
        "Vehicle Not starting in Petrol": false,
        "Engine Shutdown in Idleing mode / Return to idle from high RPM": false,
        "Less/Slow Gas Filling in Tank": false,
        "Check Engine Light on Cluster": false,
        "Petrol Consumption even when car running on CNG": false,
        "Noise after/due to CNG Kit Fittment": false,
        "Gas Leakage / Sound / Smell": false,
        "Switch Not Working(No lights on switch)": false,
        "Buzzer Noise on Switch": false,
      },
      dealerCheckboxes: {
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
        "O2 SENSOR R/R": false,
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
        "VACCUM HOSE PIPE R/R": false,
        "FUEL GAUGE CORRECTOR FITMENT": false,
        "RAIL BRACKET R/R": false,
        "ECM BRACKET R/R": false,
        "REDUCER BRACKET R/R": false,
        "BLOCK PISTON R/R": false,
      },
    };
  }

  async componentDidMount() {
    // this.props.dispatch(actions.reset('rxFormReducer.userForm'));
    // this.props.dispatch(actions.reset('rxFormReducer'));
    // this.props.dispatch(actions.setInitial('rxFormReducer'));
    // this.props.dispatch(actions.setInitial('rxFormReducer.userForm'));
    console.log("this.props: ", this.props);
    loggedInUserDetails = getToken().data;

    await this.getProductUnitPrice(loggedInUserDetails);

    const {
      match: { params },
    } = this.props;

    this.getSfid(params.id);

    if (params && params.id) {
      this.setState({ id: params.id });
      let leadData = await this.getleadDataById(
        loggedInUserDetails.token,
        params.id
      );
      this.handelStateForEdit(leadData["0"], loggedInUserDetails.record_type);
    } else {
      let formType;
      // let editData;
      if (loggedInUserDetails.record_type == "0122w000000cwfSAAQ") {
        formType = "leadForm";
        changeValuesInStore("leadForm", leadFormInitObj);
      } else if (loggedInUserDetails.record_type == "0122w000000cwfNAAQ") {
        formType = "userForm";
        changeValuesInStore("userForm", userFormInitObj);
      }
    }
  }

  componentWillUnmount() {
    changeValuesInStore("leadForm", leadFormInitObj);
    changeValuesInStore("userForm", userFormInitObj);
  }

  async getProductUnitPrice(data) {
    try {
      const priceList = await getData({
        query: `select name,unitprice from salesforce.PricebookEntry`,
        token: data.token,
      });
      console.log("priceList =>", priceList);
      this.setState({ productPriceList: priceList.result });
    } catch (e) {
      console.log(e);
    }
  }

  async getAllTasks(data, sfid) {
    let taskData;
    try {
      taskData = await getData({
        query: `SELECT subject, Lead_Rating__c, Priority, Call_Results__c, WhoId, status, ActivityDate 
        FROM salesforce.task WHERE WhoId like '%${sfid}%' `,
        token: data.token,
      });
      console.log("taskData =>", taskData);
      this.setState({ allTasks: taskData.result });
    } catch (e) {
      console.log(e);
    }
  }

  async getleadDataById(token, id) {
    let leadsData;
    try {
      leadsData = await getData({
        query: `SELECT *
      FROM salesforce.Lead 
      WHERE id= '${id}'`,
        token: token,
      });
    } catch (e) {
      console.log(e);
    }
    console.log("leadsData =>", leadsData);
    this.setStatusPersentage(leadsData.result[0].status)
    this.getAllTasks(loggedInUserDetails, leadsData.result[0].sfid);
    return leadsData.result;
  }

  handelStateForEdit = (leadData, record_type) => {
    let formType;
    if (record_type == "0122w000000cwfSAAQ") {
      formType = "leadForm";
    } else if (record_type == "0122w000000cwfNAAQ") {
      formType = "userForm";
    }
    const rtoCodesArr = leadData.rto_code__c && leadData.rto_code__c.split(',') || [];
    const workshopImgArr = leadData.workshop_listt__c && leadData.workshop_listt__c.split(',') || [];
    console.log("workshopImgArr: ", workshopImgArr)
    this.setState({workshopImages: workshopImgArr })
    const editData = {
      email: leadData.email,
      firstName: leadData.firstname,
      lastName: leadData.lastname,
      middleName: leadData.middlename,
      company: leadData.company === "nullCompany" ? "" : leadData.company,
      contactPerson: leadData.contact_person__c,
      whatsAppNumber: leadData.whatsapp_number__c,
      leadBackground: leadData.lead_background__c,
      interestIn: leadData.interest_in__c,
      leadType: leadData.lead_type__c,
      subLeadType: leadData.sub_lead_type__c,
      leadSource: leadData.leadsource,
      leadStatus: leadData.status,
      subLeadSource: leadData.sub_lead_source__c,
      rating: leadData.rating,
      street: leadData.street,
      city: leadData.city,
      taluka: leadData.taluka__c,
      district: leadData.district__c,
      state: leadData.state,
      zip: leadData.postalcode,
      cgdCompany: leadData.cgd_company__c,
      rtoCode: rtoCodesArr,
      country: leadData.country,
      vehicleNumber: leadData.vehicle_no__c,
      fuelType: leadData.fuel_type__c,
      wheeles: leadData.x3_or_4_wheeler__c,
      kitEnquired: leadData.kit_enquiry__c,
      vehicleMek: leadData.vehicle_make__c,
      vehicleModel: leadData.vehicle_model__c,
      usage: leadData.usage_of_vehicle__c,
      vehicleType: leadData.engine__c,
      dailyRunning: leadData.daily_running_kms__c,
      registration: leadData.registration_year__c,
      mfg: leadData.year_of_manufacturing__c,
      chassis: leadData.chassis_no__c,
      Original_RC_Book__c: leadData.original_rc_book__c, 
      Bank_NOC__c: leadData.bank_noc__c, 
      Insurance_Photocopy__c: leadData.insurance_photocopy__c, 
      Permit_URL__c: leadData.permit_url__c, 
      Tax_url__c: leadData.tax_url__c, 
      Passing_url__c: leadData.passing_url__c, 
      Cheque_Photo__c: leadData.cheque_photo__c,
      Company_PAN_Card__c: leadData.company_pan_card__c,
      GST_Certificate__c: leadData.gst_certificate__c,
      Aadhaar__c: leadData.aadhaar__c, 
      PAN__c: leadData.pan__c,  
    };
    changeValuesInStore(formType, editData);
  };

  insertInDistStep1 = async (userForm) => {
    const currentUser = getToken().data;
    const {
      firstName,
      middleName,
      lastName,
      email,
      company,
      whatsAppNumber,
      contactPerson,
      leadBackground,
      interestIn,
      leadType,
      subLeadType,
      leadSource,
      leadStatus,
      subLeadSource,
      rating,
      street,
      city,
      taluka,
      district,
      rtoCode,
      state,
      zip,
      cgdCompany,
      country,
      Aadhaar__c,
      PAN__c,
    } = userForm;
    const query = `INSERT INTO salesforce.Lead 
    ( FirstName ,MiddleName ,LastName ,Email ,Company ,Whatsapp_number__c ,Contact_Person__c ,
      Lead_Background__c, Interest_In__c, LeadSource ,Status , Rating,
      Street ,City , Taluka__c, District__c, State ,PostalCode ,CGD_Company__c, rto_code__c, RecordTypeId ,Assigned_Distributor__c)
    VALUES ('${firstName ?? ""}','${middleName ?? ""}','${lastName ?? ""}','${
      email ?? ""
    }','${company ? company : "nullCompany"}',${whatsAppNumber ? whatsAppNumber : ""},'${
      contactPerson ?? ""
    }', '${leadBackground ?? ""}', '${interestIn ?? ""}', '${leadSource ?? ""}','${leadStatus ?? ""}','${
      rating ?? ""
    }', '${street ?? ""}','${city ?? ""}','${taluka ?? ""}','${district ?? ""}','${state ?? ""}','${zip ?? ""}','${
      cgdCompany ?? ""
    }', '${rtoCode ?? ""}',
    '0122w000000chRuAAI', '${currentUser.sfid}') RETURNING ID`;
    // '${Aadhaar__c ?? ""}', '${PAN__c ?? ""}', Lead_Type__c ,sub_lead_type__c, Sub_Lead_Source__c ,Country,  Workshop_Listt__c= '${this.state.workshopImages}'
    try {
      const result = await getData({
        query,
        token: currentUser.token,
      });
      console.log(result);
      if (
        typeof result === "object" &&
        result.name &&
        result.name === "SyntaxError"
      ) {
        throw result;
      }
      this.setState({ id: result.result[0].id});
      return result;
    } catch (error) {
      throw error;
    }
  };

  updateDistStep1 = async (userForm) => {
    const currentUser = getToken().data;
    const {
      firstName,
      middleName,
      lastName,
      email,
      company,
      whatsAppNumber,
      contactPerson,
      leadBackground,
      interestIn,
      leadType,
      subLeadType,
      leadSource,
      leadStatus,
      subLeadSource,
      rating,
      street,
      city,
      taluka,
      district,
      state,
      zip,
      cgdCompany,
      rtoCode,
      country,
      Aadhaar__c,
      PAN__c,
    } = userForm;

    const query = `update  salesforce.Lead set FirstName = '${
      firstName ?? ""
    }',MiddleName = '${middleName ?? ""}',LastName = '${
      lastName ?? ""
    }', Email = '${email ?? ""}',Company = '${
      company ? company : "nullCompany"
    }',Whatsapp_number__c='${whatsAppNumber ?? 0}',Contact_Person__c = '${contactPerson ?? ""}', Lead_Background__c = '${
      leadBackground ?? ""
    }', Interest_In__c = '${interestIn ?? ""}',LeadSource = '${leadSource ?? ""}',Status = '${leadStatus ?? ""}',Rating = '${
      rating ?? ""
    }',   Street = '${street ?? ""}',City = '${city ?? ""}', Taluka__c = '${taluka ?? ""}', District__c = '${district ?? ""}', State = '${
      state ?? ""
    }',PostalCode ='${zip ?? ""}',CGD_Company__c ='${cgdCompany ?? ""}', RTO_Code__c = '${rtoCode}'
    
    where id='${
      this.state.id
    }'`;
    //, Aadhaar__c = '${Aadhaar__c ?? ""}', PAN__c = '${PAN__c ?? ""}',
    const updateLead = await getData({
      query,
      token: currentUser.token,
    });
    console.log("updateLead => ", updateLead);
    return updateLead.result;
  };

  insertDealerStep1 = async (leadForm) => {
    const currentUser = getToken().data;
    const {
      firstName,
      middleName,
      lastName,
      email,
      whatsAppNumber,
      leadType,
      subLeadType,
      leadSource,
      leadStatus,
      subLeadSource,
      rating,
      street,
      city,
      state,
      taluka,
      district,
      zip,
      country,
      rtoCode,
      cgdCompany,
      vehicleNumber,
      fuelType,
      wheeles,
      kitEnquired,
      vehicleMek,
      vehicleModel,
      usage,
      vehicleType,
      dailyRunning,
      registration,
      mfg,
      chassis,
      gstNumber,
    } = leadForm;
    const query = `INSERT INTO salesforce.Lead (FirstName, MiddleName, LastName,Email, Company, Whatsapp_number__c,Lead_Type__c,sub_lead_type__c,LeadSource,Status,Sub_Lead_Source__c ,Rating,Street,City , Taluka__c, District__c, State ,PostalCode ,CGD_Company__c, rto_code__c, Vehicle_no__c,Fuel_Type__c,X3_or_4_Wheeler__c, kit_enquiry__c, Vehicle_Make__c, Vehicle_Model__c,Usage_of_Vehicle__c,Engine__c, Daily_Running_Kms__c,Registration_Year__c,Year_of_Manufacturing__c,Chassis_No__c, RecordTypeId, Assigned_Dealer__c) 
    VALUES    
    ('${firstName ?? ""}','${middleName ?? ""}','${lastName ?? ""}','${
      email ?? ""}', 'nullCompany',
    ${whatsAppNumber ? whatsAppNumber : 0},'${
      leadType ?? ""
    }', '${subLeadType ?? ""}', '${leadSource ?? ""}','${leadStatus ?? ""}','${subLeadSource ?? ""}','${
      rating ?? ""
    }','${street ?? ""}','${city ?? ""}','${taluka ?? ""}','${district ?? ""}','${state ?? ""}','${zip ?? ""}','${
      cgdCompany ?? ""}', '${rtoCode ?? ""
    }','${vehicleNumber ?? ""}','${fuelType ?? ""}','${wheeles ?? ""}', '${kitEnquired ?? ""}', '${
      vehicleMek ?? ""
    }','${vehicleModel ?? ""}','${usage ?? ""}','${vehicleType ?? ""}',
       ${dailyRunning ? dailyRunning : 0},'${
      registration ? registration : "4/5/2019"
    }',${mfg ? mfg : 0},'${chassis ?? ""
    }', '0122w000000chRpAAI', '${currentUser.sfid}') RETURNING id, email, sfid`;

    try {
      const result = await getData({
        query,
        token: currentUser.token,
      });
      console.log(result);
      if (
        typeof result === "object" &&
        result.name &&
        result.name === "SyntaxError"
      ) {
        throw result;
      }
      this.setState({ id: result.result[0].id});
      return result;
    } catch (error) {
      throw error;
    }
  };

  updateDealerStep1 = async (leadForm) => {
    const currentUser = getToken().data;
    const {
      firstName,
      middleName,
      lastName,
      email,
      whatsAppNumber,
      leadType,
      subLeadType,
      leadSource,
      leadStatus,
      subLeadSource,
      rating,
      street,
      city,
      taluka,
      district,
      state,
      zip,
      cgdCompany,
      rtoCode,
      country,
      vehicleNumber,
      fuelType,
      wheeles,
      kitEnquired,
      vehicleMek,
      vehicleModel,
      usage,
      vehicleType,
      dailyRunning,
      registration,
      mfg,
      chassis,
      gstNumber,
    } = leadForm;
    const query = `UPDATE salesforce.Lead SET 
      FirstName = '${firstName ?? ""}', MiddleName = '${middleName ?? ""}', LastName = '${lastName ?? ""}',
      Email = '${email ?? ""}', Company= 'nullCompany', Whatsapp_number__c = ${whatsAppNumber ? whatsAppNumber : 0},
      Lead_Type__c = '${leadType ?? ""}',LeadSource = '${leadSource ?? ""}',Status = '${leadStatus ?? ""}',
      Sub_Lead_Source__c = '${subLeadSource ?? ""}',Rating = '${rating ?? ""}', sub_lead_type__c = '${subLeadType ?? ""}',
      Street = '${street ?? ""}',City = '${city ?? ""}',Taluka__c = '${taluka ?? ""}', District__c = '${district ?? ""}',State = '${state ?? ""}',PostalCode = '${zip ?? ""}',CGD_Company__c ='${cgdCompany ?? ""}', RTO_Code__c = '${rtoCode}',
      Vehicle_no__c = '${vehicleNumber ?? ""}',Fuel_Type__c = '${fuelType ?? ""}',X3_or_4_Wheeler__c = '${wheeles ?? ""}', kit_enquiry__c = '${kitEnquired ?? ""}',
      Vehicle_Make__c = '${vehicleMek ?? ""}', Vehicle_Model__c = '${vehicleModel ?? ""}',Usage_of_Vehicle__c = '${usage ?? ""}',
      Engine__c = '${vehicleType ?? ""}',Daily_Running_Kms__c = ${dailyRunning ? dailyRunning : 0},
      Registration_Year__c = '${registration ? registration : ""}',
      Year_of_Manufacturing__c = ${mfg ? mfg : 0},Chassis_No__c = '${chassis ?? ""}',
      RecordTypeId = '0122w000000chRpAAI', Assigned_Dealer__c = '${currentUser.sfid}'
    WHERE ID = '${this.state.id}'
    RETURNING id, email, sfid`;

    try {
      const result = await getData({
        query,
        token: currentUser.token,
      });
      console.log(result);
      if (
        typeof result === "object" &&
        result.name &&
        result.name === "SyntaxError"
      ) {
        throw result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  updateDealerSteps = async (status, leadForm) => {
    console.log("***************************************");
    const currentUser = getToken().data;
    const { currentNewSfid } = this.state;
    const {
      Original_RC_Book__c, 
      Bank_NOC__c, 
      Insurance_Photocopy__c, 
      Permit_URL__c, 
      Tax_url__c, 
      Passing_url__c, 
      Aadhaar__c,
      PAN__c
    } = leadForm;
    let statusQuery;
    if(status === "Document Collection"){
    statusQuery =  `UPDATE salesforce.lead set Status = '${status}',
      Original_RC_Book__c = '${Original_RC_Book__c ?? ""}', 
      Bank_NOC__c = '${Bank_NOC__c ?? ""}', 
      Insurance_Photocopy__c = '${Insurance_Photocopy__c ?? ""}', 
      Permit_URL__c = '${Permit_URL__c ?? ""}', 
      Tax_url__c = '${Tax_url__c ?? ""}', 
      Passing_url__c = '${Passing_url__c ?? ""}', 
      Aadhaar__c = '${Aadhaar__c ?? ""}',
      PAN__c = '${PAN__c ?? ""}'
      WHERE  sfid='${currentNewSfid}'`;
    }else{
    statusQuery = `UPDATE salesforce.lead set Status = '${status}' WHERE  sfid='${currentNewSfid}'`;
    }
    const resultStatusQuery = await getData({
      query: statusQuery,
      token: currentUser.token,
    });
    console.log(resultStatusQuery);
    if (status === "Closed") {
      this.setState({ currentNewSfid: null });
      this.setIntervalSfidFromContact(currentNewSfid);
    }
  };

  updateLeadDistStep = async (status, userForm) => {
    const currentUser = getToken().data;
    console.log("status",status)
    const { currentNewSfid } = this.state;
    const {
      Cheque_Photo__c,
      Company_PAN_Card__c,
      GST_Certificate__c,
      Aadhaar__c,
      PAN__c
    } = userForm;
    let statusQuery;
    if(status === "Document Collection"){
      statusQuery = `UPDATE salesforce.lead set GST_Certificate__c = '${GST_Certificate__c ?? ""}', 
      Company_PAN_Card__c = '${Company_PAN_Card__c ?? ""}', Cheque_Photo__c = '${Cheque_Photo__c ?? ""}', 
      Aadhaar__c = '${Aadhaar__c ?? ""}', PAN__c = '${PAN__c ?? ""}', workshop_listt__c = '${this.state.workshopImages}',
      Status = '${status}' WHERE sfid like '${currentNewSfid}'`;
    }
    else if(status === "Approved"){
      statusQuery = `UPDATE salesforce.lead set approved__c = 'true' WHERE sfid like '${currentNewSfid}'`;
    }
    else{
      statusQuery = `UPDATE salesforce.lead set Status = '${status}' WHERE sfid like '${currentNewSfid}'`;
    }
    const resultStatusQuery = await getData({
      query: statusQuery,
      token: currentUser.token,
    });
    console.log(resultStatusQuery);
  };
  
  InsertNewTask = async (data, leadTaskForm, id) => {
    const {
      subject,
      priority,
      date,
      rating,
      status,
      callResult,
      comment,
    } = leadTaskForm;
    const SFID = await getData({
      query: `SELECT * FROM Salesforce.lead WHERE id = '${id}'`,
      token: data.token,
    });
    console.log("SFID => ", SFID);

    try {
      const inserTask = await getData({
        query: `insert into salesforce.task 
        (Subject, priority, Status, Call_Results__c, Lead_Rating__c, 
          ActivityDate, Description, IsReminderSet, whoid)values
        ('${subject}', '${priority}', '${status}', '${callResult}', '${rating}', 
        '${moment(date).format("MM/DD/YYYY")}', '${comment}', true, '${
          SFID.result[0].sfid
        }')
        RETURNING Id`,
        token: data.token,
      });

      console.log("inserTask => ", inserTask);
      this.getAllTasks(data, SFID.result[0].sfid);
      return inserTask.result;
    } catch (e) {
      console.log(e);
    }
  };

  getSfid = async (id) => {
    console.log("id: ", id)
    const currentUser = getToken().data;
    const query = `select id, email,sfid from salesforce.lead where id = '${id}' `;
    const result = await getData({
      query,
      token: currentUser.token,
    });
    // console.log(result.result);
    if (result && result.result && result.result[0].sfid !== null) {
      console.log(result.result[0]);
      this.setState({ currentNewSfid: result.result[0].sfid });
      clearInterval(intervalId);
      intervalId = null;
      return;
    }
    
  };

  setIntervalSfid = (id) => {
    const that = this;
    intervalId = setInterval(async () => that.getSfid(id), 2500);
  };

  getSfidFromContact = async (sfid) => {
    const currentUser = getToken().data;
    const { currentInsertEmail } = this.state;
    const query = `select id, email, sfid from salesforce.contact where Leadid__c ='${sfid}'`;
    const result = await getData({
      query,
      token: currentUser.token,
    });
    console.log(result);
    if (
      result &&
      result.result &&
      result.result[0] &&
      result.result[0].sfid !== null
    ) {
      console.log(result.result);
      this.setState({ currentNewSfid: result.result[0].sfid });
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  setIntervalSfidFromContact = (sfid) => {
    const that = this;
    intervalId = setInterval(async () => that.getSfidFromContact(sfid), 2500);
  };

  handleInsertTaskSubmit = async () => {
    this.InsertNewTask(
      loggedInUserDetails,
      this.props.leadTaskForm,
      this.state.id
    );
    this.setState({ openEditModal: false });
    changeValuesInStore(`leadTaskForm`, {});
  };

  handleToggle = (type: string) =>  (event, isInputChecked) => {
    let fieldName = event.target.name;
    let dealerCheckboxes = this.state[type];;
    dealerCheckboxes[fieldName] = isInputChecked;
    const dealerCheckboxesChanged = !this.state.dealerCheckboxesChanged;
    const obj = {
      dealerCheckboxesChanged,
      [type]: dealerCheckboxes,
    };
    this.setState( obj );
    console.log(this.state.dealerCheckboxes);
  };

  setStatusPersentage = (status) => {
    console.log("Status : ", status)
    if(status === "Basic Details"){
      this.setState({statusLead: 10 })
    }else if(status === "Document Collection"){
      this.setState({statusLead: 20})
    }else if(status === "Negotiation"){
      this.setState({statusLead: 30})
    }else if(status === "Closed"){
      this.setState({statusLead: 40})
    }else if(status === "Job Card"){
      this.setState({statusLead: 50})
    // }else if(status === ""){

    // }else if(status === ""){

    // }else if(status === ""){

    }
    
  }

  // Basic Details Form
  public renderForm = () => {
    return (
      <div className="card-container job-card-container">
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
            onCancel={() => this.props.history.goBack()}
            onSubmit={async (v: any) => {
              const { params } = this.props.match;
              console.log("Params: ", params)
                if (params && params.id) {
                  try {
                    const result = await this.updateDealerStep1(v);
                    this.setIntervalSfid(this.state.id);
                    this.setStatusPersentage(v.leadStatus);
                    this.setState({
                      currentInsertEmail: v.email,
                      // statusLead: v.leadStatus,
                      activeStep: this.state.activeStep + 1,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  try {
                    const result = await this.insertDealerStep1(v);
                    console.log(result)
                    this.setIntervalSfid(this.state.id);
                    this.setStatusPersentage("Basic Details")
                    this.setState({
                      currentInsertEmail: v.email,
                      activeStep: this.state.activeStep + 1,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
            formModel="leadForm"
            hasSubmit={true}
            allFormOptions={[
              ...options,
              ...vehicleInputs,
              ...streetInputs,
              ...leadSource,
            ]}
            options={vehicleInputs}
            submitTitle="Save"
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
      <div className="card-container job-card-container">
        <React.Fragment>
          <SubFormHeading>Documents Required for RTO</SubFormHeading>
            <FormComponent
              onSubmit={(v: any) => {
                console.log(">> v", v);
                this.setState({
                  activeStep: this.state.activeStep + 1,
                });
              }}
              formModel="leadForm"
              hasSubmit={false}
              options={rtoDocs}
            />
          <SubFormHeading>KYC Documents</SubFormHeading>
            <FormComponent
              onCancel={() => {
                this.setState({
                  activeStep: this.state.activeStep - 1,
                })}}
              onSubmit={async (v: any) => {
                console.log(">> v", v);
                console.log(this.state);
                this.setIntervalSfid(this.state.id);
                if (this.state.currentNewSfid) {
                  await this.updateDealerSteps("Document Collection", v);
                  this.setStatusPersentage("Document Collection");
                  this.setState({
                    // statusLead: "Document Collection",
                    activeStep: this.state.activeStep + 1,
                  });
                }
              }}
              formModel="leadForm"
              hasSubmit={true}
              options={kycDocs}
              submitTitle="Next"
              cancelTitle="Previous"
            />
        </React.Fragment>
      </div>
    );
  };

  // Negotiation Form
  renderNegotitation = () => {
    
    return (
      <div className="negotitation-container">
        <div style={{ textAlign: "right" }}>
          <PDFDownloadLink document={<Proposal />}
            {...console.log("Document: ",  (document) )}
            style={{
              textDecoration: "none",
              padding: "10px",
              color: "#4a4a4a",
              backgroundColor: "#f2f2f2",
              border: "1px solid #4a4a4a"
            }}
          >
            Download Pdf
          </PDFDownloadLink>
          {/* <BlobProvider document={<Proposal />}>
          { ({ blob, url, loading, error }) => {
            console.log("blob : ", blob);
            console.log("url : ", url);            
            return(
              <div>
                <a href={`mailto:${store.getState().rxFormReducer["leadForm"].email}?subject=Proposal PDF url&body=PFA for Proposal %0A${url}%0A Thanks%20&%20Reagrds`} >
                  <Button variant="contained" color="default" > Send Proposal </Button>
                </a>
              </div>
            )}}
          </BlobProvider> */}
        </div>
        <div className="negotitation-content">
          <div className="heading">Green Globe Fuel Solutions</div>
          <div className="info-container">
            <div className="image-container">
              {" "}
              <img
                src="https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png"
                // fallback={<Shimmer width={300} height={300} />}
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
          onCancel={() => {
            this.setState({
              activeStep: this.state.activeStep - 1,
            })}}
          onSubmit={async (v: any) => {
            if (this.state.currentNewSfid) {
              await this.updateDealerSteps("Negotiation", v );
              this.setState({
                activeStep: this.state.activeStep + 1,
              });
              console.log(">> v", v);
            }
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
    const productName = store.getState().rxFormReducer["leadForm"].kitEnquired;
    const unitPrice = productName && this.state.productPriceList.find(up => up.name === productName).unitprice;
  
    return (
      <div style={{ width: "100%" }}>
        {/* <TableWithGrid
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
        />{" "} */}
        <Grid container className="align-center">
          <Grid item xs={12} md={4} lg={4}>
            <div className="card-container no-hover">
              {/* <div className="head-title padding-6 ">Proforma Invoice</div> */}
              <Typography variant="h5">Products Sold</Typography>
              <div className="invoice-date padding-6">
                <div>
                  {" "}
                  <span className="description-text">
                    Invoice No -{" "}
                  </span>{" "}
                  {/* {orderdetails && orderdetails.ordernumber} */}
                </div>
                <div>
                  {" "}
                  <span className="description-text">{" "}
                    Date of Issue -
                  </span>{" "}
                  10/02/2020
                </div>
              </div>
              <div className="padding-6 invoice-add">
                {" "}
                <span className = "description-text">
                  Billed to -
                </span>{" "}
                {/* {orderdetails && orderdetails.billingstreet} {orderdetails && orderdetails.billingcity} {orderdetails && orderdetails.billingpostalcode} {orderdetails && orderdetails.billingstate} {orderdetails && orderdetails.billingcountry} */}
              </div>
              <div className="invoice-table">
                <div className="table-heads">
                  {invoiceData.billHeads.map((name, index) => (
                    <div key={index} className="heading">
                      {name}
                    </div>
                  ))}
                </div>
                <div className="table-data">
                  <Grid className="data-inner" container>
                    <Grid item xs={5} className="data">{productName}</Grid>
                    <Grid item xs={4} className="data">{unitPrice}</Grid>
                    <Grid item xs={2} className="data">{1}</Grid>
                    <Grid item xs={1} className="data">{unitPrice}</Grid>
                  </Grid>
                </div>
                <div className="bill-total">
                  <div>
                    <span className="description-text">Sub Total:</span>
                    {/* {orderedproducts && orderedproducts.reduce(
                      (s, a) => Number(a.totalprice ?? a.quantity*a.unitprice)+ s,
                      0
                    )} */}
                  </div>
                  <div>
                    <span className="description-text">Tax - 18% -</span>
                    {/* {(orderedproducts && orderedproducts.reduce(
                      (s, a) => Number(a.totalprice ?? a.quantity*a.unitprice) + s,
                      0
                    ) /
                      100) *
                      18} */}
                  </div>
                  <div className="invoice-total">
                    {" "}
                    <span className="description-text">
                      Invoice Total -
                    </span>
                    {/* {orderedproducts && orderedproducts.reduce(
                      (s, a) => Number(a.totalprice ?? a.quantity*a.unitprice) + s,
                      0
                    ) +
                      (orderedproducts && orderedproducts.reduce(
                        (s, a) => Number(a.totalprice ?? a.quantity*a.unitprice) + s,
                        0
                      ) /
                        100) *
                        18} */}
                  </div>
                </div>
              </div>{" "}
            </div>
          </Grid>
        </Grid>
        <FormComponent
          onCancel={() => {
            this.setState({
              activeStep: this.state.activeStep - 1,
            })}}
          onSubmit={async (v: any) => {
            console.log(">> v", v);
            if (this.state.currentNewSfid) {
              await this.updateDealerSteps("Closed", v);
              this.setStatusPersentage("Closed");
              this.setState({
                // statusLead: "Closed",
                activeStep: this.state.activeStep + 1,
              });
            }
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

  insertDealerJobCard = async (data) => {
    const currentUser = getToken().data;
    console.log("*************************************");
    console.log("Data: ", data);

    let { gstNumber } = data;
    const {
      dealerCheckboxes: jCC,
      complainCheckList: cC,
      currentInsertEmail,
      currentNewSfid,
    } = this.state;

    const query1 = `select sfid from salesforce.contact where email ='${currentInsertEmail}'`;
    const result1 = await getData({
      query: query1,
      token: currentUser.token,
    });

    console.log(result1);

    const query = `INSERT INTO salesforce.job_card__c (customer__c, GST_Number__c,AIR_FILTER_R_R__c,BLOCK_PISTON_R_R__c,CARBURETTOR_SERVICE__c,CAR_SCANNING__c,CNG_LEAKAGE_CHECK__c,CNG_SEQ_KIT_TUNE_UP__c,CNG_TUNE_UP__c,COOLANT_REPLACE__c,CYLINDER_BRACKET_R_R__c,CYLINDER_HYDROTESTING__c,CYLINDER_REFITTING__c,CYLINDER_REMOVE__c,CYLINDER_VALVE_R_R__c,DICKY_FLOOR_REPAIR__c,ECM_BRACKET_R_R__c,ECM_R_R__c,EMULATOR_R_R__c,ENGINE_COMPRESSION_CHECK__c,ENGINE_TUNE_UP__c,FILLER_VALVE_REPAIR__c,FILLER_VALVE_R_R__c,FUEL_FILTER_R_R__c,FUEL_GAUGE_CORRECTOR_FITMENT__c,FUEL_PUMP_RELAY_R_R__c	,FUEL_PUMP_R_R__c,GAS_FILLTER_R_R__c,GENERAL_LABOUR_CHARGES__c	,GRECO_ACE_KIT_FITTING__c,GRECO_INJECTOR_R_R__c	,GRECO_PRO_KIT_FITTING__c,HEIGHT_PAD_FITMENT__c,HIGH_PRESSURE_PIPE_R_R__c,INGNITION_COILS_R_R__c,INGNITION_COIL_CODE_R_R__c,INJECTOR_NOZZLE_R_R__c,KIT_REFITTING__c,KIT_REMOVE__c,KIT_SERVICE__c,LOW_PRESSURE_HOSE_R_R__c,MAF_MAP_SENSOR_CLEAN__c,MAP_SENSOR_R_R__c,MIXER_R_R__c,O2_SENSOR_CLEAN__c,O2_SENSOR_R_R__c,OIL_OIL_FILTER_REPLACE__c,PETROL_INJECTOR_R_R__c,PICK_UP_COIL_R_R__c,PRESSURE_GAUGE_R_R__c,RAIL_BRACKET_R_R__c,REDUCER_BRACKET_R_R__c,REDUCER_R_R__c,REDUCER_SERVICE__c,SPARK_PLUG_R_R__c,SWITCH_R_R__c,ANNUAL_MAINTAINANACE_CONTRACT__c,TAPPET_COVER_PACKING_REPLACE__c,TAPPET_SETTING__c,TEMPRESURE_SENSOR_R_R__c,THROTTLE_BODY_CLEANING__c,TIMING_ADVANCE_PROCESS_R_R__c,VACCUM_HOSE_PIPE_R_R__c,WIRING_REMOVE_REFITTING__c,WIRING_REPAIR__c,X1ST_FREE_SERVICE__c,X1ST_STAGE_REGULATOR_ORING_R_R__c,X1ST_STAGE_REGULATOR_R_R__c,X2ND_FREE_SERVICE__c,X2ND_STAGE_REGUALTOR_R_R__c,X3RD_FREE_SERVICE__c,Low_Average_Mileage__c,Late_Starting_Problem__c,Jerking_Missing_Low_Pick__c,Changeover__c,Vehicle_Not_Changing__c,Vehicle_Not_starting__c,Engine_Shutdown__c	,Less_Slow_Gas__c,Check_Engine__c,Petrol_Consumption__c,Noise_after__c,Gas_Leakage__c,Switch_Not_Working_No_lights_on_switch__c,Buzzer_Noise_on_Switch__c
      ) VALUES
      
       ('${currentNewSfid}','${gstNumber ?? ""}',${jCC["AIR FILTER R/R"]},${jCC["BLOCK PISTON R/R"]},${jCC["CARBURETTOR SERVICE"]},${jCC["CAR SCANNING"]},${jCC["CNG LEAKAGE CHECK"]},${jCC["CNG SEQ. KIT TUNE UP"]},${jCC["CNG TUNE UP"]},${jCC["COOLANT REPLACE"]},${jCC["CYLINDER BRACKET R/R"]},${jCC["CYLINDER HYDROTESTING"]},
      ${jCC["CYLINDER REFITTING"]},${jCC["CYLINDER REMOVE"]},${jCC["CYLINDER VALVE R/R"]},${jCC["DICKY FLOOR REPAIR"]},${jCC["ECM BRACKET R/R"]},${jCC["ECM R/R"]},${jCC["EMULATOR R/R"]},${jCC["ENGINE COMPRESSION CHECK"]},${jCC["ENGINE TUNE UP"]},${jCC["FILLER VALVE REPAIR"]},
      ${jCC["FILLER VALVE R/R"]},${jCC["FUEL FILTER R/R"]},${jCC["FUEL GAUGE CORRECTOR FITMENT"]},${jCC["FUEL PUMP RELAY R/R"]},${jCC["FUEL PUMP R/R"]},${jCC["GAS FILLTER R/R"]},${jCC["GENERAL LABOUR CHARGES"]},${jCC["GRECO ACE KIT FITTING"]},${jCC["GRECO INJECTOR R/R"]},${jCC["GRECO PRO KIT FITTING"]},
      ${jCC["HEIGHT PAD FITMENT"]},${jCC["HIGH PRESSURE PIPE R/R"]},${jCC["INGNITION COILS R/R"]},${jCC["INGNITION COIL CODE R/R"]},${jCC["INJECTOR NOZZLE R/R"]},${jCC["KIT REFITTING"]},${jCC["KIT REMOVE"]},${jCC["KIT SERVICE"]},${jCC["LOW PRESSURE HOSE R/R"]},${jCC["MAF/MAP SENSOR CLEAN"]},

      ${jCC["MAP SENSOR R/R"]},${jCC["MIXER R/R"]},${jCC["O2 SENSOR CLEAN"]},${jCC["O2 SENSOR R/R"]},${jCC["OIL & OIL FILTER REPLACE"]},${jCC["PETROL INJECTOR R/R"]},${jCC["PICK UP COIL R/R"]},${jCC["PRESSURE GAUGE R/R"]},${jCC["RAIL BRACKET R/R"]},${jCC["REDUCER BRACKET R/R"]},

      ${jCC["REDUCER R/R"]},${jCC["REDUCER SERVICE"]},${jCC["SPARK PLUG R/R"]},${jCC["SWITCH R/R"]},${jCC["ANNUAL MAINTAINANACE CONTRACT"]},${jCC["TAPPET COVER PACKING REPLACE"]},${jCC["TAPPET SETTING"]},${jCC["TEMPRESURE SENSOR R/R"]},${jCC["THROTTLE BODY CLEANING"]},${jCC["TIMING ADVANCE PROCESS R/R"]},

      ${jCC["VACCUM HOSE PIPE R/R"]},${jCC["WIRING REMOVE & REFITTING"]},${jCC["WIRING REPAIR"]},${jCC["1ST FREE SERVICE"]},${jCC["1ST STAGE REGULATOR ORING R/R"]},${jCC["1ST STAGE REGULATOR R/R"]},${jCC["2ND FREE SERVICE"]},${jCC["2ND STAGE REGULATOR R/R"]},${jCC["3RD FREE SERVICE"]},

      ${cC["Low Average / Mileage"]}, ${cC["Late Starting Problem"]}, ${cC["Jerking / Missing / Low Pick"]}, ${cC["Changeover - Switch / Pressure Gauge Indication Problem"]}, ${cC["Vehicle Not Changing over to CNG"]}, ${cC["Vehicle Not starting in Petrol"]}, ${cC["Engine Shutdown in Idleing mode / Return to idle from high RPM"]}, ${cC["Less/Slow Gas Filling in Tank"]}, ${cC["Check Engine Light on Cluster"]}, ${cC["Petrol Consumption even when car running on CNG"]}, ${cC["Noise after/due to CNG Kit Fittment"]}, ${cC["Gas Leakage / Sound / Smell"]}, ${cC["Switch Not Working(No lights on switch)"]}, ${cC["Buzzer Noise on Switch"]}

      ) RETURNING ID`;

    const resultStatusQuery = await getData({
      query,
      token: currentUser.token,
    });
    console.log(resultStatusQuery);
    this.props.history.push("/leads");
  };

  renderJobCard = () => {
    return (
      <div className="card-container job-card-container">
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
        {this.props.leadForm.subLeadType === "Servicing" &&
        <div>
          <SubFormHeading>Complaint Checklist</SubFormHeading>
          <Grid container>
            {Object.keys(this.state.complainCheckList).map((key, value) => {
              const isChecked = this.state.complainCheckList[key];
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
                      {/* <div className="label-text">{key}</div> */}
                      <div>
                        <Checkbox
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          style={{ width: '10px', height: '10px'}}
                          onChange={this.handleToggle("complainCheckList")}
                          key={key}
                          name={key}
                          // value={isChecked}
                          // {...this.state.id && { checked: isChecked }}
                        />
                        {key}
                      </div>
                    </div>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
        </div>
        }
        <div>
          <SubFormHeading>Job Card</SubFormHeading>
          <Grid container>
            {Object.keys(this.state.dealerCheckboxes).map((key, value) => {
              const isChecked = this.state.dealerCheckboxes[key];
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
                      {/* <div className="label-text">{key}</div> */}
                      <div>
                        <Checkbox
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          style={{ width: '10px', height: '10px'}}
                          onChange={this.handleToggle("dealerCheckboxes")}
                          key={key}
                          name={key}
                          // value={isChecked}
                          // {...(this.state.id && { checked: isChecked })}
                        />
                        {key}
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
          onCancel={() => this.props.history.goBack()}
          onSubmit={(v: any) => {
            console.log(">> v", v);
            if (this.state.currentNewSfid) {
              this.insertDealerJobCard(this.props.leadForm);
            }
            //this.handleLeadDealerSubmit();
          }}
          formModel="leadForm"
          hasSubmit={true}
          submitTitle="Save"
          options={[]}
          allFormOptions={gstDetails}
        />
      </div>
    );
  };

  renderActivitySection = () => {
    return (
      <div className="job-card-container job-card-container">
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
          {this.state.allTasks.map((dData) => {
            return (
              <Grid item xs={12} md={12} lg={12}>
                <div className="activity-card card-container">
                  <Grid item className="padding-6" md={6} xs={6} lg={6}>
                    <span className="description-text">S. No.:</span>
                    <span className="disp-details"> {dData.sNumber}</span>
                  </Grid>
                  <Grid item className="padding-6" md={6} xs={6} lg={6}>
                    <span className="description-text">Subject:</span>
                    <span className="disp-details"> {dData.subject}</span>
                  </Grid>

                  <Grid item className="padding-6" md={6} xs={6} lg={6}>
                    <span className="description-text">Due Date:</span>
                    <span className="disp-details"> {dData.activitydate}</span>
                  </Grid>
                  <Grid item className="padding-6" md={6} xs={6} lg={6}>
                    <span className="description-text">Rating:</span>
                    <span className="disp-details">
                      {" "}
                      {dData.lead_rating__c}
                    </span>
                  </Grid>

                  <Grid item className="padding-6" md={6} xs={6} lg={6}>
                    <span className="description-text">Priority:</span>
                    <span className="disp-details"> {dData.priority}</span>
                  </Grid>
                  <Grid item className="padding-6" md={6} xs={6} lg={6}>
                    <span className="description-text">Status:</span>
                    <span className="disp-details"> {dData.status}</span>
                  </Grid>

                  <Grid item className="padding-6" md={6} xs={6} lg={6}>
                    <span className="description-text">Call result:</span>
                    <span className="disp-details">
                      {" "}
                      {dData.call_results__c}
                    </span>
                  </Grid>
                  <Grid item className="padding-6" md={6} xs={6} lg={6}>
                    <span className="description-text">Comment:</span>
                    <span className="disp-details"> {dData.comments}</span>
                  </Grid>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  public renderFormForActivity = () => {
    const handleChange = (value, key) => {
      changeValuesInStore(`leadTaskForm.${key}`, value);
    };

    return (
      <div className="lead-modal-form">
        {/* <Grid container spacing={4}>
          <div className="product-selection">
            <Grid xs={12} md={5} sm={5}>
              <Select
                className="r-select"
                placeholder="Subject"
                onChange={(e) => handleChange(e.value, "subject")}
                options={[
                  { value: "Call", label: "Call" },
                  { value: "Send Letter", label: "Send Letter" },
                  { value: "SL", label: "SL" },
                  { value: "Send Quote", label: "Send Quote" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </Grid>{" "}
            <span style={{ padding: "10px" }} />
            <Grid xs={12} md={5} sm={5}>
              <Select
                className="r-select"
                placeholder="Priority"
                onChange={(e) => handleChange(e.value, "priority")}
                options={[
                  { value: "High", label: "High" },
                  { value: "Normal", label: "Normal" },
                ]}
              />
            </Grid>{" "}
            <span style={{ padding: "10px" }} />
            <Grid xs={12} md={5} sm={5}>
              <input
                className="r-select"
                type="date"
                onChange={(e) => handleChange(e.target.value, "date")}
              />{" "}
            </Grid>
            <span style={{ padding: "10px" }} />
            <Grid xs={12} md={5} sm={5}>
              <Select
                className="r-select"
                placeholder="Rating"
                onChange={(e) => handleChange(e.value, "rating")}
                options={[
                  { value: "Hot", label: "Hot" },
                  { value: "Warm", label: "Warm" },
                  { value: "Cold", label: "Cold" },
                ]}
              />
            </Grid>{" "}
            <span style={{ padding: "10px" }} />
            <Grid xs={12} md={5} sm={5}>
              <Select
                className="r-select"
                placeholder="Status"
                onChange={(e) => handleChange(e.value, "status")}
                options={[
                  { value: "Open", label: "Open" },
                  { value: "Completed", label: "Completed" },
                ]}
              />{" "}
            </Grid>
            <span style={{ padding: "10px" }} />
            <Grid xs={12} md={5} sm={5}>
              <Select
                className="r-select"
                placeholder="Call Result"
                onChange={(e) => handleChange(e.value, "callResult")}
                options={[
                  { value: "Phone", label: "Phone" },
                  { value: "Space Unreachable", label: "Space Unreachable" },
                  {
                    value: "Customer didn't Pick",
                    label: "Customer didn't Pick",
                  },
                  {
                    value: "Spoke with Customer",
                    label: "Spoke with Customer",
                  },
                ]}
              />
            </Grid>{" "}
            <span style={{ padding: "10px" }} />
            <Grid xs={12} md={5} sm={5}>
              <TextField
                multiline
                rows={3}
                className="r-select textarea-full"
                placeholder="Comments"
                onChange={(e) => handleChange(e.target.value, "comment")}
                variant="outlined"
              />{" "}
            </Grid>
          </div>
        </Grid> */}
        <div className="button-container">
          {/* <Button
            onClick={() => this.setState({ openEditModal: false })}
            variant="contained"
            color="default"
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save
          </Button> */}
          <FormComponent
            onCancel={() => {
              this.setState({ openEditModal: false });
              changeValuesInStore(`leadTaskForm`, {});
            }}
            options={activityForm}
            submitTitle="SAVE"
            onSubmit={(v) => {
              console.log("Task Submit: ", v)
              this.handleInsertTaskSubmit();
            }}
            hasSubmit={true}
            formModel="leadTaskForm"
          />
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
        onChangeStep={(index) => this.setState({ activeStep: index })}
        stepData={[
          {
            label: "Basic Details",
            disable: this.state.statusLead < 40 ? false : true,
            component: this.renderForm(),
          },
          {
            label: "Documents Collection",
            disable: this.state.statusLead >= 10 && this.state.statusLead < 40 ? false : true,
            component: this.renderDocsForRTO(),
          },
          {
            label: "Negotiation",
            disable: this.state.statusLead >= 20 && this.state.statusLead < 40 ? false : true,
            // component: <Proposal/>
            // component: this.renderNegotitation(),
            component: <RenderNegotitationComp currentID={this.state.id}
              onCancel={() => 
                this.setState({ activeStep: this.state.activeStep - 1 })
              }
              onSubmit={async (v: any) => {
                if (this.state.currentNewSfid) {
                  await this.updateDealerSteps("Negotiation", v );
                  this.setStatusPersentage("Negotiation");
                  this.setState({
                    // statusLead: "Negotiation",
                    activeStep: this.state.activeStep + 1,
                  });
                  console.log(">> v", v);
                }
              }}
              />
          },
          {
            label: "Closed",
            disable: this.state.statusLead >= 30 && this.state.statusLead <= 40 ? false : true,
            component: this.renderClosedTab(),
          },
          {
            label: "Job Card",
            disable: this.state.statusLead >= 40 && this.state.statusLead <= 50 ? false : true,
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
    console.log("thi.state: ", this.state)
    return (
      <AppBar>
        <div className="">
          {this.renderModal()}
          {/* <Typography variant="h5" color="inherit" noWrap={true}>
            {isDealer() ? "Lead Details - Customer" : "Lead - Dealer"}
          </Typography> */}
          <div className="">
            {!isDealer() ? (
              <Stepper
                activeStep={this.state.activeStep}
                onChangeStep={(index) => this.setState({ activeStep: index })}
                stepData={[
                  {
                    label: "Draft",
                    disable: false,
                    component: (
                      <div className="card-container job-card-container">
                        <SubFormHeading>Lead Basic Details</SubFormHeading>
                        <FormComponent
                          onSubmit={(v: any) => {
                            console.log(">> v", v.target.value);
                            // this.setState({
                            //   activeStep: this.state.activeStep + 1,
                            // });
                          }}
                          formModel="userForm"
                          hasSubmit={false}
                          submitTitle="Next"
                          options={leadDealer}
                        />
                        <SubFormHeading>Address Details</SubFormHeading>
                        <FormComponent
                          onCancel={() => this.props.history.goBack()}
                          onSubmit={async (v: any) => {
                            console.log(">> v", v);
                            const { params } = this.props.match;
                            if (params && params.id) {
                              try {
                                const result = await this.updateDistStep1(v);
                                this.setIntervalSfid(this.state.id);
                                this.setState({
                                  currentInsertEmail: v.email,
                                  activeStep: this.state.activeStep + 1,
                                });
                              } catch (error) {
                                console.log(error);
                              }
                            } else {
                              try {
                                const result = await this.insertInDistStep1(v);
                                this.setIntervalSfid(this.state.id);
                                this.setState({
                                  currentInsertEmail: v.email,
                                  activeStep: this.state.activeStep + 1,
                                });
                              } catch (error) {
                                console.log(error);
                              }
                            }
                          }}
                          formModel="userForm"
                          hasSubmit={true}
                          allFormOptions={[...streetInputs, ...leadDealer]}
                          options={streetInputs}
                          submitTitle="Next"
                          cancelTitle="Previous"
                        />
                        {/* <button type = "submit"> submit </button> */}
                      </div>
                    ),
                  },
                  {
                    label: "Documents Collection",
                    disable: false,
                    component: (
                      <div className="card-container job-card-container">
                        {/* <SubFormHeading>Regular Business Documentation</SubFormHeading>
                        <SubFormHeading>Workshop Approval Process</SubFormHeading> */}
                        <SubFormHeading>Company Details</SubFormHeading>
                        <div>
                        <FormComponent
                          onSubmit={(v: any) => {
                            console.log(">> v", v);
                          }}
                          formModel="userForm"
                          hasSubmit={false}
                          options={companyDetails}
                        >
                        </FormComponent>
                        <RenderConteiner photos={this.state.workshopImages} 
                          onDelete={(imgArray)=>
                            this.setState({workshopImages: imgArray})
                          }
                        />
                        </div>
                        
                        <SubFormHeading>KYC Documents</SubFormHeading> 
                        <FormComponent
                          onCancel={() => this.props.history.goBack()}
                          onSubmit={async (v: any) => {
                            if (this.state.currentNewSfid) {
                              await this.updateLeadDistStep(
                                "Document Collection", v
                              );
                              this.setState({
                                activeStep: this.state.activeStep + 1,
                              });
                              console.log(">> v", v);
                            }
                          }}
                          formModel="userForm"
                          hasSubmit={true}
                          options={kycDocs}
                        />
                      </div>
                    ),
                  },
                  {
                    label: "Approval",
                    disable: false,
                    component: (
                      <div className="card-container job-card-container">
                        Approvals {`&`} Inventory Load
                        <div className="button-container">
                          <FormComponent
                            onCancel={() => this.props.history.goBack()}
                            onSubmit={async (v: any) => {
                              console.log("currentNewSfid", this.state.currentNewSfid)
                              if (this.state.currentNewSfid) {
                                await this.updateLeadDistStep("Approved", v);
                                this.props.history.push("/leads");
                                console.log(">> v", v);
                              }
                            }}
                            hasSubmit={true}
                            formModel="userForm"
                            options={[]}
                            hasCancel={false}
                          />
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            ) : (
              <Tabs
                // isIndex={this.state.activeTab}
                tabsData={this.tabData()}
              />
            )}
          </div>
        </div>
      </AppBar>
    );
  }
}
export function mapStateToProps(state) {
  const { userForm, leadForm, leadTaskForm } = state.rxFormReducer;
  return { userForm, leadForm, leadTaskForm };
}
export function mapDispatchToProps(dispatch) {
  console.log("dispatch: ", dispatch);
  return { dispatch };
}
export const AddNewLead = connect<{}, {}, IAddNewLeadProps>(mapStateToProps)(
  AddNewLeadImpl
);

const SubFormHeading = (props: any) => (
  <div style={props.style} className="sub-form-heading">
    {props.children}
  </div>
);

class RenderConteiner extends React.Component <any> {
  constructor(props){
    super(props);
  }

  state = {
    photos : this.props.photos,
    openImg: false,
    photoIndex: "",
  }

  getDocURL = async(image, id) => {
    const documentURL = await imageUpload({
      id: image.name + id,
      img: await getImageBase64(image),
      type: image.type
    });
    console.log("documentURL : ", documentURL)

    return documentURL.url;
  };

  render() {
    console.log("Photos : ", this.state.photos)
    return(
    <React.Fragment>
      <div className="upload-container">
        <div className="upload-head">Workshop Images</div>
        <Grid item xs= {12} className="upload-button">
          <label title="Click To Upload File" htmlFor="upload">
            Upload Photo
          </label>
          <input
            onChange={ async(e) => {
              const fileData = e.target.files[0];
              const url = await this.getDocURL(e.target.files[0], "props.id");
              const arr = this.state.photos;
              arr.push(url);
              this.setState({photos: arr});
              this.props.onDelete(arr);
            }}
            type="file"
            className="hidden-input"
            id="upload"
          />
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <GridList cellHeight={130} spacing={6} cols={3}>
            {this.state.photos ? (
              this.state.photos.map((r, index) => (
                <GridListTile >
                  <img
                    src={r}
                    alt="image"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.setState({ openImg: true, photoIndex: r });
                    }}
                  />
                  <GridListTileBar
                    titlePosition="top"
                    // title={moment(r.photodatetime__c).format("DD-MM-YY")}
                    actionIcon={
                      <IconButton
                        style={{ padding: 1 }}
                        onClick={() => {
                          const arr = this.state.photos;
                          arr.splice(index, 1)
                          this.setState({photos: arr})
                          this.props.onDelete(arr);
                        }}
                      >
                        <DeleteIcon style={{ color: "white" }} />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))
              ) : (
                <Typography align="center" variant="caption">
                  Please Upload
                </Typography>
              )
            }
          </GridList>
        </Grid>
        <Grid container justify="center" alignItems="center">
          {this.state.openImg &&
            <BaseModal
            open={this.state.openImg}
            className="inventory-modal"
            contentClassName="inventory-modal"
            onClose={() => this.setState({openImg: false}) }
          >
            <Grid container spacing={1} className="">
              <Grid item className="modal-margin" xs={12} md={12}>
                <div >
                  <img src={this.state.photoIndex} height="200px" width="270px" alt="dta" />
                </div>
              </Grid>
            </Grid>
          </BaseModal>}
        </Grid>
      </div>
    </React.Fragment>
    );
  }
}

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

const FitmentProposal = () => {
  return (
    // <PDFViewer>
      <Document >
        <Page size="A4">
          <View style={{ margin: "10px", marginTop: "20px", textAlign: 'center'}}>
            <Text style={{fontSize: 28, fontWeight: 'bold' }}>GRECOKITS FUEL SOLUTIONS</Text>
          </View>
          <View style={{ textAlign: 'center' }}>
            <Text style={{fontSize: 12 }} >Plot No. 151, Brick Factory Compound, Shastri Nagar, Mulund colony, </Text>
            <Text style={{fontSize: 12 }}>Mumbai - 400802 India Tel: 022-25677775 Fax : 022-25900903</Text>
            <Text style={{fontSize: 12 }}>Mobile : 9519749360 / 70 / 90</Text>
            <Text style={{fontSize: 12 }}>E-mail : sales@greco.co.in  Website : www.greco.co.in</Text>
          </View>
          <View style={{ margin: "10px", textAlign: 'center' }}>
            <Text style={{fontSize: 16}}>QUOTATION / PROFORMA INVOICE</Text>
          </View>
          
          <View style={{ margin: "1px", marginLeft: "30px", marginRight: "30px", flexDirection: 'row'}}>
            <Text style={{fontSize: 10, width: '10%' }}> Sr. No. :</Text>
            <Text style={{fontSize: 10, width: '40%' }}> 951974 </Text>
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
          
          <View style={styles.table}>
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
          </View>
          
          <View style={{ marginLeft: "30px",marginRight: "30px", flexDirection: 'row' }}>
            <Text style={{fontSize: 13, width: '100%', fontWeight: 'extrabold'}}> Terms & Conditions </Text>
          </View>

          <View style={{ marginLeft: "30px", marginRight: "30px", flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ margin: "2px", fontSize: 11, width: '3%'}}> (1) </Text>
              <Text style={{ margin: "2px", fontSize: 11, width: '97%'}}> The above mantioned rates are inclusive of KIT installation charges, all applicaiton taxes and RTO enrollment charges, RTO charges to be paid in cash.</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ margin: "2px", fontSize: 11, width: '3%'}}> (2) </Text>
              <Text style={{ margin: "2px", fontSize: 11, width: '97%'}}> The warranty of the KIT would be 12 months from date of installation.</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ margin: "2px", fontSize: 11, width: '3%'}}> (3) </Text>
              <Text style={{ margin: "2px", fontSize: 11, width: '97%'}}> CNG conversion shall take two working days.</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ margin: "2px", fontSize: 11, width: '3%'}}> (4) </Text>
              <Text style={{ margin: "2px", fontSize: 11, width: '97%'}}> The payment shall has to be made against delivery after conversioneither by cash/ credit card. The credit card shall be made in favor of "Greenglobe Fuel Solutions".</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ margin: "2px", fontSize: 11, width: '3%'}}> (5) </Text>
              <Text style={{ margin: "2px", fontSize: 11, width: '97%'}}> For CNG endorsement on RC book, following documents has to be submitted with the vehicle at the time of CNG Conversion:-</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ margin: "2px", fontSize: 11, width: '3%'}}> </Text>
              <Text style={{ margin: "2px", fontSize: 11, width: '97%'}}> (A) Original RC Book  (B) Valid Insurance Photocopy (C)  Bank NOC in Cash of Hypothecation</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ margin: "2px", fontSize: 11, width: '3%'}}> (6) </Text>
              <Text style={{ margin: "2px", fontSize: 11, width: '97%'}}> For getting the RTO work done, vehicle has to be taken to the responsive RTO office by customer for getting the inspection done after coordinationg with RTO agent.</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ margin: "2px", fontSize: 11, width: '3%'}}> (7) </Text>
              <Text style={{ margin: "2px", fontSize: 11, width: '97%'}}> RC book after endorsementshall be send to you on your registered addressdirectly by RTO office after inspection, as per RTO procedure.</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ margin: "2px", fontSize: 11, width: '3%'}}> (8) </Text>
              <Text style={{ margin: "2px", fontSize: 11, width: '97%'}}> It is necessory to get the endorsement done on insurance policy after CNG passing.</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ margin: "2px", fontSize: 11, width: '3%'}}> (9) </Text>
              <Text style={{ margin: "2px", fontSize: 11, width: '97%'}}> This quotation is valid for 15 days from the date of issue.</Text>
            </View>
          </View>

          <View style={{ margin: "10px", marginLeft: "30px", marginRight: "30px", textAlign: 'center' }}>
            <Text style={{fontSize: 16}}>FOR ANY FURTHER DETAILS, PLEASE FEEL FREE TO CONTACT US</Text>
          </View>

          <View style={{ margin: "10px", marginLeft: "30px", marginRight: "30px" }}>
            <Text style={{fontSize: 12}}>Thanking you,</Text>
          </View>

          <View style={{ margin: "10px", marginLeft: "30px", marginRight: "30px" }}>
            <Text style={{fontSize: 16}}>GRECOKITS FUEL SOLUTIONS</Text>
          </View>

          <View style={{ margin: "10px", marginLeft: "30px", marginRight: "30px", flexDirection: 'column'}}>
            <Text style={{fontSize: 12, width: '100%' }}>Sales Executive </Text>
            <Text style={{fontSize: 12, width: '100%' }}> Name :  </Text>
            <Text style={{fontSize: 12, width: '100%' }}> Mobile : </Text>
          </View>
        </Page>
      </Document>
    // </PDFViewer>
  );
}

const ServicingProposal = () => {
  return(
    <Document>
      <Page size = "A4" >
        <View style={{ marginTop: "10px", textAlign: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold' }}>REPAIRE ORDER</Text>
        </View>
        <View style={{ display: "table", width: "auto",margin: "10px", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 }}>
          <View style={styles.tableRow}> 
            <View style={{width: "65%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: "20%", margin: "2px"}}>
                  <Image src={BaseLogo} />
                </View>
                <View style={{ width: "80%", margin: "2px" }}>
                  <Text style={{ fontSize: 17, fontWeight: 'bold' }}>GRECOKITS FUEL SOLUTIONS</Text>
                  <Text style={{ fontSize: 10 }} >Plot No. 151, Brick Factory Compound, Shastri Nagar,  </Text>
                  <Text style={{ fontSize: 10 }}>Mulund colony, Mumbai - 400802 India </Text>
                  <Text style={{ fontSize: 10 }}>Tel: 022-25677775 Fax : 022-25900903</Text>
                  <Text style={{ fontSize: 10 }}>Mobile : 9519749360 / 70 / 90</Text>
                  <Text style={{ fontSize: 10 }}>E-mail : sales@greco.co.in  Website : www.greco.co.in</Text>
                </View> 
              </View>
            </View>
            <View style={{width: "35%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <Text style={{ fontSize: 10, margin: "2px" }}>GST NO. : 2TAJJ4587GF5458</Text> 
            </View> 
          </View> 
          <View style={styles.tableRow}> 
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <View style={{ margin: "2px", flexDirection: 'row' }}>
                <Text style={{fontSize: 12, width: '40%'}}> Customer Name:</Text>
                <Text style={{fontSize: 12, width: '30%'}}> Reg. No.: </Text>
                <Text style={{fontSize: 12, width: '30%'}}> Job No.:</Text>
              </View>
              <View style={{ margin: "2px", flexDirection: 'row' }}>
                <Text style={{fontSize: 12, width: '40%'}}> Address:</Text>
                <Text style={{fontSize: 12, width: '30%'}}> VIN No.: </Text>
                <Text style={{fontSize: 12, width: '30%'}}> Job Date: </Text>
              </View>
              <View style={{ margin: "2px", flexDirection: 'row' }}>
                <Text style={{fontSize: 12, width: '40%'}}> </Text>
                <Text style={{fontSize: 12, width: '30%'}}> Engine No.: </Text>
                <Text style={{fontSize: 12, width: '30%'}}> Job Time </Text>
              </View>
              <View style={{ margin: "2px", flexDirection: 'row' }}>
                <Text style={{fontSize: 12, width: '40%'}}> </Text>
                <Text style={{fontSize: 12, width: '30%'}}> Model: </Text>
                <Text style={{fontSize: 12, width: '30%'}}> </Text>
              </View>
              <View style={{ margin: "2px", flexDirection: 'row' }}>
                <Text style={{fontSize: 12, width: '40%'}}> Mobile</Text>
                <Text style={{fontSize: 12, width: '30%'}}> Make: </Text>
                <Text style={{fontSize: 12, width: '30%'}}> </Text>
              </View>
              <View style={{ margin: "2px", flexDirection: 'row' }}>
                <Text style={{fontSize: 12, width: '40%'}}> 3/4 Wheeler:</Text>
                <Text style={{fontSize: 12, width: '30%'}}> Present KMs: </Text>
                <Text style={{fontSize: 12, width: '30%'}}> </Text>
              </View>
              <View style={{ margin: "2px", flexDirection: 'row' }}>
                <Text style={{fontSize: 12, width: '40%'}}> Contact Person:</Text>
                <Text style={{fontSize: 12, width: '30%'}}> SR Advisor: </Text>
                <Text style={{fontSize: 12, width: '30%'}}> </Text>
              </View>
            </View>  
          </View> 
          <View style={styles.tableRow}> 
            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <Text style={{padding: 100, margin: "auto", marginTop: 5, fontSize: 10}}>Sr. No. </Text> 
            </View> 
            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <Text style={{padding: 100, margin: "auto", marginTop: 5, fontSize: 10}}>Discription</Text> 
            </View> 
          </View> 
          <View style={styles.tableRow}> 
            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <Text style={{ fontSize: 10, margin: "2px"}}> Terms of Payments are </Text> 
              <Text style={{ fontSize: 12, margin: "2px"}}> Cash, Demand Draft or Pay Order Only. </Text> 
            </View> 
            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <Text style={{ fontSize: 10, margin: "2px" }}> Demand Draft / Pay Order should be made in favour of</Text> 
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 12, margin: "2px" }}> GRECOKITS FUEL SOLUTIONS</Text>
                <Text style={{ fontSize: 11, margin: "2px" }}> Payable at Mumbai</Text>
              </View> 
            </View> 
          </View> 
          <View style={styles.tableRow}> 
            <View style={{width: "35%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <Text style={{ margin: "2px", fontSize: 10}}>Discription</Text> 
              <View style={{ display: "table", width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 }}> 
                <Text style={{ fontSize: 10, margin: "2px" }}>I here by autorise for the above repaires to be excluded using necessary materials and I am affixing signature blow in evidence of agreeing to the terms & conditions given in the reverse side of  this repair order obviously and unconditionaly.</Text> 
                <Text style={{ fontSize: 12, marginTop: "10px", textAlign: "right" }}> CUSTOMER'S SIGN </Text> 
              </View>
            </View> 
            <View style={{width: "30%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <Text style={{ margin: "2px", marginTop: 5, fontSize: 10}}>Discription</Text> 
            </View> 
            <View style={{width: "35%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <Text style={{ margin: "2px", marginTop: 5, fontSize: 10}}>Discription</Text> 
            </View> 
          </View> 
          <View style={styles.tableRow}>
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <Text style={{ margin: "2px", marginTop: 5, marginBottom: 20, fontSize: 10}}>Remarks and Advise for customer, (if any)</Text> 
              <View style={{ flexDirection: "row" }}>
                <View style={styles.subTable}>
                  <View style={styles.subRow}> 
                    <Text style={{ fontSize: 10, margin: "2px", textAlign: "center"}}> Delivered by :  </Text> 
                  </View>   
                  <View style={styles.subRow}> 
                    <Text style={{ fontSize: 10, margin: "2px" }}>Name : </Text> 
                  </View> 
                  <View style={styles.subRow}> 
                    <Text style={{ fontSize: 10, margin: "2px" }}>Time :               Date :   </Text> 
                  </View> 
                </View>
                <View style={styles.subTable}>
                  <View style={styles.tableRow}> 
                    <View style={styles.subRow}> 
                      <Text style={{ fontSize: 10, margin: "2px", textAlign: "center"}}> Final Inspection : OK / NOT OK </Text> 
                    </View> 
                  </View>
                  <View style={styles.tableRow}> 
                    <View style={styles.subRow}> 
                      <Text style={{ fontSize: 10, margin: "2px"}}>Name : </Text> 
                    </View> 
                    </View>
                  <View style={styles.tableRow}> 
                    <View style={styles.subRow}> 
                      <Text style={{ fontSize: 10, margin: "2px"}}>Signature :</Text> 
                    </View> 
                  </View> 
                </View>
                <View style={styles.subTable}>
                  <View style={styles.tableRow}> 
                    <View style={styles.subRow}> 
                      <Text style={{ fontSize: 9, margin: "4px" }}> I hereby certify that repairs have been carried out to my entire satisfaction.</Text> 
                      <Text style={{ fontSize: 10, margin: "4px" }}> Data:                 Customer's Signature</Text> 
                    </View> 
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

const RenderNegotitationComp = (props: any) => {
  const [blobURL, setblobURL] = React.useState(null);
  const [pdfLinkURL, setpdfLinkURL] = React.useState(null);
  const subLeadType = store.getState().rxFormReducer["leadForm"].subLeadType ;
  console.log("props => ", props)
  return (
    <div className="negotitation-container">
      {(subLeadType === "Fitment" || subLeadType === "Servicing" ) &&
        <div style={{ textAlign: "right" }}>
          <BlobProvider document={subLeadType === "Fitment" ? <FitmentProposal /> : <ServicingProposal /> }> 
            { ({ blob, url, loading, error }) => {
              console.log("blob : ", blob);
              console.log("url : ", url);
              setblobURL(blob);

              return(
                // <a href={url} target="_blank">
                //   <Button variant="contained" color="default" > Send Proposal </Button>
                // </a>
                <div>
                  { pdfLinkURL === null &&
                    < Button variant="contained" color="default"
                      onClick={async() => {
                        const documentURL = await pdfUpload({
                          id: store.getState().rxFormReducer["leadForm"].firstName + props.currentID,
                          pdf: await getPDFBase64fromURL(blobURL),
                        });
                        console.log("documentURL => ", documentURL.url)
                        const url = documentURL.url;
                        setpdfLinkURL(url);
                        console.log("pdfLinkURL => ", url)
                      }}
                    >
                      <a href={url} target="_blank"> Generate Proposal </a>
                    </Button>
                  }
                  { pdfLinkURL &&
                    <a href={`mailto:${store.getState().rxFormReducer["leadForm"].email}?subject=Proposal PDF url&body=PFA for Proposal %0A${pdfLinkURL}%0A Thanks%20&%20Reagrds`} >
                      <Button variant="contained" color="default" > Send Proposal </Button>
                    </a>
                  }
                </div>
              )
            }}
          </BlobProvider>
        </div>
      }
      <div className="negotitation-content">
        <div className="heading">Green Globe Fuel Solutions</div>
        <div className="info-container">
          <div className="image-container">
            {" "}
            <img
              src="https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png"
              // fallback={<Shimmer width={300} height={300} />}
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
        onCancel={() => props.onCancel()}
        onSubmit={(v: any) => props.onSubmit(v)}
        submitTitle="Next"
        cancelTitle="Previous"
        formModel="leadForm"
        hasSubmit={true}
        options={[]}
      />
    </div>
  );
};

