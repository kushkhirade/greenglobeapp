import React from "react";
import { Datagrid, List, TextField, EmailField, Show } from "react-admin";
import { Modal, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
class Support extends React.Component {
  render() {
    return (
      <div>
        <h3>Annual Sales Target</h3>
        <List title="Annual Sales Target" {...this.props}>
          <Datagrid>
            <TextField source="product" />
            <TextField source="target" />
            <TextField source="achieved" />
            <TextField source="target_left" />
          </Datagrid>
        </List>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-body"
          open={true}
        >
          <div>
            <p id="simple-modal-body">Hello World</p>
          </div>
        </Modal>
        <Fab secondary>
          <Add />
        </Fab>
      </div>
    );
  }
}

export default Support;
