import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { getMacros } from '../../../client/app/util/dailyMacrosCalculator'
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Button,
    Card,
    Label,
    FormResponse,
    Modal,
    ModalBody,
    ModalHeader,
    Table,
} from 'reactstrap'
import Router from 'next/router'

const validationSchema = Yup.object().shape({
    calories: Yup.number()
        .required('Calories are required')
        .integer('Calories must be a valid number'),
    protein: Yup.number()
        .required('Protein is required')
        .integer('Protein must be a valid number'),
    carbs: Yup.number()
        .required('Carbs are required')
        .integer('Carbs must be a valid number'),
    fats: Yup.number()
        .required('Fats required')
        .integer('Fats must be a valid number'),
    // dietType: Yup.string().required('Diet type is required'),
})

const MacrosForm = ({ calories }) => {
    const [customCalories, setCustomCalories] = useState(
        calories ? false : true
    )
    return (
        <Formik
            initialValues={{
                calories: calories || '',
                protein: '',
                carbs: '',
                fats: '',
                dietType: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                console.log('values', values)

                //  if (!userData) {
                //      setFitnessGoals(calculateFitnessInput(values))
                //  } else {
                //      const calculatedFitnessGoals = calculateFitnessInput(values)
                //      // props.gatherFitnessInfo(calculateFitnessInput(calculatedFitnessGoals));
                //      //   props.saveUserData(calculatedFitnessGoals, userData)

                //  }
                //  Router.push({
                //      pathname: '/assessment',
                //      query: { calories: 100, form: 'macros' },
                //  })
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                setFieldValue,
                setErrors,
                setFieldTouched,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <h5>
                                    Please enter some data so we can calculate
                                    your nutrition goals
                                </h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <div className="form-group">
                                    <Label for="exampleFormControlSelect2">
                                        Calories
                                    </Label>
                                    {calories && (
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setCustomCalories(true)
                                                resetForm()
                                            }}
                                            className="float-right btn btn-link text-decoration-none"
                                        >
                                            Customize
                                        </div>
                                    )}
                                    <input
                                        readOnly={customCalories ? false : true}
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.calories}
                                        name="calories"
                                        className="form-control"
                                    />
                                    {errors.calories && touched.calories && (
                                        <span className="text-danger">
                                            {errors.calories}
                                        </span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <div className="form-group">
                                    <p className="font-weight-bold">
                                        Macros based on popular diets
                                    </p>
                                    <Label for="exampleFormControlSelect2">
                                        Diets
                                    </Label>
                                    <select
                                        disabled={values.calories === ''}
                                        onChange={e => {
                                            if (values.calories === '') {
                                                setFieldTouched(
                                                    'dietType',
                                                    true
                                                )
                                                setErrors({
                                                    dietType:
                                                        'You must first enter your daily calories',
                                                })
                                            } else {
                                                const {
                                                    protein,
                                                    carbs,
                                                    fats,
                                                } = getMacros(
                                                    e.target.value,
                                                    Number(values.calories)
                                                )
                                                setFieldValue(
                                                    'protein',
                                                    protein.toFixed()
                                                )
                                                setFieldValue(
                                                    'carbs',
                                                    carbs.toFixed()
                                                )
                                                setFieldValue(
                                                    'fats',
                                                    fats.toFixed()
                                                )
                                                setFieldValue(
                                                    'dietType',
                                                    e.target.value
                                                )
                                            }
                                        }}
                                        onBlur={handleBlur}
                                        value={values.dietType}
                                        name="dietType"
                                        className="form-control"
                                    >
                                        <option
                                            value="Select your diet"
                                            label="Select your diet"
                                        />
                                        <option value="zone">Zone</option>
                                        <option value="atikins">Atkins</option>
                                        <option value="ketogenic">
                                            Ketogenic
                                        </option>
                                        <option value="mediterranean">
                                            Mediterranean
                                        </option>
                                        <option value="default">
                                            Default (U.S. dietary guidelines)
                                        </option>
                                    </select>
                                    {errors.dietType && touched.dietType && (
                                        <span className="text-danger">
                                            {errors.dietType}
                                        </span>
                                    )}
                                </div>
                                <p className="font-weight-bold text-muted">
                                    Or
                                </p>
                                <p className="font-weight-bold">
                                    Custom Macros
                                </p>

                                <div className="form-group">
                                    <Label for="exampleFormControlSelect2">
                                        Protein (in grams)
                                    </Label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.protein}
                                        name="protein"
                                        className="form-control"
                                    />
                                    {errors.protein && touched.protein && (
                                        <span className="text-danger">
                                            {errors.protein}
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <Label for="exampleFormControlSelect2">
                                        Carbs (in grams)
                                    </Label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.carbs}
                                        name="carbs"
                                        className="form-control"
                                    />
                                    {errors.carbs && touched.carbs && (
                                        <span className="text-danger">
                                            {errors.carbs}
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <Label for="exampleFormControlSelect2">
                                        Fats (in grams)
                                    </Label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fats}
                                        name="fats"
                                        className="form-control"
                                    />
                                    {errors.fats && touched.fats && (
                                        <span className="text-danger">
                                            {errors.fats}
                                        </span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group text-center">
                                    <button
                                        type="submit"
                                        disabled={
                                            Object.keys(errors).length > 0
                                        }
                                        className="btn btn-primary w-100"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </form>
            )}
        </Formik>
    )
}

export default MacrosForm
