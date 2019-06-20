import React, { Component } from 'react'
import {
    Form,
    Container,
    Row,
    Column,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    FormFeedback,
    UncontrolledAlert,
} from 'reactstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Navigation from '../../client/app/components/navigations'
import { loginUser } from '../../client/app/actions/async-actions'
import { connect } from 'react-redux'
import Link from 'next/link'

const formValues = {
    email: '',
    password: '',
}

const Login = props => (
    <Card className="ml-auto mr-auto mt-3" style={{ maxWidth: '370px' }}>
        <CardBody>
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
                render={({
                    isSubmitting,
                    errors,
                    handleChange,
                    handleSubmit,
                    touched,
                    submitCount,
                }) => {
                    if (submitCount >= 1 && props.userData.length > 0) {
                        window.location = '/'
                    }
                    return (
                        <>
                            {submitCount >= 1 && props.userData.length === 0 ? (
                                <div>
                                    <UncontrolledAlert color="danger">
                                        <p>
                                            Your provided information is
                                            invalid. Please try another email
                                            and password combination or sign up
                                            for an account{' '}
                                            <Link href="/sign-up">
                                                <a>here</a>
                                            </Link>
                                            .
                                        </p>
                                    </UncontrolledAlert>
                                </div>
                            ) : null}
                            <Form>
                                <FormGroup>
                                    <Label
                                        className="form-field"
                                        htmlFor="email"
                                        className="w-100"
                                    >
                                        <span>E-mail:</span>
                                        <Input
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            invalid={
                                                touched.email &&
                                                errors.email &&
                                                errors.email
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <FormFeedback>
                                            {errors.email}
                                        </FormFeedback>
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label
                                        className="form-field"
                                        htmlFor="password"
                                        className="w-100"
                                    >
                                        <span>Password:</span>
                                        <Input
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            invalid={
                                                touched.password &&
                                                errors.password &&
                                                errors.password
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <FormFeedback>
                                            {errors.password}
                                        </FormFeedback>
                                    </Label>
                                </FormGroup>
                                <button
                                    className="w-100 btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    {isSubmitting ? 'Loading' : 'Log In'}
                                </button>
                            </Form>
                        </>
                    )
                }}
            />
        </CardBody>
    </Card>
)
const mapStateToProps = state => {
    return {
        userData: state.userData,
    }
}

export default connect(mapStateToProps)(Login)
