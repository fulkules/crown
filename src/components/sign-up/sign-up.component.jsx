import React, { useState } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { SignUpContainer, SignUpTitle } from './sign-up.styles';

const SignUp = () => {

    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '', 
        password: '', 
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });

            setUserCredentials({
                ...userCredentials,
                displayName: '',
                email: '', 
                password: '', 
                confirmPassword: ''
            });
            
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <SignUpContainer>
            <SignUpTitle>I do not have an account</SignUpTitle>
            <span>Sign up with your email and password</span>

            <form className="sign-up-form" onSubmit={ handleSubmit }>
                <FormInput
                    type="text"
                    name="displayName"
                    value={ displayName }
                    label="Display Name"
                    onChange={ handleChange }
                    required
                />

                <FormInput
                    type="email"
                    name="email"
                    value={ email }
                    label="Email"
                    onChange={ handleChange }
                    required
                />

                <FormInput
                    type="password"
                    name="password"
                    value={ password }
                    label="Password"
                    onChange={ handleChange }
                    required
                />

                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={ confirmPassword }
                    label="Confirm Password"
                    onChange={ handleChange }
                    required
                />

                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </SignUpContainer>
    )
}

export default SignUp;

