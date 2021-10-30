import { Link } from "react-router-dom";

const Producto = ({ product }) => {
    return ( 
        <tr>
            <td>{ product._id }</td>
            <td colSpan="2">{ product.description }</td>
            <td>{ product.price }</td>
            <td>
                <span className={ `tag-status ${ product.status === 'disponible' ? 'paid' : 'cancelled' }` }>
                    { product.status === 'disponible' ? 'disponible' : 'no disponible' }
                </span>
            </td>
            <td className="action">
                <Link 
                    to={{
                        pathname: `/productos/editar/${product._id}`,
                        state: product
                    }} 
                    className="editar">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>   
                </Link>
            </td>
        </tr>
    );
}
 
export default Producto;