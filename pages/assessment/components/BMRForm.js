import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
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
import { dailyCaloriesCalculator } from '../../../client/app/util/dailyCaloriesCalculator'

const validationSchema = Yup.object().shape({
    age: Yup.number().integer('Age must be a valid number'),
    currentWeight: Yup.number()
        .required('Weight is required')
        .integer('Current weight must be a valid number'),
    heightInFeet: Yup.number()
        .required('Height in feet is required')
        .integer('Height in feet must be a valid number'),
    heightInInches: Yup.number()
        .required('Height in inches is required')
        .integer('Height in inches must be a valid number'),
    targetWeight: Yup.number()
        .required('Target weight is required')
        .integer('Target weight must be a valid number'),
    activityLevel: Yup.string().required('Activity level is required'),
    gender: Yup.string().required('Gender is required'),
})

const BMRForm = () => {
    return (
        <Formik
            initialValues={{
                age: '',
                heightInFeet: '',
                heightInInches: '',
                currentWeight: '',
                targetWeight: '',
                gender: '',
                activityLevel: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                const calories = dailyCaloriesCalculator(values)
                //  if (!userData) {
                //      setFitnessGoals(calculateFitnessInput(values))
                //  } else {
                //      const calculatedFitnessGoals = calculateFitnessInput(values)
                //      // props.gatherFitnessInfo(calculateFitnessInput(calculatedFitnessGoals));
                //      //   props.saveUserData(calculatedFitnessGoals, userData)

                //  }
                Router.push({
                    pathname: '/assessment',
                    query: { calories, form: 'macros' },
                })
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <p className="font-weight-bold">
                                    Please enter some data so we can calculate
                                    your fitness goals
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" lg="6">
                                <div className="form-group">
                                    <Label for="exampleFormControlSelect2">
                                        Age
                                    </Label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.age}
                                        name="age"
                                        className="form-control"
                                    />
                                    {errors.age && touched.age ? (
                                        <div>{errors.age}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <Label for="exampleFormControlSelect2">
                                        Height in feet
                                    </Label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.heightInFeet}
                                        name="heightInFeet"
                                        className="form-control"
                                    />
                                    {errors.heightInFeet &&
                                    touched.heightInFeet ? (
                                        <div>{errors.heightInFeet}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <Label for="exampleFormControlSelect2">
                                        Height in inches
                                    </Label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.heightInInches}
                                        name="heightInInches"
                                        className="form-control"
                                    />
                                    {errors.heightInInches &&
                                    touched.heightInInches ? (
                                        <div>{errors.heightInInches}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <Label for="exampleFormControlSelect2">
                                        Current weight (in pounds)
                                    </Label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.currentWeight}
                                        name="currentWeight"
                                        className="form-control"
                                    />
                                    {errors.currentWeight &&
                                    touched.currentWeight ? (
                                        <div>{errors.currentWeight}</div>
                                    ) : null}
                                </div>
                            </Col>
                            <Col sm="12" lg="6">
                                <div className="form-group">
                                    <Label for="exampleFormControlSelect2">
                                        Target weight (in pounds)
                                    </Label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.targetWeight}
                                        name="targetWeight"
                                        className="form-control"
                                    />
                                    {errors.targetWeight &&
                                    touched.targetWeight ? (
                                        <div>{errors.targetWeight}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <Label for="exampleFormControlSelect2">
                                        Are you a man or woman?
                                    </Label>
                                    <select
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.gender}
                                        name="gender"
                                        className="form-control"
                                        id="exampleFormControlSelect2"
                                    >
                                        <option
                                            value="Select your gender"
                                            label="Select your gender"
                                        />
                                        <option value="man">Man</option>
                                        <option value="woman">Woman</option>
                                    </select>
                                    {errors.gender && touched.gender ? (
                                        <div>{errors.gender}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <Label for="exampleFormControlSelect2">
                                        How active are you?
                                    </Label>
                                    <select
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="activityLevel"
                                        value={values.activityLevel}
                                        className="form-control"
                                        id="exampleFormControlSelect2"
                                    >
                                        <option
                                            value=""
                                            label="Select your activity level"
                                        />
                                        <option value="sedentary">
                                            sedentary (little or no exercise)
                                        </option>
                                        <option value="moderate">
                                            moderate (exercise 3-5 days per
                                            week)
                                        </option>
                                        <option value="heavy">
                                            heavy (exercise 6-7 times per week)
                                        </option>
                                    </select>
                                    {errors.activityLevel &&
                                    touched.activityLevel ? (
                                        <div>{errors.activityLevel}</div>
                                    ) : null}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group text-center">
                                    {errors.name && <div>{errors.name}</div>}
                                    <button
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

export default BMRForm
