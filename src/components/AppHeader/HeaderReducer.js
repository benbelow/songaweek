import {SYNC_DATA, TOGGLE_MENU} from "./HeaderActions";

const initialState = {showMenu: false};

const HeaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return {...state, showMenu: !state.showMenu};
        case SYNC_DATA:
            console.log('sync data');
        default:
            return state;
    }
};

export default HeaderReducer;
