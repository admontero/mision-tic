import {
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    CERRAR_SESION
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                user: action.payload.user,
                message: null
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                error: false
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                error: true,
                message: action.payload
            }
        default: 
            return state;
    }
}