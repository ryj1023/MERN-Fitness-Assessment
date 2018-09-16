import React, { Component } from 'react';
import Navigation from '../../components/navigations/navigation';
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

    componentDidMount() {
    }

	render(){   
        if (this.props.userData[0] && Object.keys(this.props.userData[0]).length > 1) {
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(this.props.userData[0].user));
            return <Redirect to='/' />;
        } else if (this.props.userData.includes('No Account')) {
            return (
                <div>
                <Navigation />
                <h1>{this.props.userData}</h1>
                <h2>Please try another email and password combination or click 'Sign Up' to create an account</h2>
                <div className='log-in-container'>
                    <form className="log-in-form" onSubmit={(e)=> this.onSubmit(e)} method="post" action="/api/login">
                    <input type="text" className="log-in-input" placeholder="Enter Email" onChange={(e)=>this.setEmail(e.target.value)} name="email" required />
                    <input type="password"  className="log-in-input" placeholder="Enter Password" onChange={(e)=>this.setPassword(e.target.value)} name="psw" required />
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
                    <form  className="log-in-form" onSubmit={(e)=> this.onSubmit(e)} method="post" action="/api/login">
                    <input className="log-in-input" type="text" placeholder="Enter Email" onChange={(e)=>this.setEmail(e.target.value)} name="email" required />
                    <input type="password" className="log-in-input" placeholder="Enter Password" onChange={(e)=>this.setPassword(e.target.value)} name="psw" required />
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
