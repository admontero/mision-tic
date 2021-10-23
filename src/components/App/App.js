//import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "./App.css";
import Login from "./../Login/Login";
import NavigationMenu from "../includes/NavigationMenu";
import ListadoVentas from "../Ventas/ListadoVentas";
import CrearVenta from '../Ventas/CrearVenta';
import ListadoUsuarios from '../Usuarios/ListadoUsuarios';
import ListadoProductos from '../Productos/ListadoProductos';
import EditarVenta from '../Ventas/EditarVenta'
import AgregarProducto from '../Productos/AgregarProducto';
import EditarProducto from '../Productos/EditarProducto';
import EditarUsuario from '../Usuarios/EditarUsuario';

import AlertState from '../../context/alerts/AlertState';
import ProductState from '../../context/productos/ProductState';
import PurchaseState from '../../context/ventas/PurchaseState';
import UserState from '../../context/usuarios/UserState';
import AuthState from '../../context/auth/AuthState';

import PrivateRoute from "../routes/PrivateRoute";
import tokenAuth from "../../config/token";

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
                      <PrivateRoute path="/ventas" exact component={ ListadoVentas } />
                      <PrivateRoute path="/ventas/crear" exact component={ CrearVenta } />
                      <PrivateRoute path="/ventas/editar/:id" exact component={ EditarVenta } />
                      <PrivateRoute path="/usuarios" exact component={ ListadoUsuarios } />
                      <PrivateRoute path="/usuarios/editar/:id" exact component={ EditarUsuario } />
                      <PrivateRoute path="/productos" exact component={ ListadoProductos } />
                      <PrivateRoute path="/productos/agregar" exact component={ AgregarProducto } />
                      <PrivateRoute path="/productos/editar/:id" exact component={ EditarProducto } />
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
