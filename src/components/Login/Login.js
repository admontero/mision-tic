import React, { Fragment, useContext, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import logo from './../Img/Codebox.jpg';
import Alert from '../includes/Alert';
import axios from 'axios';
import "./Login.css";

import AlertContext from "../../context/alerts/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Login = (props) => {

  const authsContext = useContext(AuthContext);
  const { message, authenticated, error, startSession } = authsContext;

  const alertsContext = useContext(AlertContext);
  const { alert, showAlert, closeAlert } = alertsContext;

  useEffect(() => {
    closeAlert();
    if (message) {
      showAlert('cancel', '¡Error!', message);
    }
  }, [message]);

  useEffect(() => {
    if (authenticated && !error) {
      props.history.push('/ventas');
    }
  }, [authenticated, error, props.history]);

  useEffect(() => {
    let timer = setTimeout(() => {
      closeAlert();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [alert]);
  
  const RespuestaGoogle = (respuesta) =>{
    axios({
      method: "POST",
      url: "https://code-box-api.herokuapp.com/api/googlelogin",
      data: { tokenId: respuesta.tokenId }
    }).then(res => {
      startSession(res);
    });
  };

  return (
    <Fragment>
      {
        alert 
        ?
          <Alert alertType={ alert.type } alertHeader={ alert.title } alertBody={ alert.msg } />
        :
          null
      }
      <section className="login-container">
        <div className="login">
          <img src={logo} alt=""></img>
          
          <GoogleLogin
            clientId="205955155856-abm0lv2scjct0mpql8vlq4m6l90n5k66.apps.googleusercontent.com"
            buttonText="Acceder con Google"
            onSuccess={ RespuestaGoogle }
            onFailure={ RespuestaGoogle }
            cookiePolicy={ 'single_host_origin' }
          />
        </div>
      </section>
    </Fragment>
  )
}

export default Login;
