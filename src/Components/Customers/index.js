import { Grid } from "@material-ui/core";
import { PersonPin, Phone } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import { map, values } from "ramda";
import React from "react";
import "./customers.scss";
import { List } from "react-admin";

export class Customers extends React.Component {
  render() {
    return (
      <div className="customers-container">
        <Grid className="grid-container" container>
          <List exporter={false} {...this.props}>
            <CustomerList />
          </List>
        </Grid>
      </div>
    );
  }
}

const CustomerList = (props) => {
  return map((customerData) => {
    return (
      <Grid className="base-item" item md={6} xs={12}>
        <div className="customer-card ">
          <Grid container className="padding-15 align-left">
            <Grid item className="bold-font center" xs={6} md={12}>
              <PersonPin /> {customerData.firstName}
            </Grid>
            <Grid className="bold-fon centert" item xs={6} md={12}>
              <Phone /> {customerData.mobileNumber}
            </Grid>
          </Grid>
          <Grid container className="padding-15 align-left">
            <Grid item xs={6} md={12}>
              Purchased Product:
              {customerData.productPurchased}
            </Grid>
            <Grid item xs={6} md={12}>
              Dealer Rating:
              <Rating
                readOnly
                precision={0.5}
                value={customerData.dealerRating}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }, values(props.data));
};
