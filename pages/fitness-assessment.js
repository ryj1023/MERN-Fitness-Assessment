import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Layout from '../client/app/layouts/default';
import QuestionDisplay from '../client/app/components/questions/QuestionDisplay';
import AnswerForm from '../client/app/components/answers/AnswerForm';
import '../client/app/styles/fitness-assessment.css';
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
		const Questions = this.props.questions.map((question, index) => { 
			if((question.userInput === this.state.counter)){
				return <QuestionDisplay key={question.userInput} {...question} />
			}
		});

		const Form = this.props.questions.map((question, index) => {
			if(question.userInput === this.state.counter){
				switch(question.answerType){
					case 'height':
					return <AnswerForm key={this.state.counter} type="height" onAdd={input => this.getUserInput(input, 'number')} />
					case 'radio':
					return <AnswerForm questionInfo={question} key={this.state.counter} answerLabels={question.answers} radioAnswersLength={question.answers.length} type="radio" onAdd={input => this.getUserInput(input, 'string')} />
					default:
					return <AnswerForm key={this.state.counter} type="text" onAdd={input => this.getUserInput(input, 'number')} text="Submit" />
				}

			}
		})

		if(this.state.startMenu === true){
			return (
				<>
					<Container>
						<Row>
							<Col>
								<QuestionDisplay key="start" user={this.state.user} heading="Welcome" subheading="Answer the following questions and we will make out a customized food intake and exercise program just for you!" />
								<AnswerForm key="start-button" type="text" getStarted={() => this.setState({ startMenu: false })} text='Get Started' />
							</Col>
						</Row>
					</Container>
					<style jsx global>{`
						.rc-pagination {
								list-style: none;
								rc-pagination-jump-prev;
							}
							.rc-pagination-item, .rc-pagination-prev, .rc-pagination-next, .rc-pagination-jump-next, .rc-pagination-jump-prev {
								display: inline
							}
						`}</style>
				</>
				)
		} else if (this.state.calculateAnswerPrompt === true) {
			return(
				<Container>
						<Row>
							<Col>
								<QuestionDisplay key={this.state.counter} heading="That's It!" subheading="Press calculate answers button to view your results" />
								<AnswerForm key="calculate-answers-button" type="text" calculateAnswers={() => this.startCalculateAnswers()} text='Calculate Answers' />
							</Col>
						</Row>
				</Container>
			)
		}
		else if(this.state.showClientInfo === true) {
			// TODO: save this.props.clientDietInfo			
			Router.push('/nutrition-center')
		} 
		else {
			return(
			 	<div>
					<Container>
						<Row>
							<Col>
							{Questions}
							{Form}
							</Col>
						</Row>
					</Container>
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