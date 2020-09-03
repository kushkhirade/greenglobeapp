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
import getData from "src/utils/getData";
import { getToken } from "src/state/Utility";
import { saveOrderData } from "src/actions/App.Actions";
import { BaseModal } from "src/components/BaseModal";
import { values } from "lodash";
import { getDefaultSettings } from "http2";
import { Console } from "console";

var loggedInUserDetails;

export interface IAddNewOrderProps {
  history: IHistory;
  isDealer: boolean;
  orderType: string;
  location: any;
  orderdetails: any;
}
const options = [
  { value: "loan", label: "Loan" },
  { value: "Upfront", label: "Upfront" },
];
const options1 = [
  { value: "CC/DC", label: "CC/DC" },
  { value: "Net Banking", label: "Net Banking" },
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
  billHeads: ["  Item Name   ", "Unit Cost", "Quantity", "Amount"],
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
      orderedproducts: this.props.location.orderedproducts,
      orderdetails: this.props.location.orderdetails,
    };
  }

  componentDidMount(){
    loggedInUserDetails = getToken().data;
    console.log("loggedInUserDetails: ", loggedInUserDetails);
  }

  getAllOrderedProducts = async (data, orderdetails) => {
    console.log(orderdetails);
    console.log("data: ", data);
    try {
        const orderedproducts = await getData({
          query: `select * from salesforce.orderitem where orderid = '${this.state.orderdetails.sfid}'`,
          token: data.token
        })
        console.log("orderedproducts =>", orderedproducts);
        return orderedproducts.result;

    } catch (e) {
      console.log('fetch Inventory Error', e)
    }
  }

  UpdateAnOrder = async (data, orderdetails, details) => {
    console.log("data: ", data);
    console.log("orderdetails: ", orderdetails);
    console.log("details: ", details);

    let updateorder;
    try{
      if(details.details && details.details.paymentType ){
        updateorder = await getData({
          query: `UPDATE salesforce.order SET 
          Payment_Type__c = '${details.details.paymentType}', 
          Payment_Mode__c = '${details.details.paymentMode}', 
          Description = '${details.details.description}' 
          WHERE id='${orderdetails.id}'`,
          token: data.token
        });
      }
      if(details.details && details.details.courierName ){
        updateorder = await getData({
          query: `update salesforce.order set 
          Consignment_No__c = '${details.details.consignmentNo}',
          Courier_Name__c='${details.details.courierName}',
          Shipping_Date__c ='${details.details.shippingDate}'
          where id='${orderdetails.id}' returning id`,
          token: data.token
        })
      }
      else{
        updateorder = await getData({
          query: `UPDATE salesforce.order SET 
          Sold_To_Dealer__c = '${details}'
          WHERE id='${orderdetails.id}'`,
          token: data.token
        });   
      }
      console.log("updateorder => ", updateorder);
    }
    catch(e){
      console.log(e);
    }
  }

  InsertUpdateItems = async (data, orderdetails, selectedProducts) => {
    console.log("this.props ", this.props.location.orderType);
    console.log("selectedProducts ", selectedProducts);
    console.log("orderdetails ", orderdetails);
    const orderType = this.props.location.orderType;
    const UniqueId = orderdetails.app_id__c ? orderdetails.app_id__c : new Date();
    let insertuser;
  
    try{
      if(!orderdetails && !orderdetails.sfid ){
        if(data.record_type === "0122w000000cwfSAAQ"){
            
          const SFID = await getData({
            query: `select Assigned_distributor__c from salesforce.account where sfid = '${data.sfid}'`,
            token : data.token
          })
          console.log("SFID: ", SFID)
          insertuser = await getData({
            query: `INSERT INTO salesforce.order
            (status, EffectiveDate, Pricebook2Id, Sold_To_Dealer__c, AccountId, recordtypeid, app_id__c)
            values
            ('Ordered', '${moment(new Date()).format("MM/DD/YYYY")}', '01s2w000003BsOZAA0','${data.sfid}', 
            '${SFID.result[0].assigned_distributor__c}', '0122w000000UJe1AAG', '${UniqueId}' )
            RETURNING Id`,
            token: data.token
          });
        }
        else if(data.record_type === "0122w000000cwfNAAQ"){
          if(orderType === "Buy"){
            insertuser = await getData({
              query: `INSERT INTO salesforce.order
              (status, EffectiveDate, Pricebook2Id, accountid, recordtypeid, app_id__c)
              values
              ('Ordered', '${moment(new Date()).format("MM/DD/YYYY")}', '01s2w000003BsOZAA0', '${data.sfid}', '0122w000000UJdmAAG', '${UniqueId}')
              RETURNING Id`,
              token: data.token
            });
          }
          else{
            insertuser = await getData({
              query: `INSERT INTO salesforce.order
              (status, EffectiveDate, Pricebook2Id, accountid, recordtypeid, app_id__c)
              values
              ('Ordered', '${moment(new Date()).format("MM/DD/YYYY")}', '01s2w000003BsOZAA0', '${data.sfid}', '0122w000000UJe1AAG', '${UniqueId}' )
              RETURNING Id`,
              token: data.token
            });
          }
        }
      }
      console.log("insertuser => ", insertuser);

      selectedProducts.map(async (x) => 
        { x.itemNumber ? 
          insertuser = await getData({
            query: `update salesforce.orderitem set quantity = ${x.quantity} 
            where OrderItemNumber = '${x.itemNumber}' RETURNING id`,
            token: data.token
          }) 
        :
          x.quantity !== "0" &&
            (insertuser = await getData({
              query: `INSERT INTO salesforce.orderitem 
              (pricebookentryid, product2id, quantity, unitprice, Order__app_id__c) 
              VALUES (
                (select sfid from salesforce.pricebookentry where product2id like '%${x.sfid}%'),
                '${x.sfid}',
                ${x.quantity},
                (select unitprice from salesforce.pricebookentry where product2id like '%${x.sfid}%'),
                '${UniqueId}'
              )
              RETURNING id`,
              token: data.token
            }))
        }
      )
      console.log("insertuser =>", insertuser);

    }catch(e){
      console.log(e);
    }
  }

  public onStepChange = (tabName: string) => {
    this.setState({
      value: tabName,
    });
  };

  public renderStepper = ( ) => {
    const { orderedproducts, orderdetails } = this.state;
    console.log("this.state: ", this.state)
    return (
      <Stepper
        identifier="buy"
        activeStep={this.state.activeStepBuy}
        onChangeStep={ (index) =>  this.setState({ activeStepBuy: index })}
        stepData={[
          {
            label: "Draft",
            component: 
            <RenderForm label="Submit" type="buy" history={this.props.history} 
              orderedproducts={orderedproducts} 
              onClick={( selectedProducts ) => {
                this.setState({ orderedproducts: selectedProducts });
                this.InsertUpdateItems(loggedInUserDetails, orderdetails, selectedProducts );
                this.setState({ activeStepBuy: this.state.activeStepBuy + 1 })
              }} 
            />,
            // this.renderForm("Submit", "buy"),
          },
          {
            label: "Submitted",
            component: (
              <SubmittedScreen
                orderdetails={orderdetails}
                orderedproducts={orderedproducts} 
                onClick={async() =>{
                  // const res = await this.getAllOrderedProducts(loggedInUserDetails, orderdetails)
                  // this.setState({ orderedproducts: res });
                  this.setState({ activeStepBuy: this.state.activeStepBuy + 1 })
                }}
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
                        {orderedproducts && orderedproducts.map((p, index) => {
                          if(p.quantity !== "0"){
                            return( 
                              <Grid key={index} className="data-inner" container>
                              {console.log("p==> ", p)}
                                <Grid item xs={4} className="data">{p.prd_name__c}</Grid>
                                <Grid item xs={4} className="data">{p.unitprice}</Grid>
                                <Grid item xs={3} className="data">{p.quantity}</Grid>
                                <Grid item xs={1} className="data">{p.totalprice ?? p.quantity*p.unitprice}</Grid>
                              </Grid>
                            )
                          }
                        })}
                      </div>
                      <div className="bill-total">
                        <div>
                          <span className="description-text">Sub Total:</span>
                          {orderedproducts && orderedproducts.reduce(
                            (s, a) => Number(a.totalprice ?? a.quantity*a.unitprice)+ s,
                            0
                          )}
                        </div>
                        <div>
                          <span className="description-text">Tax - 18% -</span>
                          {(orderedproducts && orderedproducts.reduce(
                            (s, a) => Number(a.totalprice ?? a.quantity*a.unitprice) + s,
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
                          {orderedproducts && orderedproducts.reduce(
                            (s, a) => Number(a.totalprice ?? a.quantity*a.unitprice) + s,
                            0
                          ) +
                            (orderedproducts && orderedproducts.reduce(
                              (s, a) => Number(a.totalprice ?? a.quantity*a.unitprice) + s,
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
                onClick={(details) =>{
                  this.UpdateAnOrder(loggedInUserDetails, orderdetails, details)
                  this.setState({ activeStepBuy: this.state.activeStepBuy + 1 })
                }}
                history= {this.props.history}
              />
            ),
          },
          {
            label: "Dispatched",
            component: (
              <DispatchedScreen
                orderdetails={orderdetails} 
                orderedproducts={orderedproducts} 
                type="buy" 
                onClick={() =>
                  this.setState({ activeStepBuy: this.state.activeStepBuy + 1,})
                }
              />
            ),
          },
          { label: "GRN", 
            component: 
            <RenderForm label="Confirm" type="buy" 
              orderdetails={orderdetails}
              orderedproducts={orderedproducts}
              onClick={() => {
                this.setState({activeStepBuy: this.state.activeStepBuy + 1});
                this.props.history.goBack();
              }} 
            />
            // this.renderForm("Add", "buy") ,
        }
        ]}
      ></Stepper>
    );
  };

  public renderSellStepper = ( ) => {
    const { orderedproducts, orderdetails } = this.state;
    console.log("this.state: ", this.state)
    return (
      <Stepper
        identifier="sell"
        activeStep={this.state.activeStepSell}
        onChangeStep={ (index) =>  this.setState({ activeStepSell: index })}
        stepData={[
          {
            label: "Draft",
            component: 
            <RenderForm label="Submit" type="sell" 
              orderedproducts={orderedproducts}
              orderdetails={orderdetails}
              onClick={( selectedProducts ) => {
                this.setState({ orderedproducts: selectedProducts });
                this.InsertUpdateItems(loggedInUserDetails, orderdetails, selectedProducts );
                this.setState({ activeStepSell: this.state.activeStepSell + 1 });
              }}
              onSelectDelaer={(details) => this.UpdateAnOrder(loggedInUserDetails, orderdetails, details)}
              history={this.props.history}
            />
            // this.renderForm("Submit", "sell"),
          },
          {
            label: "Submitted",
            component: (
              <SubmittedScreen
                orderdetails={orderdetails}
                orderedproducts={orderedproducts} 
                onClick={async() =>{
                  // const res = await this.getAllOrderedProducts(loggedInUserDetails, orderdetails)
                  // this.setState({ orderedproducts: res });
                  this.setState({ activeStepSell: this.state.activeStepSell + 1 })
                }}
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
                        {orderedproducts && orderedproducts.map((p, index) => {
                          if(p.quantity !== "0"){
                            return( 
                              <Grid key={index} className="data-inner" container>
                              {console.log("p==> ", p)}
                                <Grid item xs={4} className="data">{p.prd_name__c}</Grid>
                                <Grid item xs={4} className="data">{p.unitprice}</Grid>
                                <Grid item xs={3} className="data">{p.quantity}</Grid>
                                <Grid item xs={1} className="data">{p.totalprice ?? p.quantity*p.unitprice}</Grid>
                              </Grid>
                            )
                          }
                        })}
                      </div>
                      <div className="bill-total">
                        <div>
                          <span className="description-text">Sub Total:</span>
                          {orderedproducts && orderedproducts.reduce(
                            (s, a) => Number(a.totalprice  ?? a.quantity*a.unitprice)+ s,
                            0
                          )}
                        </div>
                        <div>
                          <span className="description-text">Tax - 18% -</span>
                          {(orderedproducts && orderedproducts.reduce(
                            (s, a) => Number(a.totalprice  ?? a.quantity*a.unitprice) + s,
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
                          {orderedproducts && orderedproducts.reduce(
                            (s, a) => Number(a.totalprice  ?? a.quantity*a.unitprice) + s,
                            0
                          ) +
                            (orderedproducts && orderedproducts.reduce(
                              (s, a) => Number(a.totalprice  ?? a.quantity*a.unitprice) + s,
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
                            activeStepSell: this.state.activeStepSell + 1,
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
                onClick={(details) =>{
                  this.UpdateAnOrder(loggedInUserDetails, orderdetails, details)
                  this.setState({ activeStepSell: this.state.activeStepSell + 1 })
                }}
              />
            ),
          },
          {
            label: "Dispatched",
            component: (
              <DispatchedScreen
                orderdetails={orderdetails} 
                orderedproducts={orderedproducts} 
                type="sell" 
                onClick={(details) => {
                  this.props.history.goBack();
                  this.UpdateAnOrder(loggedInUserDetails, orderdetails, details)
                  this.setState({ activeStepSell: this.state.activeStepSell, });
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
    const { orderedproducts, orderdetails } = this.state;

    return (
      <AppBar>
        {isDealer() ? (
          this.renderStepper()
          ) : (
          this.props.location.orderType === "Buy" ?
            this.renderStepper()
          : this.renderSellStepper() 
          )
        }
      </AppBar>
    );
  }
}
export function mapStateToProps(state) {
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
    orderedproducts: 
      // this.props.orderedproducts && this.props.orderedproducts.length > 0 
      // ? this.props.orderedproducts.map((p ,i)=> {
      //   return({
      //     sfid: "", prd_name__c: p.prd_name__c, quantity: p.quantity, itemNumber: p.orderitemnumber
      //   })})
       [ {sfid: "01t1s000000lFhu", prd_name__c: "3 Wheeler Ace", unitprice: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace") && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace").unitprice) ?? "0",
              quantity: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace") && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace").quantity) ?? "0", 
              itemNumber: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace") && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace").orderitemnumber) ?? ""}, 
          {sfid: "01t1s000000lFYi", prd_name__c: "3 Wheeler Pro", unitprice: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace") && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace").unitprice) ?? "0",
              quantity: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Pro") && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Pro").quantity) ?? "0", 
              itemNumber: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Pro") && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Pro").orderitemnumber) ?? ""}, 
          {sfid: "01t1s000000lFYs", prd_name__c: "4 Wheeler Ace", unitprice: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace") && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace").unitprice) ?? "0",
              quantity: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "4 Wheeler Ace") && this.props.orderedproducts.find(p=> p.prd_name__c === "4 Wheeler Ace").quantity) ?? "0", 
              itemNumber: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "4 Wheeler Ace") && this.props.orderedproducts.find(p=> p.prd_name__c === "4 Wheeler Ace").orderitemnumber) ?? ""}, 
          {sfid: "01t1s000000lFYx", prd_name__c: "4 Wheeler Pro", unitprice: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace") && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace").unitprice) ?? "0",
              quantity: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "4 Wheeler Pro") && this.props.orderedproducts.find(p=> p.prd_name__c === "4 Wheeler Pro").quantity) ?? "0", 
              itemNumber: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "4 Wheeler Pro") && this.props.orderedproducts.find(p=> p.prd_name__c === "4 Wheeler Pro").orderitemnumber) ?? ""},    
        ],
    allProducts: [],
    selectedDealer: this.props.orderdetails && this.props.orderdetails.dealername__c,
    allDealers: [],
  };

  async componentDidMount(){
    loggedInUserDetails = getToken().data;
    const allProducts = await this.getAllProducts(loggedInUserDetails); 
    const allDealers = await this.getAllAssignedDealers(loggedInUserDetails);
    this.setState({ allProducts, allDealers });
    console.log("this.State =>", this.state);
    console.log("this.props =>", this.props);
    var arr = this.state.orderedproducts;
    this.props.orderedproducts && this.props.orderedproducts.map((p ,i)=> {
      if(!p.prd_name__c.includes("Wheeler")){
        arr.push({sfid: p.sfid, prd_name__c: p.prd_name__c, unitprice: (this.props.orderedproducts && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace") && this.props.orderedproducts.find(p=> p.prd_name__c === "3 Wheeler Ace").unitprice) ?? "0", quantity: p.quantity, itemNumber: p.orderitemnumber})
      }
    })
    this.setState({ orderedproducts : arr})
  }

  getUnitePrice = async (sfid) => {
    const data = getToken().data;
    console.log("data: ", data)
    console.log("sfid: ", sfid)

    try {
        const price = await getData({
          query: `select unitprice from salesforce.pricebookentry where product2id like '%${sfid}%' `,
          token: data.token
        })
        console.log("price =>", price);
        return price.result[0].unitprice;
        
    } catch (e) {
        console.log('fetch Inventory Error', e)
    }
  }

  getAllAssignedDealers = async (data) => {
    console.log("data: ",data);
    try {
        const assignedDealerData = await getData({
          query: `SELECT * FROM 
          salesforce.Account WHERE Assigned_Distributor__c = '${data.sfid}'`,
          token: data.token
        })

        console.log("assignedDealerData =>", assignedDealerData);
        return assignedDealerData.result;
        
    } catch (e) {
        console.log('fetch Inventory Error', e)
    }
  }

  getAllProducts = async (data) => {
    console.log("data: ", data)
    try {
        const products = await getData({
          query: `SELECT StockKeepingUnit, name, sfid FROM salesforce.product2 `,
          token: data.token
        })
        console.log("products =>", products);
        return products.result;
        
    } catch (e) {
        console.log('fetch Inventory Error', e)
    }
  }

  handleChange = (event: any) => {
    console.log("event: ", event);
    // const arr = this.state.orderedproducts.filter((item, i) => i === index )
    //   if(arr.length !== 0 ){
    //     const val = this.state.orderedproducts;
    //     val[index].prd_name__c = event.label;
    //     val[index].sfid = event.value;
    //     this.setState({ orderedproducts: val})
    //   }
      const arr = this.state.orderedproducts.filter((item, i) => item.prd_name__c === event.label )
      console.log("arr", arr)
      if(arr.length === 0 ){
        var val = this.state.orderedproducts;
        val.push({sfid: event.value, prd_name__c: event.label, unitprice: "0", quantity: "0", itemNumber: ""});
        this.setState({ orderedproducts: val})
      }
    
    // this.setState({
    //   [key]: value as any,
    // });
    console.log(this.state.orderedproducts);
  };

  renderValueManipulator = (key, i) => (
    <div className="increaser" >
      <div 
        onClick={async() => {
          var val = this.state.orderedproducts;
          console.log(val[i].quantity)
          val[i].quantity = Number(val[i].quantity) - 1;

          var val = this.state.orderedproducts;
          console.log("val : ", val[i])
          const res = await this.getUnitePrice(val[i].sfid);
          console.log("Price : ", res);
          val[i].unitprice = res ?? "0";
          
          this.setState({ orderedproducts: val});
          // this.setState({ [key]: this.state[key] + 1 })
        }}
        className="plus hover"
      >
        -
      </div>
      <div className="value">
        {this.state.orderedproducts[i].quantity}
        {/* {this.state[key]} */}
      </div>
      <div
        onClick={async () => {
          var val = this.state.orderedproducts;
          val[i].quantity = Number(val[i].quantity) + 1;

          var val = this.state.orderedproducts;
          console.log("val : ", val[i])
          const res = await this.getUnitePrice(val[i].sfid);
          console.log("Price : ", res);
          val[i].unitprice = res;
          
          this.setState({ orderedproducts: val})
          // this.setState({ [key]: this.state[key] + 1 })
        }}
        className="minus hover"
      >
        +
      </div>
    </div>
  );

  renderAddProduct = (item, i) => {
    return(
      <div className="product-selection">
        <Grid item xs={7} md={7} sm={6}>
          {/* {this.state.orderedproducts[i].prd_name__c === 'Tank'|| this.state.orderedproducts[i].prd_name__c === 'Spares' ? */}
          {/* <Select
            className="r-select"
            classNamePrefix="r-select-pre"
            placeholder="Select"
            value={this.state.orderedproducts[i].prd_name__c !== "" && {label: this.state.orderedproducts[i].prd_name__c}}
            // options={this.state.orderedproducts[i].options}
            // options={this.state.allProducts.map(p => ({
            //   label: p.stockkeepingunit,
            //   value: p.sfid
            // }))}
            onChange={(event: any) => this.handleChange(event, i)}
            isSearchable={false}
          /> 
          : */}
           <input
           {...console.log("item", item)}
              className="r-select"
              style={{textAlign: 'center'}}
              type="text"
              disabled={true}
              placeholder={this.state.orderedproducts[i].prd_name__c}
            />
          {/* } */}
        </Grid>
        <Grid item xs={4} md={4} sm={4}>
          {this.renderValueManipulator(item, i)}
        </Grid>
      </div>
    )
  }

  onClickChng = async() => {
    var val = this.state.orderedproducts;
    val.push({sfid: "", prd_name__c: "", unitprice: "", itemNumber: "", quantity: "0"});
    this.setState({ orderedproducts: val})
  }
  
  render(){
    console.log(this.props);
    console.log(this.state);
    return(
      <div className="card-container no-hover">
        {!isDealer() && this.props.type === "sell"?
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12}>
            <Select 
              className="r-select"
              classNamePrefix="r-select-pre"
              placeholder="Select Dealer"
              options={this.state.allDealers.map(p => ({
                label: p.name,
                value: p.sfid
              }))}
              value={this.state.selectedDealer && {label: this.state.selectedDealer}}
              onChange={(e)=> {
                this.setState({ selectedDealer: e.label });
                this.props.onSelectDelaer( e.value );
              }}
            />
          </Grid>
        </Grid>
        : null}
        {this.state.orderedproducts.map((item, i) => {
          if(item.prd_name__c.includes("Wheeler")){
            return(
              <Grid container spacing={4}>
                {this.renderAddProduct(item, i)}
              </Grid>
            )
          }
        })}
        <Grid container spacing={4}>
          <Grid item xs={6} md={6} sm={6}>
            <Select
              className="r-select"
              classNamePrefix="r-select-pre"
              placeholder="Tank"
              value={{label: "Tank"}}
              options={[{label: "Tank 30", value: "01t1s000000kmG6AAI"}, 
              {label: "Tank 35", value: "01t1s000000kmFXAAY"}, 
              {label: "Tank 60", value: "01t2w000003prqWAAQ"}, 
              {label: "Tank 65", value: "01t1s000000kvWaAAI"}, 
              {label: "Tank 70", value: "01t2w000003qExfAAE"}, 
              {label: "Tank 75", value: "01t2w00000451IkAAI"}, 
              {label: "Tank 90", value: "01t1s000000kgZiAAI"}
            ]}
              onChange={(event: any) => this.handleChange(event)}
              isSearchable={false}
            /> 
          </Grid>
        </Grid>
        {this.state.orderedproducts.map((item, i) => {
          if(item.prd_name__c.includes("Tank")){
            return(
              <Grid container spacing={4}>
                {this.renderAddProduct(item, i)}
              </Grid>
            )
          }
        })}
        <Grid container spacing={4}>
            <Grid item xs={6} md={6} sm={6}>
              <Select
                className="r-select"
                classNamePrefix="r-select-pre"
                placeholder="Spare"
                value={{label: "Spare"}}
                options={[{label: "Spare 1", value: "01t2w000000XnsXAAS"}, 
                {label: "Spare 2", value: "01t2w000002OB4cAAG"}, 
                {label: "Spare 3", value: "01t2w000002OB4SAAW"}, 
                {label: "Spare 4", value: "01t2w000002OB4NAAW"}, 
                {label: "Spare 5", value: "01t2w000002OB4XAAW"},
              ]}
                onChange={(event: any) => this.handleChange(event)}
                isSearchable={false}
              /> 
            </Grid>
          </Grid>
          {this.state.orderedproducts.map((item, i) => {
            if(item.prd_name__c.includes("Spare")){
              return(
                <Grid container spacing={4}>
                  {this.renderAddProduct(item, i)}
                </Grid>
              )
            }
          })}

        {/* {this.props.label !== "Confirm" ?
          <Grid container spacing={4}>
            <Grid item xs={6} md={6} sm={6}></Grid>
              <Grid item xs={6} md={6} sm={6}>
                <Button onClick={this.onClickChng} variant="contained" color="primary" >                
                    ADD PRODUCT
                </Button>
            </Grid>
          </Grid>
        : null} */}

        {this.props.label !== "Confirm" ?
          <div className="button-container">
            <Button variant="contained" color="default"
            onClick={() => this.props.history.goBack() }>
              Cancel
            </Button>
            <Button 
              onClick={() => this.props.onClick( this.state.orderedproducts)}
              variant="contained"
              color="primary"
            >
              {this.props.label}
            </Button>
          </div>
        :
          <div className="align-center padding-6" style={{marginTop: 25}}>
            <Button variant="contained" color="primary"
              onClick={() => this.props.onClick( this.state.orderedproducts)}
            >
              {this.props.label}
            </Button>
          </div>
        }
      </div>
    );
  }
}

class DispatchedScreen extends React.Component <any> {
  constructor(props){
    super(props);
  }

  state={
    details: [],
    courierName: "",
    consignmentNo: "",
    shippingDate: "",
  }

  async componentDidMount(){
    console.log("this.props: ", this.props.orderdetails)
    const res = await this.getOrderDetails(loggedInUserDetails, this.props.orderdetails);
    this.setState({ details: res })
  }

  getOrderDetails = async (data, details) => {
    console.log("data: ", data);
    try {
        const orderedproducts = await getData({
          query: `select * from salesforce.order where id = '${details.id}'`,
          token: data.token
        })
        console.log("orderedproducts =>", orderedproducts);
        this.setState({
          courierName: orderedproducts.result[0].courier_name__c || "", 
          consignmentNo: orderedproducts.result[0].Consignment_No__c || "",
          shippingDate: orderedproducts.result[0].shipping_date__c || ""
        })
        return orderedproducts.result;

    } catch (e) {
      console.log('fetch Order Error', e)
    }
  };

  render(){
    console.log("props: ", this.props)
    const details = this.state.details && this.state.details[0];
    const productQuantity = this.props.orderedproducts.filter(op => op.quantity !== "0").length;
    const totalAmount = this.props.orderedproducts && this.props.orderedproducts.reduce((s, a) => Number(a.quantity * a.unitprice) + s, 0 );

    return (
      <div style={{ width: "100%" }} className="card-container dispatch-card">
        <Typography variant="h5">Dispatched</Typography>
        <Grid container className="">
          <Grid item className="padding-6" md={6} xs={12} lg={6}>
            <span className="description-text">Order ID -</span>
            <span className="disp-details"> {details && details.ordernumber}</span>
          </Grid>
          <Grid item className="padding-6" md={6} xs={12} lg={6}>
            <span className="description-text">Order Date:</span>
            <span className="disp-details"> {details && details.effectivedate && moment(details.effectivedate).format("DD/MM/YYYY")}</span>
          </Grid>
        </Grid>
        <Grid container className="">
          <Grid item className="padding-6" md={6} xs={12} lg={6}>
            <span className="description-text">Total Items -</span>
            {/* <span className="disp-details"> {details && details.product_quantity__c}</span> */}
            <span className="disp-details"> {productQuantity}</span>
          </Grid>
          <Grid item className="padding-6" md={6} xs={12} lg={6}>
            <span className="description-text">Order Total:</span>
            {/* <span className="disp-details"> {details && details.totalamount}</span> */}
            <span className="disp-details"> {totalAmount}</span>
          </Grid>
        </Grid>
        <Grid container className="">
          <Grid item className="padding-6" md={6} xs={12} lg={6}>
            <span className="description-text">Courier Name -</span>
            { this.props.type === "sell"
              ? details && details.courier_name__c 
                && <span className="disp-details"> {details && details.courier_name__c}</span>
                || <input
                  onChange={(e) => this.setState({courierName: e.target.value}) }
                  className="input-field"
                  style={{marginTop: '2px'}}
                  type="text"
                  placeholder="Courier Name"
                />
              : <span className="disp-details"> {details && details.courier_name__c}</span>
            }
            {/* <div className="disp-details"> */}
          </Grid>
          <Grid item className="padding-6" md={6} xs={12} lg={6}>
            <span className="description-text">Consignment No. -</span>
            { this.props.type === "sell"
              ? details && details.consignment_no__c 
                && <span className="disp-details"> {details && details.consignment_no__c}</span>
                || <input
                  onChange={(e) => this.setState({consignmentNo: e.target.value})}
                  className="input-field"
                  style={{marginTop: '2px'}}
                  type="text"
                  placeholder="Consignment No"
                />
              : <span className="disp-details"> {details && details.consignment_no__c}</span>
            }
          </Grid>
            {/* </div>
            <div className="disp-details"> */}
          <Grid item className="padding-6" md={6} xs={12} lg={6}>
            <span className="description-text"> Shipping Date - </span>
            { this.props.type === "sell"
              ? details && details.shipping_date__c 
                && <span className="disp-details"> {moment(details.shipping_date__c).format("DD/MM/YYYY")}</span>
                || <input
                  onChange={(e) => this.setState({shippingDate: e.target.value})}
                  className="input-field"
                  style={{marginTop: '2px'}}
                  type="date"
                  placeholder="Shipping Date"
                />
              : <span className="disp-details"> {details && details.shipping_date__c && moment(details.shipping_date__c).format("DD/MM/YYYY")}</span>
            }
            {/* </div> */}
          </Grid>
        </Grid>{" "}
        <div className="align-center padding-6" style={{marginTop: '20px'}}>
          <Button 
            onClick={() => 
            this.props.onClick({details: {...this.state} })
            // this.props.onClick({details: (this.state.courierName, this.state.consignmentNo, this.state.shippingDate) })
            } 
            variant="contained" color="primary">
            Update
          </Button>
        </div>
      </div>
    );
  }
};

const PaymentDetailsScreen = (props) => {
  const details = props.orderdetails;
  const [paymentMode, setPaymentMode] = React.useState(details && details.payment_mode__c );
  const [paymentType, setPaymentType] = React.useState(details && details.payment_type__c );
  const [description, setDescription] = React.useState(details && details.description || "");
  
  // const paymentMode = details && { label: details && details.payment_mode__c};
  // const paymentType = details && { label: details && details.payment_type__c};

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
              value={paymentMode && {label: paymentMode}}
              onChange={(e) => setPaymentMode(e.label)}
              options={options}
              isSearchable={false}
            />
          </div>
          <div className="product-selection">
            <Select
              className="r-select"
              isSearchable={false}
              value={paymentType && {label: paymentType}}
              onChange={(e) => setPaymentType(e.label)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="r-select"
            />
          </div>{" "}
          <div className="button-container">
            <Button variant="contained" color="default"
            onClick={() => props.history.goBack()}>
              Cancel
            </Button>
            <Button onClick={() => props.onClick({details: {paymentMode, paymentType, description}} )} variant="contained" color="primary">
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
  console.log(props)
  const itemQuantity = props.orderedproducts && props.orderedproducts.reduce((s, a) => Number(a.quantity) + s, 0 );
  const totalAmount = props.orderedproducts && props.orderedproducts.reduce((s, a) => Number(a.quantity * a.unitprice) + s, 0 );

  return (
    <div className="card-container">
      <Grid container={true}>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text"> Order ID -</span>
          {details.ordernumber || ""}
        </Grid>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text"> Order Date - </span>
          {details.effectivedate && moment(details.effectivedate).format("DD/MM/YYYY") || ""}
        </Grid>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text"> Items Quantity -</span>
          {/* {details.item_quantity__c || ""} */}
          {itemQuantity}
        </Grid>
        <Grid item={true} className="padding-6" xs={12} md={6}>
          <span className="description-text">Total -</span>
          {/* {details.totalamount || ""} */}
          {totalAmount}
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
