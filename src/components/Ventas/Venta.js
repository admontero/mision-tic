import { useContext } from "react";
//COMPONENTES
import PurchaseContext from '../../context/ventas/PurchaseContext';

const Venta = ({ purchase }) => {

    const purchasesContext = useContext(PurchaseContext);
    const { selectPurchase, editingPurchase } = purchasesContext;

    return ( 
        <tr>
            <td>{ purchase._id }</td>
            <td>{ purchase.client_id }</td>
            <td>{ purchase.client_name }</td>
            <td>
                <span className={ `tag-status ${ purchase.status === 'en proceso' ? 'pending' : purchase.status === 'entregada' ? 'paid' : 'cancelled' }` }>
                    { purchase.status === 'en proceso' ? 'en proceso' : purchase.status === 'entregada' ? 'entregada' : 'cancelada' }
                </span>
            </td>
            <td className="action">
                <button 
                    onClick={ () => { selectPurchase(purchase._id); editingPurchase(); } }
                    className="editar">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>   
                </button>
            </td>
        </tr>
    );
}
 
export default Venta;