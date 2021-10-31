import React, { useReducer } from 'react';
//CONTEXTO
import UserContext from './UserContext';
//REDUCER
import UserReducer from './UserReducer';
//HELPERS
import clientAxios from '../../config/axios';
//EVENTOS
import { 
    EDITAR_USUARIO,
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
    const getUsers = async () => {
        const result = await clientAxios.get('/usuarios');
        dispatch({
            type: OBTENER_USUARIOS,
            payload: result.data.users
        });
    };

    //Editar usuario
    const updateUser = async (user, id) => {
        await clientAxios.patch(`/usuarios/${id}`, user);
        dispatch({
            type: EDITAR_USUARIO,
            payload: {
                userUpdated: user,
                id: id
            }
        });
    };

    return (
        <UserContext.Provider
            value={{
                users: state.users,
                getUsers,
                updateUser
            }}
        >
            { props.children }
        </UserContext.Provider>
    )
}

export default UserState;