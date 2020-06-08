import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import { FormComponent } from "src/components/FormComponent";
import { Typography, Button, Grid } from "@material-ui/core";
import "./customers.scss";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  options,
  vehicleInputs,
  streetInputs,
  leadDealer,
  addressDetails,
} from "./customerInputs";
import { Tabs } from "src/components/Tabs";
import { Stepper } from "../BuyOrders/Stepper";
import { withRouter } from "react-router-dom";

export interface IAddNewCustomerProps {
  history: {
    push: (path) => void;
  };
}

export class AddNewCustomerImpl extends React.PureComponent<
  IAddNewCustomerProps,
  {}
> {
  constructor(props: IAddNewCustomerProps) {
    super(props);
  }

  public renderForm = () => {
    return (
      <React.Fragment>
        <SubFormHeading>Lead Basic Details</SubFormHeading>
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
          }}
          formModel="userForm"
          hasSubmit={false}
          options={options}
        />
        <SubFormHeading>Address Details</SubFormHeading>
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
          }}
          formModel="userForm"
          hasSubmit={false}
          options={streetInputs}
        />
        <SubFormHeading>Vehicle Details</SubFormHeading>
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
          }}
          formModel="userForm"
          hasSubmit={false}
          options={vehicleInputs}
        />
        <SubFormHeading style={{ textAlign: "center" }}>
          Documents Required for RTO
        </SubFormHeading>
        <UploadContainer heading="Original R.C. Book" />
        <UploadContainer heading="Bank NOC In case of Hypothecation" />
        <UploadContainer heading="Valid Insurance Photocopy" />
        <UploadContainer heading="Permit" />
        <UploadContainer heading="Tax" />
        <UploadContainer heading="Passing" />
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
          }}
          formModel="userForm"
          hasSubmit={true}
          options={[]}
        />
      </React.Fragment>
    );
  };

  renderRelated = () => {
    const relatedData = [
      {
        opp: "Nano-Test",
        stage: "Closed Won",
        amount: "2500000",
        date: "3/9/2020",
      },
    ];
    return (
      <React.Fragment>
        <SubFormHeading
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Opportunities{" "}
          <div>
            <Button
              onClick={() => this.props.history.push("/lead/add-new-lead")}
              variant="contained"
              color="primary"
            >
              New
            </Button>
          </div>
        </SubFormHeading>
        <Grid container>
          {relatedData.map((x) => {
            return (
              <Grid item xs={12} md={6} sm={12} lg={6}>
                <div className="card-container">
                  <Grid container>
                    <Grid item xs={12} lg={3} sm={3} md={3}>
                      <span className="description-text">Opportunity Name</span>
                    </Grid>
                    <Grid item xs={12} lg={3} sm={3} md={3}>
                      <span className="description-text">Stage</span>
                    </Grid>
                    <Grid item xs={12} lg={3} sm={3} md={3}>
                      <span className="description-text">Amount</span>
                    </Grid>
                    <Grid item xs={12} lg={3} sm={3} md={3}>
                      <span className="description-text">Close Date</span>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid
                      className="padding-6"
                      item
                      xs={12}
                      lg={3}
                      sm={3}
                      md={3}
                    >
                      {x.opp}
                    </Grid>
                    <Grid
                      className="padding-6"
                      item
                      xs={12}
                      lg={3}
                      sm={3}
                      md={3}
                    >
                      {x.stage}
                    </Grid>
                    <Grid
                      className="padding-6"
                      item
                      xs={12}
                      lg={3}
                      sm={3}
                      md={3}
                    >
                      {x.amount}
                    </Grid>
                    <Grid
                      className="padding-6"
                      item
                      xs={12}
                      lg={3}
                      sm={3}
                      md={3}
                    >
                      {x.date}
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
    );
  };

  public tabData = [
    {
      tabName: "Details",
      component: this.renderForm(),
      onTabSelect: (tabName: any) => this.setState({ activeTab: tabName }),
    },
    {
      tabName: "Related",
      component: this.renderRelated(),
      onTabSelect: (tabName: any) => this.setState({ activeTab: tabName }),
    },
  ];
  render() {
    return (
      <AppBar>
        <div className="card-container no-hover">
          <Typography variant="h5" color="inherit" noWrap={true}>
            Customer Details
          </Typography>
          <div className="">
            <Tabs tabsData={this.tabData} />
          </div>
        </div>
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const AddNewCustomer = withRouter(
  connect<{}, {}, IAddNewCustomerProps>(mapStateToProps)(
    AddNewCustomerImpl
  ) as any
);

const SubFormHeading = (props: any) => (
  <div style={props.style} className="sub-form-heading">
    {props.children}
  </div>
);

const UploadContainer = (props: any) => {
  return (
    <div className="upload-container">
      <div className="upload-head">{props.heading}</div>
      <div className="upload-button">
        <label title="Click To Upload File" htmlFor="upload">
          Upload Photo
        </label>
        <input type="file" className="hidden-input" id="upload" />
        <VisibilityIcon />
        <DeleteIcon />
      </div>
    </div>
  );
};
