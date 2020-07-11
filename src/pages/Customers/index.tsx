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

export interface ICustomersProps {
  history: IHistory
}

export class CustomersImpl extends React.PureComponent<ICustomersProps, {}> {
  constructor(props: ICustomersProps) {
    super(props);
  }

  public render() {
    return (
      <AppBar>
        {" "}
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
        </div>
        {/* <div className="cards-main customer-card"> */}
          <Grid container={true}>
            <CustomerList
              onClick={() =>
                this.props.history.push("/customer/add-new-customer")
              }
              customerData={data.customers.data}
            />
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
  return (
    <div className="cards-main">
    {props.customerData.map((customerData: any, index: any) => {
    return (
      <div onClick={props.onClick} key={index} className="card-container ">
        <Grid container >
          <Grid
            item
            className="padding-6-corners"
            xs={6}
            md={6}
          >
            <PersonPin /> <span style={{ padding: "5px" }} />
            {customerData.firstName}
          </Grid>
          <Grid
            className="padding-6-corners"
            item
            xs={6}
            md={6}
          >
            <Phone /> <span style={{ padding: "5px" }} />
            {customerData.mobileNumber}
          </Grid>
        </Grid>
        <Grid container >
          <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text"> Email:</span>
            {customerData.email || 'NA'}
          </Grid>
          <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text"> Purchased Product:</span>
            {customerData.productPurchased}
          </Grid>
         
        </Grid>
        <Grid container >
          <Grid className="padding-6-corners" item xs={6} md={6}>
            <span className="description-text"> Dealer Code:</span>
            {customerData.dealerCode || "NA"}
          </Grid>
          <Grid
            className="padding-6-corners align-center"
            style={{ justifyContent: "flex-start" }}
            item
            xs={6}
            md={6}
          >
            <span className="description-text">Dealer Rating:</span>
            <Rating
              readOnly
              precision={0.5}
              value={customerData.dealerRating}
            />
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
    );
  })}
  </div>
  )
};
