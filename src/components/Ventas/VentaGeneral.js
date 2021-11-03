import { useContext } from "react";
//COMPONENTES
import CrearVenta from "./CrearVenta";
import EditarVenta from "./EditarVenta";
import ListadoVentas from "./ListadoVentas";
//CONTEXTO
import PurchaseContext from "../../context/ventas/PurchaseContext";

const VentaGeneral = () => {

    const purchasesContext = useContext(PurchaseContext);
    const { listing, creating, editing } = purchasesContext;

    return (
        listing ?   
            <ListadoVentas />
        : creating ?
            <CrearVenta />
        : editing ?
            <EditarVenta />
        :
            null
    );
}
 
export default VentaGeneral;