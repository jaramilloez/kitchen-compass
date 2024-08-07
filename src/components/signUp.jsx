import React, { Component } from 'react';
import Joi from 'joi';
import Form from './common/form';

class SignUp extends Form {
    state = { 
        data: {
            name: '',
            email: '',
            password: ''
        },
        errors: {}
    } 

    schema = Joi.object({ 
        name: Joi
            .label('Name')
            .string()
            .required(),
        email: Joi
            .label('Username')
            .string()
            .required()
            .email(),
        password: Joi
            .label('Password')
            .string()
            .required()
            .min(8)
    })

    render() { 
        return <form></form>
    }
}
 
export default SignUp;