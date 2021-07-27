import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { validateSignUp } from '../../client/app/actions/async-actions'
import { connect } from 'react-redux'
import {
    Form,
    Container,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button,
    CardBody,
    FormFeedback,
    UncontrolledAlert,
} from 'reactstrap'

const formValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUp = props => {
    return (
        <Container>
            <Row>
                <Col>
                    <div className="card mx-auto mt-4">
                        <CardBody>
                            <Formik
                                initialValues={formValues}
                                validationSchema={Yup.object().shape({
                                    userName: Yup.string(),
                                    email: Yup.string()
                                        .email('E-mail is not valid!')
                                        .required('E-mail is required!'),
                                    password: Yup.string()
                                        .min(
                                            6,
                                            'Password has to be longer than 6 characters!'
                                        )
                                        .required('Password is required!'),
                                    confirmPassword: Yup.string()
                                        .oneOf(
                                            [Yup.ref('password', null)],
                                            'Passwords are not the same!'
                                        )
                                        .required(
                                            'Password confirmation is required!'
                                        ),
                                })}
                                onSubmit={(
                                    values,
                                    { setSubmitting, setErrors }
                                ) => {
                                    props.validateSignUp(
                                        values,
                                        props.dietGoals
                                    )
                                    setSubmitting(false)
                                }}
                                render={({
                                    isSubmitting,
                                    errors,
                                    handleChange,
                                    handleSubmit,
                                    touched,
                                }) => {
                                    if (
                                        props.signUpResult === 'success' &&
                                        props.validationResult === 'success'
                                    )
                                        window.location = '/'
                                    console.log('errors', errors)
                                    return (
                                        <Form>
                                            {props.signUpResult.includes(
                                                'already an account'
                                            ) ? (
                                                <UncontrolledAlert color="danger">
                                                    <p>
                                                        There is already an
                                                        account associated with
                                                        this email. Please use
                                                        another email or sign
                                                        into your existing
                                                        account.
                                                    </p>
                                                </UncontrolledAlert>
                                            ) : null}
                                            <FormGroup>
                                                <Label
                                                    className="form-field"
                                                    htmlFor="userName"
                                                    className="w-100"
                                                >
                                                    <span>User Name:</span>
                                                    <Input
                                                        name="userName"
                                                        type="text"
                                                        onChange={handleChange}
                                                        invalid={
                                                            touched.userName &&
                                                            errors.userName &&
                                                            errors.userName
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <FormFeedback>
                                                        {errors.userName}
                                                    </FormFeedback>
                                                </Label>
                                            </FormGroup>
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
                                            <FormGroup>
                                                <Label
                                                    className="form-field"
                                                    htmlFor="confirmPassword"
                                                    className="w-100"
                                                >
                                                    <span>
                                                        Confirm password:
                                                    </span>
                                                    <Input
                                                        name="confirmPassword"
                                                        type="password"
                                                        onChange={handleChange}
                                                        invalid={
                                                            touched.confirmPassword &&
                                                            errors.confirmPassword &&
                                                            errors.confirmPassword
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <FormFeedback>
                                                        {errors.confirmPassword}
                                                    </FormFeedback>
                                                </Label>
                                            </FormGroup>
                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={handleSubmit}
                                            >
                                                {isSubmitting
                                                    ? 'Loading'
                                                    : 'Sign Up'}
                                            </button>
                                        </Form>
                                    )
                                }}
                            />
                        </CardBody>
                    </div>
                </Col>
            </Row>
            <style jsx>{`
                .card {
                    max-width: 370px;
                }
            `}</style>
        </Container>
    )
}

SignUp.getInitialProps = ({ query }) => {
    const { calories, protein, carbs, fat } = query
    return {
        dietGoals: {
            calories,
            protein,
            carbs,
            fat,
        },
    }
}

const mapStateToProps = state => {
    return {
        validationResult: state.validationErrors,
        signUpResult: state.signUpErrors,
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ validateSignUp }, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp)
