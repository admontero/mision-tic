import { Fragment, useEffect, useContext } from "react";
//CONTEXTO
import ProductContext from "../../context/productos/ProductContext";

const FormProductoVenta = ({ edit, productTmp, productsPurchased, setEdit, setProductTmp, setProductsPurchased, showAlert, closeAlert }) => {

    const productsContext = useContext(ProductContext);
    const { products, getProducts } = productsContext;

    const { product_id, product_price, product_quantity } = productTmp;

    //Obtener productos cuando cargue el componente
    useEffect(() => {
        getProducts();
        //eslint-disable-next-line
    }, []);

    const changeProduct = e => {
        setProductTmp({
            ...productTmp,
            [e.target.name]: e.target.value
        });
    };

    const addProduct = () => {
        
        if (product_id.trim() === '' || product_price.trim() === '' || product_quantity.trim() === '') {
            closeAlert();
            return showAlert('cancel', '¡Error!', 'El id, el precio y la cantidad son requeridos');
            //return alert('El id, el precio y la cantidad del producto son requeridos');
        }

        let result = products.filter(product => product._id === product_id);

        if (result.length === 0) {
            closeAlert();
            return showAlert('cancel', '¡Error!', 'No existe un producto con este id');
            //return alert('No hay productos con este id');
        }

        setProductTmp(productTmp);

        setProductsPurchased([
            ...productsPurchased,
            productTmp
        ]);

        setProductTmp({
            product_id: '',
            product_price: '',
            product_quantity: '',
        });
    };

    const editProduct = () => {
        //Actualizamos el producto
        setProductsPurchased(
            productsPurchased.map(product => product.product_id === productTmp.product_id ? productTmp : product)
        );
        //Limpiamos el estado del producto temporal
        setProductTmp({
            product_id: '',
            product_price: '',
            product_quantity: '',
        });
        //Cambiamos el botón
        setEdit(false);
    };


    return ( 
        <Fragment>
            <div className="form-group">
                <label htmlFor="product_id">ID producto</label>
                <input 
                    type="text" 
                    id="product_id" 
                    name="product_id" 
                    onChange={ changeProduct }
                    value={ product_id }
                />
            </div>
            <div className="form-group">
                <label htmlFor="product_quantity">Cantidad</label>
                <input 
                    type="number" 
                    id="product_quantity" 
                    name="product_quantity" 
                    onChange={ changeProduct }
                    value={ product_quantity }
                />
            </div>
            <div className="form-group">
                <label htmlFor="product_price">Precio unitario</label>
                <input 
                    type="number" 
                    id="product_price" 
                    name="product_price" 
                    onChange={ changeProduct }
                    value={ product_price }
                />
            </div>
            <div className="form-group">
                {
                    edit
                    ?
                        <button 
                            type="button" 
                            className="button button-show"
                            onClick={ editProduct }
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            Editar
                        </button>
                    :    
                    <button 
                        type="button" 
                        className="button button-add"
                        onClick={ addProduct }
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Agregar
                    </button>
                }
            </div>
        </Fragment>
    );
}
 
export default FormProductoVenta;