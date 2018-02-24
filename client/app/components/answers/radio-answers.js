import React, {Component} from 'react';
import './answer-form.css';

export default class radioAnswers extends Component { 
    render(){
        return(
                <div className="answer"> 
                    <input name='choice' type="radio" value={this.props.labels} className="option" onChange={event => this.props.onSelect(event)} placeholder="select a value"/>
                    <label className="answer-text">{this.props.labels}</label>
                </div>          
        )
    }

}