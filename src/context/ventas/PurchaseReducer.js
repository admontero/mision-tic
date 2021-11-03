import {
    AGREGAR_VENTA,
    CREANDO_VENTA,
    EDITANDO_VENTA,
    EDITAR_VENTA,
    LISTANDO_VENTA,
    OBTENER_VENTAS, OBTENER_VENTAS_FILTRADAS, SELECCIONAR_VENTA
} from '../../types';

const PurchaseReducer = (state, action) => {
    switch(action.type) {
        case LISTANDO_VENTA:
            return {
                ...state,
                creating: false,
                editing: false,
                listing: true,
            }
        case CREANDO_VENTA:
            return {
                ...state,
                listing: false,
                editing: false,
                creating: true,
            }
        case EDITANDO_VENTA:
            return {
                ...state,
                listing: false,
                creating: false,
                editing: true
            }
        case OBTENER_VENTAS:
        case OBTENER_VENTAS_FILTRADAS:
            return {
                ...state,
                purchases: action.payload
            }
        case AGREGAR_VENTA:
            return {
                ...state,
                purchases: [...state.purchases, action.payload]
            }
        case EDITAR_VENTA:
            return {
                ...state,
                purchases: [state.purchases.map((purchase) => purchase._id === action.payload.id 
                    ? action.payload.purchaseUpdated : purchase)]
            }
        case SELECCIONAR_VENTA:
            return {
                ...state,
                purchaseselected: action.payload
            }
        default: 
            return state;
    }
}

export default PurchaseReducer;