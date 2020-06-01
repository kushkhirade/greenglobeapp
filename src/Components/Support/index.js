import { Fab, Modal } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import { Datagrid, List, TextField as TextFieldRA } from "react-admin";
import "./support.scss";
export class Support extends React.Component {
  state = {
    isModalOpen: false,
  };
  render() {
    return (
      <div>
        <h3>Support Requests</h3>
        <List title="Support Requests" {...this.props}>
          <Datagrid>
            <TextFieldRA source="id" />
            <TextFieldRA source="title" />
            <TextFieldRA source="date" />
            <TextFieldRA source="status" />
          </Datagrid>
        </List>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-body"
          className="modal support-modal"
          open={this.state.isModalOpen}
          onBackdropClick={() => this.setState({ isModalOpen: false })}
        >
          <div className="modal-content">
            <div className="modal-container">
              <div className="head-title">Submit New Case</div>
              <form className="form-content" noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Subject Line"
                  className="form-input"
                  variant="outlined"
                />
                <TextField
                  className="form-input"
                  id="outlined-basic"
                  label="Message"
                  multiline
                  rowsMax={4}
                  variant="outlined"
                />
                <div className="button-container">
                  <Button variant="contained">Attach File</Button>
                  <Button variant="contained" color="primary">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
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
