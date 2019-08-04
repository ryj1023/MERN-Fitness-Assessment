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

const MacrosForm = ({ calories }) => {
    console.log('calories', calories)
    return (
        <Formik
            initialValues={{
                calories: calories || '',
                protein: '',
                carbs: '',
                fats: '',
            }}
            // validationSchema={validationSchema}
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
                                    <input
                                        readOnly={calories ? true : false}
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.calories}
                                        name="calories"
                                        className="form-control"
                                    />
                                    {errors.calories && touched.calories ? (
                                        <div>{errors.calories}</div>
                                    ) : null}
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.gender}
                                        name="diet"
                                        className="form-control"
                                    >
                                        <option
                                            value="Select your diet"
                                            label="Select your diet"
                                        />
                                        <option value="zone">Zone</option>
                                        <option value="atikins">Atkins</option>
                                    </select>
                                    {errors.carbs && touched.carbs ? (
                                        <div>{errors.carbs}</div>
                                    ) : null}
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
                                    {errors.protein && touched.protein ? (
                                        <div>{errors.protein}</div>
                                    ) : null}
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
                                    {errors.carbs && touched.carbs ? (
                                        <div>{errors.carbs}</div>
                                    ) : null}
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
                                        name="currentWeight"
                                        className="form-control"
                                    />
                                    {errors.fats && touched.fats ? (
                                        <div>{errors.fats}</div>
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

export default MacrosForm
