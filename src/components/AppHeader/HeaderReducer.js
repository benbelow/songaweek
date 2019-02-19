import { TOGGLE_MENU } from "./HeaderActions";

const initialState = { showMenu: false };

const HeaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, showMenu: !state.showMenu };
    default:
      return state;
  }
};

export default HeaderReducer;
