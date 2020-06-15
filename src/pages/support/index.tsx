import { Button, Fab, TextField, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";
import { BaseModal } from "src/components/BaseModal";
import AppBar from "src/navigation/App.Bar";
import "./support.scss";

const supportData = [
  {
    sr: 101,
    case: "Case 101",
    title: "Kit Replacement",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export class Support extends React.PureComponent<{}, any> {
  public state = { fileName: "", isModalOpen: false, data: supportData };

  handleSubmit = () => {
    const d = this.state.data;
    const last = this.state.data[this.state.data.length - 1];
    d.push({
      case: `Case ${last.sr + 1}`,
      sr: last.sr + 1,
      title: this.state.sub,
      desc: this.state.msg,
    });
    this.setState({
      data: d,
      isModalOpen: false,
    });
  };

  public render() {
    return (
      <AppBar>
        <h3>Support Requests</h3>
        <Grid container>
          {this.state.data.map((sup) => (
            <Grid item xs={12} sm={6} lg={6}>
              <div className="card-container no-hover">
                <div className="case"> {sup.case}</div>
                <div className="title">
                  <span className="description-text">Case For:</span>{" "}
                  {sup.title}
                </div>
                <div className="desc">{sup.desc}</div>
                <div className="view-attachment">View Attachment</div>
              </div>
            </Grid>
          ))}
        </Grid>
        <BaseModal
          className="support-modal"
          contentClassName="support-content"
          onClose={() => this.setState({ isModalOpen: false })}
          open={this.state.isModalOpen}
        >
          <div className="head-title">Submit New Case</div>
          <form className="form-content" autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Subject Line"
              className="form-input"
              onChange={(e) => this.setState({ sub: e.target.value })}
              variant="outlined"
            />
            <TextField
              className="form-input"
              id="outlined-basic"
              label="Message"
              multiline={true}
              rows={4}
              variant="outlined"
              onChange={(e) => this.setState({ msg: e.target.value })}
            />
            <div style={{ maxWidth: "300px" }} className="description-text">
              {this.state.fileName}
            </div>
            <div className="button-container">
              <Button variant="contained" onClick={this.handleSubmit}>
                <input
                  onChange={(e) =>
                    this.setState({ fileName: e.target.files[0].name })
                  }
                  id="attachFile"
                  className="hidden"
                  type="file"
                />
                <label htmlFor="attachFile">Attach File</label>
              </Button>
              <span style={{ padding: "5px" }} />
              <Button
                onClick={this.handleSubmit}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </div>
          </form>
        </BaseModal>
        <span
          style={{ position: "absolute", right: 20, bottom: 20 }}
          onClick={() => this.setState({ isModalOpen: true })}
        >
          <Fab color="secondary" aria-labelledby="add-ticket">
            <Add />
          </Fab>
        </span>
      </AppBar>
    );
  }
}
