import AlertContext from '../../context/alerts/AlertContext';
import { useContext } from 'react';
import './Alert.css'

const Alert = () => {

    const alertsContext = useContext(AlertContext);
    const { alert, closeAlert } = alertsContext;

    return ( 
        alert ?
            <div className="alert-container">
                <div className="alert">
                    <div className={ `alert-icon ${ alert.type }` }>
                        {
                            alert.type === 'success'
                            ?
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            :
                            alert.type === 'warning'
                            ?
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            :
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        }
                    </div>
                    <div className={ `alert-text ${ alert.type }` }>
                        <svg onClick={ () => closeAlert() } fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        <span>{ alert.title }</span>
                        <p>{ alert.msg }</p>
                    </div>
                </div>
            </div>
        :
            null
     );
}
 
export default Alert;