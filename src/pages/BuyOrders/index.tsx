import { Button, Grid, TextField } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { Tabs } from "src/components/Tabs";
import AppBar from "src/navigation/App.Bar";
import { isDealer } from "src/state/Utility";
import "./buyOrders.scss";
import { Stepper } from "./Stepper";

export interface IBuyOrdersProps {
  data?: string;
}
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

  public renderForm = (label) => {
    return (
      <div className="card-container no-hover">
        <Grid container spacing={4}>
          <div className="product-selection">
            <Grid xs={12} md={6} sm={6}>
              <Select
                className="r-select"
                value={this.state.product1}
                onChange={(v: any) => this.handleChange(v, "product1")}
                options={products}
              />
            </Grid>
            <Grid xs={12} md={4} sm={4}>
              {this.renderValueManipulator("qty1")}
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={4}>
          <div className="product-selection">
            <Grid xs={12} md={6} sm={6}>
              <Select
                className="r-select"
                value={this.state.product2}
                options={products}
                onChange={(v: any) => this.handleChange(v, "product2")}
              />{" "}
            </Grid>
            <Grid xs={12} md={4} sm={4}>
              {this.renderValueManipulator("qty2")}
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={4}>
          <div className="product-selection">
            <Grid xs={12} md={6} sm={6}>
              <Select
                className="r-select"
                value={this.state.product3}
                options={products}
                onChange={(v: any) => this.handleChange(v, "product3")}
              />{" "}
            </Grid>
            <Grid xs={12} md={4} sm={4}>
              {this.renderValueManipulator("qty3")}
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={4}>
          <div className="product-selection">
            <Grid xs={12} md={6} sm={6}>
              <Select
                className="r-select"
                value={this.state.product4}
                options={products}
                onChange={(v: any) => this.handleChange(v, "product4")}
              />{" "}
            </Grid>
            <Grid xs={12} md={4} sm={4}>
              {this.renderValueManipulator("qty4")}
            </Grid>
          </div>
        </Grid>
        <div className="button-container">
          <Button variant="contained" color="default">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            {label}
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
            component: this.renderForm("Submit"),
          },
          {
            label: "Submitted",
            component: <SubmittedScreen />,
          },
          {
            label: "PI Raised",
            component: (
              <Grid container className="align-center">
                <Grid xs={12} md={4} lg={4}>
                  <div className="card-container no-hover">
                    <div className="head-title padding-6 ">
                      Performance Invoice
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
                    <div className="padding-6">
                      Billed to- GGFS Indiabulls, Lower Parel, Mumbai, MH
                      411093, India
                    </div>

                    <div className="invoice-table">
                      <div className="table-heads">
                        {invoiceData.billHeads.map((name) => (
                          <div className="heading">{name}</div>
                        ))}
                      </div>
                      <div className="table-data">
                        {invoiceData.billData.map((b) => (
                          <div className="data-inner">
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
                    </div>
                  </div>
                </Grid>
              </Grid>
            ),
          },
          {
            label: "Payment Details",
            component: <PaymentDetailsScreen handleChange={this.hand} />,
          },
          {
            label: "Dispatched",
            component: <DispatchedScreen />,
          },
          { label: "Add Inventory", component: this.renderForm("Add") },
        ]}
      ></Stepper>
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

  public renderSellStepper = () => {
    return (
      <Stepper
        stepData={[
          {
            label: "Draft",
            component: this.renderForm("Submit"),
          },
          {
            label: "Submitted",
            component: <SubmittedScreen />,
          },
          {
            label: "Payment Details",
            component: <PaymentDetailsScreen />,
          },
          {
            label: "Dispatched",
            component: <DispatchedScreen />,
          },
        ]}
      />
    );
  };

  public render() {
    return (
      <AppBar>
        {isDealer() ? (
          this.state.showForm ? (
            this.renderStepper()
          ) : (
            this.renderCard()
          )
        ) : (
          <Tabs
            tabsData={[
              { tabName: "Buy", component: this.renderStepper() },
              {
                tabName: "Sell",
                component: this.renderSellStepper(),
              },
            ]}
          />
        )}
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
const DispatchedScreen = () => {
  return (
    <div className="card-container">
      <div>Dispatched</div>
      <Grid container className="padding-6">
        <Grid md={6} xs={6} lg={6}>
          <span className="description-text">Order ID -</span>
          {invoiceData.orderID}
        </Grid>
        <Grid md={6} xs={6} lg={6}>
          <span className="description-text">Order Date:</span>
          {invoiceData.dateOfIssue}
        </Grid>
      </Grid>
      <Grid container className="padding-6">
        <Grid md={6} xs={6} lg={6}>
          <span className="description-text">Order ID -</span>
          {invoiceData.orderID}
        </Grid>
        <Grid md={6} xs={6} lg={6}>
          <span className="description-text">Order Date:</span>
          {invoiceData.dateOfIssue}
        </Grid>
      </Grid>
      <Grid container className="padding-6">
        <Grid md={12} xs={12} lg={12}>
          <span className="description-text">Courier Name -</span> Blue Dart
          Express Ltd.
          <br />
          <span className="description-text">Consignment No. -</span>{" "}
          89712345676
          <br />
          <span className="description-text"> Shipping Date - </span>
          10/05/2020
        </Grid>
      </Grid>
    </div>
  );
};

const PaymentDetailsScreen = (props) => {
  return (
    <Grid container className="align-center">
      <Grid xs={12} md={6} lg={6}>
        <div className="card-container no-hover payment-mode">
          <div className="head-title">Payment Mode and Details</div>
          <div className="product-selection">
            <Select
              className="r-select"
              value={null}
              placeholder="Select Payment Type"
              onChange={props.handleChange}
              options={options}
            />
          </div>
          <div className="product-selection">
            <Select
              className="r-select"
              value={null}
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
              className="form-input"
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
      </Grid>
    </Grid>
  );
};

const SubmittedScreen = () => {
  return (
    <div className="card-container">
      <Grid container={true}>
        <Grid item={true} className="padding-6" xs={6} md={6}>
          <span className="description-text"> Order ID -</span> ON-26541
        </Grid>
        <Grid item={true} className="padding-6" xs={6} md={6}>
          <span className="description-text"> Order Date - </span> 10/05/2020
        </Grid>
        <Grid item={true} className="padding-6" xs={6} md={6}>
          <span className="description-text"> Total Items -</span> 25 Order
        </Grid>
        <Grid item={true} className="padding-6" xs={6} md={6}>
          <span className="description-text">Total -</span> 1742000
        </Grid>
      </Grid>
    </div>
  );
};
