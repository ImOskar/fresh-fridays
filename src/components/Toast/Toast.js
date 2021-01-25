import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import './Toast.styles.css'

const Toast = ({message, title, type}) => {
    return (
        <div className='toast-box'>
            <div className='notification'>
                <div className='notification-icon'>
                    {type === 'duplicate' &&
                        <FontAwesomeIcon className='link-margin' icon={faClone} />  
                    }
                    {type === 'error' &&
                        <FontAwesomeIcon className='link-margin' icon={faExclamationCircle} />  
                    }
                    {type === 'success' &&
                        <FontAwesomeIcon className='link-margin' icon={faCheckCircle} />  
                    }
                </div>
                <div className='notification-text'>
                    <span className='notification-title'>{title}</span>
                    <span>{message}</span>
                </div>
            </div>
        </div>
    )
}

export default Toast;