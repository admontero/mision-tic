import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute = ({ component: Component, ...props }) => {

    const authsContext = useContext(AuthContext);
    const { error, authenticated, userAuthenticated } = authsContext;

    useEffect(() => {
        userAuthenticated();
    }, []);

    return ( 
        <Route { ...props } render={ props => !authenticated && error ? (
            <Redirect to="/" />
        ) : (
            <Component { ...props } />
        ) } />
    );
}
 
export default PrivateRoute;