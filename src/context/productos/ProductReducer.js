import {  
    OBTENER_PRODUCTOS,
    AGREGAR_PRODUCTO,
    OBTENER_PRODUCTOS_FILTRADOS,
} from '../../types';

const ProductReducer = (state, action) => {
    switch(action.type) {
        case OBTENER_PRODUCTOS:
            case OBTENER_PRODUCTOS_FILTRADOS:
            return {
                ...state,
                products: action.payload
            }
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                errorform: false,
            }
        default: 
            return state;
    }
}

export default ProductReducer;