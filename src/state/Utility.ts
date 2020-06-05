import { Model } from "./Helpers";
import { Alert } from "./Alert";
import { Spinner } from "./Spinner";
import { actions } from "react-redux-form";
import { store } from "src/store/Store";

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
