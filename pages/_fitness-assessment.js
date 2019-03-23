import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../client/app/layouts/default';
import QuestionDisplay from '../client/app/components/questions/QuestionDisplay';
import AnswerForm from '../client/app/components/answers/AnswerForm';
// import '../client/app/styles/fitness-assessment.css';
import styles from '../client/app/styles/fitness-assessment-styles.js';
import { addAnswer,  gatherFitnessInfo  } from '../client/app/actions';
import calculateFitnessInput from '../client/app/calculations/calculate-fitness-input';
import App from '../client/app/components/app/App';
import { Container, Row, Col, ListGroup, ListGroupItem, Button, Card, Label, FormResponse } from 'reactstrap';
import Pagination from 'rc-pagination';
import Router from 'next/router'

const validationSchema = Yup.object().shape({
	age: Yup.number()	
		.integer('Age must be a valid number'),
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
	activityLevel: Yup.string()
	  .required('Activity level is required'),
	  gender: Yup.string()
	  .required('Gender is required'),
 });


class FitnessAssessment extends Component {

		state = {
			counter: 0,
			startMenu: true,
			calculateAnswerPrompt: false,
			showClientInfo: false,
			keyWord: null,
			showFoodResults: false,
			foodResult: null,
			user: '',
		}

	validateInput(input, type){
		if(type === 'number'){
			if(input == null/* || input.filter(input=> input % 1 !== 0)*/){
				alert('Please enter in a valid number.')
				return false;
			} else {
				return true;
			}
		}
	}
	getUserInput(input, type){
		if (this.validateInput(input, type) === false){
			return;
		} else if (type !== 'food') { 
		this.props.addAnswer(input);
			this.setState({
				counter: this.state.counter + 1
			})
		}
		if(this.state.counter + 1 === this.props.questions.length){	
			this.setState({
				calculateAnswerPrompt: true,
			})
		}
	}

	startCalculateAnswers(values) {
		this.props.gatherFitnessInfo(calculateFitnessInput(values));
		this.setState({
			showClientInfo: true,
			calculateAnswerPrompt: false
		})
	}

	async componentDidMount() {
		const cachedUser = JSON.parse(localStorage.getItem('user'))
				this.setState({
					user: cachedUser
				})
}

