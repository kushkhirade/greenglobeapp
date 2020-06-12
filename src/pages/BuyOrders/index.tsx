import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import "./buyOrders.scss";
import { withRouter } from "react-router-dom";
import { IHistory } from "src/state/Utility";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";

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
                    <span> Order ID: </span> <br />
                    {dataValue.orderId}{" "}
                  </div>
                  <div className="data-content">
                    <span> Order Date: </span> <br />
                    {dataValue.orderDate}{" "}
                  </div>
                </div>
                <div className="row-data">
                  <div className="data-content">
                    <span>Item Quantity:</span> <br />
                    {dataValue.quantity}{" "}
                  </div>
                  <div className="data-content">
                    <span>Total Price:</span> <br /> {dataValue.totalPrice}{" "}
                  </div>
                </div>
                <div className="row-data">
                  <div className="data-content">
                    <span> Order Status:</span> <br /> {dataValue.orderStatus}{" "}
                  </div>
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
        {this.renderCard()}
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
