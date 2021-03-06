import { Fragment, useContext } from "react";
//COMPONENTES
import Alert from '../includes/Alert';
//CONTEXTO
import ProductContext from '../../context/productos/ProductContext';
import AlertContext from '../../context/alerts/AlertContext';

const FormularioProducto = (props) => {

    //HOOKS AND DESTRUCTURING
    const productsContext = useContext(ProductContext);
    const { listingProducts, addProduct, updateProduct } = productsContext;

    const alertsContext = useContext(AlertContext);
    const { showAlert } = alertsContext;

    //EVENTOS
    const changeProduct = e => {
        props.setProduct({
            ...props.product,
            [e.target.name]: e.target.value
        });
    };

    const createProduct = e => {
        e.preventDefault();

        //Validar formulario
        if ( props.product._id.trim() === '' || props.product.price.trim() === '' || 
            props.product.status.trim() === '' || props.product.description.trim() === '') {
            showAlert('cancel', '¡Error!', 'Todos los campos son requeridos');
            return ;
        }

        addProduct(props.product).then(() => {
            //Mostrar alerta
            showAlert('success', '¡Guardado!', 'El registro ha sido agregado con éxito');
            //Redirigir a listado
            listingProducts();
        });
    }

    const editProduct = e => {
        e.preventDefault();

        //Validar formulario
        if (props.product.price.trim() === '' || props.product.status.trim() === '' || 
            props.product.description.trim() === '') {
            showAlert('cancel', '¡Error!', 'Todos los campos son requeridos');
            return ;
        }

        updateProduct(props.product, props.id).then(() => {
            //Mostrar alerta
            showAlert('success', '¡Guardado!', 'Los cambios se han guardado con éxito');
            //Redirigir a listado de productos
            listingProducts();
        });
    }

    return ( 
        <Fragment>
            <Alert />
            <form method="POST" onSubmit={ props.id ? editProduct : createProduct }>
                <div className="card-header">
                    <div className="title-back">
                        <button onClick={ () => listingProducts() } className="button-header button-add" type="button">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
                            Atrás
                        </button>
                        <h3>{ props.id ? 'Edición de Producto' : 'Registro de Producto' }</h3>
                    </div>
                </div>  
                <div className="card-body"> 
                    <h3 className="label-info">Información general</h3>
                    <div className="form-section">
                        {
                            !props.id
                            ?
                                <div className="form-group">
                                    <label htmlFor="_id">ID Producto</label>
                                    <input 
                                        type="text" 
                                        id="_id" 
                                        name="_id" 
                                        onChange={ changeProduct }
                                        value={ props.product._id }
                                    />
                                </div>
                            :
                                null
                        }
                        <div className="form-group">
                            <label htmlFor="price">Precio Unitario <small>($)</small></label>
                            <input 
                                type="number" 
                                id="price" 
                                name="price" 
                                onChange={ changeProduct }
                                value={ props.product.price } 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Estado</label>
                            <select 
                                id="status" 
                                name="status" 
                                onChange={ changeProduct } 
                                defaultValue={ props.id ? props.product.status === 'disponible' ? 'disponible' : 'no disponible' : null }
                            >
                                <option>--SELECCIONE UNA OPCIÓN--</option>
                                <option value="disponible">Disponible</option>
                                <option value="no disponible">No disponible</option>
                            </select>
                        </div>
                        <div className="form-group two-columns">
                            <label htmlFor="description">Descripción</label>
                            <textarea 
                                rows="5" 
                                id="description" 
                                name="description" 
                                onChange={ changeProduct }
                                defaultValue={ props.product.description }
                            ></textarea>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="card-footer">
                    <button type="submit" className="button button-new">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                        { props.id ? 'Guardar Cambios' : 'Guardar Producto' } 
                    </button>
                </div>
            </form>
        </Fragment>
    );
}
 
export default FormularioProducto;