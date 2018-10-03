import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import Layout from '../client/app/layouts/default';
import { connect } from 'react-redux';
import Link from 'next/link';
import App from '../client/app/components/app/App';
import '../client/app/styles/profile.css';


class Profile extends Component {
    state = {
        userName: null,
        dailyDietGoal: null,
    };

    async componentDidMount() {
        if (!JSON.parse(localStorage.getItem('user'))) {
            const res = await fetch('/api/users')
            const userData = await res.json();
            this.setState({
                userName: userData[0].user.userName,
                dailyDietGoal: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).dietInfo : null,
            })
        }
      }

	render(){        
		return (
                <Layout>
                        <Container fluid>
                            <Row>
                                {
                                    this.state.dailyDietGoal && this.state.dailyDietGoal.calories ? 
                                (
                                    <h1>calories: {this.state.dailyDietGoal.calories}</h1>
                                ) : (
                                    <Col sm='12'>
                                        <p>You haven't done your fitness assessment yet</p>
                                        <h3>Take the assessment <Link href='./assessment'><a>here</a></Link> to get your new goals!</h3>
                                    </Col>
                                )
                                }
                            </Row>
                        </Container>
                    </Layout>
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

export default App(connect(mapStateToProps)(Profile))
