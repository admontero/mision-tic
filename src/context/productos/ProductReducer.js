import {  
    OBTENER_PRODUCTOS,
    AGREGAR_PRODUCTO,
    OBTENER_PRODUCTOS_FILTRADOS,
    EDITAR_PRODUCTO,
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
                products: [...state.products, action.payload]
            }
        case EDITAR_PRODUCTO:
            return {
                ...state,
                errorform: false,
                products: state.products.map(product => product._id === action.payload.id 
                    ? action.payload.productUpdated : product)
            }
        default: 
            return state;
    }
}

export default ProductReducer;