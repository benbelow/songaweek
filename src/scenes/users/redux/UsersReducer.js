import { UPDATE_USERS_LIST } from "./UsersActions";

const initialState = {
    users: [],
};

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USERS_LIST:
            return {
                ...state,
                users: action.users,
            };
        default:
            return state;
    }
};

export default UsersReducer;
