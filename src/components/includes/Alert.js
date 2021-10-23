import AlertContext from '../../context/alerts/AlertContext';
import { useContext } from 'react';
import './Alert.css'

const Alert = ({ alertType, alertHeader, alertBody }) => {

    const alertsContext = useContext(AlertContext);
    const { closeAlert } = alertsContext;

    return ( 
        <div className="alert-container">
            <div className="alert">
                <div className={ `alert-icon ${alertType}` }>
                    {
                        alertType === 'success'
                        ?
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        :
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    }
                </div>
                <div className={ `alert-text ${alertType}` }>
                    <svg onClick={ () => closeAlert() } fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    <span>{ alertHeader }</span>
                    <p>{ alertBody }</p>
                </div>
            </div>
        </div>
     );
}
 
export default Alert;