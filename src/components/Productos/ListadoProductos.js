import { Fragment, useContext } from "react";
//COMPONENTES
import Productos from "./Productos";
import Alert from "../includes/Alert";
//CONTEXTO
import ProductContext from "../../context/productos/ProductContext";

const ListadoProductos = () => {
    
    const productsContext = useContext(ProductContext);
    const { creatingProduct } = productsContext;

    return ( 
        <Fragment>
            <Alert />
            <section className="main-container">
                <div className="cards">
                    <div className="card card-caption">
                        <div className="card-caption-title">
                            <h2>Módulo de productos</h2>
                            <button onClick={ () => creatingProduct() } className="button-header button-new">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Nuevo producto
                            </button>
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