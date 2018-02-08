import React, {Component} from 'react';

export default class QuestionDisplay extends Component{
	render(){
		return <li>{this.props.question}</li>
	}
}

