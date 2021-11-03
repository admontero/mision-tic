import { useContext } from "react";
import UserContext from "../../context/usuarios/UserContext";
import EditarUsuario from "./EditarUsuario";
import ListadoUsuarios from "./ListadoUsuarios";

const UsuarioGeneral = () => {

    const usersContext = useContext(UserContext);
    const { listing, editing } = usersContext;

    return (
        listing ?   
            <ListadoUsuarios />
        : editing ?
            <EditarUsuario />
        :
            null
    );
}
 
export default UsuarioGeneral;