import { Fragment } from "react";
//COMPONENTES
import Alert from "../includes/Alert";
import Usuarios from "./Usuarios";

const ListadoUsuarios = () => {
    return ( 
        <Fragment>
            <Alert />
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