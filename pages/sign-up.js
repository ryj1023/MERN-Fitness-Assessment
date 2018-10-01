import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { validateSignUp } from '../client/app/actions/async-actions';
import '../client/app/styles/sign-up.css';
import { connect } from 'react-redux';
import Layout from '../client/app/layouts/default';
import App from '../client/app/components/app/App';

class SignUp extends Component {
        state = {
            userName: null,
            email: null,
            password: null,
            confirmPassword: null,
        };

    onSubmit(e) {
        e.preventDefault();
        console.log('signup!')
        this.props.validateSignUp(this.state)
    }

    setEmail(email) {
        this.setState({
            email
        })
    }
    setUserName(userName) {
        this.setState({
            userName
        })
    }
    setPassword(password) {
        this.setState({
            password
        })
    }
    setConfirmPassword(confirmPassword) {
        this.setState({
            confirmPassword
        })
    }
	render(){  
        if (this.props.signUpResult !== 'success' || this.props.validationResult !== 'success') {
            let error = '';
            if (this.props.signUpResult.includes('already an account')) {
                error = this.props.signUpResult
            } else if (this.props.validationResult.length > 0) {
                error = this.props.validationResult.map((msg, index) => {
                return <p key={index}>{msg}</p>  
            })
        }
            return (
                <Layout>
                    <div>
                        {error}
                        <div className='form-container'>
                            <form  onSubmit={(e)=> this.onSubmit(e)} method="post" action="api/sign-up">
                            <input type="text" name='email' placeholder="Enter an email" onChange={(e)=>this.setEmail(e.target.value)} name="email" required />
                            <input type="text" name='userName' placeholder="Enter a user name" onChange={(e)=>this.setUserName(e.target.value)} name="userName" required />
                            <input type="password" name='password' placeholder="Enter a password" onChange={(e)=>this.setPassword(e.target.value)} name="password" required />
                            <input type="password" name='confirmPassword' placeholder="Repeat password" onChange={(e)=>this.setConfirmPassword(e.target.value)} name="confirmPassword" required />
                            <button className="sign-up-button">Sign Up</button> 
                            </form>
                        </div>
                    </div>
                </Layout>
            )
        } 
         else if (this.props.validationResult === 'success') {
             // return <Redirect to='/' />;
        }   
		return(
            <Layout>
                <div>
                    <div className='form-container'>
                        <form  onSubmit={(e)=> this.onSubmit(e)} method="post" action="api/sign-up">
                        <input type="text" placeholder="Enter Email" onChange={(e)=>this.setEmail(e.target.value)} name="email" required />
                        <input type="password" placeholder="Enter Password" onChange={(e)=>this.setPassword(e.target.value)} name="password" required />
                        <input type="password" placeholder="Repeat Password" onChange={(e)=>this.setConfirmPassword(e.target.value)} name="confirmPassword" required />
                        <button className="sign-up-button">Sign Up</button> 
                        </form>
                    </div>
                </div>
            </Layout>
        ) 
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
export default App(connect(mapStateToProps, mapDispatchToProps)(SignUp))

