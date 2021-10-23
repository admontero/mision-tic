import {
    OBTENER_USUARIOS
} from '../../types';

export default (state, action) => {
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