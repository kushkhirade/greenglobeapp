import { Button, Grid, TextField, Typography } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { Tabs } from "src/components/Tabs";
import AppBar from "src/navigation/App.Bar";
import { isDealer } from "src/state/Utility";
import { Stepper } from "./Stepper";
import "./buyOrders.scss";
import { GSelect } from "src/components/GSelect";
import { BaseModal } from "src/components/BaseModal";

export interface IAddNewOrderProps {}
const options = [
  { value: "loan", label: "Loan" },
  { value: "upfront", label: "Up Front" },
];
const options1 = [
  { value: "cc/dc", label: "CC/DC" },
  { value: "netbanking", label: "Net Banking" },
  { value: "UPI", label: "UPI" },
];

const products = [
  { value: 1000, label: "Product 1" },
  { value: 1000, label: "Product 2" },
  { value: 1000, label: "Product 3" },
];

const invoiceData = {
  orderID: "IN915426",
  dateOfIssue: "10/02/2020",
  billedTo: "GGFS",
  address: "Indiabulls, Lower Parel, Mumbai, MH 411093, India",
  totalItems: 25,
  orderTotal: 23123213,
  billHeads: ["Item Name", "Unit Cost", "Qty", "Amount"],
  billData: [
    {
      itemName: "Item 1 ",
      unitCost: "200",
      qty: "2",
      amount: "400",
    },
    {
      itemName: "Item 1 ",
      unitCost: "200",
      qty: "2",
      amount: "400",
    },
    {
      itemName: "Item 1 ",
      unitCost: "200",
      qty: "2",
      amount: "400",
    },
    {
      itemName: "Item 1 ",
      unitCost: "200",
      qty: "2",
      amount: "400",
    },
  ],
};

export class AddNewOrderImpl extends React.PureComponent<
  IAddNewOrderProps,
  any
