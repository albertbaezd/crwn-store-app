import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';


class SignUp extends React.Component{

    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

    }

    handleSubmit = async event => {
        event.preventDefault();


        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert('passwords dont match');
            return;
        }

        try{

            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, displayName);

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch (error){
            console.error(error);

        }
    };


    handleChange = event => {

        const {name, value} = event.target;

        this.setState({[name]: value});

    }

    render() {

        const {displayName, email, password, confirmPassword} = this.state;

        return(

            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className="sign-up-form" action="" onSubmit= {this.handleSubmit}>
                    <FormInput
                        type= 'text'
                        name = 'displayName'
                        value= {displayName}
                        onchange={this.handleChange}
                        label='Display name'
                        required
                    ></FormInput>
                    <FormInput
                        type= 'email'
                        name = 'email'
                        value= {email}
                        onchange={this.handleChange}
                        label='Email'
                        required
                    ></FormInput>
                    <FormInput
                        type= 'password'
                        name = 'password'
                        value= {password}
                        onchange={this.handleChange}
                        label='password'
                        required
                    ></FormInput>
                    <FormInput
                        type= 'password'
                        name = 'confirmPassword '
                        value= {displayName}
                        onchange={this.handleChange}
                        label='Confirm Password'
                        required
                    ></FormInput>

                    <CustomButton type="submit">SIGN UP</CustomButton>

                </form>
            </div>
        )
    }

}

export default SignUp;