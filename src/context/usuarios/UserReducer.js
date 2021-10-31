import {
    EDITAR_USUARIO,
    OBTENER_USUARIOS
} from '../../types';

const UserReducer = (state, action) => {
    switch(action.type) {
        case OBTENER_USUARIOS:
            return {
                ...state,
                users: action.payload
            }
        case EDITAR_USUARIO:
            return {
                ...state,
                users: state.users.map(user => user._id === action.payload.id 
                    ? action.payload.userUpdated : user)
            }
        default: 
            return state;
    }
}

export default UserReducer;