> {
  constructor(props: IAddNewOrderProps) {
    super(props);
    this.state = {
      value: "",
      activeStepBuy: 0,
      activeStepSell: 0,
      product1: null,
      product2: null,
      product3: null,
      product4: null,
      qty1: 10,
      qty2: 10,
      qty3: 10,
      qty4: 10,
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

  public renderValueManipulator = (key) => (
    <div className="increaser">
      <div
        onClick={() => this.setState({ [key]: this.state[key] + 1 })}
        className="plus hover"
      >
        +
      </div>
      <div className="value">{this.state[key]}</div>
      <div
        onClick={() => this.setState({ [key]: this.state[key] - 1 })}
        className="minus hover"
      >
        -
      </div>
    </div>
  );

  public renderForm = (label, type) => {
    return (
      <div className="card-container no-hover">
        <Grid container spacing={4}>
          <div className="product-selection">
            <Grid item xs={4} md={6} sm={6}>
              <GSelect
                className="r-select"
                value={this.state.product1}
                onChange={(v: any) => this.handleChange(v, "product1")}
                options={products}
              />
            </Grid>
            <Grid item xs={4} md={4} sm={4}>
              {this.renderValueManipulator("qty1")}
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={4}>
          <div className="product-selection">
            <Grid item xs={4} md={6} sm={6}>
              <GSelect
                className="r-select"
                value={this.state.product2}
                options={products}
                onChange={(v: any) => this.handleChange(v, "product2")}
              />{" "}
            </Grid>
            <Grid item xs={4} md={4} sm={4}>
              {this.renderValueManipulator("qty2")}
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={4}>
          <div className="product-selection">
            <Grid item xs={4} md={6} sm={6}>
              <GSelect
                className="r-select"
                value={this.state.product3}
                options={products}
                onChange={(v: any) => this.handleChange(v, "product3")}
              />{" "}
            </Grid>
            <Grid item xs={4} md={4} sm={4}>
              {this.renderValueManipulator("qty3")}
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={4}>
          <div className="product-selection">
            <Grid item xs={4} md={6} sm={6}>
              <GSelect
                className="r-select"
                value={this.state.product4}
                options={products}
                onChange={(v: any) => this.handleChange(v, "product4")}
              />{" "}
            </Grid>
            <Grid item xs={4} md={4} sm={4}>
              {this.renderValueManipulator("qty4")}
            </Grid>
          </div>
        </Grid>
        <div className="button-container">
          <Button variant="contained" color="default">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (label === "Add") {
                return;
              }
              if (type === "sell") {
                this.setState({
                  activeStepSell: this.state.activeStepSell + 1,
                });
              } else {
                this.setState({ activeStepBuy: this.state.activeStepBuy + 1 });
              }
            }}
            variant="contained"
            color="primary"
          >
            {label}
          </Button>
        </div>
      </div>
    );
  };

  public renderStepper = () => {
    return (
      <Stepper
        identifier="buy"
        activeStep={this.state.activeStepBuy}
        stepData={[
          {
            label: "Draft",
            component: this.renderForm("Submit", "buy"),
          },
          {
            label: "Submitted",
            component: (
              <SubmittedScreen
                onClick={() =>
                  this.setState({ activeStepBuy: this.state.activeStepBuy + 1 })
                }
              />
            ),
          },
          {
            label: "PI Raised",
            component: (
              <Grid container className="align-center">
                <Grid item xs={12} md={4} lg={4}>
                  <div className="card-container no-hover">
                    <div className="head-title padding-6 ">
                      Performa Invoice
                    </div>
                    <div className="invoice-date padding-6">
                      <div>
                        {" "}
                        <span className="description-text">
                          Invoice No -{" "}
                        </span>{" "}
                        IN915426
                      </div>
                      <div>
                        {" "}
                        <span className="description-text">
                          {" "}
                          Date of Issue -
                        </span>{" "}
                        10/02/2020
                      </div>
                    </div>
                    <div className="padding-6 invoice-add">
                      Billed to- GGFS Indiabulls, Lower Parel, Mumbai, MH
                      411093, India
                    </div>
                    <div className="invoice-table">
                      <div className="table-heads">
                        {invoiceData.billHeads.map((name, index) => (
                          <div key={index} className="heading">
                            {name}
                          </div>
                        ))}
                      </div>
                      <div className="table-data">
                        {invoiceData.billData.map((b, index) => (
                          <div key={index} className="data-inner">
                            <div className="data">{b.itemName}</div>
                            <div className="data">{b.unitCost}</div>
                            <div className="data">{b.qty}</div>
                            <div className="data">{b.amount}</div>
                          </div>
                        ))}
                      </div>
                      <div className="bill-total">
                        <div>
                          <span className="description-text">Sub Total:</span>
                          {invoiceData.billData.reduce(
                            (s, a) => Number(a.amount) + s,
                            0
                          )}
                        </div>
                        <div>
                          <span className="description-text">Tax - 18% -</span>
                          {(invoiceData.billData.reduce(
                            (s, a) => Number(a.amount) + s,
                            0
                          ) /
                            100) *
                            18}
                        </div>
                        <div className="invoice-total">
                          {" "}
                          <span className="description-text">
                            Invoice Total -
                          </span>
                          {invoiceData.billData.reduce(
                            (s, a) => Number(a.amount) + s,
                            0
                          ) +
                            (invoiceData.billData.reduce(
                              (s, a) => Number(a.amount) + s,
                              0
                            ) /
                              100) *
                              18}
                        </div>
                      </div>
                    </div>{" "}
                    <div className="align-center padding-6">
                      <Button
                        onClick={() =>
                          this.setState({
                            activeStepBuy: this.state.activeStepBuy + 1,
                          })
                        }
                        variant="contained"
                        color="primary"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            ),
          },
          {
            label: "Payment Details",
            component: (
              <PaymentDetailsScreen
                onClick={() =>
                  this.setState({
                    activeStepBuy: this.state.activeStepBuy + 1,
                  })
                }
              />
            ),
          },
          {
            label: "Dispatched",
            component: (
              <DispatchedScreen
                onClick={() =>
                  this.setState({
                    activeStepBuy: this.state.activeStepBuy + 1,
                  })
                }
              />
            ),
          },
          { label: "Add Inventory", component: this.renderForm("Add", "buy") },
        ]}
      ></Stepper>
    );
  };

  public renderSellStepper = () => {
    return (
      <Stepper
        identifier="sell"
        activeStep={this.state.activeStepSell}
        stepData={[
          {
            label: "Draft",
            component: this.renderForm("Submit", "sell"),
          },
          {
            label: "Submitted",
            component: (
              <SubmittedScreen
                onClick={() => {
                  this.setState({
                    activeStepSell: this.state.activeStepSell + 1,
                  });
                }}
              />
            ),
          },
          {
            label: "Payment Details",
            component: (
              <PaymentDetailsScreen
                onClick={() => {
                  this.setState({
                    activeStepSell: this.state.activeStepSell + 1,
                  });
                }}
              />
            ),
          },
          {
            label: "Dispatched",
            component: (
              <DispatchedScreen
                onClick={() => {
                  this.setState({
                    activeStepSell: this.state.activeStepSell,
                  });
                }}
              />
            ),
          },
        ]}
      />
    );
  };

  render() {
    return (
      <AppBar>
        {isDealer() ? (
          this.renderStepper()
        ) : (
          this.renderStepper())}
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const AddNewOrder = connect<{}, {}, IAddNewOrderProps>(mapStateToProps)(
  AddNewOrderImpl
);

const DispatchedScreen = (props) => {
  return (
    <div style={{ width: "100%" }} className="card-container dispatch-card">
      <Typography variant="h4">Dispatched</Typography>
      <Grid container className="">
        <Grid item className="padding-6" md={6} xs={12} lg={6}>
          <span className="description-text">Order ID -</span>
          <span className="disp-details"> {invoiceData.orderID}</span>
        </Grid>
        <Grid item className="padding-6" md={6} xs={12} lg={6}>
          <span className="description-text">Order Date:</span>
          <span className="disp-details"> {invoiceData.dateOfIssue}</span>
        </Grid>
      </Grid>
      <Grid container className="">
        <Grid item className="padding-6" md={6} xs={12} lg={6}>
          <span className="description-text">Total Items -</span>
          <span className="disp-details"> {invoiceData.totalItems}</span>
        </Grid>
        <Grid item className="padding-6" md={6} xs={12} lg={6}>
          <span className="description-text">Order Total:</span>
          <span className="disp-details"> {invoiceData.orderTotal}</span>
        </Grid>
      </Grid>
      <Grid container className="">
        <Grid item className="padding-6" md={12} xs={12} lg={12}>
          <span className="description-text">Courier Name -</span> Blue Dart
          Express Ltd.
          <div className="disp-details">
            {" "}
            <span className="description-text">Consignment No. -</span>{" "}
            89712345676
          </div>
          <div className="disp-details">
            <span className="description-text"> Shipping Date - </span>
            10/05/2020
          </div>
        </Grid>
      </Grid>{" "}
      <div className="align-center padding-6">
        <Button onClick={props.onClick} variant="contained" color="primary">
          Next
        </Button>
      </div>
    </div>
  );
};

const PaymentDetailsScreen = (props) => {
  return (
    <Grid container className="align-center">
      <Grid item xs={12} md={6} lg={6}>
        <div className="card-container no-hover payment-mode">
          <div className="head-title">Payment Mode and Details</div>
          <div className="product-selection">
            <GSelect
              className="r-select"
              classNamePrefix="r-select-pre"
              placeholder="Select Payment Type"
              onChange={props.handleChange}
              options={options}
              isSearchable={false}
            />
          </div>
          <div className="product-selection">
            <GSelect
              className="r-select"
              isSearchable={false}
              onChange={props.handleChange}
              placeholder="Select Payment Method"
              options={options1}
            />
          </div>{" "}
          <div className="product-selection">
            <TextField
              id="filled-textarea"
              label="Remarks"
              rows={4}
              variant="outlined"
              multiline={true}
              className="r-select"
            />
          </div>{" "}
          <div className="button-container">
            <Button variant="contained" color="default">
              Cancel
            </Button>
            <Button onClick={props.onClick} variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const SubmittedScreen = (props) => {
  return (
    <div className="card-container">
      <Grid container={true}>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text"> Order ID -</span>
          ON-26541
        </Grid>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text"> Order Date - </span>
          10/05/2020
        </Grid>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text"> Total Items -</span>
          25 Order
        </Grid>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text">Total -</span>
          1742000
        </Grid>
      </Grid>
      <div className="align-center padding-6">
        <Button onClick={props.onClick} variant="contained" color="primary">
          Next
        </Button>
      </div>
    </div>
  );
};



//   <Tabs
//     tabsData={[
//       { tabName: "Buy", component: this.renderStepper() },
//       {
//         tabName: "Sell",
//         component: this.renderSellStepper(),
//       },
//     ]}
//   />
// )}
