import * as React from "react";
import { connect } from "react-redux";
import AppBar from "src/navigation/App.Bar";
import { FormComponent } from "src/components/FormComponent";
import { Typography, Button } from "@material-ui/core";
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

export interface IAddNewCustomerProps {}

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
    return (
      <SubFormHeading>
        Opportunities{" "}
        <Button variant="contained" color="primary">
          New
        </Button>{" "}
      </SubFormHeading>
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
            Add New Customer
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
export const AddNewCustomer = connect<{}, {}, IAddNewCustomerProps>(
  mapStateToProps
)(AddNewCustomerImpl);

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
