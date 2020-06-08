import { fromJS } from "immutable";
import { SAVE_LOGGED_IN_USER_DATA } from "src/actions/Helpers";

export const userReducer = (state = fromJS({}), action) => {
  switch (action.type) {
    case "SAVE_DEALER_DETAILS":
      return state.set("data", action.data);
    case SAVE_LOGGED_IN_USER_DATA:
      return state.set("currentUser", action.data);

    default:
      return state;
  }
};
