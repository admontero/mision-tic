import React, { useReducer } from 'react';
import PurchaseContext from './PurchaseContext';
import PurchaseReducer from './PurchaseReducer';

import { 
    OBTENER_VENTAS
} from '../../types';

const PurchaseState = props => {

    const initialState = {
        purchases: [],
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(PurchaseReducer, initialState)

    //Serie de funciones para el CRUD

    //Obtener ventas
    const getPurchases = purchases => {
        dispatch({
            type: OBTENER_VENTAS,
            payload: purchases
        });
    };

    return (
        <PurchaseContext.Provider
            value={{
                purchases: state.purchases,
                getPurchases,
            }}
        >
            { props.children }
        </PurchaseContext.Provider>
    )
}

export default PurchaseState;