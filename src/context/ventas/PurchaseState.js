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
    CREANDO_VENTA,
    EDITANDO_VENTA,
    EDITAR_VENTA,
    LISTANDO_VENTA,
    OBTENER_VENTAS,
    OBTENER_VENTAS_FILTRADAS,
    SELECCIONAR_VENTA
} from '../../types';

const PurchaseState = props => {

    const initialState = {
        listing: true,
        creating: false,
        editing: false,
        purchases: [],
        purchaseselected: null
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
                purchaseUpdated: { _id: id, purchase },
                id: id
            }
        });
    };

    const selectPurchase = (id) => {
        const purchase = state.purchases.filter(p => p._id === id);
        const [ result ] = purchase;
        dispatch({
            type: SELECCIONAR_VENTA,
            payload: result
        });
    };

    const listingPurchases = () => {
        dispatch({
            type: LISTANDO_VENTA
        })
    };

    const creatingPurchase = () => {
        dispatch({
            type: CREANDO_VENTA
        })
    };

    const editingPurchase = () => {
        dispatch({
            type: EDITANDO_VENTA
        })
    };

    return (
        <PurchaseContext.Provider
            value={{
                listing: state.listing,
                creating: state.creating,
                editing: state.editing,
                purchases: state.purchases,
                purchaseselected: state.purchaseselected,
                listingPurchases,
                creatingPurchase,
                editingPurchase,
                getPurchases,
                getPurchasesFiltered,
                addPurchase,
                updatePurchase,
                selectPurchase
            }}
        >
            { props.children }
        </PurchaseContext.Provider>
    )
}

export default PurchaseState;