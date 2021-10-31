import {
    AGREGAR_VENTA,
    EDITAR_VENTA,
    OBTENER_VENTAS, OBTENER_VENTAS_FILTRADAS
} from '../../types';

const PurchaseReducer = (state, action) => {
    switch(action.type) {
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
        default: 
            return state;
    }
}

export default PurchaseReducer;