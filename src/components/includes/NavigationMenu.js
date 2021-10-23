import React, { useState, useContext, Fragment } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import './NavigationMenu.css';
import logo from './../Img/Codebox.jpg';
import { Link } from 'react-router-dom';

const NavigationMenu = () => {

    const authsContext = useContext(AuthContext);
    const { user, authenticated, error, closeSession } = authsContext;

    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="header-nav">
            <div className="container-nav">
                <div className="logo">
                    <Link to="/">
                        <img src={ logo } alt="Logo de una caja con etiqueta dentro" />
                    </Link>
                </div>

                {
                    authenticated && !error
                    ?
                        <nav className={ !showMenu ? 'main-nav nav-hidden' : 'main-nav nav-shown' }>
                            <Link to="/ventas">Ventas</Link>
                            {
                                user.role === 'administrador'
                                ?
                                    <Fragment>
                                        <Link to="/productos">Productos</Link>
                                        <Link to="/usuarios">Usuarios</Link>
                                    </Fragment>
                                :
                                    null
                            }
                        </nav>
                    :
                        null
                }
            </div>

            {
                authenticated && !error
                ?
                    <div className="logout-nav">
                        <p><b>Hola</b>, { user.name }</p>
                        {/* <img src={ user.imageUrl } alt="Avatar de usuario" /> */}
                        <button onClick={ () => closeSession() }>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        </button>
                    </div>
                :
                    null
            }


            {
                authenticated && !error
                ?
                    <div className="mobile-menu">
                        {
                            !showMenu 
                            ?   <svg onClick={ () => setShowMenu(!showMenu) } fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            :   <svg onClick={ () => setShowMenu(!showMenu) } fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        }
                    </div>
                :
                    null
                }
    </header>
    )
}
 
export default NavigationMenu;