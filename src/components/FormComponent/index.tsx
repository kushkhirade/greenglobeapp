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
import { store } from "../../store/Store";

export const FormComponent = (props: any) => {
  const classes = useStyles();
  return (
    <Form
      model={props.formModel}
      className="form-content"
      onSubmit={() => {
        const values = store.getState().rxFormReducer[props.formModel];
        props.onSubmit(values);
      }}
    >
      <Grid container>
        {props.options.map((opt: any) => {
          switch (opt.type) {
            case "text":
              return (
                <Control
                  component={MUITextField}
                  type="text"
                  name={opt.name}
                  model={`${props.formModel}${opt.model}`}
                  label={opt.label}
                />
              );
            case "select":
              return (
                <Control
                  placeholder={opt.placeholder}
                  component={MUISelectField}
                  type="text"
                  name="Email"
                  model={`${props.formModel}${opt.model}`}
                  label={opt.label}
                />
              );
            case "custom":
              const Custom = otp.custom();
              return <Custom />;

            default:
              return "";
          }
        })}
      </Grid>
      {props.hasSubmit && (
        <div className="button-container">
          <Button variant="contained">Cancel</Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      )}
    </Form>
  );
};

const MUITextField = (props: any) => {
  return (
    <Grid item={true} xs={12} md={6} sm={6}>
      <TextField
        label={props.name}
        variant="outlined"
        className="form-input"
        type={props.type}
        {...props}
      />
    </Grid>
  );
};

const MUISelectField = (props: any) => {
  return (
    <Grid item={true} xs={12} md={6} sm={6}>
      <FormControl variant="outlined" className="form-input">
        <InputLabel id="demo-simple-select-outlined-label">
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label={props.label}
          {...props}
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
