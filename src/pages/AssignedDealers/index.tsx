import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import { Grid } from "@material-ui/core";
import { userData } from "./usersData";
import "./asssignedDealers.scss";
import { saveDealerData } from "src/actions/App.Actions";
import { withRouter } from "react-router-dom";
export interface IAssignedDealersProps {
  history: {
    push: (path) => void;
  };
}

export class AssignedDealersImpl extends React.Component<
  IAssignedDealersProps,
  { users: any; isLoading: boolean }
> {
  constructor(props: IAssignedDealersProps) {
    super(props);
    this.state = { users: [], isLoading: false };
  }

  handleClickDetails = (data) => {
    saveDealerData(data);
    this.props.history.push("/dealers/dealer-details");
  };

  render() {
    return (
      <AppBar>
        <Grid container>
          {userData.map((d) => {
            return <DealerCard {...d} onClickItem={this.handleClickDetails} />;
          })}
        </Grid>
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const AssignedDealers = withRouter(
  connect<{}, {}, IAssignedDealersProps>(mapStateToProps)(
    AssignedDealersImpl
  ) as any
);

const DealerCard = (props: any) => {
  return (
    <Grid item xs={12} md={6} lg={6}>
      <div onClick={() => props.onClickItem(props)} className="card-container">
        <div className="inventory-card">
          {" "}
          <div className="padding-6"> {props.name}</div>
          <div className="margin-10 dealer-card">
            <img src={props.imageURL} alt="bike" className="dealer-image" />
            <div>
              <div className="padding-6"> {props.address}</div>
              <div className="padding-6">
                {" "}
                <span className="description-text">Contact Person</span>{" "}
                {props.cPerson}
              </div>
              <div className="padding-6">
                {" "}
                <span className="description-text">Phone</span> {props.phone}
              </div>
            </div>
          </div>
          <div className="padding-6">
            <span className="description-text">Dealer Since</span> {props.mDate}
          </div>
        </div>
      </div>
    </Grid>
  );
};
