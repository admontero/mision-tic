import PurchaseContext from '../../context/ventas/PurchaseContext';
import { Fragment, useContext, useEffect, useState } from "react";
import AlertContext from "../../context/alerts/AlertContext";
import clientAxios from '../../config/axios';
import { Link } from "react-router-dom";
import Alert from "../includes/Alert";
import './ListadoVentas.css';

const ListadoVentas = () => {

    //Extraer ventas del state inicial
    const purchasesContext = useContext(PurchaseContext);
    const { purchases, getPurchases } = purchasesContext;

    const alertsContext = useContext(AlertContext);
    const { alert, closeAlert } = alertsContext;

    const [optionFilter, setOptionFilter] = useState('idVenta');
    const [filter, setFilter] = useState('');

    //Obtener purchases cuando cargue el componente
    useEffect(() => {
        const consultAPI = async () => {
            //const url = 'https://code-box-api.herokuapp.com/api/ventas';
    
            const results = await clientAxios.get('/ventas');

            getPurchases(results.data.purchases);
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

    //Obtener ventas cuando el valor del input o select del filtro cambien
    useEffect(() => {
        const consultAPI = async (fil, opt) => {
            //const url = `https://code-box-api.herokuapp.com/api/ventas?${opt}=${fil}`;
            
            const results = await clientAxios.get(`/ventas?${opt}=${fil}`);

            getPurchases(results.data.purchases);
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
                            <h2>Módulo de ventas</h2>
                            <Link to="/ventas/crear" className="button button-new">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Nueva venta
                            </Link>
                        </div>   
                        <p>
                            En esta sección usted podrá visualizar el listado de ventas del sistema,
                            con la posibilidad de filtrarlas según el campo que seleccione. También 
                            tendrá la opción de crear una nueva venta o de actualizar las ya existentes.
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
                                    <option value="idVenta">ID Venta</option>
                                    <option value="idCliente">ID Cliente</option>
                                    <option value="nameCliente">Nombre Cliente</option>
                                </select>
                                <input type="search" placeholder="Buscar..." onChange={ onChangeFilter }></input>
                            </div>
                        </div>
                        <div className="card-body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id venta</th>
                                        <th>Id cliente</th>
                                        <th>Nombre cliente</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        purchases.length === 0
                                        ?
                                            <tr>
                                                <td colSpan="5" className="empty">
                                                    No hay ventas registradas en el sistema
                                                </td>  
                                            </tr>
                                        :
                                            purchases.map(purchase => {
                                                return (
                                                    <tr key={ purchase._id }>
                                                        <td>{ purchase._id }</td>
                                                        <td>{ purchase.client_id }</td>
                                                        <td>{ purchase.client_name }</td>
                                                        <td>
                                                            <span className={ `tag-status ${ purchase.status == 'en proceso' ? 'pending' : purchase.status == 'entregada' ? 'paid' : 'cancelled' }` }>
                                                                { purchase.status == 'en proceso' ? 'en proceso' : purchase.status == 'entregada' ? 'entregada' : 'cancelada' }
                                                            </span>
                                                        </td>
                                                        <td className="action">
                                                            <Link 
                                                                    to={{
                                                                        pathname: `/ventas/editar/${purchase._id}`,
                                                                        state: purchase
                                                                    }} 
                                                                    className="editar">
                                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>   
                                                                </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
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
                </div>
            </section>
        </Fragment>
    );
}
 
export default ListadoVentas;