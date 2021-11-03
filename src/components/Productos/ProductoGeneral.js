import { useContext } from "react";
//COMPONENTES
import ListadoProductos from '../Productos/ListadoProductos';
import AgregarProducto from '../Productos/AgregarProducto';
import EditarProducto from '../Productos/EditarProducto';
//CONTEXTO
import ProductContext from "../../context/productos/ProductContext";

const ProductoGeneral = () => {

    const productsContext = useContext(ProductContext);
    const { listing, creating, editing } = productsContext;
    
    return (
        listing ?   
            <ListadoProductos />
        : creating ?
            <AgregarProducto />
        : editing ?
            <EditarProducto />
        :
            null
    );
}
 
export default ProductoGeneral;