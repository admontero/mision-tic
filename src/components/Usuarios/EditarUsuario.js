import React, { Fragment, useState, useContext } from 'react';
//COMPONENTS
import Alert from '../includes/Alert';
//CONTEXT
import AlertContext from "../../context/alerts/AlertContext";
import UserContext from '../../context/usuarios/UserContext';

const EditarUsuario = () => {

    //HOOKS AND DESTRUCTURING
    const alertsContext = useContext(AlertContext);
    const { showAlert } = alertsContext;

    const usersContext = useContext(UserContext);
    const { userselected, updateUser, listingUsers } = usersContext;

    const { role, status, _id } = userselected;
    
    const [user, setUser] = useState({
        role: role,
        status: status.toString(),
    });

    //EVENTOS
    const changeUser = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = e => {
        e.preventDefault();

        //Validar formulario
        if (user.status.trim() === '') {
            showAlert('cancel', '¡Error!', 'El campo estado es requerido');
            return ;
        }

        //Actualizar usuario
        updateUser(user, _id)
            .then(() => {
                showAlert('success', '¡Guardado!', 'Los cambios se han guardado con éxito');
                listingUsers();
            })
            .catch(err => {
                showAlert('cancel', '¡Error!', err.response.data.msg);
            });
    };

    return ( 
        <Fragment>
            <Alert />
            <section className="main-container">
                <div className="cards">
                    <div className="card">
                        <form method="POST" onSubmit={ submitForm }>
                            <div className="card-header">
                                <div className="title-back">
                                    <button onClick={ () => listingUsers() } className="button-header button-add" type="button">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
                                        Atrás
                                    </button>
                                    <h3>Editar Usuario</h3>
                                </div>
                            </div>
                            <div className="card-body"> 
                                <h3 className="label-info">Información general</h3>
                                <div className="form-section">
                                    <div className="form-group">
                                        <label htmlFor="role">Rol</label>
                                        <select 
                                            id="role" 
                                            name="role" 
                                            onChange={ changeUser }
                                            defaultValue={ user.role === 'administrador' 
                                                ? 'administrador' 
                                                : user.role === 'vendedor' 
                                                ? 'vendedor'
                                                : '' }
                                        >
                                            <option value="">--SELECCIONE UN ROL--</option>
                                            <option value="administrador">Administrador</option>
                                            <option value="vendedor">Vendedor</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status">Estado</label>
                                        <select 
                                            id="status" 
                                            name="status" 
                                            onChange={ changeUser }
                                            value={ user.status === 'pendiente' ? 'pendiente' : user.status === 'autorizado' ? 'autorizado' : 'no autorizado' }
                                        >
                                            <option value="pendiente">Pendiente</option>
                                            <option value="autorizado">Autorizado</option>
                                            <option value="no autorizado">No autorizado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="card-footer">
                                <button type="submit" className="button button-new">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                                    Guardar cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
 
export default EditarUsuario;