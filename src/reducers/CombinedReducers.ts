import { combineReducers } from "redux";
import { UtilityReducer } from "./UtilityReducer";
import { AuthenticationReducer } from "./AuthenticationReducer";
import { userReducer } from "../data/users";
import { rootReducer as materialsReducers } from "../data/material";
import { rootReducer as mailReducers } from "../data/mail";
import { combineForms } from "react-redux-form";

const rxFormReducer = combineForms({
  userForm: { name: "", email: "" },
  leadForm: { name: "", email: "" },
  customerForm: {},
  editUserForm: {},
});

export const reducers = combineReducers({
  utility: UtilityReducer,
  authentication: AuthenticationReducer,
  users: userReducer,
  materials: materialsReducers,
  mail: mailReducers,
  rxFormReducer,
});
