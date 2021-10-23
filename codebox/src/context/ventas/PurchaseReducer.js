import {
    OBTENER_VENTAS,
    FORMULARIO_PRODUCTOS_VACIO,
    PRODUCTO_NO_EXISTE,
} from '../../types';

export default (state, action) => {
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