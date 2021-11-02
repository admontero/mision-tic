import {
    MOSTRAR_ALERTA,
    CERRAR_ALERTA,
} from '../../types';

const AlertReducer = (state, action) => {
    switch(action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                alert: action.payload
            }
            case CERRAR_ALERTA:
                return {
                    ...state,
                    alert: null
                }
        default: 
            return state;
    }
}

export default AlertReducer;