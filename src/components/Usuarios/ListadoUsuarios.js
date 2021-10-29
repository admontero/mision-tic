import UserContext from "../../context/usuarios/UserContext";
import AlertContext from "../../context/alerts/AlertContext";
import { Fragment, useContext, useEffect } from "react";
import clientAxios from '../../config/axios';
import { Link } from "react-router-dom";
import Alert from "../includes/Alert";

const ListadoUsuarios = () => {

    const usersContext = useContext(UserContext);
    const { users, getUsers } = usersContext;

    const alertsContext = useContext(AlertContext);
    const { alert, closeAlert } = alertsContext;

    //Obtener usuarios cuando cargue el componente
    useEffect(() => {
        const consultAPI = async () => {
            const results = await clientAxios.get('/usuarios');
            getUsers(results.data.users);
        }
        consultAPI();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        let timer = setTimeout(() => {
            closeAlert();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
        //eslint-disable-next-line
    }, [alert]);

    return ( 
        <Fragment>
            {
                alert
                ? 
                    <Alert alertType={ alert.type } alertHeader={ alert.title } alertBody={ alert.msg } />
                :
                    null
            }
            <section className="main-container">
                <div className="cards">
                    <div className="card card-caption">
                        <div className="card-caption-title">
                            <h2>Módulo de usuarios</h2>
                        </div>   
                        <p>
                            En esta sección usted podrá visualizar el listado de usuarios del sistema,
                            con la posibilidad de filtrarlas según el campo que seleccione. También 
                            podrá actualizar el rol y estado de los ya existentes.
                        </p>
                    </div>
                    <div className="card">
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
                                            <tr>
                                                <td colSpan="5" className="empty">
                                                    No hay usuarios registrados en el sistema
                                                </td>  
                                            </tr>
                                        :
                                            users.map(user => {
                                                return (
                                                    <tr key={ user._id }>
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
                                                )
                                            })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default ListadoUsuarios;