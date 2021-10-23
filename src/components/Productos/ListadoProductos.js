import ProductContext from "../../context/productos/ProductContext";
import { Fragment, useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alerts/AlertContext";
import clientAxios from '../../config/axios';
import { Link } from "react-router-dom";
import Alert from "../includes/Alert";
import './ListadoProductos.css';


const Productos = () => {

    //Extraer productos del state inicial
    const productsContext = useContext(ProductContext);
    const { products, getProducts } = productsContext;

    const alertsContext = useContext(AlertContext);
    const { alert, closeAlert } = alertsContext;

    const [optionFilter, setOptionFilter] = useState('id');
    const [filter, setFilter] = useState('');
    
    //Obtener productos cuando cargue el componente
    useEffect(() => {
        const consultAPI = async () => {
            //const url = 'https://code-box-api.herokuapp.com/api/productos';
    
            const results = await clientAxios.get('/productos');

            getProducts(results.data.products);
        }

        consultAPI();
    }, []);

    useEffect(() => {
        let timer = setTimeout(() => {
            closeAlert();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [alert]);

    //Obtener productos cuando el valor del input o select del filtro cambien
    useEffect(() => {
        const consultAPI = async (fil, opt) => {
            //const url = `https://code-box-api.herokuapp.com/api/productos?${opt}=${fil}`;
            
            const results = await clientAxios.get(`/productos?${opt}=${fil}`);

            getProducts(results.data.products);
        };

        consultAPI(filter, optionFilter);
    }, [filter, optionFilter]);

    const onChangeSelect = e => {
        setOptionFilter(e.target.value);
    };

    const onChangeFilter = e => {
        setFilter(e.target.value);
    };

    return ( 
        <Fragment>
            {
                alert
                ? 
                    <Alert 
                        alertType={ alert.type }
                        alertHeader={ alert.title } 
                        alertBody={ alert.msg } 
                    />
                :
                    null
            }
            <section className="main-container">
                <div className="cards">
                    <div className="card card-caption">
                        <div className="card-caption-title">
                            <h2>Módulo de productos</h2>
                            <Link to="/productos/agregar" className="button button-new">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Nuevo producto
                            </Link>
                        </div>   
                        <p>
                            En esta sección usted podrá visualizar el listado de productos del sistema,
                            con la posibilidad de filtrarlos según el campo que seleccione. También 
                            tendrá la opción de agregar un nuevo producto o de actualizar los ya existentes.
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h3>Información general</h3>
                            <div className="input-group">
                                {/* <select>
                                    <option>5</option>
                                    <option>10</option>
                                    <option>25</option>
                                </select> */}
                                <select id="option-filter" name="option-filter" onChange={ onChangeSelect }>
                                    <option value="id">ID Producto</option>
                                    <option value="description">Descripción Producto</option>
                                </select>
                                <input type="search" placeholder="Buscar..." onChange={ onChangeFilter }></input>
                            </div>    
                        </div>
                        <div className="card-body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th colSpan="2">Descripción</th>
                                        <th>Precio</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.length > 0
                                        ?
                                            products.map(product => {
                                                return (
                                                    <tr key={ product._id }>
                                                        <td>{ product._id }</td>
                                                        <td colSpan="2">{ product.description }</td>
                                                        <td>{ product.price }</td>
                                                        <td>
                                                            <span className={ `tag-status ${ product.status == 'disponible' ? 'paid' : 'cancelled' }` }>
                                                                { product.status == 'disponible' ? 'disponible' : 'no disponible' }
                                                            </span>
                                                        </td>
                                                        <td className="action">
                                                            <Link 
                                                                to={{
                                                                    pathname: `/productos/editar/${product._id}`,
                                                                    state: product
                                                                }} 
                                                                className="editar">
                                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>   
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        :
                                            <tr>
                                                <td colSpan="6" className="empty">
                                                    No hay productos registrados en el sistema
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                            {/* <div className="pagination">
                                Mostrando de 1 a 8 de 100 entradas 
                                <div className="pagination-links">
                                    <a href="#" className="button button-pagination">Anterior</a>
                                    <a href="#" className="button button-pagination">Siguiente</a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* <div className="card">
                        <div className="card-header">
                            <h3>Vista Previa de Producto</h3>
                            <a href="#" className="button button-show">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Ver más</a>
                        </div>
                        <div className="card-body">
                            <h3 className="label-info">Marca</h3>
                            <p className="content-info">Sony</p>
                            <h3 className="label-info">Iva</h3>
                            <p className="content-info">Aplica</p>
                            <h3 className="label-info">Precio</h3>
                            <p className="content-info">$1.800.000</p>
                        </div>
                    </div> */}
                </div>
            </section>
        </Fragment>
    )
}

export default Productos;