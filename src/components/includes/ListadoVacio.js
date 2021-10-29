const ListadoVacio = ({ msg }) => {
    return ( 
        <tr>
            <td colSpan="6" className="empty">
                { msg }
            </td>
        </tr>
    );
}
 
export default ListadoVacio;