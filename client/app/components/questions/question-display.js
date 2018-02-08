import React, {Component} from 'react';
import './questions.css';

export default class QuestionDisplay extends Component{
	render(){
		if(this.props.question){
			return (
				<div>
					<h1 className="heading">{this.props.question}</h1>
				</div>
				)
		}
		else{
			return( 
				<div>
					<h1 className="heading">{this.props.heading}</h1>
					<p className="subheading">{this.props.subheading}</p>
				</div>
				)
		}
	}
}

