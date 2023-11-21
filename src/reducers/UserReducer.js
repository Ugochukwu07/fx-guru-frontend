import { REGISTER_USER, LOGIN_USER } from "#action/User";

const initialState = {
    
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
            };

        case LOGIN_USER:
            return {
                ...state,
            };
        default:
            return state;
    }
};