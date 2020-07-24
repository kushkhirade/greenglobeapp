import { combineReducers } from "redux";
import { UtilityReducer } from "./UtilityReducer";
import { userReducer } from "../data/users";
import { combineForms } from "react-redux-form";

const rxFormReducer = combineForms({
  userForm: { name: "", email: "" },
  leadForm: { name: "", email: "" },
  customerForm: {},
  editUserForm: {},
});

export const reducers = combineReducers({
  utility: UtilityReducer,
  users: userReducer,
  rxFormReducer,
});
