import {  
    OBTENER_PRODUCTOS,
    AGREGAR_PRODUCTO,
    OBTENER_PRODUCTOS_FILTRADOS,
    EDITAR_PRODUCTO,
    SELECCIONAR_PRODUCTO,
    LISTANDO_PRODUCTO,
    CREANDO_PRODUCTO,
    EDITANDO_PRODUCTO,
    OBTENER_PRODUCTOS_DISPONIBLES,
} from '../../types';

const ProductReducer = (state, action) => {
    switch(action.type) {
        case LISTANDO_PRODUCTO:
            return {
                ...state,
                creating: false,
                editing: false,
                listing: true,
            }
        case CREANDO_PRODUCTO:
            return {
                ...state,
                listing: false,
                editing: false,
                creating: true,
            }
        case EDITANDO_PRODUCTO:
            return {
                ...state,
                listing: false,
                creating: false,
                editing: true
            }
        case OBTENER_PRODUCTOS:
        case OBTENER_PRODUCTOS_FILTRADOS:
            return {
                ...state,
                products: action.payload
            }
        case OBTENER_PRODUCTOS_DISPONIBLES:
            return {
                ...state,
                productsavailable: state.products.filter(product => product.status === 'disponible')
            }
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case EDITAR_PRODUCTO:
            return {
                ...state,
                products: state.products.map(product => product._id === action.payload.id 
                    ? action.payload.productUpdated : product)
            }
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                productselected: action.payload
            }
        default: 
            return state;
    }
}

export default ProductReducer;