	render(){
		const { questions, clientDietInfo } = this.props;
		const { counter, startMenu, calculateAnswerPrompt, user, showClientInfo } = this.state;
		const Questions = questions.map((question, index) => { 
			if((question.userInput === this.state.counter)){
				return <QuestionDisplay key={question.userInput} {...question} />
			}
		});

		const Form = questions.map((question, index) => {
			if(question.userInput === this.state.counter){
				switch(question.answerType){
					case 'height':
					return <AnswerForm key={counter} type="height" onAdd={input => this.getUserInput(input, 'number')} />
					case 'radio':
					return <AnswerForm questionInfo={question} key={counter} answerLabels={question.answers} radioAnswersLength={question.answers.length} type="radio" onAdd={input => this.getUserInput(input, 'string')} />
					default:
					return <AnswerForm key={counter} type="text" onAdd={input => this.getUserInput(input, 'number')} text="Submit" />
				}

			}
		})
	    const Heading = startMenu ? 'Welcome' : 'That\'s It!'
		 const Subheading = startMenu ? 'Answer the following questions and we will make out a customized food intake and exercise program just for you!' : 'Press calculate answers button to view your results';
		// if(showClientInfo === true) {
		// 	// TODO: save this.props.clientDietInfo			
		// 	Router.push('/nutrition-center')
		// } else {
			return (
			 	<div>
					<Container>
						<Row>
							<Col>
								<Card className='mt-3'>
									<Formik
										initialValues={{
											age: '',
											heightInFeet: '',
											heightInInches: '',
											currentWeight: '',
											targetWeight: '',
											gender: '',
											activityLevel: ''
										}}
										validationSchema={validationSchema}
										onSubmit={(values, actions) => {
											this.startCalculateAnswers(values);
										}}
									>
										{({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
											<form onSubmit={handleSubmit}>
												<Container>
													<Row>
														<p className="ml-auto mr-auto mt-3 mb-3">Please enter some data so we can calculate your fitness goals.</p>
													</Row>
													<Row>
														<Col>
															<div className="form-group">
																<Label for="exampleFormControlSelect2">Age</Label>
																<input
																	type="number"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	value={values.age}
																	name="age"
																	className='form-control'
																/>
																{errors.age && touched.age ? (
																		<div>{errors.age}</div>
																	) : null}
															</div>
															<div className="form-group">
																<Label for="exampleFormControlSelect2">Height in feet</Label>
																<input
																	type="number"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	value={values.heightInFeet}
																	name="heightInFeet"
																	className='form-control'
																/>
																{errors.heightInFeet && touched.heightInFeet ? (
																		<div>{errors.heightInFeet}</div>
																	) : null}
																<Label for="exampleFormControlSelect2">Height in inches</Label>
																<input
																	type="number"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	value={values.heightInInches}
																	name="heightInInches"
																	className='form-control'
																/>
																{errors.heightInInches && touched.heightInInches ? (
																		<div>{errors.heightInInches}</div>
																	) : null}
															</div>
															<div className="form-group">
																<Label for="exampleFormControlSelect2">Current weight</Label>
																<input
																	type="number"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	value={values.currentWeight}
																	name="currentWeight"
																	className='form-control'
																/>
																{errors.currentWeight && touched.currentWeight ? (
																		<div>{errors.currentWeight}</div>
																	) : null}
															</div>
														</Col>
														<Col>
															<div className="form-group">
																<Label for="exampleFormControlSelect2">Target weight</Label>
																<input
																	type="number"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	value={values.targetWeight}
																	name="targetWeight"
																	className='form-control'
																/>
																{errors.targetWeight && touched.targetWeight ? (
																		<div>{errors.targetWeight}</div>
																	) : null}
															</div>
															<div className="form-group">
																<Label for="exampleFormControlSelect2">Are you a man or woman?</Label>
																<select onChange={handleChange} onBlur={handleBlur} value={values.gender} name='gender' className="form-control" id="exampleFormControlSelect2">
																	<option value="Select your gender" label="Select your gender" />
																	<option value='man'>Man</option>
																	<option value='woman'>Woman</option>
																</select>
																{errors.gender && touched.gender ? (
																		<div>{errors.gender}</div>
																	) : null}
															</div>
															<div className="form-group">
																<Label for="exampleFormControlSelect2">How active are you?</Label>
																	<select onChange={handleChange} onBlur={handleBlur} name='activityLevel' value={values.activityLevel} className="form-control" id="exampleFormControlSelect2">
																	<option value="" label="Select your activity level" />
																	<option value='sedentary'>sedentary (little or no exercise)</option>
																	<option value='moderate'>moderate (exercise 3-5 days per week)</option>
																	<option value='heavy'>heavy (exercise 6-7 times per week)</option>
																</select>
																{errors.activityLevel && touched.activityLevel ? (
																		<div>{errors.activityLevel}</div>
																	) : null}
															</div>
														</Col>
													</Row>
												</Container>
												{errors.name &&
												<div>
													{errors.name}
												</div>}
												<button className='btn' type="submit">Submit</button>
											</form>
										)}
									</Formik>
								</Card>
							</Col>
							
						</Row>
					</Container>
					<style jsx>{styles}</style>
				</div>
				)
		// 	}
		}	
}	

const mapStateToProps = (state) => {
	return {
		questions: state.questions,
		answers: state.answers,
		clientDietInfo: state.clientInfo,
		foodList: state.foodList,
		nutritionFacts: state.nutritionFacts,
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ addAnswer, gatherFitnessInfo }, dispatch);
export default App(connect(mapStateToProps, mapDispatchToProps)(FitnessAssessment))