import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Layout from '../client/app/layouts/default';
import QuestionDisplay from '../client/app/components/questions/QuestionDisplay';
import AnswerForm from '../client/app/components/answers/AnswerForm';
// import '../client/app/styles/fitness-assessment.css';
import styles from '../client/app/styles/fitness-assessment-styles.js';
import { addAnswer,  gatherFitnessInfo  } from '../client/app/actions';
import calculateFitnessInput from '../client/app/calculations/calculate-fitness-input';
import App from '../client/app/components/app/App';
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';
import Pagination from 'rc-pagination';
import Router from 'next/router'


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

	startCalculateAnswers() {
		const calculatedAnswers = calculateFitnessInput(this.props.answers);
		this.props.gatherFitnessInfo(calculatedAnswers);
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
		const { questions } = this.props;
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
		if(showClientInfo === true) {
			// TODO: save this.props.clientDietInfo			
			Router.push('/nutrition-center')
		} else {
			return (
			 	<div>
					<Container>
						<Row>
							<Col>
								{ 
									(startMenu || calculateAnswerPrompt) ?
										(
											<>
												<QuestionDisplay key={calculateAnswerPrompt ? counter : 'start'} user={`${user ? user : ''}`} heading={Heading} subheading={Subheading} />
												<AnswerForm type="text" key={startMenu ? 'start-button' : 'calculate-answers-button'} calculateAnswers={() => this.startCalculateAnswers()} type="text" startMenu={startMenu} getStarted={() => this.setState({ startMenu: false })} text={startMenu ? 'Get Started' : 'Calculate Answers'} />
											</>
										)
										:
										(
											<>
												{Questions}
												{Form}
											</>
										)
								}
							</Col>
							
						</Row>
					</Container>
					<style jsx>{styles}</style>
				</div>
				)
			}
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