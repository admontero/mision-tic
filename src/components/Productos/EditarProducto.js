import { useState } from 'react';
import FormularioProducto from './FormularioProducto';

const EditarProducto = (props) => {
    
    const { _id, description, price, status } = props.location.state;

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