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
    SELECCIONAR_PRODUCTO,
    LISTANDO_PRODUCTO,
    CREANDO_PRODUCTO,
    EDITANDO_PRODUCTO,
} from '../../types';

const ProductState = props => {

    const initialState = {
        listing: true,
        creating: false,
        editing: false,
        products: [],
        productselected: null,
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
                productUpdated: { _id: id, ...product },
                id: id
            }
        });
    };

    const selectProduct = (id) => {
        const product = state.products.filter(p => p._id === id);
        const [ result ] = product;
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: result
        });
    };

    const listingProducts = () => {
        dispatch({
            type: LISTANDO_PRODUCTO
        })
    };

    const creatingProduct = () => {
        dispatch({
            type: CREANDO_PRODUCTO
        })
    };

    const editingProduct = () => {
        dispatch({
            type: EDITANDO_PRODUCTO
        })
    };

    return (
        <ProductContext.Provider
            value={{
                listing: state.listing,
                creating: state.creating,
                editing: state.editing,
                products: state.products,
                productselected: state.productselected,
                listingProducts,
                creatingProduct,
                editingProduct,
                getProducts,
                getProductsFiltered,
                addProduct,
                updateProduct,
                selectProduct
            }}
        >
            { props.children }
        </ProductContext.Provider>
    )
}

export default ProductState;