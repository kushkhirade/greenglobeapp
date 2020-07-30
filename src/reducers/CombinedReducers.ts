import { combineReducers } from "redux";
import { UtilityReducer } from "./UtilityReducer";
import { userReducer } from "../data/users";
import { combineForms } from "react-redux-form";

const rxFormReducer = combineForms({
  userForm: { 
    name: "", 
    email: "",
    firstName:"",
    lastName:"",
    middleName:"",
    company:"",
    whatsAppNumber:"",
    leadType:"",
    leadSource:"",
    leadStatus:"",
    subLeadSource:"",
    rating:"",
    city:"",
    state:"",
    zip:"",
    country:"",
    street:""
  },
  leadForm: { 
    email:'',
    firstName: '',
    lastName: '',
    middleName: '',
    company: '',
    whatsAppNumber: '',
    leadType: '',
    leadSource: '',
    leadStatus: '',
    subLeadSource: '',
    rating: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    vehicleNumber: '',
    fuelType: '',
    wheeles: '',
    vehicleMek: '',
    vehicleModel: '',
    usage: '',
    vehicleType: '',
    dailyRunning: '',
    registration: '',
    mfg: '',
    chassis: '',
    gstNumber: '',
  },
  customerForm: {},
  editUserForm: {},
 
});

export const reducers = combineReducers({
  utility: UtilityReducer,
  users: userReducer,
  rxFormReducer,
});
