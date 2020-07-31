import { combineReducers } from "redux";
import { UtilityReducer } from "./UtilityReducer";
import { userReducer } from "../data/users";
import { combineForms } from "react-redux-form";

export const leadForm = {
  name: "",
  email: "",
  firstName: "",
  lastName: "",
  middleName: "",
  company: "",
  whatsAppNumber: "",
  leadType: "",
  leadSource: "",
  leadStatus: "",
  subLeadSource: "",
  rating: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  street: "",
  vehicleNumber: "",
  fuelType: "",
  wheeles: "",
  vehicleMek: "",
  vehicleModel: "",
  usage: "",
  vehicleType: "",
  dailyRunning: 0,
  registration: "4/5/2019",
  mfg: 10,
  chassis: "",
  gstNumber: ""
}

export const userForm= {
  name: "",
  email: "",
  firstName: "",
  lastName: "",
  middleName: "",
  company: "",
  whatsAppNumber: "",
  leadType: "",
  leadSource: "",
  leadStatus: "",
  subLeadSource: "",
  rating: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  street: ""
}

const rxFormReducer = combineForms({
  userForm,
  leadForm,
  customerForm: {},
  editUserForm: {},

});

export const reducers = combineReducers({
  utility: UtilityReducer,
  users: userReducer,
  rxFormReducer,
});
