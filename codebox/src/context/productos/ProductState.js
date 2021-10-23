import React, { useReducer } from 'react';
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';

import { 
    OBTENER_PRODUCTOS,
    AGREGAR_PRODUCTO
} from '../../types';

const ProductState = props => {

    const initialState = {
        products: []
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProductReducer, initialState)

    //Serie de funciones para el CRUD

    //Obtener productos
    const getProducts = products => {
        dispatch({
            type: OBTENER_PRODUCTOS,
            payload: products
        });
    };

    const addProduct = () => {
        dispatch({
            type: AGREGAR_PRODUCTO
        });
    };

    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                getProducts,
                addProduct
            }}
        >
            { props.children }
        </ProductContext.Provider>
    )
}

export default ProductState;