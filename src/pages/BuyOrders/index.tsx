import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import "./buyOrders.scss";
import { withRouter } from "react-router-dom";
import { IHistory, isDealer } from "src/state/Utility";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Tabs } from "src/components/Tabs";

export interface IBuyOrdersProps {
  data?: string;
  history: IHistory;
}

export class BuyOrdersImpl extends React.PureComponent<IBuyOrdersProps, any> {
  constructor(props: IBuyOrdersProps) {
    super(props);
    this.state = {
      value: "",
    };
  }

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
                    <span> Payment Mode:</span> {dataValue.PaymentMode}{" "}
                  </div>
                </div>
                <div className="row-data">
                  <div className="data-content">
                    <span
                      onClick={() =>
                        this.props.history.push("/buy-order/add-new-order")
                      }
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
         {isDealer() ? (
          this.renderCard()
        ) : (
          <Tabs
            tabsData={[
              { tabName: "Buy", component: this.renderCard() },
              {
                tabName: "Sell",
                component: '',
              },
            ]}
          />
        )}
        <span
          style={{ position: "absolute", right: 20, bottom: 20 }}
          onClick={() => this.props.history.push("/buy-order/add-new-order")}
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
    PaymentMode: "Front",
  },
  {
    orderId: "ON-26541",
    orderDate: "10/05/2020",
    quantity: 20,
    totalPrice: "Rs.56485",
    orderStatus: "Draft",
    PaymentMode: "Back",
  },
  {
    orderId: "ON-26541",
    orderDate: "10/05/2020",
    quantity: 20,
    totalPrice: "Rs.56485",
    orderStatus: "Draft",
    PaymentMode: "Back",
  },
  {
    orderId: "ON-26541",
    orderDate: "10/05/2020",
    quantity: 20,
    totalPrice: "Rs.56485",
    orderStatus: "Draft",
    PaymentMode: "Front",
  },
];
