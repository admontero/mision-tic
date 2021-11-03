import { Fragment, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import { LazyLoadImage } from 'react-lazy-load-image-component';
//COMPONENTES
import Alert from '../includes/Alert';
//CONTEXTO
import AlertContext from "../../context/alerts/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
//HELPERS
import clientAxios from '../../config/axios';
//IMAGENES Y CSS
import logo from './../Img/Codebox-without-text.jpg';

const Login = (props) => {

  const authsContext = useContext(AuthContext);
  const { alert, authenticated, error, startSession } = authsContext;

  const alertsContext = useContext(AlertContext);
  const { showAlert } = alertsContext;

  let history = useHistory();

  useEffect(() => {
    if (alert) {
      showAlert(alert.type, alert.title, alert.msg);
    }
    //eslint-disable-next-line
  }, [alert]);

  useEffect(() => {
    if (authenticated && !error) {
      !props.location.state
        ? history.push('/ventas') 
        : history.push(props.location.state.route);
    }
  }, [authenticated, error, history, props]);
  
  const RespuestaGoogle = (respuesta) =>{
    clientAxios.post('auth', { tokenId: respuesta.tokenId })
      .then(res => {
        startSession(res);
    });
  };

  return (
    <Fragment>
      <Alert />
      <section className="login-container">
        <div className="login">
          <LazyLoadImage 
            src={ logo } 
            alt="Logo de caja con etiqueta de precio dentro" 
          />
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
