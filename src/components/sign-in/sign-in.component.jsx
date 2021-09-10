import React, { useState } from 'react'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
  } from './sign-in.styles';

const SignIn = () => {
    
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

    const { email, password } = userCredentials;
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await auth.signInWithEmailAndPassword(email, password);
            setUserCredentials({ ...userCredentials, email: '', password: '' });
        } catch(error){
            console.error(error);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <SignInContainer>
            <SignInTitle>I already have an account</SignInTitle>
            <span>Sign in with your email and password</span>

            <form onSubmit={ handleSubmit }>
                <FormInput 
                    type="email" 
                    name="email" 
                    label="email"
                    value={ email } 
                    handleChange={ handleChange } 
                    required 
                />

                <FormInput 
                    type="password" 
                    name="password" 
                    label="password"
                    value={ password } 
                    handleChange={ handleChange } 
                    required 
                />
                <ButtonsBarContainer>
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={ signInWithGoogle } isGoogleSignIn>Sign In With Google</CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    )
}

export default SignIn;
