import React, { Component } from 'react';
import Header from '../headers/header';
import Navigation from '../navigations/navigation';
import Container from '../containers/container';
import { loginUser } from '../../actions/async-actions';
import './user-login.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props){
		super(props);
		this.state = {
            email: null,
            password: null,
        };
    }
    
    setEmail(input){
        this.setState({
            email: input,
        })
    }

    setPassword(input){
        this.setState({
            password: input,
        })  
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }

	render(){        
        if (this.props.userData.length > 0) {
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(this.props.userData[0].user));
            return <Redirect to='/' />;
            return(
                <div>
                    <Navigation />
                    <div className='log-in-container'>
                        <form  onSubmit={(e)=> this.onSubmit(e)} method="post" action="/api/login">
                        <input type="text" placeholder="Enter Email" onChange={(e)=>this.setEmail(e.target.value)} name="email" required />
                        <input type="password" placeholder="Enter Password" onChange={(e)=>this.setPassword(e.target.value)} name="psw" required />
                        <button className="sign-up-button">Sign In</button> 
                        </form>
                    </div>
                </div>
            ) 
        }
		return(
            <div>
                <Navigation />
                <div className='log-in-container'>
                    <form  onSubmit={(e)=> this.onSubmit(e)} method="post" action="/api/login">
                    <input type="text" placeholder="Enter Email" onChange={(e)=>this.setEmail(e.target.value)} name="email" required />
                    <input type="password" placeholder="Enter Password" onChange={(e)=>this.setPassword(e.target.value)} name="psw" required />
                    <button className="sign-up-button">Sign In</button> 
                    </form>
                </div>
            </div>
        ) 
	}
}
const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        userData: state.userData,
    }
}

export default connect(mapStateToProps)(Login)
