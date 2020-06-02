import * as React from "react";
import AppBar from "src/navigation/App.Bar";
import { Button, TextField, Grid } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

export interface IAddNewLeadProps {}

export class AddNewLead extends React.PureComponent<IAddNewLeadProps, {}> {
  public render() {
    return (
      <AppBar>
        <div className="card-container">
          <div>
            <form className="form-content" autoComplete="off">
              <div>Dealer Details</div>
              <Grid container={true}>
                <Grid item-={true} xs={12} md={6} sm={12} lg={6}>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    className="form-input"
                    variant="outlined"
                  />
                </Grid>
                <Grid item-={true} xs={12} md={6} sm={12} lg={6}>
                  <TextField
                    id="outlined-basic"
                    label="Middle Name"
                    className="form-input"
                    variant="outlined"
                  />
                </Grid>
                <Grid item-={true} xs={12} md={6} sm={12} lg={6}>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    className="form-input"
                    variant="outlined"
                  />
                </Grid>
                <Grid item-={true} xs={12} md={6} sm={12} lg={6}>
                  <TextField
                    id="outlined-basic"
                    label="Company"
                    className="form-input"
                    variant="outlined"
                  />
                </Grid>
                <Grid item-={true} xs={12} md={6} sm={12} lg={6}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    className="form-input"
                    variant="outlined"
                  />
                </Grid>
                <Grid item-={true} xs={12} md={6} sm={12} lg={6}>
                  <TextField
                    id="outlined-basic"
                    label="WhatApp Number"
                    className="form-input"
                    variant="outlined"
                  />
                </Grid>
                <Grid item-={true} xs={12} md={6} sm={12} lg={6}>
                  <Select
                    variant="outlined"
                    className="form-input"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    placeholder="Lead Type"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Grid>
                <Grid item-={true} xs={12} md={6} sm={12} lg={6}>
                  <Select
                    variant="outlined"
                    className="form-input"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    placeholder="Lead Type"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Grid>
                <Grid item-={true} xs={12} md={6} sm={12} lg={6}>
                  <Select
                    variant="outlined"
                    className="form-input"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    placeholder="Lead Type"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Grid>
                <Grid item-={true} xs={12} md={6} sm={12} lg={6}>
                  <Select
                    variant="outlined"
                    className="form-input"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    placeholder="Lead Type"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Grid>
                <Grid item-={true} xs={12} md={6} sm={12} lg={6}>
                  <Select
                    variant="outlined"
                    className="form-input"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    placeholder="Lead Type"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <div>Address Details</div>
              <TextField
                id="outlined-basic"
                label="Billing Address"
                className="form-input"
                variant="outlined"
                multiline={true}
                rows={4}
              />
              <TextField
                id="outlined-basic"
                label="Shipping Address"
                className="form-input"
                variant="outlined"
                multiline={true}
                rows={4}
              />
              <div className="button-container">
                <Button variant="contained">Cancel</Button>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </AppBar>
    );
  }
}
