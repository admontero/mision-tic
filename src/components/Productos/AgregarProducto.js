import { useState } from 'react';
//COMPONENTS
import FormularioProducto from './FormularioProducto';

const AgregarProducto = () => {

    const [product, setProduct] = useState({
        _id: '',
        price: '',
        status: '',
        description: ''
    });

    return ( 
        <section className="main-container">
            <div className="cards">
                <div className="card">
                    <FormularioProducto
                        product={ product }
                        setProduct={ setProduct }
                    />
                </div>
            </div>
        </section>
    );
}
 
export default AgregarProducto;