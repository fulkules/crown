import React, { Component } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { SignUpContainer, SignUpTitle } from './sign-up.styles';
export class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '', 
            password: '', 
            confirmPassword: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '', 
                password: '', 
                confirmPassword: ''
            });
            
        } catch(e) {
            console.error(e);
        }
    };

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <SignUpContainer>
                <SignUpTitle>I do not have an account</SignUpTitle>
                <span>Sign up with your email and password</span>

                <form className="sign-up-form" onSubmit={ this.handleSubmit }>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={ displayName }
                        label="Display Name"
                        onChange={ this.handleChange }
                        required
                    />

                    <FormInput
                        type="email"
                        name="email"
                        value={ email }
                        label="Email"
                        onChange={ this.handleChange }
                        required
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={ password }
                        label="Password"
                        onChange={ this.handleChange }
                        required
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={ confirmPassword }
                        label="Confirm Password"
                        onChange={ this.handleChange }
                        required
                    />

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </SignUpContainer>
        )
    }
}

export default SignUp;

