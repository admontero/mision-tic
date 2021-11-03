import React, { useContext, useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute = ({ component: Component, ...props }) => {

    const authsContext = useContext(AuthContext);
    const { error, authenticated, userAuthenticated } = authsContext;

    let location = useLocation();

    useEffect(() => {
        userAuthenticated();
        //eslint-disable-next-line
    }, []);

    return ( 
        <Route { ...props } render={ props => !authenticated && error ? (
            <Redirect to={{ pathname: '/', state: { route: location.pathname } }} />
        ) : (
            <Component { ...props } />
        ) } />
    );
}
 
export default PrivateRoute;