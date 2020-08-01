import { Fab, Grid } from "@material-ui/core";
import { Add, PersonPin, Phone } from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/Chat";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import WhatsappIcon from "./wtsapimg.png";
import Rating from "@material-ui/lab/Rating";
import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import data from "../../data";
import "./customers.scss";
import { withRouter } from "react-router-dom";
import filter from "./filter.svg";
import Search from "@material-ui/icons/Search";
import { IHistory } from "src/state/Utility";
import getData from "src/utils/getData";
import { getToken, isDealer } from "./../../state/Utility";
import { saveDealerData } from "src/actions/App.Actions";
import { ChangePhoneFormat } from "src/components/Format";

export interface ICustomersProps {
  history: IHistory;
  location: any
}

export class CustomersImpl extends React.PureComponent<ICustomersProps, {customers: any}> {
  constructor(props: ICustomersProps) {
    super(props);
    this.state = {
      customers : []
    }
  }

  async componentDidMount(){
    const {location} = this.props;
    const { data } = getToken();
    if(location && location.data && Object.keys(location.data).length){
      data.sfid = location.data.sfid;
    }
    const customerData = await this.getAllCustomers(data);
    this.setState({ customers : customerData });
  }

  getAllCustomers = async (data) => {
    try{
      let customerData;
      if(isDealer()){
        customerData = await getData({
          query: `SELECT *
          FROM salesforce.Contact 
          WHERE Assigned_Dealer__c LIKE '%${data.sfid}%' AND Recordtypeid = '0120l000000ot16AAA'`,
          token: data.token
        })
      }
      else{
        customerData = await getData({
          query: `SELECT *
          FROM salesforce.Contact 
          WHERE contact.accountid LIKE '%${data.sfid}%' AND Recordtypeid = '0120l000000ot16AAA'`,
          token: data.token
        });
    }

      console.log("customerData =>", customerData.result)
      return customerData.result;
    }
    catch(e){
      console.log(e);
    }
  }

  handleCustomerDetails = async (customer) => {
    console.log("customer Data ", customer)
    saveDealerData(customer);
    this.props.history.push("/customer/customer-lead-details");
  };

  public render() {
    return (
      <AppBar>
        {/* {" "}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {" "}
          <Search fontSize="large" color="primary" />
          <img height="26px" src={filter} />
        </div> */}
        {/* <div className="cards-main customer-card"> */}
        <Grid container>
          {this.state.customers && this.state.customers.map(cust => {
          return (
            <Grid item xs={12} md={6}>
              <CustomerList
                onClickDetails={this.handleCustomerDetails}
                customerData={cust}
              />
            </Grid>
          )}
          )}
        </Grid>

        {/* </div> */}
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const Customers = withRouter(
  connect<{}, {}, ICustomersProps>(mapStateToProps)(CustomersImpl as any) as any
);

const CustomerList = (props: any) => {
  const { customerData } = props;
  return (
    // <div className="cards-main">
    // {props.customerData.map((customerData: any, index: any) => {
    // return (
      <div className="card-container" >
        <Grid container >
          <Grid
            item
            className="padding-6-corners"
            xs={6}
            md={6}
          >
            <PersonPin /> <span style={{ padding: "5px" }} />
            {customerData.name}
          </Grid>
          <Grid
            className="padding-6-corners"
            item
            xs={6}
            md={6}
          >
            <Phone /> <span style={{ padding: "5px" }} />
            {customerData.phone && ChangePhoneFormat(customerData.phone)}
          </Grid>
        </Grid>
        <Grid container >
          {/* <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text"> Email:</span>
            {customerData.email || 'NA'}
          </Grid> */}
          <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text"> Purchased Product:</span>
            {customerData.purchased_product__c}
          </Grid>
          <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text"> Dealer Rating:</span>
            {customerData.dealer_rating__c}
          </Grid>
        </Grid>
        <Grid container >
          <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text">Dealer Code:</span>
            {customerData.dealer_code__c}
            {/* <Rating
              readOnly
              precision={0.5}
              value={customerData.dealerRating}
            /> */}
          </Grid>
          <Grid className="padding-6-corners" item xs={4} md={4}> 
          <span onClick={() => props.onClickDetails(customerData)} className="view">
            View Details
          </span>
        </Grid>
        </Grid>
        <Grid className="padding-15 align-left">
          <div className="icon-container">
            <PhoneIcon className="phone-icon" />
            &nbsp;
            <ChatIcon className="chat-icon" />
            &nbsp;
            <MailIcon className="mail-icon" />
            &nbsp;
            <img height="42px" src={WhatsappIcon}/>
          </div>
        </Grid>
      </div>
  //    );
  // })} 
  // </div>
  )
};
