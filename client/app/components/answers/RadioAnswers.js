import React, {Component} from 'react';
import './answer-form.css';

const RadioAnswers = (props) =>  (
                <div className="answer"> 
                    <input name='choice' type="radio" value={props.labels} className="option" onChange={event => props.onSelect(event)} placeholder="select a value"/>
                    <label className="answer-text">{props.labels}</label>
                </div>          
        )
export default RadioAnswers;
