import {SYNC_DATA} from "./AdminActions";

const initialState = {};

const AdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SYNC_DATA:
            console.log('sync data');
            break;
        default:
            return state;
    }
};

export default AdminReducer;
