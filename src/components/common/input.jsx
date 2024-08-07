import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
    return <div>
        <label className='form-label' htmlFor={ name }>
            { label }
        </label>
        <div 
            { ...rest }
            name={ name }
            id={ name }
            className='form-control'>

        </div>
        { error && <div className='alert alert-warning'>{ error }</div> }
    </div>
}
 
export default Input;