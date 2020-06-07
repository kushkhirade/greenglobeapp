export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_DEALER_DETAILS":
      return { ...state, data: action.data };

    default:
      return state;
  }
};
