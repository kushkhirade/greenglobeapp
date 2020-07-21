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
  { users: any; isLoading: boolean }
> {
  constructor(props: IAssignedDealersProps) {
    super(props);
    this.state = { users: [], isLoading: false };
  }

  componentWillMount() {
    if (isEmpty(this.props.dealerDetails)) {
      this.props.history.push("/assign-dealers");
    }
  }

  tabData = () => [
    {
      tabName: "Details",
      component: (
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <div
              onClick={() =>
                this.props.dealerDetails.onClickItem(this.props.dealerDetails)
              }
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
                  {this.props.dealerDetails.phone}
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
    // {
    //   tabName: "Report",
    //   component: (
    //     <div className="margin-10">
    //       <div className="margin-10">
    //         <TableWithGrid
    //           title={"Sale Target 3 wheeler"}
    //           data={data.sales.data}
    //           columns={columns}
    //           options={options as any}
    //         />{" "}
    //       </div>
    //       <div className="margin-10">
    //         <TableWithGrid
    //           title={"Sale Target 4 wheeler"}
    //           data={data.sales.data}
    //           columns={columns}
    //           options={options as any}
    //         />
    //       </div>
    //       <div className="card-container">
    //         <SubFormHeading>Product wise sale</SubFormHeading>
    //         <ResponsiveContainer width="100%" height={300}>
    //           <BarChart width={730} height={250} data={chartData}>
    //             <CartesianGrid />
    //             <XAxis dataKey="name" />
    //             <YAxis />
    //             <Tooltip />
    //             <Legend />
    //             <Bar dataKey="uv" fill="#82ca9d" barSize ={100} />
    //           </BarChart>
    //         </ResponsiveContainer>
    //       </div>
    //       <div className="button-container">
    //         <Button
    //           onClick={() => this.props.history.push("/leads")}
    //           variant="contained"
    //           color="primary"
    //           type="submit"
    //         >
    //           View Leads
    //         </Button>
    //         <span style={{ padding: "4px" }} />
    //         <Button
    //           onClick={() => this.props.history.push({pathname: "/inventory", data: this.props.dealerDetails})}
    //           variant="contained"
    //           color="primary"
    //           type="submit"
    //         >
    //           View Inventory
    //         </Button>{" "}
    //         <span style={{ padding: "4px" }} />
    //         <Button
    //           onClick={() => this.props.history.push("/customers")}
    //           variant="contained"
    //           color="primary"
    //           type="submit"
    //         >
    //           View Customers
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  render() {
    const { dealerDetails } = this.props;
    console.log("dealerDetails: ", dealerDetails)
    return (
      <AppBar>
        <div style={{ padding: "20px" }}>
          <Tabs tabsData={this.tabData()} />
        </div>
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
