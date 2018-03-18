import React, { Component } from 'react';
import Header from '../headers/header';
import Navigation from '../navigations/navigation';
import Container from '../containers/container';
import { connect } from 'react-redux';
import './profile.css'

class Profile extends Component {
    constructor(props){
		super(props);
		this.state = {
            userName: null,
        };
    }
    
    // async componentDidMount() {
    //     const res = await fetch('/api/users')
    //     const userData = await res.json();
    //     this.setState({
    //         userName: userData[0].user.userName
    //     })
    //   }

	render(){        
		return (
            <div>
                <Navigation />
                <h1>Hello {this.state.userName}</h1>
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
