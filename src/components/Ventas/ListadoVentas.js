import { Fragment, useContext } from "react";
//COMPONENTES
import Alert from "../includes/Alert";
import Ventas from './Ventas';
//CONTEXTO
import PurchaseContext from "../../context/ventas/PurchaseContext";

const ListadoVentas = () => {

    const purchasesContext = useContext(PurchaseContext);
    const { creatingPurchase } = purchasesContext;

    return ( 
        <Fragment>
            <Alert />
            <section className="main-container">
                <div className="cards">
                    <div className="card card-caption">
                        <div className="card-caption-title">
                            <h2>Módulo de ventas</h2>
                            <button onClick={ () => creatingPurchase() } className="button button-new">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Nueva venta
                            </button>
                        </div>   
                        <p>
                            En esta sección usted podrá visualizar el listado de ventas del sistema,
                            con la posibilidad de filtrarlas según el campo que seleccione. También 
                            tendrá la opción de crear una nueva venta o de actualizar las ya existentes.
                        </p>
                    </div>
                    <div className="card">
                        <Ventas />
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
 
export default ListadoVentas;