import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import { Grid, Button } from "@material-ui/core";
import { chartData } from "./usersData";
import "./asssignedDealers.scss";
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
  { users: any; isLoading: boolean; AllJobCards: any; }
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

  tabDataforDealer = () => [
    {
      tabName: "Details",
      component: (
        <Grid container>
          {this.props.dealerDetails.dealer.name && 
          <Grid item xs={12} md={12} lg={12}>
            <div
              onClick={() =>
                this.props.dealerDetails.onClickItem(this.props.dealerDetails)
              }
              className="card-container"
            > 
              <SubFormHeading>Dealer Details</SubFormHeading>
              <Grid container>
                {" "}
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Name:</span>
                  {this.props.dealerDetails.dealer.name}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Account Name:</span>
                  {this.props.dealerDetails.dealer.name}
                </Grid>
                {/* <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Account Type:</span>
                  {this.props.dealerDetails.dealer.bank_account_type__c}
                </Grid> */}
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">WhatsApp No.:</span>
                  {this.props.dealerDetails.dealer.whatsapp_no__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Email:</span>
                  {this.props.dealerDetails.dealer.email__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Mobile:</span>
                  {this.props.dealerDetails.dealer.phone && ChangePhoneFormat(this.props.dealerDetails.dealer.phone)}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Dealer Avg Rating:</span>
                  {this.props.dealerDetails.dealer.rating}
                </Grid>
              </Grid>
              <SubFormHeading>Address Details</SubFormHeading>
              <Grid container>
                {" "}
                <Grid
                  item
                  className="padding-6"
                  xs={12}
                  md={12}
                  lg={12}
                  sm={12}
                >
                  <span className="description-text">Billing Address:</span>
                  {this.props.dealerDetails.dealer.billingstreet} {this.props.dealerDetails.dealer.billingcity} {this.props.dealerDetails.dealer.billingpostalcode} {this.props.dealerDetails.dealer.billingstate}
                </Grid>
                <Grid
                  item
                  className="padding-6"
                  xs={12}
                  md={12}
                  lg={12}
                  sm={12}
                >
                  <span className="description-text">Shipping Address:</span>
                  {this.props.dealerDetails.dealer.shippingstreet} {this.props.dealerDetails.dealer.shippingcity} {this.props.dealerDetails.dealer.shippingpostalcode} {this.props.dealerDetails.dealer.shippingstate}
                </Grid>
              </Grid>
              <SubFormHeading>Bank and KYC Details</SubFormHeading>
              <Grid container>
                <Grid
                  item
                  className="padding-6"
                  xs={12}
                  md={12}
                  lg={12}
                  sm={12}
                >
                  <b>GST Number - {this.props.dealerDetails.dealer.gst_number__c}</b>
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Bank Name:</span>
                  {this.props.dealerDetails.dealer.bank_name__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">IFSC:</span>
                  {this.props.dealerDetails.dealer.bank_ifsc_code__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Account Number:</span>
                  {this.props.dealerDetails.dealer.bank_account_number__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Account Type:</span>
                  {this.props.dealerDetails.dealer.bank_account_type__c}
                </Grid>
              </Grid>
              <SubFormHeading>Related Customers</SubFormHeading>{" "}
              <Grid container>
                {this.props.dealerDetails.customers.map((x) => {
                  return (
                    <React.Fragment>
                      <Grid
                        item
                        className="padding-6"
                        xs={12}
                        md={6}
                        lg={6}
                        sm={6}
                      >
                        <span className="description-text">Name -</span>
                        {x.name}
                      </Grid>
                      <Grid
                        item
                        className="padding-6"
                        xs={12}
                        md={6}
                        lg={6}
                        sm={6}
                      >
                        <span className="description-text">Mob No. -</span>
                        {x.phone && ChangePhoneFormat(x.phone)}
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </div>
          </Grid>
          }
        </Grid>
      ),
    },
    {
      tabName: "Report",
      component: (
        <div className="margin-10">
          <div className="margin-10">
            <TableWithGrid
              title={"Sale Target 3 wheeler"}
              data={data.sales.data}
              columns={columns}
              options={options as any}
            />{" "}
          </div>
          <div className="margin-10">
            <TableWithGrid
              title={"Sale Target 4 wheeler"}
              data={data.sales.data}
              columns={columns}
              options={options as any}
            />
          </div>
          <div className="card-container">
            <SubFormHeading>Product wise sale</SubFormHeading>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart width={730} height={250} data={chartData}>
                <CartesianGrid />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#82ca9d" barSize ={100} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="button-container">
            <Button
              onClick={() => this.props.history.push({pathname:"/leads", data: this.props.dealerDetails.dealer})}
              variant="contained"
              color="primary"
              type="submit"
            >
              View Leads
            </Button>
            <span style={{ padding: "4px" }} />
            <Button
              onClick={() => this.props.history.push({pathname: "/inventory", data: this.props.dealerDetails.dealer})}
              variant="contained"
              color="primary"
              type="submit"
            >
              View Inventory
            </Button>{" "}
            <span style={{ padding: "4px" }} />
            <Button
              onClick={() => this.props.history.push({pathname:"/customers", data: this.props.dealerDetails.dealer})}
              variant="contained"
              color="primary"
              type="submit"
            >
              View Customers
            </Button>
            <span style={{ padding: "4px" }} />
            <Button
              onClick={() => this.props.history.push({pathname:"/job-cards", data: this.props.dealerDetails.dealer})}
              variant="contained"
              color="primary"
              type="submit"
            >
              View JobCards
            </Button>
          </div>
        </div>
      ),
    }
  ];

  tabDataforLead = () => [
    {
      tabName: "Details",
      component: (
        <Grid container>
          {this.props.dealerDetails.dealer.name && 
          <Grid item xs={12} md={12} lg={12}>
            <div
              onClick={() =>
                this.props.dealerDetails.onClickItem(this.props.dealerDetails)
              }
              className="card-container"
            > 
              <SubFormHeading>Dealer Details</SubFormHeading>
              <Grid container>
                {" "}
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Name:</span>
                  {this.props.dealerDetails.dealer.name}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Account Name:</span>
                  {this.props.dealerDetails.dealer.name}
                </Grid>
                {/* <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Account Type:</span>
                  {this.props.dealerDetails.dealer.bank_account_type__c}
                </Grid> */}
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">WhatsApp No.:</span>
                  {this.props.dealerDetails.dealer.whatsapp_no__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Email:</span>
                  {this.props.dealerDetails.dealer.email__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Mobile:</span>
                  {this.props.dealerDetails.dealer.phone && ChangePhoneFormat(this.props.dealerDetails.dealer.phone)}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Dealer Avg Rating:</span>
                  {this.props.dealerDetails.dealer.rating}
                </Grid>
              </Grid>
              <SubFormHeading>Address Details</SubFormHeading>
              <Grid container>
                {" "}
                <Grid
                  item
                  className="padding-6"
                  xs={12}
                  md={12}
                  lg={12}
                  sm={12}
                >
                  <span className="description-text">Billing Address:</span>
                  {this.props.dealerDetails.dealer.billingstreet} {this.props.dealerDetails.dealer.billingcity} {this.props.dealerDetails.dealer.billingpostalcode} {this.props.dealerDetails.dealer.billingstate}
                </Grid>
                <Grid
                  item
                  className="padding-6"
                  xs={12}
                  md={12}
                  lg={12}
                  sm={12}
                >
                  <span className="description-text">Shipping Address:</span>
                  {this.props.dealerDetails.dealer.shippingstreet} {this.props.dealerDetails.dealer.shippingcity} {this.props.dealerDetails.dealer.shippingpostalcode} {this.props.dealerDetails.dealer.shippingstate}
                </Grid>
              </Grid>
              <SubFormHeading>Bank and KYC Details</SubFormHeading>
              <Grid container>
                <Grid
                  item
                  className="padding-6"
                  xs={12}
                  md={12}
                  lg={12}
                  sm={12}
                >
                  <b>GST Number - {this.props.dealerDetails.dealer.gst_number__c}</b>
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Bank Name:</span>
                  {this.props.dealerDetails.dealer.bank_name__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">IFSC:</span>
                  {this.props.dealerDetails.dealer.bank_ifsc_code__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Account Number:</span>
                  {this.props.dealerDetails.dealer.bank_account_number__c}
                </Grid>
                <Grid item className="padding-6" xs={12} md={6} lg={6} sm={6}>
                  <span className="description-text">Account Type:</span>
                  {this.props.dealerDetails.dealer.bank_account_type__c}
                </Grid>
              </Grid>
              <SubFormHeading>Related Customers</SubFormHeading>{" "}
              <Grid container>
                {this.props.dealerDetails.customers.map((x) => {
                  return (
                    <React.Fragment>
                      <Grid
                        item
                        className="padding-6"
                        xs={12}
                        md={6}
                        lg={6}
                        sm={6}
                      >
                        <span className="description-text">Name -</span>
                        {x.name}
                      </Grid>
                      <Grid
                        item
                        className="padding-6"
                        xs={12}
                        md={6}
                        lg={6}
                        sm={6}
                      >
                        <span className="description-text">Mob No. -</span>
                        {x.phone && ChangePhoneFormat(x.phone)}
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </div>
          </Grid>
          }
        </Grid>
      ),
    },
  ];

  render() {
    const { dealerDetails } = this.props;
    console.log("dealerDetails: ", dealerDetails)
    return (
      <AppBar>
        {/* <div style={{ padding: "20px" }}> */}
          <Tabs tabsData={dealerDetails.dealer.recordtypeid === "0122w000000chRuAAI" ? this.tabDataforLead() :this.tabDataforDealer()} />
        {/* </div> */}
      </AppBar>
    );
  }
}
export function mapStateToProps(state) {
  return { dealerDetails: state.users.get("data") };
}
export const DealerDetails = withRouter(
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
