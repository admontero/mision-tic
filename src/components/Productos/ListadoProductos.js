import { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
//COMPONENTES
import Productos from "./Productos";
import Alert from "../includes/Alert";
//CONTEXTO
import AlertContext from "../../context/alerts/AlertContext";

const ListadoProductos = () => {

    //Extraer productos del state inicial
    const alertsContext = useContext(AlertContext);
    const { alert, closeAlert } = alertsContext;

    useEffect(() => {
        let timer = setTimeout(() => {
            closeAlert();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
        //eslint-disable-next-line
    }, [alert]);

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
                        <Productos />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default ListadoProductos;