import React, { Component } from 'react';
import App from '../client/app/components/app/App';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from '../client/app/layouts/default'
import Workouts from '../client/app/components/workouts/workouts';
import { Container, Row, Col, Table } from 'reactstrap';

class Home extends Component {
	
	state = {
		user: null,
	}

	componentDidMount() {
		const cachedUser = localStorage ? JSON.parse(localStorage.getItem('user')) : this.state.user
				this.setState({
					user: cachedUser
			})
	}

	render(){
			return (
				<Container fluid>
					<Row>
						<Col sm='8'>
							<h1>Welcome, {this.state.user ? this.state.user.userName : ''}!</h1>
						</Col>
						<Col sm='4'>
							<Row>
								<Col sm='12'>
									{ 
										(this.state.user && this.state.user.dietInfo) ? 
											(
												<Table>
													<thead className="thead-dark">
														<tr>
															<th colSpan="4" className='table-header-text'>Daily Nutrient Intake</th>
														</tr>
													</thead>
													<thead className="thead-dark">
														<tr>
															<th scope="col">Calories (Kcal)</th>
															<th scope="col">Protein (Gs)</th>
															<th scope="col">Fat (Gs)</th>
															<th scope="col">Carbs (Gs)</th>
														</tr>
													</thead>
													<tbody>
														<tr>
														<td>{this.state.user.dietInfo.calories}</td>
														<td>{this.state.user.dietInfo.protein}</td>
														<td>{this.state.user.dietInfo.fat}</td>
														<td>{this.state.user.dietInfo.carbs}</td>
														</tr>
													</tbody>
												</Table>
											)
											: 
											(
												<Col sm='12'>
													<h2>No diet info yet</h2>
												</Col>
											)
									}
								</Col>
							</Row>
							<Row>
								<Col sm='12'>
									{/* <Workouts workoutData={this.state.user} /> */}
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default App(connect(mapStateToProps, mapDispatchToProps)(Home))

