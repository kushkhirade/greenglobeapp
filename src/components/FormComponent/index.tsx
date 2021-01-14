import * as React from "react";
import { Form, Control, actions } from "react-redux-form";
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
import moment from "moment";
import { BaseModal } from "src/components/BaseModal";
import { store } from "../../store/Store";
import getData from "src/utils/getData";
import { getToken } from "src/state/Utility";
import { changeValuesInStore, dispatch } from "src/state/Utility";
import { connect } from "react-redux";
import { saveSelectData } from "src/actions/App.Actions";
import { SET_ERROR, REMOVE_ERROR } from "src/reducers/formReducer";
import { imageUpload } from "src/utils/getData";
import { getImageBase64 } from "./../../utils/getBase64";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";


export interface IFormComponentProps {
  zipCodeResult: any;
  errorFields: any; formModel: any;
  hasSubmit: any; submitTitle: any;
  onSubmit?: (value) => void;  
  options: any; allFormOptions: any;
  cancelTitle: any; onCancel?: (value) => void; 
}

class FormComponentImpl extends React.Component <IFormComponentProps, any> {

  constructor(props: IFormComponentProps) {
    super(props);

    this.state = {
      cities: [],
    };
  }
  getZipCodeResult = async () => {
    const { data } = getToken();
    const zipCode = store.getState().rxFormReducer[this.props.formModel].zip ;
    console.log("zipCode => ", zipCode);
    let getResult;

    try{
      // if(zipCode!==""){
        getResult = await getData({
          query: `Select * FROM salesforce.Address__c where zip_postal_code__c = ${zipCode}`,
          token: data.token
        })
        changeValuesInStore(`${this.props.formModel}.taluka`, getResult.result[0].taluka__c);
        changeValuesInStore(`${this.props.formModel}.district`, getResult.result[0].district__c);
        changeValuesInStore(`${this.props.formModel}.state`, getResult.result[0].state__c);
      // }else{
      //   getResult = await getData({
      //     query: `Select * FROM salesforce.Address__c`,
      //     token: data.token
      //   })
      // }
        console.log("getResult => ", getResult);
        const arr = [];
        getResult.result.map(city => {
          arr.push({label: city.place_name__c, value: city.place_name__c})
        })
        this.setState({ cities: arr });
      saveSelectData(getResult.result);
    }
    catch(e){
      console.log(e);
    }
  };

  handleInputFocus = (model) => {
    dispatch({
      type: REMOVE_ERROR,
    });
  };

  componentDidMount(){
    this.getZipCodeResult();
  }

  componentWillUnmount() {
    dispatch({
      type: REMOVE_ERROR,
    });
  }

