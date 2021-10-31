import { Fragment, useContext, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { LazyLoadImage } from 'react-lazy-load-image-component';
//HELPERS
import clientAxios from '../../config/axios';
//IMAGENES Y CSS
import logo from './../Img/Codebox-without-text.jpg';
import "./Login.css";
//COMPONENTES
import Alert from '../includes/Alert';
//CONTEXTO
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
    //eslint-disable-next-line
  }, [message]);

  useEffect(() => {
    if (authenticated && !error) {
      props.history.push('/ventas');
    }
  }, [authenticated, error, props.history]);
  
  const RespuestaGoogle = (respuesta) =>{
    clientAxios.post('auth', { tokenId: respuesta.tokenId })
      .then(res => {
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
          <LazyLoadImage 
            src={ logo } 
            alt="Logo de caja con etiqueta de precio dentro" />
          <h1>Login CodeBox</h1>
          <GoogleLogin
            clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
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
