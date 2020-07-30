import {
  FormControlLabel,
  Grid,
  RadioGroup,
  TextField,
  Button,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import * as React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { BaseModal } from "src/components/BaseModal";
import { FormComponent } from "src/components/FormComponent";
import { SubFormHeading } from "src/components/SubFormHeading";
import AppBar from "src/navigation/App.Bar";
import { changeValuesInStore } from "src/state/Utility";
import "./communications.scss";
import { StyledRadioButton } from "./StyledRadioButton";
export interface ICommunicationsProps {}
export const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export class CommunicationsImpl extends React.Component<
  ICommunicationsProps,
  any
> {
  constructor(props: ICommunicationsProps) {
    super(props);

    this.state = {
      leadType: "",
      subLeadType: "",
      rating: "female",
      commType: "",
      customers: [],
      openDeliveryModal: false,
      formSubmitted: false,
    };
  }

  handleCustomerSelection = (value) => {
    changeValuesInStore(`customerForm.customers`, value);
    this.setState({
      customers: value,
    });
  };

  handleChange = (event, key) => {
    changeValuesInStore(`customerForm.${key}`, event.target.value);
    this.setState({
      [key]: event.target.value,
    });
  };

  renderDeliveryModal = () => {
    return (
      <BaseModal
        className="leads-modal"
        contentClassName="leads-content"
        onClose={() => this.setState({ openDeliveryModal: false })}
        open={this.state.openDeliveryModal}
      >
        <Grid container spacing={1} className="">
          <Grid item className="modal-margin" xs={12} md={12}>
            <div className="padding-6 align-center">Delivery Report</div>
            <div className="padding-6 align-center">SMS / Email send - 100</div>
            <div className="padding-6 align-center">
              SMS / Email Failed - 20
            </div>
            <SubFormHeading> SMS/Email Failed Recipients List </SubFormHeading>
          </Grid>
          <div
            style={{ textAlign: "center", width: "100%" }}
            className="align-center"
          >
            {" "}
            <Button
              variant="contained"
              color="default"
              onClick={() => this.setState({ openDeliveryModal: false })}
            >
              Close
            </Button>
          </div>
        </Grid>
      </BaseModal>
    );
  };

  renderMessageScreen = () => {
    return (
      <div className="message-screen">
        <SubFormHeading>Add Meesage To Send</SubFormHeading>
        <TextField
          multiline
          rows={4}
          id="standard-basic"
          variant="outlined"
          label="Enter Message"
          className="form-input"
        />
        <SubFormHeading>Recipients Selected</SubFormHeading>
        <div className="selected-customer-list">
          {this.state.customers.map((custData) => {
            return (
              <div className="customer-row">
                {custData.label}{" "}
                <span style={{ paddingLeft: "5px" }}>
                  <CancelIcon />
                </span>
              </div>
            );
          })}
        </div>
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
            this.setState({
              openDeliveryModal: true,
            });
          }}
          formModel="customerForm"
          hasSubmit={true}
          submitTitle="Send"
          options={[]}
        />
      </div>
    );
  };

  renderForm = () => {
    return (
      <React.Fragment>
        <SubFormHeading>Select Lead Type</SubFormHeading>
        <Grid container className="radio-container">
          <RadioGroup
            className="radio-input-container"
            name="leadType"
            value={this.state.leadType}
            onChange={(e) => this.handleChange(e, "leadType")}
          >
            <CustomRaidio value="leads" label="Leads" />
            <CustomRaidio value="loastLeads" label="Lost Leads" />
            <CustomRaidio value="3Wheeler" label="3 Wheeler" />
            <CustomRaidio value="4Wheeler" label="4 Wheeler" />
          </RadioGroup>
        </Grid>
        <SubFormHeading>Select Lead Sub Type</SubFormHeading>
        <Grid container className="radio-container">
          <RadioGroup
            className="radio-input-container"
            name="subLeadType"
            value={this.state.subLeadType}
            onChange={(e) => this.handleChange(e, "subLeadType")}
          >
            <CustomRaidio value="customer" label="Customer" />
            <CustomRaidio value="lead" label="Lead" />
            <CustomRaidio value="influencer" label="Influencer" />
            <CustomRaidio value="fitment" label="Fitment" />
            <CustomRaidio value="servicing" label="Servicing" />
          </RadioGroup>
        </Grid>
        <SubFormHeading>Select Rating</SubFormHeading>
        <Grid container className="radio-container">
          <RadioGroup
            className="radio-input-container"
            name="rating"
            value={this.state.rating}
            onChange={(e) => this.handleChange(e, "rating")}
          >
            <CustomRaidio value="hot" label="Hot" />
            <CustomRaidio value="cold" label="Cold" />
            <CustomRaidio value="warm" label="Warm" />
          </RadioGroup>
        </Grid>
        <SubFormHeading>Select communication type SMS/Email</SubFormHeading>
        <Grid container className="radio-container">
          <RadioGroup
            className="radio-input-container"
            name="commType"
            value={this.state.commType}
            onChange={(e) => this.handleChange(e, "commType")}
          >
            <CustomRaidio value="SMS" label="SMS" />
            <CustomRaidio value="email" label="Email" />
          </RadioGroup>
        </Grid>
        <SubFormHeading>Select Customer to Send Message</SubFormHeading>
        <div style={{ width: "100%", marginTop: "20px" }}>
          <Select
            isMulti
            placeholder="Search Recipient"
            name="customers"
            options={colourOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={this.state.customers}
            onChange={this.handleCustomerSelection}
          />
        </div>
        <FormComponent
          onSubmit={(v: any) => {
            console.log(">> v", v);
            this.setState({
              formSubmitted: true,
            });
          }}
          formModel="customerForm"
          hasSubmit={true}
          submitTitle="Done"
          options={[]}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <AppBar>
        {this.renderDeliveryModal()}
        <div className="communication-container card-container no-hover">
          {this.state.formSubmitted
            ? this.renderMessageScreen()
            : this.renderForm()}
        </div>
      </AppBar>
    );
  }
}
export function mapStateToProps() {
  return {};
}
export const Communications = connect<{}, {}, ICommunicationsProps>(
  mapStateToProps
)(CommunicationsImpl);

const SubFormHeading = (props: any) => (
  <div style={props.style} className="sub-form-heading">
    {props.children}
  </div>
);

const CustomRaidio = (props) => (
  <FormControlLabel
    value={props.value}
    label={props.label}
    control={<StyledRadioButton />}
  />
);
