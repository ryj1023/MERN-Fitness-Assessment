import React, { Component } from 'react';
import Header from '../headers/header';
import Navigation from '../navigations/navigation';
import Container from '../containers/container';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './profile.css'

class Profile extends Component {
    constructor(props){
		super(props);
		this.state = {
            userName: JSON.parse(localStorage.getItem('user')).userName,
            dailyDietGoal: JSON.parse(localStorage.getItem('user')).dietInfo,
        };
    }
    
    async componentDidMount() {
        if (this.state.userName === undefined) {
            const res = await fetch('/api/users')
            const userData = await res.json();
            this.setState({
                userName: userData[0].user.userName
            })
        }
        console.log('this.state.dailyDietGoal', this.state.dailyDietGoal)
      }

	render(){        
		return (
            <div>
                <Navigation />
                    <div className="profile-wrapper">
                        <div>	
                            <h1>{this.state.userName}'s Profile</h1>
                            {
                                this.state.dailyDietGoal && this.state.dailyDietGoal.calories ? 
							  (
                                <h1>calories: {this.state.dailyDietGoal.calories}</h1>
                              ) : (
                                  <div>
                                    <p>You haven't done your fitness assessment yet</p>
                                    <h3>Take the assessment <Link to='./assessment'>here</Link> to get your new goals!</h3>
                                  </div>
                              )
                            }
                        </div>
                        <div></div>
                    </div>
            </div>
        ) 
	}
}

const mapStateToProps = (state) => {
	return {
		questions: state.questions,
		answers: state.answers,
		clientDietInfo: state.clientInfo,
		foodList: state.foodList,
		nutritionFacts: state.nutritionFacts,
	}
}
export default connect(mapStateToProps)(Profile)
