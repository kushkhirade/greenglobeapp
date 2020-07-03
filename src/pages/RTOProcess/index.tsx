import {
  Button,
  Fab,
  Grid,
  Typography,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Add, Edit, PersonPin, Phone } from "@material-ui/icons";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BaseModal } from "src/components/BaseModal";
import { Tabs } from "src/components/Tabs";
import AppBar from "src/navigation/App.Bar";
import data from "../../data";
import "./rtoProcess.scss";
import { FormComponent } from "src/components/FormComponent";

export interface IRTOProcessProps {
  history: {
    push: (path) => void;
  };
}

export class RTOProcessImpl extends React.PureComponent<
  IRTOProcessProps,
  {
    openEditModal: boolean;
    stage: string;
    rtoDataMain: any;
    currentData: any;
    addNew: boolean;
  }
> {
  constructor(props: IRTOProcessProps) {
    super(props);
    this.state = {
      openEditModal: false,
      addNew: false,
      stage: "",
      currentData: null,
      rtoDataMain: data.rto.data,
    };
  }

  showEditPopup = (source) => {
    this.setState({
      openEditModal: true,
      currentData: source,
    });
  };

  handleOptionSelect = (event) => {
    this.setState({
      stage: event.target.value,
    });
  };

  handleStatusUpdate = () => {
    const updatedData = this.state.rtoDataMain.map((rto) => {
      if (rto.rtos.id === this.state.currentData.id) {
        rto.rtos.status = this.state.stage;
        rto.rtos.isCleared = true;
      }
      return rto;
    });
    this.setState({
      openEditModal: false,
      rtoDataMain: updatedData,
    });
  };

  renderModal = () => {
    return (
      <BaseModal
        className="support-modal"
        contentClassName="support-content"
        onClose={() => this.setState({ openEditModal: false })}
        open={this.state.openEditModal}
      >
        <Grid container className="modal-content">
          <Typography style={{ textAlign: "center", paddingBottom: "10px" }}>
            Change/Update Stage
          </Typography>
          <Grid item className="modal-margin" xs={12} md={12}>
            <FormControl variant="outlined" className="form-control">
              <InputLabel id="demo-simple-select-outlined-label">
                Select Stage
              </InputLabel>{" "}
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={this.state.stage}
                label="Select Stage"
                onChange={this.handleOptionSelect}
                className="form-input"
              >
                <MenuItem value="docCollected">Document Collected</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="Submitted">Submitted</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className="modal-buttons">
          <FormComponent
            hasSubmit={true}
            formModel="userForm"
            options={[]}
            onSubmit={this.handleStatusUpdate}
            onCancel={(e) => this.setState({ openEditModal: false })}
          />
        </div>
      </BaseModal>
    );
  };

  tabs = () => [
    {
      tabName: "Pending",
      component: (
        <Grid container={true}>
          <RTOList
            onClickEdit={this.showEditPopup}
            rtoDataMain={this.state.rtoDataMain.filter(
              (rto) => !rto.rtos.isCleared
            )}
          />
        </Grid>
      ),
    },
    {
      tabName: "Cleared",
      component: (
        <Grid container={true}>
          <RTOList
            onClickEdit={this.showEditPopup}
            rtoDataMain={this.state.rtoDataMain.filter(
              (rto) => rto.rtos.isCleared
            )}
          />
        </Grid>
      ),
    },
  ];

  renderAddNewRTODocModal = () => {
    return (
      <BaseModal
        className="support-modal"
        contentClassName="support-content"
        onClose={() => this.setState({ addNew: false })}
        open={this.state.addNew}
      >
        <div style={{ minWidth: "300px" }}>
          <Typography style={{ textAlign: "center", paddingBottom: "10px" }}>
            Add New Customer
          </Typography>
          <Grid item className="modal-margin" xs={12} md={12}>
            <FormControl variant="outlined" className="form-control">
              <InputLabel id="demo-simple-select-outlined-label">
                Search Customer
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                // value={this.state.stage}
                label="Select Customer"
                // onChange={this.handleOptionSelect}
                variant="outlined"
                className="form-input"
              >
                <MenuItem value="cust1">Customer 1</MenuItem>
                <MenuItem value="cust2">Customer 2</MenuItem>
                <MenuItem value="cust3">Customer 3</MenuItem>
                <MenuItem value="cust4">Customer 4</MenuItem>
                <MenuItem value="cust5">Customer 5</MenuItem>
                <MenuItem value="cust6">Customer 6</MenuItem>
                <MenuItem value="cust7">Customer 7</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item className="modal-margin" xs={12} md={12}>
            <FormControl variant="outlined" className="form-control">
              <InputLabel id="demo-simple-select-outlined-label">
                Select Stage
              </InputLabel>{" "}
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                // value={this.state.stage}
                label="Select Stage"
                variant="outlined"
                // onChange={this.handleOptionSelect}
                className="form-input"
              >
                <MenuItem value="docCollected">Document Collected</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="Submitted">Submitted</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <div className="modal-buttons">
            <FormComponent
              hasSubmit={true}
              formModel="userForm"
              options={[]}
              onCancel={() => this.setState({ addNew: false })}
              onSubmit={(e) => this.setState({ addNew: false })}
            />
          </div>
        </div>
      </BaseModal>
    );
  };

  render() {
    return (
      <AppBar>
        {this.renderAddNewRTODocModal()}
        {this.renderModal()}
        <Tabs tabsData={this.tabs()} />
        <span
          style={{ position: "absolute", right: 20, bottom: 20 }}
          onClick={() => this.setState({ addNew: true })}
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
export const RTOProcess = withRouter(
  connect<{}, {}, IRTOProcessProps>(mapStateToProps)(RTOProcessImpl) as any
);

const RTOList = (props: any) => {
  return props.rtoDataMain.map((rto: any, index: any) => {
    const rtoData = rto.rtos;
    return (
      <React.Fragment>
        <Grid key={index} item xs={12} md={6}>
          <div className="card-container ">
            <div className="rto-card-title">{rtoData.title}</div>
            <Grid key={index} container className="padding-6">
              <Grid item className="bold-font center" xs={6} md={6}>
                <PersonPin /> {rtoData.fullname}
              </Grid>
              <Grid className="bold-fon center" item xs={6} md={6}>
                <Phone /> {rtoData.phone}
              </Grid>
            </Grid>
            <Grid container className="padding-6">
              <Grid item xs={6} md={6}>
                {rtoData.address}
              </Grid>
              <Grid item xs={6} md={6}>
                {rtoData.type}
              </Grid>
            </Grid>
            <Grid container className="padding-6">
              <Grid item xs={6} md={6}>
                {rtoData.make}
              </Grid>
              <Grid item xs={6} md={6}>
                {rtoData.model}
              </Grid>
            </Grid>
            <Grid container className="padding-6">
              <Grid item xs={6} md={6}>
                Chassis No.
              </Grid>
              <Grid item xs={6} md={6}>
                Delaer Name
              </Grid>
            </Grid>
            <Grid className="rto-status" item xs={6} md={6}>
                {rtoData.status || "Pending"}
            </Grid>
            {!rtoData.isCleared && (
              <div className="edit-button-container">
                <div
                  className="edit-button"
                  onClick={() => props.onClickEdit(rtoData)}
                >
                  <Edit />
                </div>
              </div>
            )}
            {rtoData.isCleared && (
              <div className="generate-doc">
                <span>Generate Docs</span>{" "}
              </div>
            )}
          </div>
        </Grid>
      </React.Fragment>
    );
  });
};
