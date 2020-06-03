import * as React from "react";
import { Form, Control } from "react-redux-form";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const FormComponent = (props: any) => {
  const classes = useStyles();
  return (
    <Form
      model="userForm"
      onSubmit={(values) => {
        console.log(">> values", values);
      }}
    >
      {props.options.map((opt: any) => {
        switch (opt.type) {
          case "text":
            return (
              <Control
                placeholder={opt.placeholder}
                component={MUITextField}
                type="text"
                name={opt.name}
                model={opt.model}
              />
            );
          case "select":
            return (
              <Control
                placeholder={opt.placeholder}
                component={MUISelectField}
                type="text"
                name="Email"
                model={opt.model}
              />
            );

          default:
            return "";
        }
      })}
      <Button type="submit">Submit</Button>
    </Form>
  );
};

const MUITextField = (props: any) => {
  return (
    <TextField
      placeholder={props.name}
      label={props.name}
      variant="outlined"
      type={props.type}
    />
  );
};

const MUISelectField = (props: any) => {
  return (
    <Grid item={true} xs={12} md={6} sm={6}>
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
