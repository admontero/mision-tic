import React, { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';

import { 
    OBTENER_USUARIOS
} from '../../types';

const UserState = props => {

    const initialState = {
        users: []
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(UserReducer, initialState)

    //Serie de funciones para el CRUD

    //Obtener usuarios
    const getUsers = users => {
        dispatch({
            type: OBTENER_USUARIOS,
            payload: users
        });
    };

    return (
        <UserContext.Provider
            value={{
                users: state.users,
                getUsers
            }}
        >
            { props.children }
        </UserContext.Provider>
    )
}

export default UserState;