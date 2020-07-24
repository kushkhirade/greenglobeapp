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
import { changeValuesInStore } from "src/state/Utility";

export const FormComponent = (props: any) => {
  const classes = useStyles();

  return (
    <Form
      model={props.formModel}
      className="form-content"
      onSubmit={() => {
        const values = store.getState().rxFormReducer[props.formModel];
        console.log("Values: ", values)
        props.onSubmit(values);
      }}
    >
      <Grid container>
      {console.log(props.options)}
        {props.options.map((opt: any) => {
          switch (opt.type) {
            case "text":
              return (
                <Control
                  component={MUITextField}
                  type="text"
                  name={opt.name}
                  onChange={e => changeValuesInStore(e.target.name, e.target.value)}
                  model={`${props.formModel}${opt.model}`}
                  label={opt.label}
                  errors={{ hasError: true }}
                />
              );
            case "textarea":
              return (
                <Control
                  component={MUITextArea}
                  type="text"
                  name={opt.name}
                  model={`${props.formModel}${opt.model}`}
                  label={opt.label}
                  errors={{ hasError: true }}
                  rows={4}
                />
              );
            case "select":
              return (
                <Control
                  placeholder={opt.placeholder}
                  component={MUISelectField}
                  type="select"
                  // name="Email"
                  options={opt.options}
                  name={opt.name}
                  model={`${props.formModel}${opt.model}`}
                  label={opt.label}
                />
              );
            case "number":
              return (
                <Control
                  component={MUITextField}
                  type="number"
                  name={opt.name}
                  model={`${props.formModel}${opt.model}`}
                  label={opt.label}
                />
              );
            case "custom":
              const Custom = opt.custom();
              return <Custom />;

            default:
              return "";
          }
        })}
      </Grid>
      {props.hasSubmit && (
        <div className="button-container">
          <Button variant="contained" onClick={props.onCancel}>
            {props.cancelTitle || "Cancel"}
          </Button>
          <Button
            onClick={props.onSubmit}
            variant="contained"
            color="primary"
            type="submit"
          >
            {props.submitTitle || "Submit"}
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
      />{" "}
      <div className={`error-text-hidden ${props.hasError} "error-text-show"}`}>
        Please fill in this field
      </div>
    </Grid>
  );
};

const MUITextArea = (props: any) => {
  return (
    <Grid item={true} xs={12} md={6} sm={6}>
      <TextField
        label={props.name}
        variant="outlined"
        className="form-input"
        type={props.type}
        {...props}
        multiline
        rows={4}
      />{" "}
      <div className={`error-text-hidden ${props.hasError} "error-text-show"}`}>
        Please fill in this field
      </div>
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
          <MenuItem value=""><em>None</em></MenuItem>
          {props.options.map(opt => {
            return(
              <MenuItem value={opt.value}>{opt.label}</MenuItem>
            );
          })}
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
