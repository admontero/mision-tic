import React, { useReducer } from 'react';
//CONTEXT
import PurchaseContext from './PurchaseContext';
//REDUCER
import PurchaseReducer from './PurchaseReducer';
//HELPERS
import clientAxios from '../../config/axios';
//EVENTOS
import { 
    AGREGAR_VENTA,
    EDITAR_VENTA,
    OBTENER_VENTAS,
    OBTENER_VENTAS_FILTRADAS
} from '../../types';

const PurchaseState = props => {

    const initialState = {
        purchases: [],
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(PurchaseReducer, initialState)

    //Serie de funciones para el CRUD

    //Obtener ventas
    const getPurchases = async () => {
        const results = await clientAxios.get('/ventas');
        dispatch({
            type: OBTENER_VENTAS,
            payload: results.data.purchases
        });
    };

    const getPurchasesFiltered = async (filter, option) => {
        const results = await clientAxios.get(`/ventas?${option}=${filter}`);
        dispatch({
            type: OBTENER_VENTAS_FILTRADAS,
            payload: results.data.purchases
        });
    };

    //Agregar venta
    const addPurchase = async purchase => {
        await clientAxios.post('/ventas', purchase);
        dispatch({
            type: AGREGAR_VENTA,
            payload: purchase
        });
    };

    //Editar venta
    const updatePurchase = async (purchase, id) => {
        clientAxios.patch('/ventas/' + id, purchase)
        dispatch({
            type: EDITAR_VENTA,
            payload: {
                purchaseUpdated: purchase,
                id: id
            }
        });
    };

    return (
        <PurchaseContext.Provider
            value={{
                purchases: state.purchases,
                getPurchases,
                getPurchasesFiltered,
                addPurchase,
                updatePurchase
            }}
        >
            { props.children }
        </PurchaseContext.Provider>
    )
}

export default PurchaseState;