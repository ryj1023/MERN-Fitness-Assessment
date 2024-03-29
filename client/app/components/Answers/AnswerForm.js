import React, { Component } from './node_modules/react'
import RadioAnswers from './RadioAnswers'
import styles from './styles.js'

export default class AnswerForm extends Component {
    state = {
        textInput: null,
        textInput2: null,
        radioInput: null,
    }

    onSubmit(event) {
        event.preventDefault()
        const textInput = this.state.textInput
        const textInput2 = this.state.textInput2
        if (textInput && this.props.onAdd) {
            if (this.isNumber(textInput)) {
                this.props.onAdd(parseInt(textInput))
            } else alert('Please enter in a valid number')
        } else if (textInput && textInput2) {
            if (this.isNumber(textInput) && this.isNumber(textInput2)) {
                this.props.onAdd(
                    this.getHeightInInches(
                        parseInt(textInput),
                        parseInt(textInput2)
                    )
                )
            } else alert('Please enter in a valid number')
        } else if (this.state.radioInput) {
            this.props.onAdd(this.state.radioInput)
        }
        this.setState({
            textInput: null,
            textInput2: null,
            radioInput: null,
        })
    }
    isNumber(input) {
        if (
            input.split('').filter(char => Number.isNaN(parseInt(char)))
                .length > 0
        )
            return false
        return true
    }
    startSubmit(e) {
        e.preventDefault()
        if (this.props.text) {
            this.props.getStarted()
        }
    }
    startCalculation(e) {
        e.preventDefault()
        console.log('this.props.text', this.props.text)
        if (this.props.text) {
            this.props.calculateAnswers()
        }
    }
    getHeightInInches(input1, input2) {
        const totalHeight = input1 * 12 + input2
        return totalHeight
    }

    render() {
        if (this.props.onAdd) {
            switch (this.props.type) {
                case 'height':
                    return (
                        <form
                            className="submit-form"
                            onSubmit={e => this.onSubmit(e)}
                        >
                            <input
                                className="input-box-one"
                                type="text"
                                onChange={e =>
                                    this.setState({ textInput: e.target.value })
                                }
                                placeholder="Feet"
                                autoFocus
                            />
                            <input
                                className="input-box-two"
                                name="choice"
                                type="text"
                                onChange={e =>
                                    this.setState({
                                        textInput2: e.target.value,
                                    })
                                }
                                placeholder="Inches"
                            />
                            <button className="submit two-input-submit">
                                Submit
                            </button>
                        </form>
                    )
                    break
                case 'radio':
                    const radioDisplay = this.props.answerLabels.map(
                        (label, index) => (
                            <RadioAnswers
                                labels={label}
                                key={index}
                                onSelect={e =>
                                    this.setState({
                                        radioInput: e.target.value,
                                    })
                                }
                            />
                        )
                    )
                    return (
                        <form
                            className="submit-form"
                            onSubmit={e => this.onSubmit(e)}
                        >
                            <div className="radio-display">{radioDisplay}</div>
                            <button className="submit">Submit</button>
                        </form>
                    )
                    break
                case 'text':
                    return (
                        <form
                            className="submit-form"
                            onSubmit={e => this.onSubmit(e)}
                        >
                            <input
                                className="input-box-one"
                                type="text"
                                autoFocus
                                onChange={e =>
                                    this.setState({ textInput: e.target.value })
                                }
                                placeholder="please enter a number"
                            />
                            <button className="submit">Submit</button>
                        </form>
                    )
                default:
                    return
            }
        } else if (this.props.startMenu) {
            return (
                <form
                    className="submit-form"
                    onSubmit={e => this.startSubmit(e)}
                >
                    <button className="start-button">{this.props.text}</button>
                    <style jsx>{styles}</style>
                </form>
            )
        } else {
            return (
                <form
                    className="submit-form"
                    onSubmit={e => this.startCalculation(e)}
                >
                    <button className="calculate-answers">
                        {this.props.text}
                    </button>
                </form>
            )
        }
    }
}
