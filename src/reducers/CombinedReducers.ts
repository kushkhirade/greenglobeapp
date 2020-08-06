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
  dailyRunning: '',
  registration: "",
  mfg: '',
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

export const leadTaskForm= {
  subject: "",
  priority: "",
  date: "",
  rating: "",
  status: "",
  callResult: "",
  comment: "",
}
const rxFormReducer = combineForms({
  userForm,
  leadForm,
  leadTaskForm,
  customerForm: {},
  editUserForm: {firstName: "", lastName: "", email: "", phone: "", role: ""},

});

export const reducers = combineReducers({
  utility: UtilityReducer,
  users: userReducer,
  rxFormReducer,
});
