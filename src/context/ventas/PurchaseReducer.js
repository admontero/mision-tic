import {
    OBTENER_VENTAS
} from '../../types';

const PurchaseReducer = (state, action) => {
    switch(action.type) {
        case OBTENER_VENTAS:
            return {
                ...state,
                purchases: action.payload
            }
        default: 
            return state;
    }
}

export default PurchaseReducer;