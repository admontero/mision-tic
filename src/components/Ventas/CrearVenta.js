import { Fragment, useState, useEffect, useContext } from 'react';
//COMPONENTES
import FormProductoVenta from './FormProductoVenta';
import Alert from '../includes/Alert';
//CONTEXTO
import PurchaseContext from '../../context/ventas/PurchaseContext';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alerts/AlertContext';
//HELPERS
import calculateTotal from '../../config/calculateTotal';

const CrearVenta = () => {

    //Extraer productos del state inicial
    const purchasesContext = useContext(PurchaseContext);
    const { addPurchase, listingPurchases } = purchasesContext;

    const authsContext = useContext(AuthContext);
    const { user } = authsContext;

    const alertsContext = useContext(AlertContext);
    const { showAlert } = alertsContext;

    const [purchase, setPurchase] = useState({
        _id: '',
        date: '',
        total: '',
        status: '',
        client_id: '',
        client_name: '',
        seller_id: ''
    });

    const { _id, date, status, client_id, client_name, seller_id } = purchase;
    
    const [productTmp, setProductTmp] = useState({
        product_id: '',
        product_price: '',
        product_quantity: '',
    });
    
    const [productsPurchased, setProductsPurchased] = useState([]);

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setPurchase({
            ...purchase,
            seller_id: user._id
        });
        //eslint-disable-next-line
    }, []);

    //EVENTOS
    const changePurchase = e => {
        setPurchase({
            ...purchase,
            [e.target.name]: e.target.value
        });
    };

    const deleteProduct = (id, e) => {
        //Guardamos todos los productos en una nueva variable a excepción del que tenga la id
        let newProducts = productsPurchased.filter(product => product.product_id !== id);
        //Actualizamos el state de productos con la nueva variable
        setProductsPurchased([
            ...newProducts
        ]);
        //En caso de que el producto a editar sea eliminado limpiamos el estado y cambiamos el botón
        if (id === productTmp.product_id) {
            //Limpiamos el estado del producto temporal
            setProductTmp({
                product_id: '',
                product_price: '',
                product_quantity: '',
            });
            //Cambiamos el botón
            setEdit(false);
        }
    };

    const fillForm = (id, e) => {
        //Obtenemos el producto a editar
        let result = productsPurchased.filter(product => product.product_id === id);
        //Aplicamos destructuring al array resultado
        const [ productEdit ] = result;
        //Llenamos el state con la información del producto
        setProductTmp(productEdit);
        //Cambiamos el botón
        setEdit(true);
    };

    const submitPurchase = e => {
        e.preventDefault();
        
        //Validar formulario
        if (_id.trim() === '' || date.trim() === '' || status.trim() === '' || client_id.trim() === '' 
            || client_name.trim() === '' || seller_id.trim() === '' || productsPurchased.length === 0) {
            return showAlert('cancel', '¡Error!', 'Todos los campos son requeridos');
        }

        let purchaseFinal = { ...purchase, products: productsPurchased };
        
        //Crear venta
        addPurchase(purchaseFinal)
            .then(() => {
                showAlert('success', '¡Guardado!', 'El registro ha sido agregado con éxito');
                listingPurchases();
            })
            .catch(err => {
                showAlert('cancel', '¡Error!', err.response.data.msg);
            });
    };

    useEffect(() => {
        if (productsPurchased.length > 0) {
            setPurchase({
                ...purchase,
                total: calculateTotal(productsPurchased)
            });
        } else {
            setPurchase({
                ...purchase,
                total: ''
            });
        }
        //eslint-disable-next-line
    }, [productsPurchased]);

    return (
        <Fragment>
            <Alert />
            <section className="main-container">
                <div className="cards">
                    <div className="card">
                        <form method="POST" onSubmit={ submitPurchase }>
                            <div className="card-header">
                                <div className="title-back">
                                    <button onClick={ () => listingPurchases() } className="button-header button-add" type="button">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
                                        Atrás
                                    </button>
                                    <h3>Registro de venta</h3>
                                </div>
                            </div>
                            <div className="card-body"> 
                                <h3 className="label-info">Información general</h3>
                                <div className="form-section">
                                    <div className="form-group">
                                        <label htmlFor="_id">ID Venta</label>
                                        <input 
                                            type="text" 
                                            id="_id" 
                                            name="_id" 
                                            onChange={ changePurchase }
                                            value={ _id }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Fecha</label>
                                        <input 
                                            type="date" 
                                            id="date" 
                                            name="date" 
                                            onChange={ changePurchase }
                                            value={ date }
                                        />
                                    </div>
                                    {/* <div className="form-group">
                                        <label htmlFor="total">Valor total</label>
                                        <input 
                                            type="number" 
                                            id="total" 
                                            name="total" 
                                            onChange={ changePurchase }
                                            value={ total }
                                        />
                                    </div> */}
                                    <div className="form-group">
                                        <label htmlFor="status">Estado</label>
                                        <select 
                                            id="status" 
                                            name="status" 
                                            onChange={ changePurchase }
                                        >
                                            <option>--SELECCIONE UNA OPCIÓN--</option>
                                            <option value="en proceso">En proceso</option>
                                            <option value="entregada">Entregada</option>
                                            <option value="cancelada">Cancelada</option>
                                        </select>
                                    </div>
                                </div>
                                <h3 className="label-info">Información del cliente</h3>
                                <div className="form-section">
                                    <div className="form-group">
                                        <label htmlFor="client_id">ID Cliente</label>
                                        <input 
                                            type="text" 
                                            id="client_id" 
                                            name="client_id" 
                                            onChange={ changePurchase }
                                            value={ client_id }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="client_name">Nombre</label>
                                        <input 
                                            type="text" 
                                            id="client_name" 
                                            name="client_name" 
                                            onChange={ changePurchase }
                                            value={ client_name }
                                        />
                                    </div>
                                </div>
                                <h3 className="label-info">Información de productos</h3>
                                <div className="form-section">
                                    <FormProductoVenta
                                        productTmp={ productTmp }
                                        productsPurchased={ productsPurchased }
                                        edit={ edit }
                                        setProductTmp={ setProductTmp }
                                        setProductsPurchased={ setProductsPurchased }
                                        setEdit={ setEdit }
                                        showAlert={ showAlert }
                                    />
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productsPurchased.length === 0 
                                            ?
                                                <tr>
                                                    <td colSpan="4" className="empty">
                                                        Sin productos agregados
                                                    </td>  
                                                </tr>
                                            :
                                            productsPurchased.map(product => {
                                                return (
                                                    <tr key={ product.product_id }>
                                                        <td>{ product.product_id }</td>
                                                        <td>{ product.product_quantity }</td>
                                                        <td>{ product.product_price }</td>
                                                        <td className="action">
                                                            <button 
                                                                type="button" 
                                                                onClick={(e) => fillForm(product.product_id, e)} 
                                                                className="editar"
                                                            >
                                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                            </button>
                                                            <button 
                                                                type="button" 
                                                                onClick={(e) => deleteProduct(product.product_id, e)} 
                                                                className="eliminar"
                                                            >
                                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className="card-footer">
                                <p className="total">Total Venta: { purchase.total ? purchase.total : 0 }</p>
                                <button type="submit" className="button button-new">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                                    Guardar Venta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
 
export default CrearVenta;