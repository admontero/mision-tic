import { Fragment, useEffect, useContext } from "react";
//COMPONENTES
import ListadoVacio from "../includes/ListadoVacio";
import Usuario from "./Usuario";
//CONTEXTO
import UserContext from "../../context/usuarios/UserContext";

const Usuarios = () => {

    const usersContext = useContext(UserContext);
    const { users, getUsers } = usersContext;

    //Obtener usuarios cuando cargue el componente
    useEffect(() => {
        getUsers();
        //eslint-disable-next-line
    }, []);

    return ( 
        <Fragment>
            <div className="card-header">
                <h3>Información general</h3>
            </div>
            <div className="card-body">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length === 0 
                            ?
                                <ListadoVacio 
                                    msg="No hay usuarios registrados en el sistema" 
                                />
                            :
                                users.map(user => {
                                    return (
                                        <Usuario 
                                            key={ user._id }
                                            user={ user }
                                        />
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}
 
export default Usuarios
;