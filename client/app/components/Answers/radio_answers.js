import React, {Component} from 'react';
import './answer_form.css';

export default class radioAnswers extends Component { 
   
    render(){
        return(
                <div className="answer"> 
                    <input name='choice' type="radio" value={this.props.labels} className="option" onChange={event => this.props.onSelect(event)} placeholder="select a value"/>
                    <label className="answer-text">{this.props.labels}</label>
                </div>          
        )
        // <form onSubmit={(e)=> this.onSubmit(e)}>
        //     <div className="answer"> 
        //         <label>{this.props.answerLabels[0]}</label>
        //         <input name='choice' type="radio" value={this.props.answerLabels[0]} className="option" onChange={event => this.onSelected(event)} placeholder="select a value"/>
        //         <label>{this.props.answerLabels[1]}</label>
        //         <input name='choice' type="radio" value={this.props.answerLabels[1]} className="option" onChange={event => this.setRadio(event)} placeholder="select a value"/>
        //     </div>
        //     <button className="submit">Submit</button> 
        // </form>
    }

}