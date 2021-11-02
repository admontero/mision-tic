import React, { useEffect, useReducer } from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';

import {
    MOSTRAR_ALERTA,
    CERRAR_ALERTA,
} from '../../types';

const AlertState = props => {

    const initialState = {
        alert: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(AlertReducer, initialState)

    //Mostrar alerta
    const showAlert = (type, title, msg) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: { type, title, msg }
        });
    };

    //Cerrar alerta
    const closeAlert = () => {
        dispatch({
            type: CERRAR_ALERTA
        });
    };

    useEffect(() => {
        let timer = setTimeout(() => {
            closeAlert();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [state.alert]);

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert,
                closeAlert,
            }}
        >
            { props.children }
        </AlertContext.Provider>
    )
}

export default AlertState;