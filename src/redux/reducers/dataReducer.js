import constants from "../constants";

const initialState = {
  demoData: []
};

const dataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.DEMO_CONSTANT:
      return {
        ...state,
        demoData: [...payload]
      };
    default:
      return state;
  }
};

export default dataReducer;
