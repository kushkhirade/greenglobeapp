import { Fab, Paper, Tab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import React from "react";
import { List } from "react-admin";
import CardGrid from "../../Custom/CardGrid";
import RTOCard from "../../Custom/RTOCard";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

class Rto extends React.Component {
  state = { value: "0", openEditModal: false };

  render() {
    return (
      <div>
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
                  <RTOCard source="rtos" onEditClick={this.showEditPopup} />
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

export default Rto;
