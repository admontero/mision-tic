import React, { useReducer } from 'react';
//CONTEXTO
import UserContext from './UserContext';
//REDUCER
import UserReducer from './UserReducer';
//HELPERS
import clientAxios from '../../config/axios';
//EVENTOS
import { 
    EDITANDO_USUARIO,
    EDITAR_USUARIO,
    LISTANDO_USUARIO,
    OBTENER_USUARIOS,
    SELECCIONAR_USUARIO
} from '../../types';

const UserState = props => {

    const initialState = {
        listing: true,
        editing: false,
        users: [],
        userselected: null
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
                userUpdated: { _id: id, user },
                id: id
            }
        });
    };
    
    const selectUser = (id) => {
        const user = state.users.filter(u => u._id === id);
        const [ result ] = user;
        dispatch({
            type: SELECCIONAR_USUARIO,
            payload: result
        });
    };

    const listingUsers = () => {
        dispatch({
            type: LISTANDO_USUARIO
        })
    };

    const editingUser = () => {
        dispatch({
            type: EDITANDO_USUARIO
        })
    };

    return (
        <UserContext.Provider
            value={{
                listing: state.listing,
                editing: state.editing,
                users: state.users,
                userselected: state.userselected,
                getUsers,
                updateUser,
                selectUser,
                listingUsers,
                editingUser
            }}
        >
            { props.children }
        </UserContext.Provider>
    )
}

export default UserState;