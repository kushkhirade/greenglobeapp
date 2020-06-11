import { Fab, Grid } from "@material-ui/core";
import { Add, PersonPin, Phone } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import data from "../../data";
import "./customers.scss";
import { withRouter } from "react-router-dom";
export interface ICustomersProps {
  history: {
    push: (path: string) => void;
  };
}

export class CustomersImpl extends React.PureComponent<ICustomersProps, {}> {
  constructor(props: ICustomersProps) {
    super(props);
  }

  public render() {
    return (
      <AppBar>
        <div className="cards-main customer-card">
          <Grid container={true}>
            <CustomerList
              onClick={() =>
                this.props.history.push("/customer/add-new-customer")
              }
              customerData={data.customers.data}
            />
          </Grid>
        </div>
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
  return props.customerData.map((customerData: any, index: any) => {
    return (
      <div onClick={props.onClick} key={index} className="card-container ">
        <Grid container className="padding-15 align-left">
          <Grid item className="bold-font padding-6 center" xs={6} md={12}>
            <PersonPin /> <span style={{ padding: "5px" }} />
            {customerData.firstName}
          </Grid>
          <Grid className="bold-fon padding-6 centert" item xs={6} md={12}>
            <Phone /> <span style={{ padding: "5px" }} />
            {customerData.mobileNumber}
          </Grid>
        </Grid>
        <Grid container className="padding-15 align-left">
          <Grid className="padding-6" item xs={6} md={12}>
            <span className="description-text"> Purchased Product:</span>
            {customerData.productPurchased}
          </Grid>
          <Grid
            className="padding-6 align-center"
            style={{ justifyContent: "flex-start" }}
            item
            xs={6}
            md={12}
          >
            <span className="description-text">Dealer Rating:</span>
            <Rating
              readOnly
              precision={0.5}
              value={customerData.dealerRating}
            />
          </Grid>
        </Grid>
      </div>
    );
  });
};
