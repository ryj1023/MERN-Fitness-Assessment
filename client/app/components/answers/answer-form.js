import React, {Component} from 'react';
import RadioAnswers from './radio-answers';
import './answer-form.css';

export default class AnswerForm extends Component{
	constructor(props){
		super(props)
		this.state = {
			textInput: null,
			textInput2: null,
			radioInput: null,
		}
	}

	onSubmit(event){
		event.preventDefault();
		const textInput = this.state.textInput;
		const textInput2 = this.state.textInput2;
		if(textInput && this.props.onAdd){
			this.props.onAdd(parseInt(textInput))
		}
		else if (textInput && textInput2){
			this.props.onAdd(this.getHeightInInches(parseInt(textInput), parseInt(textInput2)));
		}
		else if (this.state.radioInput){
			this.props.onAdd(this.state.radioInput)
		}
		this.setState({
			textInput: null,
			textInput2: null,
			radioInput: null,
		})
	}
	startSubmit(e){
		e.preventDefault();
		if(this.props.text){
			this.props.getStarted()
		}
	}
	startCalculation(e){
		e.preventDefault();
		if(this.props.text){
			this.props.calculateAnswers()
		}
	}
	setInput(textInput){
		this.setState({
			textInput
		})
	}
	setSecondInput(textInput2){
		this.setState({
			textInput2
		})
	}
	getHeightInInches(input1, input2){
		const totalHeight = input1 * 12 + input2;
		return totalHeight;
	}
	setRadio(e){
		this.setState({
			radioInput: e.target.value,
		})
	}

	render(){
			if(this.props.onAdd){
				switch(this.props.type){
					case 'height':
					return(
						 <form onSubmit={(e)=> this.onSubmit(e)}>
								<input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="Feet"/>
								<input className="input-box-two" name='choice' type="text" onChange={(e)=>this.setSecondInput(e.target.value)} placeholder="Inches"/>
							<button className="submit">Submit</button> 
		   			 </form>
					)
					break;
					case 'radio':
					const radioDisplay = this.props.answerLabels.map((label, index) => <RadioAnswers labels={label} key={index} onSelect={(e) => this.setRadio(e)}/>);
						return (
							<form onSubmit={(e)=> this.onSubmit(e)}>	
								<div>{radioDisplay}</div>
								<button className="submit">Submit</button>
							</form>
						)
					break;
					case 'text':
					return(
						<form onSubmit={(e)=> this.onSubmit(e)}>
		                  <input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter a number"/>
		                  <button className="submit">Submit</button> 
		              	</form>
						)
					default:
					return;
				}
			}
			else if (this.props.getStarted){
				return(
					 <form onSubmit={(e)=> this.startSubmit(e)}>
			            <button className="start-button">{this.props.text}</button> 
			         </form>
		        )
			} else {
				return(
					 <form onSubmit={(e)=> this.startCalculation(e)}>
			            <button className="calculate-answers">{this.props.text}</button> 
			         </form>
		        )
			}
	}

}