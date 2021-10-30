import React, { useReducer } from 'react';
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
//HELPERS
import clientAxios from '../../config/axios';

import { 
    OBTENER_PRODUCTOS,
    OBTENER_PRODUCTOS_FILTRADOS,
    AGREGAR_PRODUCTO,
    EDITAR_PRODUCTO,
} from '../../types';

const ProductState = props => {

    const initialState = {
        products: []
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProductReducer, initialState)

    //Serie de funciones para el CRUD

    //Obtener productos
    const getProducts = async () => {
        const results = await clientAxios.get('/productos');
        dispatch({
            type: OBTENER_PRODUCTOS,
            payload: results.data.products
        });
    };

    const getProductsFiltered = async (filter, option) => {
        const results = await clientAxios.get(`/productos?${option}=${filter}`);
        dispatch({
            type: OBTENER_PRODUCTOS_FILTRADOS,
            payload: results.data.products
        });
    };

    const addProduct = async product => {
        await clientAxios.post('/productos', product)
        dispatch({
            type: AGREGAR_PRODUCTO,
            payload: product
        });
    };

    const updateProduct = async (product, id) => {
        await clientAxios.patch(`/productos/${id}`, product)
        dispatch({
            type: EDITAR_PRODUCTO,
            payload: { 
                productUpdated: product,
                id: id
            }
        });
    };

    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                getProducts,
                getProductsFiltered,
                addProduct,
                updateProduct
            }}
        >
            { props.children }
        </ProductContext.Provider>
    )
}

export default ProductState;