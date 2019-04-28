import React, { Component } from 'react';
import { Form, Container, Row, Column, FormGroup, Label, Input, Button } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Navigation from '../client/app/components/navigations/NavBar';
import { loginUser } from '../client/app/actions/async-actions';
import App from '../client/app/components/app/app';
import '../client/app/styles/login.css';
import { connect } from 'react-redux';

const formValues = {
    email: '',
    password: '',
}

const Login = (props) => (
        <Formik
            initialValues={formValues}
            validationSchema={Yup.object().shape({
                userName: Yup.string(),
                email: Yup.string()
                  .email('E-mail is not valid!')
                  .required('E-mail is required!'),
                password: Yup.string()
                  //.min(6, 'Password has to be longer than 6 characters!')  
                  .required('Password is required!'),
              })}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                props.dispatch(loginUser(values))
                setSubmitting(false)
            }}
            render={({ isSubmitting, errors, handleChange, handleSubmit }) => {
                if (props.userData.length > 0) window.location = "/" 
                return (
                    <>
                    {!isSubmitting && props.userData.includes('No Account') ? (
                        <div>
                            <h1>{props.userData}</h1>
                            <h2>Please try another email and password combination or click 'Sign Up' to create an account</h2>
                        </div>
                    ) : (null)} 
                    <Form>
                        {console.log('this.props.userData', props.userData)}
                        <FormGroup>
                        <Label className="form-field" htmlFor="email">
                            <span>E-mail:</span>
                            <Input name="email" type="email" onChange={handleChange} />
                        </Label>
                        </FormGroup>
                    <div>{errors.email}</div>
                        <FormGroup>
                        <Label className="form-field" htmlFor="password">
                            <span>Password:</span>
                            <Input name="password" type="password" onChange={handleChange} />
                        </Label>
                    </FormGroup>
                    <div className="form-field-error">{errors.password}</div>
                    <div className="form-field-error">{errors.confirmPassword}</div>
                    <Button onClick={handleSubmit}>{isSubmitting ? 'Loading' : 'Log In'}</Button>
                    </Form>
                </>
              )
        }}
     />
)
const mapStateToProps = (state) => {
    return {
        userData: state.userData,
    }
}

export default App(connect(mapStateToProps)(Login))