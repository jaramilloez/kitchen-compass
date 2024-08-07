import React from 'react';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    } 
    
    validate = () => {};

    handleChange = (e) => {
        e.preventDefault();
    }
    
    renderInput = ({ name, label }) => {
        const { errors } = this.state
        return <Input 
            name={ name }
            label={ label }
            error={ errors[name] }
            onChange={ e => this.handleChange(e) }
        />
    }
}
 
export default Form;