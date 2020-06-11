import cogoToast from "cogo-toast";
import { actions } from "react-redux-form";
import { store } from "src/store/Store";
import { Alert } from "./Alert";
import { Model } from "./Helpers";
import { Spinner } from "./Spinner";

export interface IUtility {
  drawerOpen?: boolean;
  alert?: Alert;
  spinner?: Spinner;
}

export const UtilityModel = Model<IUtility>({
  drawerOpen: false,
  alert: null,
  spinner: null,
});

export interface IHistory {
  push: (path: string) => void;
}

export class Utility extends UtilityModel {
  public static DRAWER_OPEN = "drawerOpen";
  public static ALERT = "alert";
  public static SPINNER = "spinner";

  public drawerOpen: boolean;
  public alert: Alert;
  public spinner: Spinner;
}

export function dispatch(action) {
  return store.dispatch(action);
}

export function changeValuesInStore(key, value) {
  dispatch(actions.change(key, value));
}

export function isLoggedIn() {
  return JSON.parse(localStorage.getItem("userData"));
}

export function saveLoggedInUserData(data) {
  return localStorage.setItem("userData", JSON.stringify(data));
}

export function isDealer() {
  return store.getState().users.get("currentUser").isDealer;
}

export function isLocalhost() {
  return location.host.includes("localhost");
}

export function showNotification(content, type, successMsg = "Done") {
  if (type === "suceess") {
    cogoToast.success(content);
  }
  if (type === "error") {
    cogoToast.error(content);
  }
  if (type === "warning") {
    cogoToast.success(content);
  }
  if (type === "loading") {
    cogoToast.loading(content).then(() => cogoToast.success(successMsg))
  }
}
