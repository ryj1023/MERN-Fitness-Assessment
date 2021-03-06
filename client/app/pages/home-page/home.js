import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from '../../layouts/default'
import Workouts from '../../components/workouts/workouts';
import './home.css';

class Home extends Component {
	
	state = {
		user: null,
	}

	async componentDidMount() {
		const cachedUser = JSON.parse(localStorage.getItem('user'))
				this.setState({
					user: cachedUser
			})
	}

	render(){
		if (this.state.user) {
			return(
				<div>
					<Layout>
					<div className="home-wrapper">
						  <div className="home-feed">
						  <h1>Welcome, {this.state.user.userName ? this.state.user.userName : ''}!</h1>
						  </div>
						  <div className="tables-container">
							  <div>
							  { 
								  (this.state.user.dietInfo && this.state.user.dietInfo.calories) ? 
							  (
									<table className="table">
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
            					</table>
							  )
									: (
											<div>
												<h2>No diet info yet</h2>
											</div>
										)
							  }
							  </div>
							  <div className='workouts-container'>
							  		<Workouts workoutData={this.state.user} />
							  </div>
						  </div>
					  </div>
					</Layout>
			  </div>
			  )
		}
			return(
			 	<div>
					 <Layout>
						<div className="home-wrapper">
								<div className="home-feed">
									<h1>Home Page</h1>
								</div>
								<div className="tables-container">
										<div></div>
										<div></div>
								</div>
						</div>
					 </Layout>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home)