  render() {
    const { props, state } = this;
    console.log("Props ", this.props)
    console.log("state.places : ", this.state.places )
    return (
      <Form
        model={`rxFormReducer.${props.formModel}`}
        className="form-content"
        autoComplete="off"
        onSubmit={() => {
          const values = store.getState().rxFormReducer[props.formModel];
          props.onSubmit(values);
        }}
      >
        <Grid container>
          {props.options.map((opt: any) => {
            const dept = opt.dependentField ? opt.dependentField : "" ;
            const model = `${opt.model}`.substr(1);
            // console.log("opt : ", opt)
            // console.log("MOddel : ", model)
            // console.log(store.getState().rxFormReducer[props.formModel][`${model}`]);
            switch (opt.type) {
              case "text":
                return (
                  <React.Fragment>
                    {/* {opt.required && <div> "*"</div>} */}
                    <Control
                      component={MUITextField}
                      type="text"
                      name={opt.name}
                      default={opt.defaultValue}
                      disabled={opt.isDisable ?? false}
                      // value={store.getState().rxFormReducer[props.formModel][`${model}`]}
                      onFocus={() => this.handleInputFocus(opt.model)}
                      onChange={(e) =>{
                        changeValuesInStore(
                          `${props.formModel}${opt.model}`,
                          e.target.value
                        );
                        if(opt.model === ".zip")
                        console.log("Model is Zip Code :", opt.model)
                          this.getZipCodeResult()
                      }}
                      className={
                        props.errorFields.includes(opt.model)
                          ? "form-input field-error"
                          : "form-input"
                      }
                      required={opt.required}
                      model={opt.model}
                      label={opt.label}
                      // mapProps={{
                      //   hasError: props.errorFields.includes(opt.model),
                      // }}
                    />
                  </React.Fragment>
                );
              case "textarea":
                return (
                  <Control
                    component={MUITextArea}
                    className={
                      props.errorFields.includes(opt.model)
                        ? "form-input field-error"
                        : "form-input"
                    }
                    onFocus={() => this.handleInputFocus(opt.model)}
                    onChange={(e) =>{
                      changeValuesInStore(
                        `${props.formModel}${opt.model}`,
                        e.target.value
                      );
                    }}
                    required={opt.required}
                    type="text"
                    name={opt.name}
                    model={opt.model}
                    label={opt.label}
                    errors={{ hasError: true }}
                    rows={4}
                  />
                );
              case "select":
                return (
                  <Control
                    component={MUISelectField}
                    type="select"
                    mapProps={{
                      className: props.errorFields.includes(opt.model)
                        ? "form-input field-error"
                        : "form-input",
                      // onSelect: this.handleInputFocus,
                    }}
                    required={opt.required}
                    onFocus={() => this.handleInputFocus(opt.model)}
                    // options={ store.getState().rxFormReducer[props.formModel][`${opt.dependetField}`] === opt.dependetValue ? opt.options(props) : []}
                    options={ opt.options(props, state) }
                    name={opt.name}
                    model={opt.model}
                    label={opt.label}
                    onChange={(e) => {
                      console.log("sdfcsdvfv:: ", store.getState().rxFormReducer[props.formModel][`${opt.dependetField}`])
                      changeValuesInStore(
                        `${props.formModel}${opt.model}`,
                        e.target.value
                      );
                    }}
                  />
                );
              case "multiselect":
                return (
                  <Control
                    component={MUIMultipleSelectField}
                    type="select"
                    mapProps={{
                      className: props.errorFields.includes(opt.model)
                        ? "form-input field-error"
                        : "form-input",
                    }}
                    required={opt.required}
                    onFocus={() => this.handleInputFocus(opt.model)}
                    options={ opt.options(props, state) }
                    name={opt.name}
                    model={opt.model}
                    label={opt.label}
                    onChange={(e) => {
                      console.log("e.target.value :: ",e.target.value)
                      changeValuesInStore(
                        `${props.formModel}${opt.model}`,
                        e.target.value
                      );
                    }}
                  />
                );
              case "number":
                return (
                  <Control
                    className={
                      props.errorFields.includes(opt.model)
                        ? "form-input field-error"
                        : "form-input"
                    }
                    required={opt.required}
                    default={opt.defaultValue}
                    disabled={opt.isDisable ?? false}
                    component={MUITextField}
                    type="number"
                    name={opt.name}
                    model={opt.model}
                    label={opt.label}
                    onFocus={() => this.handleInputFocus(opt.model)}
                    onChange={(e) =>
                      changeValuesInStore(
                        `${props.formModel}${opt.model}`,
                        e.target.value
                      )
                    }
                  />
                );
              case "custom":
                const Custom = opt.custom();
                return <Custom />;
              case "date":
                return(
                  <Control
                    className={
                      props.errorFields.includes(opt.model)
                        ? "form-input field-error"
                        : "form-input"
                    }
                    required={opt.required}
                    component={MUIDateField}
                    type="number"
                    name={opt.name}
                    model={opt.model}
                    label={opt.label}
                    onFocus={() => this.handleInputFocus(opt.model)}
                    onChange={(e) =>{ console.log("efblmflbkm")
                      changeValuesInStore(
                        `${props.formModel}${opt.model}`,
                        e.target.value
                      )
                    }}
                  />
                );
              case "image":
                return(
                  <Control
                    className={
                      props.errorFields.includes(opt.model)
                        ? "form-input field-error"
                        : "form-input"
                    }
                    required={opt.required}
                    component={MUIUploadContainer}
                    type="file"
                    name={opt.name}
                    model={opt.model}
                    label={opt.label}
                    onFocus={() => this.handleInputFocus(opt.model)}
                    // onChange={(e) =>{ console.log("image control")
                    //   changeValuesInStore(
                    //     `${props.formModel}${opt.model}`,
                    //     e.target.value
                    //   )
                    // }}
                  />
                );
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
              onClick={() => {
                const values = store.getState().rxFormReducer[props.formModel];
                console.log('>> props', props);
                const fieldErrors = [];
                (props.allFormOptions || props.options).map((option) => {
                  const valueName = option.model.split(".")[1];
                  if (option.required && !values[valueName]) {
                    fieldErrors.push(option.model);
                  }
                });
                dispatch({
                  type: SET_ERROR,
                  formError: fieldErrors,
                });
                console.log("Values: ", fieldErrors);
                console.log("Values: ", values);
                if (fieldErrors.length) {
                  return;
                }
                dispatch({
                  type: REMOVE_ERROR,
                });            
                props.onSubmit(values);
              }}
              variant="contained"
              color="primary"
              // type="submit"
            >
              {props.submitTitle || "Submit"}
            </Button>
          </div>
        )}
      </Form>
    );
  }
}

const MUITextField = (props: any) => {
  // console.log("props", props)
  return (
    <Grid item={true} xs={12} md={6} sm={6}>
      <TextField
        label={props.name}
        variant="outlined"
        className="form-input"
        type={props.type}
        autoComplete="off"
        defaultValue={props.default}
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
        autoComplete="off"
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
  const { className, ...rest } = props;
  // console.log(props)
  return (
    <Grid item={true} xs={12} md={6} sm={6}>
      <FormControl variant="outlined" className={className}>
        <InputLabel id="demo-simple-select-outlined-label">
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label={props.label}
          {...rest}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.options.map((opt) => {
            return <MenuItem value={opt.value}>{opt.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};

const MUIMultipleSelectField = (props: any) => {
  const { className, ...rest } = props;
  console.log(props)
  return (
    <Grid item={true} xs={12} md={6} sm={6}>
      <FormControl variant="outlined" className={className}>
        <InputLabel id="demo-simple-select-outlined-label">
          {props.label}
        </InputLabel>
        <Select
          multiple
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label={props.label}
          value={props.value === undefined ? [] : props.value}
          {...rest}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.options.map((opt) => {
            return <MenuItem value={opt.value}>{opt.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};


const MUIDateField = (props: any) => {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1; 
  const month = monthWithOffset.toString().length < 2 ? `0${monthWithOffset}` : monthWithOffset; 
  const date = dateNow.getUTCDate().toString().length < 2 ? `0${dateNow.getUTCDate()}` : dateNow.getUTCDate();
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
  const toDate = `${year}-${month}-${date}`;

  return (
    <Grid item={true} xs={12} md={6} sm={6}>
      <TextField
        id="date"
        label={props.label}
        type="date"
        // defaultValue={toDate}
        defaultValue={"2010-01-01"}
        value={props.value ? props.value : "2010-01-01"}
        variant="outlined"
        onChange={(e) =>{ console.log("props:", props)
        const model = props.name.split(".");
        console.log(`${model[1]}.${model[2]}`)
          changeValuesInStore(
            `${model[1]}.${model[2]}`,
            e.target.value
          )
        }}
        className="form-input"
        // InputLabelProps={{
        //   shrink: true
        // }}
      />
      <div className={`error-text-hidden ${props.hasError} "error-text-show"}`}>
        Please fill in this field
      </div>
    </Grid>
  );
};

const MUIUploadContainer = (props: any) => {
  // console.log("Image props : ", props)
  const [openImg, setOpenImg] = React.useState(false);
  const { className, ...rest } = props;
  const model = props.name.split(".");
  const spllited = props.value && props.value.split(".");
  const ext = spllited && spllited[spllited.length - 1];

  const getDocURL = async(image, id) => {
    // console.log("image", image)
    if(image.name){
    const documentURL = await imageUpload({
      id: image.name + id,
      img: await getImageBase64(image),
      type: image.type
    });
    // console.log("documentURL : ", documentURL)
    return documentURL.url;
    }
    else return "";
  };
  const renderModal = (imgURL) => {
    // const { currentItem, data } = this.state;
    // if (!currentItem) {
    //   return ;
    // }
    return (
      <BaseModal
        open={openImg}
        className="inventory-modal"
        contentClassName="inventory-modal"
        onClose={() => setOpenImg(false) }
      >
        <Grid container spacing={1} className="">
          <Grid item className="modal-margin" xs={12} md={12}>
            <div >
              <img src={imgURL} height="200px" width="270px" alt="dta" />
            </div>
          </Grid>
        </Grid>
      </BaseModal>
    );
  };
  return (
    <div>
      {renderModal(props.value)}
      <Grid item={true} xs={12} md={7} sm={7}>
        <div className="upload-container">
          <div className="upload-head">{props.label}</div>
          <div className="upload-button" item={true} xs={12} md={7} sm={7}>
            <Button variant="contained" component="label">
              Upload Photo
              <input
                type="file"
                style={{ display: "none" }}
                onChange={ async(e) =>{
                  const fileData = e.target.files[0];
                  const url = await getDocURL(e.target.files[0], `${model[2]}`);
                  // console.log("url ", `${model[1]}.${model[2]}`)
                    changeValuesInStore(
                      `${model[1]}.${model[2]}`,
                      url
                    )
                }}
              />
            </Button>
              <span className="filename">
                {`${props.value && props.value.length > 10
                  // ? `${props.value.substr(8, 10)}...${ext}`
                  ? `${props.value.substr(89)}`
                  : ""}
                `}
              </span> 
            <VisibilityIcon 
              onClick={() => setOpenImg(true) }  
            />
            <DeleteIcon 
              onClick={() => changeValuesInStore( `${model[1]}.${model[2]}`, "" ) }
            />
          </div>
        </div>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errorFields: state.formReducer.formError,
    zipCodeResult: state.users.get("selectdata"),
  };
};

export const FormComponent = connect(mapStateToProps)(FormComponentImpl);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
