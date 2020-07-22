import { Button, Grid, TextField, Typography } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { Tabs } from "src/components/Tabs";
import AppBar from "src/navigation/App.Bar";
import { isDealer, IHistory } from "src/state/Utility";
import { Stepper } from "./Stepper";
import "./buyOrders.scss";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete"
import moment from 'moment';
import { GSelect } from "src/components/GSelect";
import { BaseModal } from "src/components/BaseModal";

export interface IAddNewOrderProps {
  history: IHistory;
  isDealer: boolean;
  orderType: string;
  location: any;
}
const options = [
  { value: "loan", label: "Loan" },
  { value: "Upfront", label: "Up Front" },
];
const options1 = [
  { value: "cc/dc", label: "CC/DC" },
  { value: "netbanking", label: "Net Banking" },
  { value: "UPI", label: "UPI" },
];

const products = [
  { value: "3 Wheeler - SKU1234", label: "3 Wheeler - SKU1234" },
  { value: "3 Wheeler - SKU1234", label: "3 Wheeler - SKU1234" },
  { value: "3 Wheeler - SKU1234", label: "3 Wheeler - SKU1234" },
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
  constructor(props: IAddNewOrderProps, any) {
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
      list:[1,2,3]
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

  public activeStepBuyChange =() =>{
    this.setState({ activeStepBuy: this.state.activeStepBuy + 1 })
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
          <Button variant="contained" color="default"
          onClick={() => this.props.history.goBack()}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (label === "Add") {
                this.props.history.goBack()
                // return;
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

  public renderStepper = (orderdetails, products) => {
    return (
      <Stepper
        identifier="buy"
        activeStep={this.state.activeStepBuy}
        stepData={[
          {
            label: "Draft",
            component: 
            <RenderForm label="Submit" type="buy" history={this.props.history} orderdetails={orderdetails} products={products}
            onClick={this.activeStepBuyChange} 
            />
            // this.renderForm("Submit", "buy"),
          },
          {
            label: "Submitted",
            component: (
              <SubmittedScreen
                orderdetails={orderdetails}
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
                    {/* <div className="head-title padding-6 ">Proforma Invoice</div> */}
                    <Typography variant="h5">Proforma Invoice</Typography>
                    <div className="invoice-date padding-6">
                      <div>
                        {" "}
                        <span className="description-text">
                          Invoice No -{" "}
                        </span>{" "}
                        {orderdetails && orderdetails.ordernumber}
                      </div>
                      <div>
                        {" "}
                        <span className="description-text">{" "}
                          Date of Issue -
                        </span>{" "}
                        10/02/2020
                      </div>
                    </div>
                    <div className="padding-6 invoice-add">
                      {" "}
                      <span className = "description-text">
                        Billed to -
                      </span>{" "}
                      {orderdetails && orderdetails.billingstreet} {orderdetails && orderdetails.billingcity} {orderdetails && orderdetails.billingpostalcode} {orderdetails && orderdetails.billingstate} {orderdetails && orderdetails.billingcountry}
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
                        {products.map((p, index) => (
                          <div key={index} className="data-inner">
                            <div className="data">{p.prd_name__c}</div>
                            <div className="data">{p.unitprice}</div>
                            <div className="data">{p.quantity}</div>
                            <div className="data">{p.totalprice}</div>
                          </div>
                        ))}
                      </div>
                      <div className="bill-total">
                        <div>
                          <span className="description-text">Sub Total:</span>
                          {products.reduce(
                            (s, a) => Number(a.totalprice)+ s,
                            0
                          )}
                        </div>
                        <div>
                          <span className="description-text">Tax - 18% -</span>
                          {(products.reduce(
                            (s, a) => Number(a.totalprice) + s,
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
                          {products.reduce(
                            (s, a) => Number(a.totalprice) + s,
                            0
                          ) +
                            (products.reduce(
                              (s, a) => Number(a.totalprice) + s,
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
                orderdetails={orderdetails}
                onClick={() =>
                  this.setState({
                    activeStepBuy: this.state.activeStepBuy + 1,
                  })
                }
                handleChange={this.handleChange}
                history= {this.props.history}
              />
            ),
          },
          {
            label: "Dispatched",
            component: (
              <DispatchedScreen
                orderdetails={orderdetails}
                onClick={() =>
                  this.setState({
                    activeStepBuy: this.state.activeStepBuy + 1,
                  })
                }
              />
            ),
          },
          { label: "GRN", 
            component: 
            <RenderForm label="Confirm" type="buy" orderdetails={orderdetails} products={products}
              onClick={() => {
                this.setState({activeStepBuy: this.state.activeStepBuy + 1});
                this.props.history.goBack();
              }} 
              history={this.props.history}
            />
            // this.renderForm("Add", "buy") ,
        }
        ]}
      ></Stepper>
    );
  };

  public renderSellStepper = (orderdetails, products) => {
    return (
      <Stepper
        identifier="sell"
        activeStep={this.state.activeStepSell}
        stepData={[
          {
            label: "Draft",
            component: 
            <RenderForm label="Submit" type="sell" orderdetails={orderdetails} products={products}
              onClick={() => {
                this.setState({
                  activeStepSell: this.state.activeStepSell + 1,
                });
              }}
            history={this.props.history}
            />
            // this.renderForm("Submit", "sell"),
          },
          {
            label: "Submitted",
            component: (
              <SubmittedScreen
                orderdetails={orderdetails}
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
                orderdetails={orderdetails}
                onClick={() => {
                  this.setState({
                    activeStepSell: this.state.activeStepSell + 1,
                  });
                }}
                handleChange={this.handleChange}
              />
            ),
          },
          {
            label: "Dispatched",
            component: (
              <DispatchedScreen
                orderdetails={orderdetails}
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
    console.log("this.props: ",this.props);

    const { orderdetails, products} = this.props.location;

    return (
      <AppBar>
        {isDealer() ? (
          this.renderStepper(orderdetails, products)
          ) : (
          this.props.location.orderType === "Buy" ?
            this.renderStepper(orderdetails, products)
          : this.renderSellStepper(orderdetails, products) 
          )
        }
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

class RenderForm extends React.Component <any> {
  constructor(props){
    super(props);
  }
  state = {
    list: this.props.products 
    ? this.props.products.map((p ,i)=> {return({label: i, product: p.prd_name__c, quantity: p.quantity})} )
    : [{label: 1, product: "", quantity: "10"}, {label: 2, product: "", quantity: "10"}, {label: 3, product: "", quantity: "10"}, {label: 4, product: "", quantity: "10"}],
    product1: null,
    product2: null,
    product3: null,
    product4: null,
    qty1: 10,
    qty2: 10,
    qty3: 10,
    qty4: 10,
  };

  handleChange = (value: any, key: number) => {
    const arr = this.state.list.filter((item) => item.label === key ? item.product = value : null)
        if(arr.length === 0 ){
          this.state.list.push({ label: key, product: value })
        }
    // this.setState({
    //   [key]: value as any,
    // });
    console.log(this.state.list);
  };

  renderValueManipulator = (key, i) => (
    <div className="increaser">
      <div
        onClick={() => {
          var val = this.state.list;
          console.log(val[i].quantity)
          val[i].quantity = Number(val[i].quantity) + 1;
          this.setState({ list: val});
          console.log(this.state.list);
          // this.setState({ [key]: this.state[key] + 1 })
        }}
        className="plus hover"
      >
        +
      </div>
      <div className="value">
        {this.state.list[i].quantity}
        {/* {this.state[key]} */}
      </div>
      <div
        onClick={() => {
          var val = this.state.list;
          val[i].quantity = Number(val[i].quantity) - 1;
          this.setState({ list: val})
          // this.setState({ [key]: this.state[key] + 1 })
        }}
        className="minus hover"
      >
        -
      </div>
    </div>
  );

  renderAddProduct = (item, i) => {
    const prod = item.product !== "" && {label: item.product};
    return(
      <div className="product-selection">
        <Grid item xs={4} md={6} sm={6}>
          <Select
            className="r-select"
            classNamePrefix="r-select-pre"
            value={prod}
            options={products}
            onChange={(v: any) => this.handleChange(v.label, item.label)}
            isSearchable={false}
          />{" "}
        </Grid>
        <Grid item xs={4} md={4} sm={4}>
          {this.renderValueManipulator(item, i)}
        </Grid>
      </div>
    )
  }

  onClickChng =() => {
    var val = this.state.list;
    val.push({label: this.state.list.length + 1, product: "", quantity: "10"});
    this.setState({ list: val})
  }
  
  render(){
    console.log(this.props)
    const products = this.props.products;

    return(
      <div className="card-container no-hover">
        {!isDealer() && this.props.label === "Sell"?
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12}>
            <Autocomplete
              id="combo-box-demo"
              blurOnSelect={true}
              options={[{label: "Dealer 1"}, {label: "Dealer 2"}, {label: "Dealer 3"}]}
              getOptionLabel={option => option.label}
              // style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Select Dealer" variant="outlined" />
              )}
            />
          </Grid>
        </Grid>
        : null}
        {this.state.list.map((item, i) => (
            <Grid container spacing={4}>
                {this.renderAddProduct(item, i)}
            </Grid>
          ))}
        {this.props.label !== "Confirm" ?
          <Grid container spacing={4}>
            <Grid item xs={6} md={6} sm={6}></Grid>
              <Grid item xs={6} md={6} sm={6}>
                <Button onClick={this.onClickChng} variant="contained" color="primary" >                
                    ADD PRODUCT
                </Button>
            </Grid>
          </Grid>
        : null}

        {this.props.label !== "Confirm" ?
          <div className="button-container">
            <Button variant="contained" color="default"
            onClick={() => this.props.history.goBack() }>
              Cancel
            </Button>
            <Button onClick={this.props.onClick}
              variant="contained"
              color="primary"
            >
              {this.props.label}
            </Button>
          </div>
        :
          <div className="align-center padding-6" style={{marginTop: 25}}>
            <Button onClick={this.props.onClick} variant="contained" color="primary">
              {this.props.label}
            </Button>
          </div>
        }
      </div>
    );
  }
}

const DispatchedScreen = (props) => {
  const details = props.orderdetails || [];

  return (
    <div style={{ width: "100%" }} className="card-container dispatch-card">
      <Typography variant="h5">Dispatched</Typography>
      <Grid container className="">
        <Grid item className="padding-6" md={6} xs={12} lg={6}>
          <span className="description-text">Order ID -</span>
          <span className="disp-details"> {details.orderid}</span>
        </Grid>
        <Grid item className="padding-6" md={6} xs={12} lg={6}>
          <span className="description-text">Order Date:</span>
          <span className="disp-details"> {moment(details.effectivedate).format("DD/MM/YYYY")}</span>
        </Grid>
      </Grid>
      <Grid container className="">
        <Grid item className="padding-6" md={6} xs={12} lg={6}>
          <span className="description-text">Total Items -</span>
          <span className="disp-details"> {details.quantity}</span>
        </Grid>
        <Grid item className="padding-6" md={6} xs={12} lg={6}>
          <span className="description-text">Order Total:</span>
          <span className="disp-details"> {details.totalamount}</span>
        </Grid>
      </Grid>
      <Grid container className="">
        <Grid item className="padding-6" md={12} xs={12} lg={12}>
          <span className="description-text">Courier Name -</span>
          <span className="disp-details"> {details.courier_name__c}</span>
          <div className="disp-details">
            {" "}
            <span className="description-text">Consignment No. -</span>{" "}
            <span className="disp-details"> {details.Consignment_No__c}</span>
          </div>
          <div className="disp-details">
            <span className="description-text"> Shipping Date - </span>
            <span className="disp-details"> {moment(details.Shipping_date__c).format("DD/MM/YYYY")}</span>
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
  const details = props.orderdetails;
  const paymentMode = details && { label: details && details.payment_mode__c};
  const paymentType = details && { label: details && details.payment_type__c};
  return (
    <Grid container className="align-center">
      <Grid item xs={12} md={6} lg={6}>
        <div className="card-container no-hover payment-mode">
          {/* <div className="head-title">Payment Mode and Details</div> */}
          <Typography variant="h5">Payment Mode and Details</Typography>
          <div className="product-selection">
            <Select
              className="r-select"
              classNamePrefix="r-select-pre"
              placeholder="Select Payment Type" 
              value={paymentMode}
              onChange={props.handleChange}
              options={options}
              isSearchable={false}
            />
          </div>
          <div className="product-selection">
            <Select
              className="r-select"
              isSearchable={false}
              value={paymentType}
              onChange={props.handleChange}
              placeholder="Select Payment Method"
              options={options1}
            />
          </div>{" "}
          <div className="product-selection">
            <TextField
              id="filled-textarea"
              // label="Remarks"
              placeholder="Remarks"
              rows={4}
              variant="outlined"
              multiline={true}
              className="r-select"
            />
          </div>{" "}
          <div className="button-container">
            <Button variant="contained" color="default"
            onClick={() => props.history.goBack()}>
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
  const details = props.orderdetails || [];
  console.log(details)
  return (
    <div className="card-container">
      <Grid container={true}>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text"> Order ID -</span>
          {details.orderid || ""}
        </Grid>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text"> Order Date - </span>
          {moment(details.effectivedate).format("DD/MM/YYYY") || ""}
        </Grid>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text"> Total Items -</span>
          {details.quantity || ""}
        </Grid>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text">Total -</span>
          {details.totalamount || ""}
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
