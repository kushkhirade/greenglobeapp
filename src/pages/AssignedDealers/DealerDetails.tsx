import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import { Grid, Button } from "@material-ui/core";
import { chartData } from "./usersData";
import "./asssignedDealers.scss";
import { Tabs } from "src/components/Tabs";
import { TableWithGrid } from "src/components/TableWithGrid";
import data from "src/data";
import { SubFormHeading } from "src/components/SubFormHeading";
import {
  BarChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Bar,
} from "recharts";
import { isEmpty } from "lodash";
import { withRouter } from "react-router-dom";
export interface IAssignedDealersProps {}

const columns = [
  {
    label: "Product",
    name: "product",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    label: "Target",
    name: "target",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    label: "Date",
    name: "date",
    options: {
      filter: true,
      sort: false,
    },
  },
];
const options = {
  filterType: "checkbox",
  responsive: "scrollMaxHeight",
};

export class DealerDetailsImpl extends React.PureComponent<
  any,
  { users: any; isLoading: boolean }
> {
  constructor(props: IAssignedDealersProps) {
    super(props);
    this.state = { users: [], isLoading: false };
  }

  componentWillMount() {
    if (isEmpty(this.props.dealerDetails)) {
      this.props.history.push("/assign-dealers");
    }
  }

  tabData = () => [
    {
      tabName: "Details",
      component: (
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <div
              onClick={() =>
                this.props.dealerDetails.onClickItem(this.props.dealerDetails)
              }
              className="card-container"
            >
              <div className="inventory-card">
                {" "}
                <div className="padding-6">
                  {" "}
                  {this.props.dealerDetails.name}
                </div>
                <div className="margin-10 dealer-card">
                  <img
                    src={this.props.dealerDetails.imageURL}
                    alt="bike"
                    className="dealer-image"
                  />
                  <div>
                    <div className="padding-6">
                      {" "}
                      {this.props.dealerDetails.address}
                    </div>
                    <div className="padding-6">
                      {" "}
                      <span className="description-text">
                        Contact Person
                      </span>{" "}
                      {this.props.dealerDetails.cPerson}
                    </div>
                    <div className="padding-6">
                      {" "}
                      <span className="description-text">Phone</span>{" "}
                      {this.props.dealerDetails.phone}
                    </div>
                  </div>
                </div>
                <div className="padding-6">
                  <span className="description-text">Dealer Since</span>{" "}
                  {this.props.dealerDetails.mDate}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      ),
    },
    {
      tabName: "Report",
      component: (
        <div className="margin-10">
          <div className="margin-10">
            <TableWithGrid
              title={"Sale Target 3 wheeler"}
              data={data.sales.data}
              columns={columns}
              options={options as any}
            />{" "}
          </div>
          <div className="margin-10">
            <TableWithGrid
              title={"Sale Target 4 wheeler"}
              data={data.sales.data}
              columns={columns}
              options={options as any}
            />
          </div>
          <div className="card-container">
            <SubFormHeading>Product wise sale</SubFormHeading>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart width={730} height={250} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="button-container">
            <Button
              onClick={() => this.props.history.push("/leads")}
              variant="contained"
              color="primary"
              type="submit"
            >
              View Leads
            </Button>
            <Button
              onClick={() => this.props.history.push("/inventory")}
              variant="contained"
              color="primary"
              type="submit"
            >
              View Inventory
            </Button>
            <Button
              onClick={() => this.props.history.push("/customers")}
              variant="contained"
              color="primary"
              type="submit"
            >
              View Customers
            </Button>
          </div>
        </div>
      ),
    },
  ];

  render() {
    const { dealerDetails } = this.props;
    return (
      <AppBar>
        <Tabs tabsData={this.tabData()} />
      </AppBar>
    );
  }
}
export function mapStateToProps(state) {
  return { dealerDetails: state.users.get("data") };
}
export const DealerDetails = withRouter(
  connect<{}, {}, IAssignedDealersProps>(mapStateToProps)(
    DealerDetailsImpl
  ) as any
);

const distDetails = {
  name: "Sachin T",
  accountName: "GGFS",
  whatApp: "",
  email: "sadas@qdasdas.com",
  mobile: "32321321321",
  rating: "3.5",
  billingAddress: "Indiabulls, Lower Parel, Mumbai, MH",
  shippingAddress: "Indiabulls, Lower Parel, Mumbai, MH 411093, India",
  gstNum: "27AACCN1235323",
  bankName: "HDFC Bank",
  IFSC: "HDFC0000646",
  aaNum: "3242353243",
};
