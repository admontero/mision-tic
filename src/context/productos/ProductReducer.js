import {  
    OBTENER_PRODUCTOS,
    VALIDAR_FORMULARIO,
    AGREGAR_PRODUCTO,
    MOSTRAR_ALERTA,
    CERRAR_ALERTA,
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case OBTENER_PRODUCTOS:
            return {
                ...state,
                products: action.payload
            }
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                errorform: false,
            }
        default: 
            return state;
    }
}