import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
//import {bindActionCreators} from 'redux';
import Navigation from '../navigations/navigation';
import QuestionDisplay from '../questions/question-display';
import AnswerForm from '../answers/answer-form';
import './container.css';
import { addAnswer,  gatherFitnessInfo  } from '../../actions/';
import { getFoodSearchKeyword, getFoodNutritionFacts, getUserData, saveUserData } from '../../actions/async-actions';
import calculateFitnessInput from '../../calculations/calculate-fitness-input';
import FoodChart from '../food-display/food-chart';
import DietSearchContainer from '../diet-search-containers/diet-search-container';
import UserSignUp from '../sign-up/user-sign-up';

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
			user: '',
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
	}
	getStarted(toggle){
		this.setState({
			startMenu: toggle
		})
	}

	startCalculateAnswers() {
		const calculatedAnswers = calculateFitnessInput(this.props.answers);
		this.props.dispatch(gatherFitnessInfo(calculatedAnswers))
		this.setState({
			showClientInfo: true,
			calculateAnswerPrompt: false
		})
	}

	saveData(dietInfo) {
		this.props.dispatch(saveUserData({ dietInfo, userName: this.state.user }));
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
					<Navigation />
						<div className="container">
							<QuestionDisplay key="start" user={this.state.user} heading="Welcome" subheading="Answer the following questions and we will make out a customized food intake and exercise program just for you!" />
							<AnswerForm key="start-button" type="text" getStarted={() => this.getStarted(false)} text='Get Started' />
						</div>
				</div>
				)
		} else if(this.state.calculateAnswerPrompt === true) {
			return(
			<div>
				<Navigation />
					<div className="container">
						<QuestionDisplay key={this.state.counter} heading="That's It!" subheading="Press calculate answers button to view your results" />
						<AnswerForm key="calculate-answers-button" type="text" calculateAnswers={() => this.startCalculateAnswers()} text='Calculate Answers' />
					</div>
			</div>
			)
		}
		else if(this.state.showClientInfo === true) {
			return <Redirect to='/food-search' />
			console.log('clientInfo', this.props.clientDietInfo)
			// return(
			// 	<div>
			// 		<FoodChart key={this.state.counter} type="text" dailyCalories={this.props.clientDietInfo.clientInfo.dailyCalories} dailyCarbs={this.props.clientDietInfo.clientInfo.dailyCarbs} dailyProtein={this.props.clientDietInfo.clientInfo.dailyProtein} dailyFats={this.props.clientDietInfo.clientInfo.dailyFats}/>
			// 		<DietSearchContainer dispatch={this.props.dispatch} key='food-search' type="text" searchHeading='Search Foods and Select a Workout.' onAdd={input => this.getUserInput(input, 'food')}/> 
			// 		<button onClick={()=> this.saveData(this.props.clientDietInfo.clientInfo)}>Save Data</button>
			// 	</div>
			// )
		} 
		// else if (this.state.showFoodResults === true) {
		// 	return(
		// 	<div>
		// 		<Navigation />
		// 				<div>
		// 					<FoodChart key='results' type="text" dailyCalories={this.props.clientDietInfo.clientInfo.dailyCalories} dailyCarbs={this.props.clientDietInfo.clientInfo.dailyCarbs} dailyProtein={this.props.clientDietInfo.clientInfo.dailyProtein} dailyFats={this.props.clientDietInfo.clientInfo.dailyFats}/>
		// 					<DietSearchContainer  dispatch={this.props.dispatch} key='food-search' nutritionFacts={this.props.nutritionFacts} foodList={this.props.foodList} type="text" searchHeading='Search Results' onAdd={input => this.getUserInput(input, 'food')}/>
		// 				</div>
		// 	</div>
		// 	)
		// }
		else {
			return(
			 <div>
					<Navigation />
							<div className="container">
								<h1>{Questions}</h1>
								<div>{Form}</div>
							</div>
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

// function mapDispatchToProps(dispatch){
// 	return bindActionCreators()
// }


export default connect(mapStateToProps)(Container)