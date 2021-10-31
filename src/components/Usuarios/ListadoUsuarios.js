import { Fragment, useContext } from "react";
//COMPONENTES
import Alert from "../includes/Alert";
import Usuarios from "./Usuarios";
//CONTEXTO
import AlertContext from "../../context/alerts/AlertContext";

const ListadoUsuarios = () => {

    const alertsContext = useContext(AlertContext);
    const { alert } = alertsContext;

    return ( 
        <Fragment>
            {
                alert
                ? 
                    <Alert alertType={ alert.type } alertHeader={ alert.title } alertBody={ alert.msg } />
                :
                    null
            }
            <section className="main-container">
                <div className="cards">
                    <div className="card card-caption">
                        <div className="card-caption-title">
                            <h2>Módulo de usuarios</h2>
                        </div>   
                        <p>
                            En esta sección usted podrá visualizar el listado de usuarios del sistema,
                            con la posibilidad de filtrarlas según el campo que seleccione. También 
                            podrá actualizar el rol y estado de los ya existentes.
                        </p>
                    </div>
                    <div className="card">
                        <Usuarios />
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default ListadoUsuarios;