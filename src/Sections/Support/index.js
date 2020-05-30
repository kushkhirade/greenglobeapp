import { Fab, Modal } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { Datagrid, List, TextField } from "react-admin";

class Support extends React.Component {
  state = {
    isModalOpen: false,
  };
  render() {
    return (
      <div>
        <h3>Support Requests</h3>
        <List title="Support Requests" {...this.props}>
          <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="date" />
            <TextField source="status" />
          </Datagrid>
        </List>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-body"
          open={this.state.isModalOpen}
          onBackdropClick={() => this.setState({ isModalOpen: false })}
        >
          <div>
            <h3 id="simple-modal-title">HI</h3>
            <p id="simple-modal-body">Hello World</p>
          </div>
        </Modal>
        <span
          style={{ position: "absolute", right: 20, bottom: 20 }}
          onClick={() => this.setState({ isModalOpen: true })}
        >
          <Fab
            color="secondary"
            aria-labelledby="add-ticket"
            component="button"
          >
            <Add />
          </Fab>
        </span>
      </div>
    );
  }
}

export default Support;
