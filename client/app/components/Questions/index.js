import React, { Component } from './node_modules/react'
import './index.css'

const QuestionDisplay = props => {
    if (props.question) {
        return (
            <div className="question-display">
                <h1 className="heading">{props.question}</h1>
            </div>
        )
    } else {
        return (
            <div className="question-display">
                <h1 className="heading">{props.heading}</h1>
                <p className="subheading">{props.subheading}</p>
            </div>
        )
    }
}

export default QuestionDisplay
