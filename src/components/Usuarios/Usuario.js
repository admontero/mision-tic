import { Link } from "react-router-dom";

const Usuario = ({ user }) => {
    return ( 
        <tr>
            <td>{ user._id }</td>
            <td>{ user.name }</td>
            <td className="role">{ user.role ? user.role : <b>No tiene rol</b> }</td>
            <td>
                <span className={ `tag-status ${ user.status === 'pendiente' ? 'pending' : user.status === 'autorizado' ? 'paid' : 'cancelled' }` }>
                    { user.status === 'pendiente' ? 'pendiente' : user.status === 'autorizado' ? 'autorizado' : 'no autorizado' }
                </span>
            </td>
            <td className="action">
                <Link 
                    to={{
                        pathname: `/usuarios/editar/${user._id}`,
                        state: user
                    }} 
                    className="editar">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>   
                </Link>
            </td>
        </tr>
    );
}
 
export default Usuario;