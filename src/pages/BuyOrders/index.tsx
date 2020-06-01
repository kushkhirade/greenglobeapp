import { Grid, TextField, Button } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import AppBar from "src/navigation/App.Bar";
import "./buyOrders.scss";
import { Stepper } from "./Stepper";

export interface IBuyOrdersProps {
  data?: string;
}
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const products = [
  { value: 1000, label: "Product 1" },
  { value: 1000, label: "Product 2" },
  { value: 1000, label: "Product 3" },
];

export class BuyOrdersImpl extends React.PureComponent<IBuyOrdersProps, any> {
  constructor(props: IBuyOrdersProps) {
    super(props);
    this.state = {
      value: "",
      showForm: false,
      product1: null,
      product2: null,
      product3: null,
      product4: null,
    };
  }

  public onStepChange = (tabName: string) => {
    this.setState({
      value: tabName,
    });
  };

  public handleChange = (value: any, key: string) => {
    this.setState({
      [key]: value as any,
    });
  };

  public renderForm = () => {
    return (
      <div className="card-container">
        <div className="modal-margin">
          <Select
            className="r-select"
            value={this.state.product1}
            onChange={(v: any) => this.handleChange(v, "product1")}
            options={products}
          />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <div className="modal-margin">
          <Select
            className="r-select"
            value={this.state.product2}
            options={products}
            onChange={(v: any) => this.handleChange(v, "product2")}
          />{" "}
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <div className="modal-margin">
          <Select
            className="r-select"
            value={this.state.product3}
            options={products}
            onChange={(v: any) => this.handleChange(v, "product3")}
          />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <div className="modal-margin">
          <Select
            className="r-select"
            value={this.state.product3}
            onChange={(v: any) => this.handleChange(v, "product4")}
            options={products}
          />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <div className="button-container">
          <Button variant="contained" color="default">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </div>
    );
  };

  public renderStepper = () => {
    return (
      <Stepper
        stepData={[
          {
            label: "Draft",
            component: this.renderForm(),
          },
          {
            label: "Submitted",
            component: (
              <div className="card-container">
                <Grid container={true}>
                  <Grid item={true} xs={6} md={6}>
                    Order ID - ON-26541
                  </Grid>
                  <Grid item={true} xs={6} md={6}>
                    Order Date - 10/05/2020
                  </Grid>
                  <Grid item={true} xs={6} md={6}>
                    Total Items - 25 Order
                  </Grid>
                  <Grid item={true} xs={6} md={6}>
                    Total - 1742000
                  </Grid>
                </Grid>
              </div>
            ),
          },
          {
            label: "PI Raised",
            component: (
              <div className="card-container">
                <div className="head-title">Performance Invoice</div>
                <div className="invoice-date">
                  <div>Invoice No - IN915426</div>
                  <div> Date of Issue - 10/02/2020</div>
                </div>
                <div>
                  Billed to- GGFS Indiabulls, Lower Parel, Mumbai, MH 411093,
                  India
                </div>
              </div>
            ),
          },
          {
            label: "Payment Details",
            component: (
              <div className="card-container">
                <div className="head-title">Payment Mode and Details</div>
                <div className="modal-margin">
                  <Select
                    className="r-select"
                    value={null}
                    onChange={this.handleChange}
                    options={options}
                  />
                </div>
                <div className="modal-margin">
                  <Select
                    className="r-select"
                    value={null}
                    onChange={this.handleChange}
                    options={options}
                  />
                </div>{" "}
                <div className="modal-margin">
                  <TextField
                    id="filled-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    rows={4}
                    variant="filled"
                    multiline={true}
                  />
                </div>{" "}
                <div className="button-container">
                  <Button variant="contained" color="default">
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary">
                    Submit
                  </Button>
                </div>
              </div>
            ),
          },
          { label: "Dispatched", component: <div>Dispatched</div> },
          { label: "Add Inventory", component: this.renderForm() },
        ]}
      >
        sadsd
      </Stepper>
    );
  };

  public renderCard = () => {
    return (
      <div className="cards-main">
        {data.map((dataValue: any, index: number) => {
          return (
            <div key={index} className="card-container">
              <div className="card-content">
                <div className="row-data">
                  <div className="data-content">
                    <span> Order ID: </span>
                    {dataValue.orderId}{" "}
                  </div>
                  <div className="data-content">
                    <span> Order Date: </span>
                    {dataValue.orderDate}{" "}
                  </div>
                </div>
                <div className="row-data">
                  <div className="data-content">
                    <span>Item Quantity:</span>
                    {dataValue.quantity}{" "}
                  </div>
                  <div className="data-content">
                    <span>Total Price:</span> {dataValue.totalPrice}{" "}
                  </div>
                </div>
                <div className="row-data">
                  <div className="data-content">
                    <span> Order Status:</span> {dataValue.orderStatus}{" "}
                  </div>
                  <div className="data-content">
                    <span
                      onClick={() => this.setState({ showForm: true })}
                      className="view"
                    >
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  public render() {
    return (
      <AppBar>
        {this.state.showForm ? this.renderStepper() : this.renderCard()}
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const BuyOrders = connect<{}, {}, IBuyOrdersProps>(mapStateToProps)(
  BuyOrdersImpl
);

const data = [
  {
    orderId: "ON-26541",
    orderDate: "10/05/2020",
    quantity: 20,
    totalPrice: "Rs.56485",
    orderStatus: "Draft",
  },
  {
    orderId: "ON-26541",
    orderDate: "10/05/2020",
    quantity: 20,
    totalPrice: "Rs.56485",
    orderStatus: "Draft",
  },
  {
    orderId: "ON-26541",
    orderDate: "10/05/2020",
    quantity: 20,
    totalPrice: "Rs.56485",
    orderStatus: "Draft",
  },
  {
    orderId: "ON-26541",
    orderDate: "10/05/2020",
    quantity: 20,
    totalPrice: "Rs.56485",
    orderStatus: "Draft",
  },
];
