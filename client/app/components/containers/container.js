import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Layout from '../../layouts/default';
import QuestionDisplay from '../questions/QuestionDisplay';
import AnswerForm from '../answers/AnswerForm';
import './container.css';
import { addAnswer,  gatherFitnessInfo  } from '../../actions';
import calculateFitnessInput from '../../calculations/calculate-fitness-input';

class Container extends Component {

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
					break;
					case 'radio':
					return <AnswerForm questionInfo={question} key={this.state.counter} answerLabels={question.answers} radioAnswersLength={question.answers.length} type="radio" onAdd={input => this.getUserInput(input, 'string')} />
					break;
					default:
					return <AnswerForm key={this.state.counter} type="text" onAdd={input => this.getUserInput(input, 'number')} text="Submit" />
				}

			}
		})

		if(this.state.startMenu === true){
			return (
				<div>
					<Layout>
					<div className="container-wrapper">
							<QuestionDisplay key="start" user={this.state.user} heading="Welcome" subheading="Answer the following questions and we will make out a customized food intake and exercise program just for you!" />
							<AnswerForm key="start-button" type="text" getStarted={() => this.setState({ startMenu: false })} text='Get Started' />
						</div>
					</Layout>
				</div>
				)
		} else if(this.state.calculateAnswerPrompt === true) {
			return(
			<div>
				<Layout>
				<div className="container-wrapper">
						<QuestionDisplay key={this.state.counter} heading="That's It!" subheading="Press calculate answers button to view your results" />
						<AnswerForm key="calculate-answers-button" type="text" calculateAnswers={() => this.startCalculateAnswers()} text='Calculate Answers' />
					</div>
				</Layout>
			</div>
			)
		}
		else if(this.state.showClientInfo === true) {
			return <Redirect to='/food-search' />
		} 
		else {
			return(
			 <div>
					<Layout>
						<div className="container-wrapper">
								{Questions}
								<div>{Form}</div>
						</div>
					</Layout>
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
export default connect(mapStateToProps, mapDispatchToProps)(Container)