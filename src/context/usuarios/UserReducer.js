import {
    EDITANDO_USUARIO,
    EDITAR_USUARIO,
    LISTANDO_USUARIO,
    OBTENER_USUARIOS,
    SELECCIONAR_USUARIO
} from '../../types';

const UserReducer = (state, action) => {
    switch(action.type) {
        case LISTANDO_USUARIO:
            return {
                ...state,
                editing: false,
                listing: true,
            }
        case EDITANDO_USUARIO:
            return {
                ...state,
                listing: false,
                editing: true
            }
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
        case SELECCIONAR_USUARIO:
            return {
                ...state,
                userselected: action.payload
            }
        default: 
            return state;
    }
}

export default UserReducer;