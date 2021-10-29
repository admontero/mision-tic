import {
    OBTENER_USUARIOS
} from '../../types';

const UserReducer = (state, action) => {
    switch(action.type) {
        case OBTENER_USUARIOS:
            return {
                ...state,
                users: action.payload
            }
        default: 
            return state;
    }
}

export default UserReducer;