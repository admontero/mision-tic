import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import { 
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        error: true,
        alert: null,
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    //Serie de funciones para el CRUD

    //Retorna el usuario autenticado
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }

        try {
            const res = await clientAxios.get('/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: res.data.user
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data
            });
        }
    };

    //Cuando el usuario inicia sesión
    const startSession = data => {
        dispatch({
            type: LOGIN_EXITOSO,
            payload: data.data
        });

        userAuthenticated();
    };

    //Cierra la sesión del usuario
    const closeSession = () => {
        dispatch({
            type: CERRAR_SESION
        });

        //Quitamos el token del header
        tokenAuth();
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                error: state.error,
                alert: state.alert,
                startSession,
                closeSession,
                userAuthenticated
            }}
        >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState;