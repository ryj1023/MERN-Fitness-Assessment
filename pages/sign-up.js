import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { validateSignUp } from '../client/app/actions/async-actions';
import '../client/app/styles/sign-up.css';
import { connect } from 'react-redux';
import App from '../client/app/components/app';
import { Form, Container, Row, Column, FormGroup, Label, Input, Button } from 'reactstrap';

const formValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUp = (props) => (
            <Formik
                initialValues={formValues}
                validationSchema={Yup.object().shape({
                    userName: Yup.string(),
                    email: Yup.string()
                      .email('E-mail is not valid!')
                      .required('E-mail is required!'),
                    password: Yup.string()
                      .min(6, 'Password has to be longer than 6 characters!')  
                      .required('Password is required!'),
                    confirmPassword: Yup.string()
                      .oneOf([Yup.ref('password', null)], 'Passwords are not the same!')
                      .required('Password confirmation is required!'),
                  })}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                    props.validateSignUp(values)
                    setSubmitting(false)
                }}
                render={({ isSubmitting, errors, handleChange, handleSubmit }) => {
                    if (props.signUpResult === 'success' && props.validationResult === 'success') window.location = "/" 
                    return (
                        <Form>
                            {props.signUpResult.includes('already an account') ? <p>There is already an account associated with this email.</p> : (null)}
                            <FormGroup>
                            <Label className="form-field" htmlFor="userName">
                                <span>User Name:</span>
                                <Input name="userName" type="text" onChange={handleChange} />
                            </Label>
                            </FormGroup>
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
                        <FormGroup>
                            <Label className="form-field" htmlFor="confirmPassword">
                                <span>Confirm password:</span>
                                <Input name="confirmPassword" type="password" onChange={handleChange} />
                            </Label>
                        </FormGroup>
                        <div className="form-field-error">{errors.confirmPassword}</div>
                        <Button onClick={handleSubmit}>{isSubmitting ? 'Loading' : 'Sign Up'}</Button>
                        </Form>
                  )
            }}
         />
        )

const mapStateToProps = (state) => {
    return {
        validationResult: state.validationErrors,
        signUpResult: state.signUpErrors,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ validateSignUp }, dispatch);
export default App(connect(mapStateToProps, mapDispatchToProps)(SignUp))

