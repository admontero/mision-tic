import { Fragment, useState, useEffect, useContext } from "react";
//CONTEXTO
import ProductContext from "../../context/productos/ProductContext";
//COMPONENTES
import ListadoVacio from "../includes/ListadoVacio";
import Producto from "./Producto";

const Productos = () => {

    const productsContext = useContext(ProductContext);
    const { products, getProducts, getProductsFiltered } = productsContext;
    
    const [optionFilter, setOptionFilter] = useState('id');
    const [filter, setFilter] = useState('');

    //Obtener productos cuando cargue el componente
    useEffect(() => {
        getProducts();
        //eslint-disable-next-line
    }, []);

    //Obtener productos cuando el valor del input o select del filtro cambien
    useEffect(() => {
        getProductsFiltered(filter, optionFilter);
        //eslint-disable-next-line
    }, [filter, optionFilter]);

    const onChangeSelect = e => {
        setOptionFilter(e.target.value);
    };

    const onChangeFilter = e => {
        setFilter(e.target.value);
    };

    return ( 
            <Fragment>
                <div className="card-header">
                    <h3>Información general</h3>
                    <div className="input-group">
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
                                            <Producto
                                                key={ product._id }
                                                product={ product }
                                            />
                                        )
                                    })
                                :
                                    <ListadoVacio 
                                        msg="No hay productos registrados en el sistema" 
                                    />
                            }
                        </tbody>
                    </table>
                </div>
            </Fragment>
    );
}
 
export default Productos;