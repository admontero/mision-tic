import { useState, useContext } from 'react';
//COMPONENTES
import FormularioProducto from './FormularioProducto';
//CONTEXTO
import ProductContext from "../../context/productos/ProductContext";

const EditarProducto = () => {
    const productsContext = useContext(ProductContext);
    const { productselected } = productsContext;
    
    const { _id, description, price, status } = productselected;

    const [product, setProduct] = useState({
        price: price.toString(),
        status: status.toString(),
        description: description
    });

    return (
        <section className="main-container">
            <div className="cards">
                <div className="card">
                    <FormularioProducto
                        product={ product }
                        setProduct={ setProduct }
                        id={ _id }
                    />
                </div>
            </div>
        </section>
    );
}
 
export default EditarProducto;