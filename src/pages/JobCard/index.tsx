import { Button, Grid, Typography, Fab,  FormControl,
  InputLabel,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { Edit, Add } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import * as React from "react";
import { connect } from "react-redux";
// import Select from "react-select";
import Image, { Shimmer } from "react-shimmer";
import { BaseModal } from "src/components/BaseModal";
import { FormComponent } from "src/components/FormComponent";
import { TableWithGrid } from "src/components/TableWithGrid";
import AppBar from "src/navigation/App.Bar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Stepper } from "../BuyOrders/Stepper";
import { PersonPin, Phone } from "@material-ui/icons";
import { ChangePhoneFormat } from "src/components/Format";
import {
  addressDetails,
  leadDealer,
  leadSourceForJobCard,
  options,
  streetInputs,
  vehicleInputs,
  gstDetails,
} from "../Customers/customerInputs";
import { 
  Document, 
  PDFDownloadLink, 
  BlobProvider, pdf,
  Page,  
  View,
  Text,
  StyleSheet, 
  PDFViewer } from "@react-pdf/renderer";
import BaseLogo from "src/pages/account/BaseLogo.png"
import getData, { imageUpload, pdfUpload } from "src/utils/getData";
import { getPDFBase64fromURL } from "src/utils/getBase64";
import { store } from "../../store/Store";
import { leadForm as leadFormInitObj } from "../../reducers/CombinedReducers";
import "./jobCard.scss";
import { isDealer } from "src/state/Utility";
import { Tabs } from "src/components/Tabs";
import { GSelect } from "src/components/GSelect";
import data from "./../../data";
import { getToken, changeValuesInStore } from "src/state/Utility";
import { AnyCnameRecord } from "dns";
import { LabelList } from "recharts";
import moment from "moment";

var loggedInUserDetails;

export interface IAddNewJobCardProps {
  leadForm: any;
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

export class AddNewJobCardImpl extends React.Component<
  IAddNewJobCardProps,
  { 
    openEditModal: boolean;
    activeTab: number;
    activeStep: number;
    jobCardCheckboxesChanged: boolean;
    AllJobCards: any;
    OpenAddJobCard: boolean;
    jobCardCheckboxes: any;
    complaintCheckboxes: any;
    allCustAndLeads: any;
    custVehicles: any;
    selectedUser: any;
    selectedJobCard: any;
    selectedVehicle: any;
    basicDetailsFormRecordId : any;
    vahicleId : any;
    isLeadOrCustomer : string;
  }
> {
  constructor(props: IAddNewJobCardProps) {
    super(props);
    this.state = {
      openEditModal: false,
      activeTab: 0,
      activeStep: 0,
      OpenAddJobCard: false,
      jobCardCheckboxesChanged: false,
      AllJobCards: [],
      jobCardCheckboxes: {
        "ANNUAL MAINTAINANACE CONTRACT": false,
        "AIR FILTER R/R": false,
        "BLOCK PISTON R/R": false,
        "CNG TUNE UP": false,
        "CYLINDER REMOVE": false,
        "CYLINDER REFITTING": false,
        "CARBURETTOR SERVICE": false,
        "CAR SCANNING": false,
        "CNG LEAKAGE CHECK": false,
        "CNG SEQ. KIT TUNE UP": false,
        "COOLANT REPLACE": false,
        "CYLINDER BRACKET R/R": false,
        "CYLINDER HYDROTESTING": false,
        "CYLINDER VALVE R/R": false,
        "DICKY FLOOR REPAIR": false,
        "ECM BRACKET R/R": false,
        "ECM R/R": false,
        "EMULATOR R/R": false,
        "ENGINE COMPRESSION CHECK": false,
        "ENGINE TUNE UP": false,
        "FILLER VALVE REPAIR": false,
        "FILLER VALVE R/R": false,
        "FUEL FILTER R/R": false,
        "FUEL GAUGE CORRECTOR FITMENT": false,
        "FUEL PUMP RELAY R/R": false,
        "FUEL PUMP R/R": false,
        "GRECO ACE KIT FITTING": false,
        "GRECO PRO KIT FITTING": false,
        "GAS FILLTER R/R": false,
        "GENERAL LABOUR CHARGES": false,
        "GRECO INJECTOR R/R": false,
        "HEIGHT PAD FITMENT": false,
        "HIGH PRESSURE PIPE R/R": false,
        "INGNITION COILS R/R": false,
        "INGNITION COIL CODE R/R": false,
        "INJECTOR NOZZLE R/R": false,
        "KIT REMOVE": false,
        "KIT SERVICE": false,
        "KIT REFITTING": false,
        "LOW PRESSURE HOSE R/R": false,
        "MAF/MAP SENSOR CLEAN": false,
        "MAP SENSOR R/R": false,
        "MIXER R/R": false,
        "O2 SENSOR CLEAN": false,
        "O2 SENSOR R/R": false,
        "OIL & OIL FILTER REPLACE": false,
        "PETROL INJECTOR R/R": false,
        "PICK UP COIL R/R": false,
        "PRESSURE GAUGE R/R": false,
        "RAIL BRACKET R/R": false,
        "REDUCER BRACKET R/R": false,
        "REDUCER R/R": false,
        "REDUCER SERVICE": false,
        "SPARK PLUG R/R": false,
        "SWITCH R/R": false,
        "TAPPET COVER PACKING REPLACE": false,
        "TAPPET SETTING": false,
        "TEMPRESURE SENSOR R/R": false,
        "THROTTLE BODY CLEANING": false,
        "TIMING ADVANCE PROCESS R/R": false,
        "VACCUM HOSE PIPE R/R": false,
        "WIRING REMOVE & REFITTING": false,
        "WIRING REPAIR": false,
        "1ST FREE SERVICE": false,
        "1ST STAGE REGULATOR ORING R/R": false,
        "1ST STAGE REGULATOR R/R": false,
        "2ND FREE SERVICE": false,
        "2ND STAGE REGUALTOR R/R": false,
        "3RD FREE SERVICE": false,
      },
      complaintCheckboxes: {
        "Low Average / Mileage": false,
        "Late Starting Problem": false,
        "Jerking / Missing / Low Pick": false,
        "Changeover - Switch / Pressure Gauge Ind": false,
        "Vehicle Not Changing over to CNG": false,
        "Vehicle Not starting in Petrol": false,
        "Engine Shutdown in Idleing mode / Return": false,
        "Less/Slow Gas Filling in Tank": false,
        "Check Engine Light on Cluster": false,
        "Petrol Consumption even when car running": false,
        "Noise after/due to CNG Kit Fittment": false,
        "Gas Leakage / Sound / Smell": false,
        "Switch Not Working(No lights on switch)": false,
        "Buzzer Noise on Switch": false,
      },
      selectedUser: null,
      selectedJobCard: 0,
      selectedVehicle: null,
      allCustAndLeads: [],
      custVehicles: [],
      basicDetailsFormRecordId : "",
      vahicleId : "",
      isLeadOrCustomer : ""
    };
  }

  componentDidMount() {
    loggedInUserDetails = getToken().data;
    this.getCustAndLeads(loggedInUserDetails);
    this.getAllJobCards(loggedInUserDetails);
    changeValuesInStore("leadForm", leadFormInitObj);
  }

  getAllJobCards = async (data) => {
    try{
      let jobCardData;
      if(data.record_type === '0122w000000cwfSAAQ'){
        jobCardData = await getData({
          query: `SELECT * FROM salesforce.contact Full OUTER JOIN salesforce.job_card__c
          ON salesforce.job_card__c.customer__c = salesforce.contact.sfid 
          WHERE salesforce.contact.assigned_dealer__c  LIKE '%${data.sfid}%' AND salesforce.job_card__c.sfid IS NOT NULL `,
          token: data.token
        });
      }
      else if(data.record_type === "0122w000000cwfNAAQ"){
        jobCardData = await getData({
          query: `SELECT * FROM salesforce.contact Full OUTER JOIN salesforce.job_card__c
          ON salesforce.job_card__c.customer__c = salesforce.contact.sfid 
          WHERE salesforce.contact.accountid  LIKE '%${data.sfid}%' AND salesforce.job_card__c.sfid IS NOT NULL`,
          token: data.token
        });
      }

      console.log("jobCardData =>", jobCardData.result)
      this.setState({ AllJobCards : jobCardData.result });

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

  getCustAndLeads = async (data) => {
    console.log("data: ", data);
    let custLeadsDataArr;
    try {
      if (isDealer()) {
        console.log("----------------Dealer---------------------------");
        const custData = await getData({
          query: `SELECT * FROM salesforce.Contact 
          WHERE Assigned_Dealer__c LIKE '%${data.sfid}%' AND RecordtypeId ='0121s0000000WE4AAM' 
          AND SFID is not null AND Name is not null AND lead_status__c = 'Closed'`,
          token: data.token,
        });

        console.log("custData => ", custData)
        custLeadsDataArr = custData.result.map((x) => {
          x.type = "customer";
          return x;
        });

        // const leadsData = await getData({
        //   query: `SELECT * from salesforce.Lead 
        //   WHERE Assigned_Dealer__c LIKE '%${data.sfid}%' AND RecordTypeId = '0122w000000chRpAAI' 
        //   AND Name is not null AND Status != 'Closed'`,
        //   token: data.token
        // });
        // leadsData.result.map((l) => {
        //   l.type = "lead";
        //   return custLeadsDataArr.push(l);
        // });
      } 
      // else {
      //   console.log("----------------Distributor---------------------------");
      //   const custData = await getData({
      //     query: `SELECT * FROM salesforce.Contact 
      //     WHERE contact.accountid LIKE '%${data.sfid}%' and RecordtypeId ='0121s0000000WE4AAM'  AND Name is not null`,
      //     token: data.token,
      //   });
      //   custLeadsDataArr = custData.result.map((x) => {
      //     x.type = "customer";
      //     return x;
      //   });

      //   const leadsData = await getData({
      //     query: `SELECT * FROM salesforce.Lead 
      //     WHERE Assigned_Distributor__c LIKE '%${data.sfid}%' AND RecordTypeId = '0122w000000chRpAAI' 
      //     AND Name is not null AND Status != 'Closed'`,
      //     token: data.token
      //   });
      // }
      console.log("custLeadsDataArr: ", custLeadsDataArr);
      this.setState({ allCustAndLeads: custLeadsDataArr });
    } catch (e) {
      console.log(e);
    }
  };

  handleJobCardStep = async (data) => {
    console.log("=================handle job card =====================");
    console.log(data);
    console.log(this.state);
    console.log("======================================");
    console.log("this.props.leadForm.vehicleNumber ====" , this.props.leadForm.vehicleNumber);

    let { gstNumber } = data;
    let { token , record_type , sfid } = loggedInUserDetails;
    let { isLeadOrCustomer } = this.state;
    let basicDetailsFormId = this.state.basicDetailsFormRecordId;
    let custSfid ;
    let vehicleID =  this.state.vahicleId;
    let vahicleSFID;
    if(!basicDetailsFormId ){
      custSfid = this.state.selectedUser.sfid
    }else{
    let queryToGetSfid = `Select sfid,name from Salesforce.contact where id=${basicDetailsFormId}`
    let sfidOfRecord = await getData({
            query : queryToGetSfid,
            token: token
          });
      console.log("SFID ====" , sfidOfRecord);
      custSfid = sfidOfRecord.result[0].sfid
    }

    if(!vehicleID ){
      vahicleSFID = this.state.selectedVehicle.sfid
    }else{
    let queryToGetSfid = `Select sfid,name from Salesforce.vehicle_detail__c where id=${vehicleID}`
    let sfidOfRecord = await getData({
            query : queryToGetSfid,
            token: token
          });
      console.log("SFID ====" , sfidOfRecord);
      vahicleSFID = sfidOfRecord.result[0].sfid
    }
      const {
        jobCardCheckboxes: jCC,
        complaintCheckboxes: cC
      } = this.state;

      let query = `INSERT INTO salesforce.job_card__c (customer__c, Vehicle_No__c, GST_Number__c,AIR_FILTER_R_R__c,BLOCK_PISTON_R_R__c,CARBURETTOR_SERVICE__c,CAR_SCANNING__c,CNG_LEAKAGE_CHECK__c,CNG_SEQ_KIT_TUNE_UP__c,CNG_TUNE_UP__c,COOLANT_REPLACE__c,CYLINDER_BRACKET_R_R__c,CYLINDER_HYDROTESTING__c,CYLINDER_REFITTING__c,CYLINDER_REMOVE__c,CYLINDER_VALVE_R_R__c,DICKY_FLOOR_REPAIR__c,ECM_BRACKET_R_R__c,ECM_R_R__c,EMULATOR_R_R__c,ENGINE_COMPRESSION_CHECK__c,ENGINE_TUNE_UP__c,FILLER_VALVE_REPAIR__c,
        FILLER_VALVE_R_R__c,FUEL_FILTER_R_R__c,FUEL_GAUGE_CORRECTOR_FITMENT__c,FUEL_PUMP_RELAY_R_R__c,FUEL_PUMP_R_R__c,GAS_FILLTER_R_R__c,GENERAL_LABOUR_CHARGES__c,GRECO_ACE_KIT_FITTING__c,GRECO_INJECTOR_R_R__c,GRECO_PRO_KIT_FITTING__c,
        HEIGHT_PAD_FITMENT__c,HIGH_PRESSURE_PIPE_R_R__c,INGNITION_COILS_R_R__c,INGNITION_COIL_CODE_R_R__c,INJECTOR_NOZZLE_R_R__c,KIT_REFITTING__c,KIT_REMOVE__c,KIT_SERVICE__c,LOW_PRESSURE_HOSE_R_R__c,MAF_MAP_SENSOR_CLEAN__c,
        MAP_SENSOR_R_R__c,MIXER_R_R__c,O2_SENSOR_CLEAN__c,O2_SENSOR_R_R__c,OIL_OIL_FILTER_REPLACE__c,PETROL_INJECTOR_R_R__c,PICK_UP_COIL_R_R__c,PRESSURE_GAUGE_R_R__c,RAIL_BRACKET_R_R__c,REDUCER_BRACKET_R_R__c,
        REDUCER_R_R__c,REDUCER_SERVICE__c,SPARK_PLUG_R_R__c,SWITCH_R_R__c,ANNUAL_MAINTAINANACE_CONTRACT__c,TAPPET_COVER_PACKING_REPLACE__c,TAPPET_SETTING__c,TEMPRESURE_SENSOR_R_R__c,THROTTLE_BODY_CLEANING__c,TIMING_ADVANCE_PROCESS_R_R__c,
        VACCUM_HOSE_PIPE_R_R__c,WIRING_REMOVE_REFITTING__c,WIRING_REPAIR__c,X1ST_FREE_SERVICE__c,X1ST_STAGE_REGULATOR_ORING_R_R__c,X1ST_STAGE_REGULATOR_R_R__c,X2ND_FREE_SERVICE__c,X2ND_STAGE_REGUALTOR_R_R__c,X3RD_FREE_SERVICE__c,
        Low_Average_Mileage__c,Late_Starting_Problem__c,Jerking_Missing_Low_Pick__c,Changeover__c,Vehicle_Not_Changing__c,Vehicle_Not_starting__c,Engine_Shutdown__c,Less_Slow_Gas__c,Check_Engine__c,Petrol_Consumption__c,Noise_after__c,Gas_Leakage__c,Switch_Not_Working_No_lights_on_switch__c,Buzzer_Noise_on_Switch__c) 
        VALUES ('${custSfid}', '${vahicleSFID}', '${gstNumber ?? ""}',
          ${jCC["AIR FILTER R/R"]},${jCC["BLOCK PISTON R/R"]},${
            jCC["CARBURETTOR SERVICE"]
          },${jCC["CAR SCANNING"]},${jCC["CNG LEAKAGE CHECK"]},${
            jCC["CNG SEQ. KIT TUNE UP"]
          },${jCC["CNG TUNE UP"]},${jCC["COOLANT REPLACE"]},${
            jCC["CYLINDER BRACKET R/R"]
          },${jCC["CYLINDER HYDROTESTING"]},
            ${jCC["CYLINDER REFITTING"]},${jCC["CYLINDER REMOVE"]},${
            jCC["CYLINDER VALVE R/R"]
          },${jCC["DICKY FLOOR REPAIR"]},${jCC["ECM BRACKET R/R"]},${
            jCC["ECM R/R"]
          },${jCC["EMULATOR R/R"]},${jCC["ENGINE COMPRESSION CHECK"]},${
            jCC["ENGINE TUNE UP"]
          },${jCC["FILLER VALVE REPAIR"]},
            ${jCC["FILLER VALVE R/R"]},${jCC["FUEL FILTER R/R"]},${
            jCC["FUEL GAUGE CORRECTOR FITMENT"]
          },${jCC["FUEL PUMP RELAY R/R"]},${jCC["FUEL PUMP R/R"]},${
            jCC["GAS FILLTER R/R"]
          },${jCC["GENERAL LABOUR CHARGES"]},${jCC["GRECO ACE KIT FITTING"]},${
            jCC["GRECO INJECTOR R/R"]
          },${jCC["GRECO PRO KIT FITTING"]},
            ${jCC["HEIGHT PAD FITMENT"]},${jCC["HIGH PRESSURE PIPE R/R"]},${
            jCC["INGNITION COILS R/R"]
          },${jCC["INGNITION COIL CODE R/R"]},${jCC["INJECTOR NOZZLE R/R"]},${
            jCC["KIT REFITTING"]
          },${jCC["KIT REMOVE"]},${jCC["KIT SERVICE"]},${
            jCC["LOW PRESSURE HOSE R/R"]
          },${jCC["MAF/MAP SENSOR CLEAN"]},
    
            ${jCC["MAP SENSOR R/R"]},${jCC["MIXER R/R"]},${
            jCC["O2 SENSOR CLEAN"]
          },${jCC["O2 SENSOR R/R"]},${jCC["OIL & OIL FILTER REPLACE"]},${
            jCC["PETROL INJECTOR R/R"]
          },${jCC["PICK UP COIL R/R"]},${jCC["PRESSURE GAUGE R/R"]},${
            jCC["RAIL BRACKET R/R"]
          },${jCC["REDUCER BRACKET R/R"]},
    
            ${jCC["REDUCER R/R"]},${jCC["REDUCER SERVICE"]},${
            jCC["SPARK PLUG R/R"]
          },${jCC["SWITCH R/R"]},${jCC["ANNUAL MAINTAINANACE CONTRACT"]},${
            jCC["TAPPET COVER PACKING REPLACE"]
          },${jCC["TAPPET SETTING"]},${jCC["TEMPRESURE SENSOR R/R"]},${
            jCC["THROTTLE BODY CLEANING"]
          },${jCC["TIMING ADVANCE PROCESS R/R"]},
    
            ${jCC["VACCUM HOSE PIPE R/R"]},${jCC["WIRING REMOVE & REFITTING"]},${
            jCC["WIRING REPAIR"]
          },${jCC["1ST FREE SERVICE"]},${jCC["1ST STAGE REGULATOR ORING R/R"]},${
            jCC["1ST STAGE REGULATOR R/R"]
          },${jCC["2ND FREE SERVICE"]},${jCC["2ND STAGE REGUALTOR R/R"]},${
            jCC["3RD FREE SERVICE"]
          },
    
            ${cC["Low Average / Mileage"]}, ${cC["Late Starting Problem"]}, ${
            cC["Jerking / Missing / Low Pick"]
          }, ${cC["Changeover - Switch / Pressure Gauge Ind"]}, ${
            cC["Vehicle Not Changing over to CNG"]
          }, ${cC["Vehicle Not starting in Petrol"]}, ${
            cC["Engine Shutdown in Idleing mode / Return"]
          }, ${cC["Less/Slow Gas Filling in Tank"]}, ${
            cC["Check Engine Light on Cluster"]
          }, ${cC["Petrol Consumption even when car running"]}, ${
            cC["Noise after/due to CNG Kit Fittment"]
          }, ${cC["Gas Leakage / Sound / Smell"]}, ${
            cC["Switch Not Working(No lights on switch)"]
          }, ${cC["Buzzer Noise on Switch"]}    
          ) RETURNING ID
        `
        let addJobCardRes = await getData({
          query ,
          token: token
        })
        console.log("#######################################################");
        console.log(addJobCardRes.result[0].id);
        console.log("#######################################################");

        if(addJobCardRes.status == 200 && addJobCardRes.result){
          // this.handleCloseAddJobCard()
          // this.setState({ selectedJobCard: Number(addJobCardRes.result[0].id)})
          const jobCardDetails = await this.getJobCardDetails(Number(addJobCardRes.result[0].id));
          this.setState({ selectedJobCard: jobCardDetails, activeStep: this.state.activeStep + 1})
        }

  };

  handleToggle = (type: string) => (event, isInputChecked) => {
    let fieldName = event.target.name;
    let jobCardCheckboxes = this.state[type];
    jobCardCheckboxes[fieldName] = isInputChecked;
    const jobCardCheckboxesChanged = !this.state.jobCardCheckboxesChanged;
    const obj = {
      jobCardCheckboxesChanged,
      [type]: jobCardCheckboxes,
    };
    this.setState(obj);
  };

  formatDate = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  getJobCardDetails = async(id) => {
    console.log("job Card Id : ", id);
    try{
      const jobCardData = await getData({
        query: `SELECT gst_number__c, name FROM salesforce.job_card__c WHERE id = ${id}`,
        token: loggedInUserDetails.token
      })
      console.log("jobCardData =>", jobCardData.result);
      return jobCardData.result[0];
    }
    catch(e){
      console.log(e);
    }
  };

  handleBasicDetailsFormSubmit = async (obj : any) => {
   this.setState({ basicDetailsFormRecordId : "" });
  
    let {
      chassis,city, taluka, district, rtoCode, dailyRunning, email, firstName, fuelType, gstNumber, lastName, leadSource, 
      leadStatus,leadType,subLeadType,mfg, middleName, rating, registration, state, street, subLeadSource, usage, 
      vehicleMek, vehicleModel, vehicleNumber , vehicleType, whatsAppNumber, wheeles, kitEnquired, zip
    } = obj;

    let { token , record_type , sfid } = loggedInUserDetails;
    const UniqueId = new Date();

    if(isDealer()){
        if(!this.state.selectedUser){
          // alert("dealer selected no option from dropdown");
          let queryToGetAssignedDist = `select Assigned_distributor__c from salesforce.account where sfid like '%${sfid}%'`;
          let assignedDistRes = await getData({
            query : queryToGetAssignedDist,
            token: token
          });
          let assignedDist = assignedDistRes.result[0].assigned_distributor__c;

          console.log(assignedDist);
          let query = `INSERT INTO salesforce.Contact (appc_id__c, FirstName, MiddleName, LastName, Company__c, Email,Whatsapp_number__c,Lead_Type__c,lead_sub_type__c,Lead_Source__c,Lead_Status__c,Sub_Lead_Source__c,Lead_Rating__c,MailingStreet,MailingCity, Taluka__c, District__c,MailingState,RTO_Code__c,MailingPostalCode,accountid,RecordTypeId,Assigned_Dealer__c)
          values('${UniqueId ?? ""}', '${firstName ?? ""}', '${middleName ?? ""}', '${lastName ?? ""}' , 'nullCompany', '${email ?? ""}' , ${whatsAppNumber} , '${leadType ?? ""}' , '${subLeadType ?? ""}', '${leadSource ?? ""}' , 'Closed' , '${subLeadSource ?? ""}' ,'${rating ?? ""}','${street ?? ""}','${city ?? ""}','${taluka ?? ""}','${district ?? ""}','${state ?? ""}','${rtoCode ?? ""}',${zip ?? 0},'${assignedDist}', '0121s0000000WE4AAM' , '${sfid}') Returning Id`;    
          try {
            let res;
            res = await getData({
            query: query,
            token: token
          });
          console.log(">>>>>>>>>>> Basic Details Insert Result >>>>>>>>>>>>>>>>>>>>>>>");
          console.log(res);
          console.log(">>>>>>>>>>>End Basic Details Insert Result >>>>>>>>>>>>>>>>>>>>>>>");
            if(res.status === 200 && res.result){
              // alert("Successfully added record");
              this.setState({
                activeStep: this.state.activeStep + 1,
                basicDetailsFormRecordId : res.result[0].id,
                isLeadOrCustomer : "leads"
              })
            }
            // else { alert("failed to add as dealer");  }
            }
          catch(err) {
              console.log(err);
          }

          //insert vehicle
          const insertVehicle = await getData({
            query: `INSERT INTO salesforce.vehicle_detail__c 
              (Customer__r__appc_id__c, name, fuel_type__c, x3_or_4_wheeler__c, kit_enquiry__c, vehicle_make__c, vehicle_model__c, usage_of_vehicle__c, daily_running_kms__c, registration_date__c, year_of_manufacturing__c)
              values('${UniqueId ?? ""}', '${vehicleNumber ?? ""}', '${fuelType ?? ""}', '${wheeles ?? ""}', '${kitEnquired ?? ""}', '${vehicleMek ?? ""}', '${vehicleModel ?? ""}', '${usage ?? ""}', ${dailyRunning}, '${registration ?? ""}', ${mfg})
              RETURNING Id`,
            token: token
          });
          console.log("insertVehicle : ", insertVehicle);
          this.setState({ vahicleId: insertVehicle.result[0].id })
        }
        else {
          // alert("dealer selected option from dropdown");
          let { selectedUser } = this.state;
          let { sfid , type } = selectedUser;
          console.log(type);
          if(type === "customer"){
            // alert("And selected customer");
            let updateQuery = `update salesforce.Contact set FirstName='${firstName ?? ""}', MiddleName='${middleName ?? ""}', LastName='${lastName ?? ""}', Company__c = 'nullCompany', RTO_Code__c='${rtoCode ?? ""}',Email='${email ?? ""}',Whatsapp_number__c=${whatsAppNumber},Lead_Type__c='${leadType ?? ""}',lead_sub_type__c='${subLeadType ?? ""}',Lead_Source__c='${leadSource ?? ""}',Lead_Status__c='${leadStatus ?? ""}',Sub_Lead_Source__c ='${subLeadSource ?? ""}'  ,Lead_Rating__c='${rating ?? ""}',  MailingStreet='${street ?? ""}',  MailingCity='${city ?? ""}', MailingState='${state ?? ""}', MailingPostalCode =${zip}, Taluka__c='${taluka ?? ""}', district__c='${district}'  where sfid like '${sfid}' Returning Id`;
            try {
              let res;
              res = await getData({
              query: updateQuery,
              token: token
            });
            console.log(res);
            if(res.status === 200 && res.result){
              // alert("Successfully updated record");
              this.setState({
                selectedUser : obj,
                activeStep: this.state.activeStep + 1,
                basicDetailsFormRecordId : res.result[0].id,
                isLeadOrCustomer : "customers"
              })
            }
            if(!this.state.selectedVehicle){
              //insert vehicle
              const insertVehicle = await getData({
                query: `INSERT into salesforce.vehicle_detail__c 
                  (customer__c, name, fuel_type__c, x3_or_4_wheeler__c, kit_enquiry__c, vehicle_make__c, vehicle_model__c, usage_of_vehicle__c, daily_running_kms__c, registration_date__c, year_of_manufacturing__c)
                  values('${sfid}', '${vehicleNumber ?? ""}', '${fuelType ?? ""}', '${wheeles ?? ""}', '${kitEnquired ?? ""}', '${vehicleMek ?? ""}', '${vehicleModel ?? ""}', '${usage ?? ""}', ${dailyRunning}, '${registration ?? ""}', ${mfg})
                  RETURNING Id`,
                token: token
              });
              console.log("insertVehicle : ", insertVehicle);
              this.setState({ vahicleId: insertVehicle.result[0].id })
            }else{
              const vehicleSFID = this.state.selectedVehicle.sfid;

              const updateVehicle = await getData({
                query: `UPDATE salesforce.vehicle_detail__c SET
                  name='${vehicleNumber ?? ""}', Fuel_Type__c='${fuelType ?? ""}', X3_or_4_Wheeler__c='${wheeles ?? ""}', kit_enquiry__c = '${kitEnquired ?? ""}', Vehicle_Make__c='${vehicleMek ?? ""}', Vehicle_Model__c='${vehicleModel ?? ""}', Usage_of_Vehicle__c='${usage ?? ""}', Daily_Running_Kms__c=${dailyRunning},registration_date__c='${registration ?? ""}',Year_of_Manufacturing__c=${mfg}
                  where sfid like '${vehicleSFID}'`,
                token: token
              });
              console.log("updateVehicle : ", updateVehicle);
            }
            }
            catch(err) {
              console.log(err);
            }
          }
          else {
              // alert("And selected lead");
             let updateQuery = `update salesforce.Lead set FirstName='${firstName ?? ""}', MiddleName='${middleName ?? ""}', LastName='${lastName ?? ""}', Company= 'nullCompany', RTO_Code__c='${rtoCode ?? ""}',Email='${email ?? ""}',Whatsapp_number__c=${whatsAppNumber},Lead_Type__c='${leadType ?? ""}',lead_sub_type__c='${subLeadType ?? ""}',LeadSource='${leadSource ?? ""}',Status='${leadStatus ?? ""}',Sub_Lead_Source__c='${subLeadSource ?? ""}' ,Rating='${rating ?? ""}',  Street='${street ?? ""}',  City='${city ?? ""}' ,State='${state ?? ""}' ,Country='${country ?? ""}',PostalCode=${zip}, Vehicle_no__c='${vehicleNumber ?? ""}',Fuel_Type__c='${fuelType ?? ""}',X3_or_4_Wheeler__c='${wheeles ?? ""}', kit_enquiry__c = '${kitEnquired ?? ""}',Vehicle_Make__c='${vehicleMek ?? ""}', Vehicle_Model__c='${vehicleModel ?? ""}',Usage_of_Vehicle__c='${usage ?? ""}',Engine__c='${vehicleType ?? ""}', Daily_Running_Kms__c=${dailyRunning},Registration_Year__c='${registration ?? ""}',Year_of_Manufacturing__c=${mfg},Chassis_No__c='${chassis ?? ""}',  GST_Number__c ='${gstNumber ?? ""}' where sfid like '${sfid}' Returning Id`;
              try {
                let res;
                res = await getData({
                query : updateQuery,
                token: token
              });
              console.log(res);
              if(res.status === 200 && res.result){
                // alert("Successfully updated record");
                this.setState({
                  selectedUser : obj,
                  activeStep: this.state.activeStep + 1,
                  basicDetailsFormRecordId : res.result[0].id,
                  isLeadOrCustomer : "leads",
                })
              }
              // else { alert("failed to update lead as dealer");  }
           }
           catch(err) {
            //  alert("something went wrong");
             console.log(err);
           }
          }
        }
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
            options={leadSourceForJobCard}
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
          {this.state.selectedUser && 
            <div>
              {/* <Select
                className="menu-outer-top"
                classNamePrefix="r-select-pre"
                placeholder="Select Vehicle"
                // focusOnClose="true"
                // layout="fixed"
                scrollLock="true"
                options={this.state.custVehicles && this.state.custVehicles.map((v) => ({
                  label: v.vehicle_model__c,
                  value: v.sfid,
                  obj: v
                }))}
                onChange={this.vehicleChange}
              /> */}
              <Grid item className="modal-margin" xs={12} md={12}>
                <FormControl variant="outlined" className="form-control">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Search Vehicle
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Vehicle"
                    onChange={(e) => this.vehicleChange({obj : e.target.value})}
                    variant="outlined"
                    className="form-input"
                  >
                    {this.state.custVehicles.map(cust => {
                      return( <MenuItem value={cust}>{cust.name}</MenuItem> )
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </div>
          }
          {this.state.selectedUser && 
            <div style={{textAlign: 'center', fontWeight: 'bold', marginTop: "-13px"}} >OR</div>
          }
          <FormComponent
            // onSubmit={(v: any) => {
            //   alert("hello");
            //   // this.setState({
            //   //   activeStep: this.state.activeStep + 1,
            //   // });
            //   console.log(">> v", v);

            // }}
            onSubmit = { this.handleBasicDetailsFormSubmit }
            formModel="leadForm"
            hasSubmit={true}
            options={vehicleInputs}
            submitTitle="Next"
            allFormOptions={[
              ...options,
              ...vehicleInputs,
              ...streetInputs,
              ...leadSourceForJobCard,
            ]}
            cancelTitle="Close"
            onCancel={() => this.handleCloseAddJobCard()}
          />
        </React.Fragment>
      </div>
    );
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
              {Object.keys(this.state.complaintCheckboxes).map((key, value) => {
                const isChecked = this.state.jobCardCheckboxesChanged[key];
                return (
                  <React.Fragment>
                    <Grid className="checkbox-container"
                    item
                    xs={6}
                    md={6}
                    lg={6}
                    sm={6}> 
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", }} >
                        {/* <div className="label-text" >{key}</div> */}
                        <div>
                          <Checkbox 
                            color="primary" 
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            style={{ width: '10px', height: '10px'}}
                            onChange={this.handleToggle('complaintCheckboxes')} 
                            key={key} 
                            name={key} 
                            // value={isChecked}
                            // {...this.state.id && { checked: isChecked }}
                          /> 
                          {key}
                        </div>
                      </div>
                    </Grid>
                    <Grid></Grid>
                  </React.Fragment>
                );
              })}
            </Grid>
          </div>
        }
        <div>
          <SubFormHeading>Job Card</SubFormHeading>
          <Grid container>
            {Object.keys(this.state.jobCardCheckboxes).map((key, value) => {
              const isChecked = this.state.jobCardCheckboxesChanged[key];
              return (
                <React.Fragment>
                  <Grid key={key} className="checkbox-container" item xs={6} md={6} lg={6} sm={6}>
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
                          style={{ width: '10px', height: '10px'}}
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          onChange={this.handleToggle("jobCardCheckboxes")}
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
          onSubmit={(v: any) => {
            console.log(">> v", v);
            // this.handleJobCardDealerInsert();
            this.handleJobCardStep(this.props.leadForm);
          }}
          onCancel={() => this.handleCloseAddJobCard()}
          formModel="leadForm"
          hasSubmit={true}
          submitTitle="Save"
          options={[]}
        />
      </div>
    );
  };

  renderStepper = () => {
    return (
      <Stepper
        activeStep={this.state.activeStep}
        onChangeStep={(x) => this.setState({ activeStep: x })}
        stepData={[
          {
            label: "Basic Details",
            disable: false,
            component: this.renderForm(),
          },
         
          {
            label: "Job Card",
            disable: this.state.activeStep === 1 ? false  : true,
            component: this.renderJobCard(),
          },

          {
            label: "Invoice",
            disable: this.state.activeStep === 2 ? false  : true,
            component: <RenderNegotitationComp 
                          selectedUser={this.state.selectedUser}
                          selectedJobCard={this.state.selectedJobCard}
                          handleCloseAddJobCard={this.handleCloseAddJobCard} 
                          previous={() => this.setState({activeStep : this.state.activeStep - 1})}/>
          },
        ]}
      />
    );
  };

  dealerChange = ({ obj }) => {
    console.log(obj);
    const rtoCodesArr = obj.rto_code__c && obj.rto_code__c.split(',') || [];
    const newData = {
      email: obj.email,
      firstName: obj.firstname,
      lastName: obj.lastname,
      middleName: obj.middlename,
      rtoCode: rtoCodesArr,
      // company: obj.company && obj.company !== "nullCompany" ? obj.company : obj.company__c && obj.company__c !== "nullCompany" ? obj.company__c : "",
      whatsAppNumber: obj.whatsapp_number__c,
      leadType: obj.lead_type__c,
      subLeadType: obj.lead_sub_type__c ?? obj.sub_lead_type__c,
      leadSource: obj.leadsource ?? obj.lead_source__c,
      leadStatus: obj.status ?? obj.lead_status__c,
      subLeadSource: obj.sub_lead_source__c,
      rating: obj.rating ?? obj.lead_rating__c,
      street: obj.street ?? obj.mailingstreet,
      city: obj.city ?? obj.mailingcity,
      state: obj.state ?? obj.mailingstate,
      zip: obj.postalcode ?? obj.mailingpostalcode,
      taluka: obj.taluka__c ?? "",
      district: obj.district__c ?? "",
      country: obj.country ?? obj.mailingcountry,
      vehicleNumber: "",
      fuelType: "",
      wheeles: "",
      kitEnquired: "",
      vehicleMek: "",
      vehicleModel: "",
      usage: "",
      vehicleType: "",
      dailyRunning: "",
      registration: "",
      mfg: "",
      chassis: "",
      gstNumber: "",
    };
      // DEFAULT VALUES
      // if(!newData.registration){
      //   newData.registration = this.formatDate();
      // }
      for(let key in newData){
          if(!newData[key]){
              if(key === "whatsAppNumber" || key === "zip" || key === "dailyRunning" || key === "mfg"){
                newData[key] = 0;
              }
              else if(key === "email"){
                newData[key] = "abc@gmail.com"
              }
              else {
                newData[key] = "";
              }
          }
      }
    // END DEFAULT VALUES
  
    changeValuesInStore("leadForm", newData);
   
    this.setState({ selectedUser: obj });
    this.getCustomerVehicles(loggedInUserDetails, obj.sfid);
  };

  vehicleChange = ({ obj }) => {
    console.log(obj)
    const leadData = this.props.leadForm;
    console.log(leadData)
    const newData = {
      email: leadData.email,
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      middleName: leadData.middleName,
      rtoCode: leadData.rtoCode,
      // company: leadData.company === "nullCompany" ? "" : leadData.company,
      whatsAppNumber: leadData.whatsAppNumber,
      leadType: leadData.leadType,
      subLeadType: leadData.subLeadType,
      leadSource: leadData.leadSource,
      leadStatus: leadData.leadStatus,
      subLeadSource: leadData.subLeadSource,
      rating: leadData.rating,
      street: leadData.street,
      city: leadData.city,
      state: leadData.state,
      zip: leadData.zip,
      taluka: leadData.taluka,
      district: leadData.district,
      country: leadData.country,
      vehicleNumber: obj.name,
      fuelType: obj.fuel_type__c,
      wheeles: obj.x3_or_4_wheeler__c,
      kitEnquired: obj.kit_enquiry__c,
      vehicleMek: obj.vehicle_make__c,
      vehicleModel: obj.vehicle_model__c,
      usage: obj.usage_of_vehicle__c,
      vehicleType: obj.engine_type__c,
      dailyRunning: obj.daily_running_kms__c,
      registration: this.formatDate(obj.registration_date__c),
      mfg: obj.year_of_manufacturing__c
    };
    //  DEFAULT VALUES
      if(newData.registration){
        newData.registration = this.formatDate(new Date());
        console.log("registration" , newData.registration)
      }
      for(let key in newData){
        if(!newData[key]){
            if(key === "whatsAppNumber" || key === "zip" || key === "dailyRunning" || key === "mfg"){
              newData[key] = 0;
            }
            else if(key === "email"){
              newData[key] = "abc@gmail.com"
            }
            else {
              newData[key] = "";
            }
        }
    }
    // END DEFAULT VALUES
    changeValuesInStore("leadForm", newData);
  };

  handleCloseAddJobCard = () => {
    const newData = {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      // company: "",
      rtoCode: "",
      whatsAppNumber: "",
      leadType: "",
      subLeadType: "",
      leadSource: "",
      leadStatus: "",
      subLeadSource: "",
      rating: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      vehicleNumber: "",
      fuelType: "",
      wheeles: "",
      kitEnquired: "",
      vehicleMek: "",
      vehicleModel: "",
      usage: "",
      vehicleType: "",
      dailyRunning: "",
      registration: "",
      mfg: "",
      chassis: "",
      gstNumber: "",
    };
    changeValuesInStore("leadForm", newData);
    this.setState({ OpenAddJobCard : false });
  }

  handleJobCardDetails = (data) => {
    this.props.history.push(`/job-card-details/${data.sfid}`)
  };

  public tabData = () => [
    {
      tabName: "Details",
      component: this.renderStepper(),
      onTabSelect: (tabName: any) => this.setState({ activeTab: tabName }),
    },
    // {
    //   tabName: "Activity",
    //   component: this.renderActivitySection(),
    //   onTabSelect: (tabName: any) => this.setState({ activeTab: tabName }),
    // },
  ];
  
  render() {
    const jobcards = this.state.AllJobCards ? this.state.AllJobCards.sort((a, b) => new Date(b.createddate) - new Date(a.createddate)) : null;
    
    return (
      <AppBar>
        <div 
          // className="card-container no-hover add-leads-page"
          // style={{ paddingBottom: 500 }}
        >
          {!this.state.OpenAddJobCard && (
            <div className="card-container no-hover add-leads-page">
              <GSelect
                // className="r-select"
                // classNamePrefix="r-select-pre"
                placeholder="Select Customer"
                options={this.state.allCustAndLeads.map((p) => ({
                  label: p.name,
                  value: p.sfid,
                  obj: p,
                }))}
                // onChange={() => console.log("ONcnshudhncbushbd")}
                handleChange={this.dealerChange}
              />
            </div>
          )}
          <Grid container>
          {!this.state.OpenAddJobCard && (
              jobcards && jobcards.map(cust => {
              return (
                <Grid item xs={12} md={6}>
                  <JobCardsList
                    onClickDetails={this.handleJobCardDetails}
                    jobCardData={cust}
                  />
                </Grid>
              )})
            )}
          </Grid>
          {this.state.OpenAddJobCard && (
            <div className="">
              <Tabs tabsData={this.tabData()} />
              {/* {this.renderStepper()} */}
            </div>
          )}
        </div>
        {!this.state.OpenAddJobCard && (
          <span
            onClick={() => this.setState({ OpenAddJobCard: true })}
            style={{ position: "absolute", right: 20, bottom: 20 }}
          >
            <Fab color="secondary" aria-labelledby="add-ticket">
              <Add />
            </Fab>
          </span>
        )}
      </AppBar>
    );
  }
}
export function mapStateToProps(state) {
  const { leadForm } = state.rxFormReducer;
  return { leadForm };
}
export const AddNewJobCard = connect<{}, {}, IAddNewJobCardProps>(
  mapStateToProps
)(AddNewJobCardImpl);

const SubFormHeading = (props: any) => (
  <div style={props.style} className="sub-form-heading">
    {props.children}
  </div>
);

export const JobCardsList = (props: any) => {
  const { jobCardData } = props;
  return (
    <div className="card-container" >
      <Grid container > 
        <Grid item className="padding-6-corners" xs={6} md={6} >
          <PersonPin /> <span style={{ padding: "5px" }} />
          <div style={{marginTop: '-25px', marginLeft: '25px'}}>
            {jobCardData.firstname} {jobCardData.lastname}
          </div>
        </Grid>
        <Grid className="padding-6-corners" item xs={6} md={6}>
          <Phone /> <span style={{ padding: "5px" }} />
          <div style={{marginTop: '-25px', marginLeft: '25px'}}>
            {jobCardData.whatsapp_number__c && ChangePhoneFormat(jobCardData.whatsapp_number__c)}
          </div>
        </Grid>
      </Grid>
      { !isDealer() ?
      <Grid container >
        <Grid className="padding-6-corners" item xs={6} md={6}>
          <span className="description-text"> Dealer Name:</span>
          {jobCardData.dealername__c}
        </Grid>
        <Grid className="padding-6-corners" item xs={6} md={6}>
          <span className="description-text"> Dealer Code:</span>
          {jobCardData.dealer_code__c}
        </Grid>
      </Grid>
      : null}
      <Grid container >
        <Grid className="padding-6-corners" item xs={6} md={6}>
          <span className="description-text"> Jobcard No:</span>
          {jobCardData.jcname__c}
        </Grid>
        <Grid className="padding-6-corners" item xs={6} md={6}>
          <span className="description-text"> Date:</span>
          {moment(jobCardData.createddate).format("DD/MM/YYYY")}
        </Grid>
      </Grid>
      <Grid container >
        <Grid className="padding-6-corners" item xs={7} md={7}>
          <span className="description-text">Jobcard Type:</span>
          {jobCardData.sub_lead_type__c}
        </Grid>
        {/* <Grid className="padding-6-corners" item xs={2} md={2}>
        </Grid> */}
        <Grid className="padding-6-corners" item xs={6} md={6}> 
        <span onClick={() => props.onClickDetails(jobCardData)} className="view">
          View Details
        </span>
        </Grid>
      </Grid>
    </div>
  )
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

export const InvoiceProposal = (props: any) => {
  console.log("InvoiceProps", props);
  const { userDetails, jobCardDetails } = props;
  return (
    // <PDFViewer>
      <Document >
        <Page size="A4">
          <View style={{ display: "table", width: "auto",margin: "15px", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 }}>
            <View style={styles.tableRow}> 
              <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
                <View style={{ marginTop: "5px", textAlign: 'center'}}>
                  <Text style={{fontSize: 17, fontWeight: 'extrabold' }}>GRECOKITS FUEL SOLUTIONS</Text>
                </View>
                <View style={{ textAlign: 'center' }}>
                  <Text style={{fontSize: 11 }}>Plot No. 151, Brick Factory Compound, Shastri Nagar, </Text>
                  <Text style={{fontSize: 11 }}>Mulund colony, Mulund (West) Mumbai - 400802 </Text>
                  <Text style={{fontSize: 11 }}>Tel: +91-22-25677775, M-7718801122, FAX: +91-22-25900903</Text>
                </View>
                <View style={{ margin: "2px", flexDirection: 'row', marginBottom: "5px", marginTop: '5px'  }}>
                  <Text style={{fontSize: 10, fontWeight: 900, width: '35%'}}> ISO 9001</Text>
                  <Text style={{fontSize: 10, fontWeight: 'bold', width: '45%'}}> STATE- MAHARASHTRA, STATE CODE-27 </Text>
                  <Text style={{fontSize: 10, fontWeight: 'ultrabold', width: '20%'}}> GSTIN:27AAHFG9723D1ZD </Text>
                </View>
              </View>
            </View>
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <View style={{ margin: "5px", textAlign: 'center'}}>
                <Text style={{fontSize: 17 }}>Tax Invoice</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={{width: "40%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
                <Text style={{ fontSize: 10, margin: "2px"}}> Customer Details :</Text> 
                <Text style={{ fontSize: 10, margin: "2px"}}>  </Text> 
                <Text style={{ fontSize: 10, margin: "2px"}}> {userDetails.firstName +" "+ userDetails.middleName +" "+ userDetails.lastName} </Text> 
                <Text style={{ fontSize: 10, margin: "2px"}}> {userDetails.whatsAppNumber} </Text> 
                <View style={{margin: "2px", flexDirection: 'row', marginBottom: "2px"}} >
                  <Text style={{ fontSize: 8, margin: "2px", width: "50%"}}> State: Maharashtra </Text> 
                  <Text style={{ fontSize: 10, margin: "2px", width: "50%"}}> GSTN: {jobCardDetails.gst_number__c}</Text> 
                </View>
              </View>
              <View style={{width: "35%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
                <Text style={{ fontSize: 10, margin: "2px"}}> Consignee Address </Text> 
                <Text style={{ fontSize: 10, margin: "2px"}}>  </Text> 
                <Text style={{ fontSize: 10, margin: "2px"}}>  </Text> 
                <Text style={{ fontSize: 10, margin: "2px"}}>  </Text> 
                <View style={{margin: "2px", flexDirection: 'row', marginBottom: "2px"}} >
                  <Text style={{ fontSize: 9, margin: "2px", width: "50%"}}> Place of Supply </Text> 
                  <Text style={{ fontSize: 8, margin: "2px", width: "50%"}}> MAHARASHTRA </Text> 
                </View>
              </View>
              <View style={{width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
                <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}> 
                  <Text style={{ fontSize: 10, margin: "2px"}}> Invoice No </Text> 
                </View>
                <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}> 
                  <Text style={{ fontSize: 10, margin: "5px"}}> </Text> 
                </View>
                <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <Text style={{ fontSize: 10, margin: "20px"}}> Date </Text> 
                </View>
              </View>
            </View>
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
              <View style={styles.tableRow}>
                <View style={{width: "30%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> Veh. Regn. No. : {userDetails.vehicleNumber}</Text> 
                  </View>
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> Veh. Chassis No. :</Text> 
                  </View>
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> Veh. Engine. No. :</Text> 
                  </View>
                </View>
                <View style={{width: "30%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> Job No. : {jobCardDetails && jobCardDetails.name}</Text> 
                  </View>
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> Veh. Model : {userDetails.vehicleModel}</Text> 
                  </View>
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> Veh. KM : {userDetails.dailyRunning}</Text> 
                  </View>
                </View>
                <View style={{width: "40%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> Service Type : {userDetails.lead_sub_type__c}</Text> 
                  </View>
                </View>
              </View>
            </View>
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <View style={styles.tableRow}>
                <View style={{width: "30%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth:0, borderRightWidth: 0, borderTopWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: '5px'}} > Vap No. </Text>
                  </View>
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth:0, borderRightWidth: 0,  borderTopWidth: 0, borderBottomWidth: 0}}> 
                    <View style={styles.tableRow}>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
                          <Text style={{ fontSize: 10, margin: '2px',  paddingBottom: 10, paddingTop: 10, textAlign: "left"}} > SNo. </Text>  
                        </View>
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                          <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 1 </Text>
                          <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 2 </Text>
                        </View>
                      </View>
                      <View style={{width: "83%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                        <View style={{margin: "2px", flexDirection: 'row', marginBottom: "2px"}} >
                          <Text style={{ fontSize: 9, margin: "2px", width: "50%", padding: 4}}> part Code </Text> 
                          <Text style={{ fontSize: 10, margin: "2px", width: "50%", padding: 4}}> Discription </Text> 
                        </View>
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                          <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text>
                          <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{width: "70%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: '5px'}} > Tank. No. </Text>
                  </View>
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0}}> 
                    <View style={styles.tableRow}> 
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > HSN/ SAC </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > QTY </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > RATE </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Disc Amt </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 9, margin: '2px', padding: 1}} > Taxable Value </Text>
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0}}> 
                          <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > CGST </Text>
                        </View>
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                          <View style={styles.tableRow}> 
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Rate </Text>
                            </View>
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Amt </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0}}> 
                          <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > SGST </Text>
                        </View>
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                          <View style={styles.tableRow}> 
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Rate </Text>
                            </View>
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Amt </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{width: "16%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Item Total </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                    <View style={styles.tableRow}> 
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 1234 </Text>
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 1234 </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 1.00 </Text>
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 1.00 </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text>
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 0.00 </Text>
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 0.00 </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text>
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text>
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                          <View style={styles.tableRow}> 
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 14.00 </Text>
                              <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 9.00 </Text>
                            </View>
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text>
                              <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text> 
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                          <View style={styles.tableRow}> 
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 14.00 </Text>
                              <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > 9.00 </Text> 
                            </View>
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text>
                              <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text> 
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{width: "16%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text>
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text> 
                      </View>
                    </View>
                  </View>    
                </View>
              </View>
            </View>
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <View style={styles.tableRow}>
                <View style={{width: "30%", borderStyle: "solid", borderWidth: 1, borderLeftWidth:0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth:0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                  </View>
                </View>
                <View style={{width: "70%", borderStyle: "solid", borderWidth: 1, borderLeftWidth:0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                    <View style={styles.tableRow}> 
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} > 2.00 </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} > 0.00 </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text> 
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text> 
                      </View>
                      <View style={{width: "16%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text> 
                      </View>
                    </View>
                  </View>  
                </View>
              </View>
            </View>
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <View style={styles.tableRow}>
                <View style={{width: "30%", borderStyle: "solid", borderWidth: 1, borderLeftWidth:0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth:0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                    <View style={styles.tableRow}>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
                          <Text style={{ fontSize: 10, margin: '2px', paddingBottom: 10, paddingTop: 10, textAlign: "left"}} > SNo. </Text>  
                        </View>
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                          <Text style={{ fontSize: 10, margin: '2px', padding: 8}} > 3 </Text>
                        </View>
                      </View>
                      <View style={{width: "83%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                        <View style={{margin: "2px", flexDirection: 'row', marginBottom: "2px"}} >
                          <Text style={{ fontSize: 9, margin: "2px", width: "50%", padding: 4}}> part Code </Text> 
                          <Text style={{ fontSize: 10, margin: "2px", width: "50%", padding: 4}}> Discription </Text> 
                        </View>
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                          <Text style={{ fontSize: 10, margin: '2px', padding: 3}} >  </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{width: "70%", borderStyle: "solid", borderWidth: 1, borderLeftWidth:0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0}}> 
                    <View style={styles.tableRow}> 
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 3}} > HSN/ SAC </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > QTY </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > RATE </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Disc Amt </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 9, margin: '2px', padding: 1}} > Taxable Value </Text>
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0}}> 
                          <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > CGST </Text>
                        </View>
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                          <View style={styles.tableRow}> 
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Rate </Text>
                            </View>
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Amt </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0}}> 
                          <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > SGST </Text>
                        </View>
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                          <View style={styles.tableRow}> 
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Rate </Text>
                            </View>
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Amt </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{width: "16%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px', padding: 1}} > Item Total </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                    <View style={styles.tableRow}> 
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} > 1234 </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} > 1.00 </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} > 0.00 </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                          <View style={styles.tableRow}> 
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px', padding: 8}} > 9.00 </Text>
                            </View>
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                          <View style={styles.tableRow}> 
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px',  padding: 8}} > 9.00 </Text> 
                            </View>
                            <View style={{width: "50%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                              <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{width: "16%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                      </View>
                    </View>
                  </View>    
                </View>
              </View>
            </View>
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <View style={styles.tableRow}>
                <View style={{width: "30%", borderStyle: "solid", borderWidth: 1, borderLeftWidth:0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth:0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                  </View>
                </View>
                <View style={{width: "70%", borderStyle: "solid", borderWidth: 1, borderLeftWidth:0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}> 
                    <View style={styles.tableRow}> 
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} > 1.00 </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} > 0.00 </Text>
                      </View>
                      <View style={{width: "10%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text>
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text> 
                      </View>
                      <View style={{width: "17%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text> 
                      </View>
                      <View style={{width: "16%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                        <Text style={{ fontSize: 10, margin: '2px'}} >  </Text> 
                      </View>
                    </View>
                  </View>  
                </View>
              </View>
            </View>
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0}}> 
              <View style={styles.tableRow}>
                <View style={{width: "5%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0,  borderBottomWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "2px"}}> s </Text> 
                    <Text style={{ fontSize: 10, margin: "2px"}}> u </Text> 
                    <Text style={{ fontSize: 10, margin: "2px"}}> m </Text> 
                    <Text style={{ fontSize: 10, margin: "2px"}}> m </Text> 
                    <Text style={{ fontSize: 10, margin: "2px"}}> a </Text> 
                    <Text style={{ fontSize: 10, margin: "2px"}}> r </Text> 
                  </View>
                </View>
                <View style={{width: "20%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "9px"}}> Taxable Value </Text> 
                  </View>
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> (P) </Text> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> (P) </Text> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> (L) </Text> 
                  </View>
                </View>
                <View style={{width: "20%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "2px", textAlign: 'center'}}> CGST </Text> 
                    <View style={{ margin: "1px", flexDirection: 'row' }}>
                      <Text style={{fontSize: 10, width: '50%', textAlign: 'center'}}> Rate</Text>
                      <Text style={{fontSize: 10, width: '50%', textAlign: 'center'}}> Amt </Text>
                    </View>
                  </View>
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> 14.00 % </Text> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> 9.00 % </Text> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> 9.00 % </Text> 
                  </View>
                </View>
                <View style={{width: "20%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "2px", textAlign: 'center'}}> SGST </Text> 
                    <View style={{ margin: "1px", flexDirection: 'row' }}>
                      <Text style={{fontSize: 10, width: '50%', textAlign: 'center'}}> Rate</Text>
                      <Text style={{fontSize: 10, width: '50%', textAlign: 'center'}}> Amt </Text>
                    </View>
                  </View>
                  <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0}}> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> 14.00 % </Text> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> 9.00 % </Text> 
                    <Text style={{ fontSize: 10, margin: "5px"}}> 9.00 % </Text> 
                  </View>
                </View>
                <View style={{width: "35%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}> 
                  <Text style={{ fontSize: 10, margin: "5px"}}> Item Amount </Text> 
                  <Text style={{ fontSize: 10, margin: "5px"}}> Labor Amount </Text> 
                  <Text style={{ fontSize: 10, margin: "5px"}}> CGST Amount </Text> 
                  <Text style={{ fontSize: 10, margin: "5px"}}> SGST Amount </Text> 
                </View>
              </View>
            </View>
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0}}> 
              <Text style={{ fontSize: 10, margin: "5px"}}> ROUND-OFF </Text> 
            </View>
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0}}> 
              <View style={{flexDirection: 'row' }}>
                <Text style={{fontSize: 10, margin: "5px", width: '50%', textAlign: 'center'}}> (RUPEES ONLY)</Text>
                <Text style={{fontSize: 10, margin: "5px", width: '50%', textAlign: 'center'}}> Bill Amount </Text>
              </View>
            </View>
            <View style={{width: "100%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0}}> 
              <Text style={{ fontSize: 10, margin: "2px"}}> Terms & Conditions </Text> 
              <Text style={{ fontSize: 10, margin: "2px"}}> 1. Goods once sold shall not be taken back. </Text> 
              <Text style={{ fontSize: 10, margin: "2px"}}> 2. All disputes are subject to jurisdiction of Maharashtra state only. </Text> 
              <Text style={{ fontSize: 10, margin: "2px"}}> 3. All the repairs & charges have been explaned to me. </Text> 
              <Text style={{ fontSize: 10, margin: "2px"}}> BANK-DETAILS:- </Text> 
              <View style={{ marginTop: "60px", flexDirection: 'row' }}>
                <Text style={{fontSize: 13, margin: "5px", width: '50%', textAlign: 'center'}}> Customer Signature</Text>
                <Text style={{fontSize: 13, margin: "5px", width: '50%', textAlign: 'center'}}> Bill Amount </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    // </PDFViewer>
  );
}

export const RenderNegotitationComp = (props: any) => {
  const [blobURL, setblobURL] = React.useState(null);
  const [pdfLinkURL, setpdfLinkURL] = React.useState(null);

  console.log("props => ", props);
  return (
    <div className="negotitation-container">
        <div style={{ textAlign: "right" }}>
          <BlobProvider document={ <InvoiceProposal userDetails={props.selectedUser} jobCardDetails={props.selectedJobCard}/> }> 
            { ({ blob, url, loading, error }) => {
              console.log("blob : ", blob);
              console.log("url : ", url);
              setblobURL(blob);

              return(
                // <a href={url} target="_blank">
                //   <Button variant="contained" color="default" > Send Proposal </Button>
                // </a>
                <div className="negotitation-content">
                <div className="heading">Green Globe Fuel Solutions</div>
                <div className="info-container">
                  <div className="image-container">
                    {" "}
                    {/* <a href={url} target="_blank">
                      <Button variant="contained" color="default" > View Invoice </Button>
                    </a> */}
                  </div>{" "}
                  <div className="details">
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
                        <a href={url} target="_blank"> Generate Invoice </a>
                      </Button>
                    }
                    { pdfLinkURL &&
                      <a href={`mailto:${store.getState().rxFormReducer["leadForm"].email}?subject=Proposal PDF url&body=PFA for Proposal %0A${pdfLinkURL}%0A Thanks%20&%20Reagrds`} >
                        <Button variant="contained" color="default" > Send Invoice </Button>
                      </a>
                    }
                  </div>
                </div>
              </div>
                // <div>
                //   { <a href={url} target="_blank">
                //       <Button variant="contained" color="default" > View Invoice </Button>
                //     </a>
                //   }
                //   { pdfLinkURL === null &&
                //     < Button variant="contained" color="default"
                //       onClick={async() => {
                //         const documentURL = await pdfUpload({
                //           id: store.getState().rxFormReducer["leadForm"].firstName + props.currentID,
                //           pdf: await getPDFBase64fromURL(blobURL),
                //         });
                //         console.log("documentURL => ", documentURL.url)
                //         const url = documentURL.url;
                //         setpdfLinkURL(url);
                //         console.log("pdfLinkURL => ", url)
                //       }}
                //     >
                //       Generate Invoice
                //     </Button>
                //   }
                //   { pdfLinkURL &&
                //     <a href={`mailto:${store.getState().rxFormReducer["leadForm"].email}?subject=Proposal PDF url&body=PFA for Proposal %0A${pdfLinkURL}%0A Thanks%20&%20Reagrds`} >
                //       <Button variant="contained" color="default" > Send Invoice </Button>
                //     </a>
                //   }
                // </div>
              )
            }}
          </BlobProvider>
        </div>

      <FormComponent
        onCancel={props.previous}
        onSubmit={props.handleCloseAddJobCard}
        submitTitle="Close"
        cancelTitle="Previous"
        formModel="leadForm"
        hasSubmit={true}
        options={[]}
      />
    </div>
  );
};