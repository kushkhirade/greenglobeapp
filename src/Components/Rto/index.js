import { Button, Fab, Grid, Paper, Tab } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import { Add } from "@material-ui/icons";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import React from "react";
import { List } from "react-admin";
import CardGrid from "../../Custom/CardGrid";
import RTOCard from "../../Custom/RTOCard";
import "./RTO.scss";

export class Rto extends React.Component {
  state = {
    value: "0",
    openEditModal: false,
    stage: "docCollected",
    hasSubmittedDocs: [],
    currentSource: null,
  };

  showEditPopup = (source) => {
    console.log(">> source", source);
    this.setState({
      openEditModal: true,
    });
  };

  handleOptionSelect = (event) => {
    this.setState({
      stage: event.target.value,
    });
  };

  handleStatusUpdate = () => {
    this.setState({
      openEditModal: false,
    });
  };

  renderModal = () => (
    <Modal
      open={this.state.openEditModal}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      className="modal rto-modal"
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
    </Modal>
  );

  render() {
    return (
      <div>
        {this.renderModal()}
        <h3>RTO</h3>
        <Paper>
          <TabContext value={this.state.value}>
            <TabList onChange={(e, value) => this.setState({ value: value })}>
              <Tab label="Pending" value="0" />
              <Tab label="Cleared" value="1" />
            </TabList>
            <TabPanel value="0">
              <List {...this.props}>
                <CardGrid>
                  <RTOCard
                    source="rtos"
                    // hasDocSubmitted={}
                    onEditClick={this.showEditPopup}
                  />
                </CardGrid>
              </List>
            </TabPanel>
            <TabPanel value="1">
              <List {...this.props}>
                <CardGrid>
                  <RTOCard source="rtos" />
                </CardGrid>
              </List>
            </TabPanel>
          </TabContext>
        </Paper>
        <span style={{ position: "absolute", right: 20, bottom: 20 }}>
          <Fab
            color="secondary"
            aria-labelledby="add-ticket"
            component="a"
            href="/#/Leads"
          >
            <Add />
          </Fab>
        </span>
      </div>
    );
  }
}
