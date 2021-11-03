import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//COMPONENTES
import Login from "./../Login/Login";
import NavigationMenu from "../includes/NavigationMenu";
import ProductoGeneral from '../Productos/ProductoGeneral';
import UsuarioGeneral from '../Usuarios/UsuarioGeneral';
import VentaGeneral from '../Ventas/VentaGeneral';
//ESTADOS
import AlertState from '../../context/alerts/AlertState';
import ProductState from '../../context/productos/ProductState';
import PurchaseState from '../../context/ventas/PurchaseState';
import UserState from '../../context/usuarios/UserState';
import AuthState from '../../context/auth/AuthState';
//HELPERS
import PrivateRoute from "../routes/PrivateRoute";
import tokenAuth from "../../config/token";
//CSS E IMAGENES
import "./App.css";
import "../styles/Login.css";
import "../styles/Listar.css";
import "../styles/Crear.css";
import "../styles/Editar.css";

//Revisar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

const App = () => {
    return (
      <div className="App">
        <AuthState>
          <PurchaseState>
            <UserState>
              <ProductState>
                <AlertState>
                  <Router>
                    <NavigationMenu />
                    <Switch>
                      <Route path="/" exact component={ Login } />
                      <PrivateRoute path="/ventas" exact component={ VentaGeneral } />
                      <PrivateRoute path="/usuarios" exact component={ UsuarioGeneral } />
                      <PrivateRoute path="/productos" exact component={ ProductoGeneral } />
                      {/* <PrivateRoute path="/ventas/crear" exact component={ CrearVenta } />
                      <PrivateRoute path="/ventas/editar/:id" exact component={ EditarVenta } /> */}
                      {/* <PrivateRoute path="/usuarios/editar/:id" exact component={ EditarUsuario } /> */}
                      {/* <PrivateRoute path="/productos/agregar" exact component={ AgregarProducto } />
                      <PrivateRoute path="/productos/editar/:id" exact component={ EditarProducto } /> */}
                    </Switch>
                  </Router>
                </AlertState>
              </ProductState>
            </UserState>
          </PurchaseState>
        </AuthState>
      </div>
    )
}

export default App;
