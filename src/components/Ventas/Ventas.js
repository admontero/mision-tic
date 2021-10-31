import { Fragment, useState, useEffect, useContext } from "react";
//COMPONENTES
import Venta from "./Venta";
//CONTEXTO
import PurchaseContext from '../../context/ventas/PurchaseContext';

const Ventas = () => {

    //Extraer ventas del state inicial
    const purchasesContext = useContext(PurchaseContext);
    const { purchases, getPurchases, getPurchasesFiltered } = purchasesContext;

    const [optionFilter, setOptionFilter] = useState('idVenta');
    const [filter, setFilter] = useState('');

    //Obtener purchases cuando cargue el componente
    useEffect(() => {
        getPurchases();
        //eslint-disable-next-line
    }, []);

    //Obtener ventas cuando el valor del input o select del filtro cambien
    useEffect(() => {
        getPurchasesFiltered(filter, optionFilter);
        //eslint-disable-next-line
    }, [filter, optionFilter]);

    const onChangeSelect = e => {
        setOptionFilter(e.target.value);
    };

    const onChangeFilter = e => {
        setFilter(e.target.value);
    };

    return ( 
        <Fragment>
            <div className="card-header">
                <h3>Información general</h3>
                <div className="input-group">
                    <select id="option-filter" name="option-filter" onChange={ onChangeSelect }>
                        <option value="idVenta">ID Venta</option>
                        <option value="idCliente">ID Cliente</option>
                        <option value="nameCliente">Nombre Cliente</option>
                    </select>
                    <input type="search" placeholder="Buscar..." onChange={ onChangeFilter }></input>
                </div>
            </div>
            <div className="card-body">
                <table>
                    <thead>
                        <tr>
                            <th>Id venta</th>
                            <th>Id cliente</th>
                            <th>Nombre cliente</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            purchases.length === 0
                            ?
                                <tr>
                                    <td colSpan="5" className="empty">
                                        No hay ventas registradas en el sistema
                                    </td>  
                                </tr>
                            :
                                purchases.map(purchase => {
                                    return (
                                        <Venta
                                            key={ purchase._id }
                                            purchase={ purchase }
                                        />
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}
 
export default Ventas;