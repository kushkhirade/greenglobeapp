import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import { Grid, Button } from "@material-ui/core";
import { chartData } from "./../AssignedDealers/usersData";
import "./../AssignedDealers/asssignedDealers.scss";
import { Tabs } from "src/components/Tabs";
import { TableWithGrid } from "src/components/TableWithGrid";
import data from "src/data";
import { SubFormHeading } from "src/components/SubFormHeading";
import {
  BarChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Bar,
} from "recharts";
import { isEmpty } from "lodash";
import { withRouter } from "react-router-dom";
import { isDealer } from "./../../state/Utility";
import { ChangePhoneFormat } from "src/components/Format";
import { getToken } from "src/state/Utility";
import getData from "src/utils/getData";
import { JobCardsList } from "src/pages/JobCard/index";

export interface IAssignedDealersProps {}

const columns = [
  {
    label: "Product",
    name: "product",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    label: "Target",
    name: "target",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    label: "Date",
    name: "date",
    options: {
      filter: true,
      sort: false,
    },
  },
];
const options = {
  filterType: "checkbox",
  responsive: "scrollMaxHeight",
};

export class DealerDetailsImpl extends React.PureComponent<
  any,
  { users: any; isLoading: boolean; AllJobCards: any;}
> {
  constructor(props: IAssignedDealersProps) {
    super(props);
    this.state = { users: [], isLoading: false, AllJobCards: [] };
  }

  componentWillMount() {
    if (isEmpty(this.props.dealerDetails)) {
      this.props.history.goBack();
    }
  }
  componentDidMount() {
    const data = getToken().data;
    this.getAllJobCards(data);
  }

  getAllJobCards = async (data) => {
    const dealer = this.props.dealerDetails;
    console.log("this.props.dealerDetails", this.props.dealerDetails)
    let sfid = data.sfid;
    let recordtypeid = data.record_type;
   
    sfid = dealer.sfid;
    recordtypeid = dealer.recordtypeid;

    try{
      let jobCardData;
      if(recordtypeid === "0121s0000000WE4AAM"){
        jobCardData = await getData({
          query: `select gst_number__c,customer__c,Name,
          (select Whatsapp_number__c from salesforce.contact where sfid like '%${sfid}%') ,
          (select firstName from salesforce.contact where sfid like '%${sfid}%') ,
          (select lastName from salesforce.contact where sfid like '%${sfid}%')
          from salesforce.job_card__c where customer__c like '%${sfid}%'`,
          token: data.token
        })
      }
      else {
        jobCardData = await getData({
          query: `select gst_number__c,lead__c,Name,
          (select Whatsapp_number__c from salesforce.lead where sfid like '%${sfid}%') ,
          (select firstName from salesforce.contact where sfid like '%${sfid}%') ,
          (select lastName from salesforce.contact where sfid like '%${sfid}%')
          from salesforce.job_card__c where lead__c like '%${sfid}%'`,
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

  tabData = () => [
    {
      tabName: "Details",
      component: (
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <div
              // onClick={() =>
              //   this.props.dealerDetails.onClickItem(this.props.dealerDetails)
              // }
              className="card-container"
            >
              <SubFormHeading>Customer Details</SubFormHeading>
              <Grid container>
                {" "}
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Name:</span>
                  {this.props.dealerDetails.name}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Mobile:</span>
                  {this.props.dealerDetails.phone && ChangePhoneFormat(this.props.dealerDetails.phone)}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Kit Enquiry:</span>
                  {this.props.dealerDetails.kit_enquiry__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Company:</span>
                  {this.props.dealerDetails.company__c || this.props.dealerDetails.company}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Email:</span>
                  {this.props.dealerDetails.email}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">WhatsApp No.:</span>
                  {this.props.dealerDetails.whatsapp_number__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Dealer Avg Rating:</span>
                  {this.props.dealerDetails.dealer_rating__c || this.props.dealerDetails.rating}
                </Grid>
              </Grid>
              <SubFormHeading>Address Details</SubFormHeading>
              <Grid container>
                {" "}
                <Grid item className="padding-6" xs={12} md={12} lg={12} sm={12}>
                  <span className="description-text">Address:</span>
                   {this.props.dealerDetails.mailingstreet || this.props.dealerDetails.street} {this.props.dealerDetails.mailingcity || this.props.dealerDetails.city} {this.props.dealerDetails.mailingpostalcode || this.props.dealerDetails.postalcode} {this.props.dealerDetails.mailingstate || this.props.dealerDetails.state}

                </Grid>
                {/* <Grid
                  item
                  className="padding-6"
                  xs={12}
                  md={12}
                  lg={12}
                  sm={12}
                >
                  <span className="description-text">Shipping Address:</span>
                  {this.props.dealerDetails.shippingstreet} {this.props.dealerDetails.shippingcity} {this.props.dealerDetails.shippingpostalcode} {this.props.dealerDetails.shippingstate}
                </Grid> */}
              </Grid>
              
            {isDealer() && (
              <div>
              <SubFormHeading>Vehicle Details</SubFormHeading>
              <Grid container>
                {" "}
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Vehicle Number:</span>
                  {this.props.dealerDetails.vehicle_no__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Fuel Type:</span>
                  {this.props.dealerDetails.fuel_type__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">3 or 4 Wheeler.:</span>
                  {this.props.dealerDetails.x3_or_4_wheeler__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Vehicle Make:</span>
                  {this.props.dealerDetails.vehicle_make__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Vehicle Model:</span>
                  {this.props.dealerDetails.vehicle_model__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Usage of Vehicle:</span>
                  {this.props.dealerDetails.usage_of_vehicle__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Engine Type:</span>
                  {this.props.dealerDetails.engine_type__c || this.props.dealerDetails.engine__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Daily Running KMs:</span>
                  {this.props.dealerDetails.daily_running_kms__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Registration Year:</span>
                  {this.props.dealerDetails.registration_year__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Year of Manufacturing:</span>
                  {this.props.dealerDetails.year_of_manufacturing__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Chassis Number:</span>
                  {this.props.dealerDetails.chassis_no__c}
                </Grid>
              </Grid>
              <SubFormHeading>Documents Required for RTO</SubFormHeading>
              <Grid container>
                {" "}
              </Grid>
              </div>
            )}
            </div>
          </Grid>
        </Grid>
      ),
    },
    {
      tabName: "Job Cards",
      component: (
        <Grid container>
          {this.state.AllJobCards && this.state.AllJobCards.map(cust => {
          return (
            <Grid item xs={12} md={6}>
              <JobCardsList
                // onClickDetails={this.handleCustomerDetails}
                jobCardData={cust}
              />
            </Grid>
          )}
          )}
        </Grid>
      ),
    }
  ];

  render() {
    const { dealerDetails } = this.props;
    console.log("dealerDetails: ", dealerDetails)
    return (
      <AppBar>
        {/* <div style={{ padding: "20px" }}> */}
          <Tabs tabsData={this.tabData()} />
        {/* </div> */}
      </AppBar>
    );
  }
}
export function mapStateToProps(state) {
  return { dealerDetails: state.users.get("data") };
}
export const CustomerLeadDetails = withRouter(
  connect<{}, {}, IAssignedDealersProps>(mapStateToProps)(
    DealerDetailsImpl
  ) as any
);

const distDetails = {
  name: "Sachin T",
  accountName: "GGFS",
  whatApp: "",
  email: "sadas@qdasdas.com",
  mobile: "32321321321",
  rating: "3.5",
  billingAddress: "Indiabulls, Lower Parel, Mumbai, MH",
  shippingAddress: "Indiabulls, Lower Parel, Mumbai, MH 411093, India",
  gstNum: "27AACCN1235323",
  bankName: "HDFC Bank",
  IFSC: "HDFC0000646",
  aaNum: "3242353243",
  custDetails: [
    { custName: "Ramesh T", mobileNumber: "21323231" },
    { custName: "Suresh T", mobileNumber: "21323231" },
  ],
};