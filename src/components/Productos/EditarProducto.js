import ProductContext from '../../context/productos/ProductContext';
import { Fragment, useState, useContext, useEffect } from 'react';
import AlertContext from "../../context/alerts/AlertContext";
import { useHistory } from 'react-router-dom';
import clientAxios from '../../config/axios';
import Alert from '../includes/Alert';

const EditarProducto = (props) => {

    //HOOKS AND DESTRUCTURING
    const productsContext = useContext(ProductContext);
    const { addProduct } = productsContext;

    const alertsContext = useContext(AlertContext);
    const { alert, showAlert, closeAlert } = alertsContext;
    
    const { _id, description, price, status } = props.location.state;

    const [product, setProduct] = useState({
        price: price.toString(),
        status: status.toString(),
        description: description
    });

    useEffect(() => {
        let timer = setTimeout(() => {
            closeAlert();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
        //eslint-disable-next-line
    }, [alert]);

    let history = useHistory();

    //EVENTOS
    const changeProduct = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const updateProduct = e => {
        e.preventDefault();

        //Validar formulario
        if (product.description.trim() === '' || product.price.trim() === '' || product.status.trim() === '') {
            closeAlert();
            showAlert('cancel', '¡Error!', 'Todos los campos son requeridos');
            return ;
        }

        //Actualizar producto
        clientAxios.patch(`/productos/${_id}`, product)
            .then(res => {
                showAlert('success', '¡Guardado!', 'Los cambios se han guardado con éxito');
                history.push({
                    pathname: '/productos'
                });
            })
            .catch(err => {
                closeAlert();
                showAlert('cancel', '¡Error!', err.response.data.msg);
            });

        addProduct();
    };

    return (
        <Fragment>
            {
                alert
                ?
                    <Alert alertType="cancel" alertHeader="¡Error!" alertBody="Todos los campos son requeridos" />
                :
                    ''
            }
            <section className="main-container">
                <div className="cards">
                    <div className="card">
                        <form method="POST" onSubmit={ updateProduct }>
                            <div className="card-header">
                                <h3>Editar Producto</h3>
                            </div>
                            <div className="card-body"> 
                                <h3 className="label-info">Información general</h3>
                                <div className="form-section">
                                    <div className="form-group">
                                        <label htmlFor="price">Precio Unitario <small>($)</small></label>
                                        <input 
                                            type="number" 
                                            id="price" 
                                            name="price"
                                            onChange={ changeProduct }
                                            value={ product.price }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status">Estado</label>
                                        <select 
                                            id="status" 
                                            name="status" 
                                            onChange={ changeProduct }
                                            defaultValue={ product.status === 'disponible' ? 'disponible' : 'no disponible' }
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
                                            defaultValue={ product.description }
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="card-footer">
                                <button type="submit" className="button button-new">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                                    Guardar cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
 
export default EditarProducto;