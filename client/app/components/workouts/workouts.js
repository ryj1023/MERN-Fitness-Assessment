import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { validateSignUp } from '../../actions/async-actions';
import { connect } from 'react-redux';

class Workouts extends Component {
    constructor(props){
		super(props);
		this.state = {
        };
    }

    componentDidMount () {
       console.log('userdata', this.props.workoutData)
    }

	render(){  
         if (this.props.workoutData.workouts && this.props.workoutData.workouts.length > 0) {
               return (
                  <div>
                     <div className="custom-select">
                        <select>
                           <option value="0">Select car:</option>
                           <option value="1">Audi</option>
                           <option value="2">BMW</option>
                           <option value="3">Citroen</option>
                           <option value="4">Ford</option>
                           <option value="5">Honda</option>
                           <option value="6">Jaguar</option>
                           <option value="7">Land Rover</option>
                           <option value="8">Mercedes</option>
                           <option value="9">Mini</option>
                           <option value="10">Nissan</option>
                           <option value="11">Toyota</option>
                           <option value="12">Volvo</option>
                        </select>
                     </div>
                  </div>
               )
            } else {
               return (
                  <div>
                     <h1>You have no workouts yet.</h1>
                  </div>
               )
            }
        } 
   }

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        validationResult: state.validationErrors,
        signUpResult: state.signUpErrors,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ validateSignUp }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Workouts)