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
            <CustomerList customerData={data.customers.data} />
          </Grid>
          <span
            style={{ position: "absolute", right: 20, bottom: 20 }}
            onClick={() =>
              this.props.history.push("/customer/add-new-customer")
            }
          >
            <Fab color="secondary" aria-labelledby="add-ticket">
              <Add />
            </Fab>
          </span>
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
      <div key={index} className="card-container ">
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
          </Grid>{" "}
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
    );
  });
};
