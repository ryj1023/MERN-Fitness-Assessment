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

    goToSelectedWorkout (e) {
        e.preventDefault();
        const element = document.getElementById('dropdown');
        const selectedValue = element.options[element.selectedIndex].value;
        if (selectedValue !== '0') {
            window.open(selectedValue);
        } else alert('select a workout')
    }

    componentDidMount () {
       console.log('userdata', this.props.workoutData)
    }

	render(){  
         if (this.props.workoutData.workouts && this.props.workoutData.workouts.length > 0) {
             const workout = [{ name: 'Low Intensity', route: this.props.workoutData.workouts[0]} , { name: 'Medium Intensity', route: this.props.workoutData.workouts[1]}, { name: 'High Intensity', route: this.props.workoutData.workouts[2]}];
             const workoutDropdown = workout.map((value, index) => <option key={index} value={value.route}>{value.name}</option>)
               return (
                  <div>
                     <div className="custom-select">
                        <select id='dropdown'>
                           <option value="0">Select Workout</option>
                           {workoutDropdown}
                        </select>
                        <button onClick={(e)=> this.goToSelectedWorkout(e)}>See Selected Workout</button>
                     </div>
                  </div>
               )
            } else {
               return (
                  <div>
                     <h1>You have no workouts yet</h1>
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