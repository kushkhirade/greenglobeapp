import { Button, Fab, Grid } from "@material-ui/core";
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

export interface IRTOProcessProps {
  history: {
    push: (path) => void;
  };
}

export class RTOProcessImpl extends React.PureComponent<
  IRTOProcessProps,
  { openEditModal: boolean; stage: string; rtoDataMain: any; currentData: any }
> {
  constructor(props: IRTOProcessProps) {
    super(props);
    this.state = {
      openEditModal: false,
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
        <Grid container spacing={1} className="modal-content">
          <Grid item className="modal-margin" xs={12} md={12}>
            Change/Update Stage
          </Grid>
          <Grid item className="modal-margin" xs={12} md={12}>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.stage}
              placeholder="Select Stage"
              onChange={this.handleOptionSelect}
              className="form-input"
            >
              <MenuItem value="docCollected">Document Collected</MenuItem>
              <MenuItem value="inProgress">In Progress</MenuItem>
              <MenuItem value="Submitted">Submitted</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </Grid>
          <Grid item className="modal-margin" xs={12} md={12}>
            <Grid container spacing={1}>
              <Grid item xs={6} md={6}>
                <Button
                  onClick={() =>
                    this.setState({
                      openEditModal: false,
                    })
                  }
                  variant="contained"
                  color="default"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6} md={6}>
                <Button
                  variant="contained"
                  onClick={this.handleStatusUpdate}
                  color="primary"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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

  render() {
    return (
      <AppBar>
        {this.renderModal()}
        <Tabs tabsData={this.tabs()} />
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
        <Grid key={index} item xs={12} md={5} className="card-container ">
          <div className="rto-card-title">{rtoData.title}</div>
          <Grid key={index} container className="padding-6 align-left">
            <Grid item className="bold-font center" xs={6} md={6}>
              <PersonPin /> {rtoData.fullname}
            </Grid>
            <Grid className="bold-fon centert" item xs={6} md={6}>
              <Phone /> {rtoData.phone}
            </Grid>
          </Grid>
          <Grid container className="padding-6 align-left">
            <Grid item xs={6} md={6}>
              {rtoData.address}
            </Grid>
            <Grid item xs={6} md={6}>
              {rtoData.type}
            </Grid>
          </Grid>
          <Grid container className="padding-6 align-left">
            <Grid item xs={6} md={6}>
              {rtoData.make}
            </Grid>
            <Grid item xs={6} md={6}>
              {rtoData.model}
            </Grid>
          </Grid>
          <Grid container className="padding-6 align-left">
            <Grid item xs={6} md={6}>
              Chassis No.
            </Grid>
            <Grid className="rto-status" item xs={6} md={6}>
              {rtoData.status || "Pending"}
            </Grid>
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
        </Grid>
      </React.Fragment>
    );
  });
};
