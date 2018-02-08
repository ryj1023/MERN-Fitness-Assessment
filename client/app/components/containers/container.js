import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../../utils/api';
//import {bindActionCreators} from 'redux';
import QuestionDisplay from '../questions/question_display';
import AnswerForm from '../answers/answer_form';
import './container.css';
import { addAnswer } from '../../actions/';
import { getFoodSearchKeyword } from '../../actions/async_actions';
import { getFoodNutritionFacts } from '../../actions/async_actions';
import { gatherFitnessInfo } from '../../actions';
import calculateFitnessInput from '../../calculations/calculate_fitness_input';
import FoodChart from '../food_display/food_chart';
import DietSearchContainer from '../diet_search_container/diet_search_container';

class Container extends Component {
	constructor(props){
		super(props);
		this.state = {
			counter: 0,
			startMenu: true,
			calculateAnswerPrompt: false,
			showClientInfo: false,
			keyWord: null,
			showFoodResults: false,
			foodResult: null,
		}
	}

	validateInput(input, type){
		if(type === 'number'){
			if(input == null || input % 1 !== 0){
				alert('Please enter in a valid number.')
				return false;
			} else {
				return true;
			}
		} else if (type === 'food') {
			return true
		}
	}
	getUserInput(input, type){
		if (this.validateInput(input, type) === false){
			return;
		} else if (type !== 'food') { 
		this.props.dispatch(addAnswer(input));
			this.setState({
				counter: this.state.counter + 1
			})
		}
		if(this.state.counter + 1 === this.props.questions.length){	
			this.setState({
				calculateAnswerPrompt: true,
			})
		}
		if (type === 'food') {
			this.props.dispatch(getFoodSearchKeyword(input))
				this.setState({
					showFoodResults: true,
					showClientInfo: false,
				})
		}
	}
	getStarted(toggle){
		this.setState({
			startMenu: toggle
		})
	}
	startCalculateAnswers(){
		const calculatedAnswers = calculateFitnessInput(this.props.answers);
		this.props.dispatch(gatherFitnessInfo(calculatedAnswers))
		this.setState({
			showClientInfo: true,
			calculateAnswerPrompt: false
		})
	}

	render(){
		const Questions = this.props.questions.map((question, index) => { 
			if((question.userInput === this.state.counter)){
				return <QuestionDisplay key={question.userInput} {...question} />;
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
					return <AnswerForm key={this.state.counter} type="text" onAdd={input => this.getUserInput(input, 'number')} text="Submit" /> ;
				}

			}
		})

		if(this.state.startMenu === true){
			return (
				<div className="container">
					<QuestionDisplay key="start" heading="Welcome!" subheading="Answer the following questions and we will make out a customized food intake and exercise program just for you!" />;
					<AnswerForm key="start-button" type="text" getStarted={() => this.getStarted(false)} text='Get Started' />
				</div>
				)
		} else if(this.state.calculateAnswerPrompt === true) {
			return(
			<div className="container">
				<QuestionDisplay key={this.state.counter} heading="That's It!" subheading="Press calculate answers button to view your results" />;
				<AnswerForm key="calculate-answers-button" type="text" calculateAnswers={() => this.startCalculateAnswers()} text='Calculate Answers' />
			</div>
			)
		}
		else if(this.state.showClientInfo === true) {
			return(
				<div>
					<FoodChart key={this.state.counter} type="text" dailyCalories={this.props.clientDietInfo.clientInfo.dailyCalories} dailyCarbs={this.props.clientDietInfo.clientInfo.dailyCarbs} dailyProtein={this.props.clientDietInfo.clientInfo.dailyProtein} dailyFats={this.props.clientDietInfo.clientInfo.dailyFats}/> ;
					<DietSearchContainer key='food-search' type="text" searchHeading='Search Foods and Select a Workout.' onAdd={input => this.getUserInput(input, 'food')}/> ;
				</div>
			)
		} else if(this.state.showFoodResults === true) {
			return(
				<div>
					<FoodChart key='results' type="text" dailyCalories={this.props.clientDietInfo.clientInfo.dailyCalories} dailyCarbs={this.props.clientDietInfo.clientInfo.dailyCarbs} dailyProtein={this.props.clientDietInfo.clientInfo.dailyProtein} dailyFats={this.props.clientDietInfo.clientInfo.dailyFats}/> ;
					<DietSearchContainer  dispatch={this.props.dispatch} key='food-search' foodList={this.props.foodList} type="text" searchHeading='Search Results' onAdd={input => this.getUserInput(input, 'food')}/> ;
				</div>
			)
		}
		else {
			return(
					<div className="container">
						<h1>{Questions}</h1>
						<div>{Form}</div>
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
		foodList: state.foodList
	}
}

// function mapDispatchToProps(dispatch){
// 	return bindActionCreators()
// }


export default connect(mapStateToProps)(Container)