import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import "./buyOrders.scss";
import { withRouter } from "react-router-dom";
import { IHistory, isDealer } from "src/state/Utility";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import moment from 'moment';
import { Tabs } from "src/components/Tabs";
import TrakingInfoBar from "src/components/TrakingInfoBar";
import { getToken } from "src/state/Utility";
import getData from "src/utils/getData";
import { dark } from "@material-ui/core/styles/createPalette";

var loggedInUserDetails ;
export interface IBuyOrdersProps {
  data?: string;
  history: IHistory;
}

export class BuyOrdersImpl extends React.PureComponent<IBuyOrdersProps, any> {
  constructor(props: IBuyOrdersProps) {
    super(props);
    this.state = {
      value: "",
      topActiveTab: "Buy",
      orders: [],
    };
  }

  async componentDidMount(){
    loggedInUserDetails = getToken().data;
    const res = await this.getAllOrders(loggedInUserDetails);
    console.log("result ", res)
    this.setState({orders : res});
  }

  getAllOrders = async (data) => {
    console.log("token: ",data);
    // console.log("sfid: ",sfid);
    // console.log("recordtypeid: ",recordtypeid);
    let orders;
    try {
      if(data.record_type === "0122w000000cwfSAAQ"){
        orders = await getData({
          query: `SELECT * FROM salesforce.order NATURAL FULL JOIN salesforce.orderItem 
          WHERE salesforce.Order.RecordTypeId = '0122w000000UJdmAAG' 
          AND salesforce.Order.AccountId LIKE '%${data.sfid}%'`,
          token: data.token
        })
      }else if(data.record_type === "0122w000000cwfNAAQ"){
        orders = await getData({
          query: ` SELECT * FROM salesforce.order  Full OUTER JOIN 
          salesforce.orderitem ON  salesforce.order.sfid = salesforce.orderitem.orderid 
          WHERE salesforce.order.accountid LIKE '%${data.sfid}%' `,
          token: data.token
        })
      }
      // (salesforce.Order.RecordTypeId = '0122w000000UJdmAAG' || salesforce.Order.RecordTypeId = '0122w000000UJe1AAG' )
        console.log("orders =>", orders);
        return orders.result;
        
    } catch (e) {
        console.log('fetch Inventory Error', e)
    }
  }

  getAllOrderedProducts = async (data, product2ID) => {
    console.log(product2ID)
    console.log("data: ", data)
    let orders;
    try {
        orders = await getData({
          query: `SELECT * FROM salesforce.product2
          where sfid = '${product2ID}'`,
          token: data.token
        })
    
        console.log("orders =>", orders);
        return orders.result;
        
    } catch (e) {
        console.log('fetch Inventory Error', e)
    }
  }

  handleClickDetails = async (orderData) => {
    console.log(orderData)
    const products = this.getAllOrderedProducts(loggedInUserDetails, orderData.product2id);
    console.log("products: ", products);
    this.props.history.push({pathname: "/buy-order/add-new-order", 
        orderType: this.state.topActiveTab, orderdetails: orderData, products: products});
  }

  public renderCard = (orderData) => {
    return (
      <div className="cards-main">
        {orderData.map((dataValue: any, index: number) => {
          return (
            <div key={index} className="card-container">
              <div className="card-content">
                <div className="row-data">
                  <div className="data-content">
                    <span className="description-text"> Order ID: </span>
                    {dataValue.orderid}{" "}
                  </div>
                  <div className="data-content">
                    <span className="description-text"> Order Date: </span>
                    {moment(dataValue.effectivedate).format("DD/MM/YYYY")}{" "}
                  </div>
                </div>
                <div className="row-data">
                  <div className="data-content">
                    <span className="description-text">Item Quantity:</span>
                    {dataValue.quantity}{" "}
                  </div>
                  <div className="data-content">
                    <span className="description-text">Total Price:</span> 
                    {dataValue.totalprice}{" "}
                  </div>
                </div>
                <div className="row-data">
                  <div className="data-content">
                    <span className="description-text"> Order Status:</span> 
                    {dataValue.status}{" "}
                  </div>
                  <div className="data-content">
                    <span className="description-text"> Payment Mode:</span> 
                    {dataValue.payment_mode__c}{" "}
                  </div>
                </div>
                <div className="row-data">
                    {/* <span> */}
                      <TrakingInfoBar status={dataValue.status}/>
                    {/* </span> */}
                </div>
                <div className="row-data">
                  <div className="data-content">
                    <span
                      onClick={() => this.handleClickDetails(dataValue) }
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
    const orderData = this.state.orders;
    const buyOrders = orderData && orderData.filter(data => data.recordtypeid === "0122w000000UJdmAAG")
    const sellOrders = orderData && orderData.filter(data => data.recordtypeid === "0122w000000UJe1AAG")
    return (
      <AppBar>
         {isDealer() ? (
          this.renderCard(orderData)
        ) : (
          <Tabs
            tabsData={[
              { tabName: "Buy", 
                component: this.renderCard(buyOrders), 
                onTabSelect: (tabName) => this.setState({topActiveTab: tabName}) 
              },
              {
                tabName: "Sell",
                component: this.renderCard(sellOrders),
                onTabSelect: (tabName) => this.setState({topActiveTab: tabName})
              },
            ]}
          />
        )}
        <span
          style={{ position: "absolute", right: 20, bottom: 20 }}
          onClick={() => this.props.history.push({pathname: "/buy-order/add-new-order", orderType: this.state.topActiveTab})}
        >
          <Fab color="secondary" aria-labelledby="add-ticket">
            <Add />
          </Fab>
        </span>
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const BuyOrders = withRouter(
  connect<{}, {}, IBuyOrdersProps>(mapStateToProps)(BuyOrdersImpl) as any
);

const data = [
  {
    orderId: "ON-26541",
    orderDate: "10/05/2020",
    quantity: 20,
    totalPrice: "Rs.56485",
    orderStatus: "Draft",
    PaymentMode: "Upfront",
  },
  {
    orderId: "ON-26541",
    orderDate: "10/05/2020",
    quantity: 20,
    totalPrice: "Rs.56485",
    orderStatus: "Draft",
    PaymentMode: "Loan",
  },
  {
    orderId: "ON-26541",
    orderDate: "10/05/2020",
    quantity: 20,
    totalPrice: "Rs.56485",
    orderStatus: "Draft",
    PaymentMode: "Loan",
  },
  {
    orderId: "ON-26541",
    orderDate: "10/05/2020",
    quantity: 20,
    totalPrice: "Rs.56485",
    orderStatus: "Draft",
    PaymentMode: "Upfront",
  },
];
