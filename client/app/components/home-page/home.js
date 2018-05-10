import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import {bindActionCreators} from 'redux';
import Navigation from '../navigations/navigation';
import './home.css'

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			user: null,
		}
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
					<Navigation />
					  <div className="home-wrapper">
						  <div className="home-feed">
						  <h1>{this.state.user.userName ? this.state.user.userName : ''} Home Page</h1>
						  </div>
						  <div className="tables-container">
							  <div>
							  <h1>Daily Nutrient Intake</h1>
							  { 
								  this.state.user.dietInfo ? 
							  (
									<table className="diet-display-table">
											<thead>
												<tr>
													<th>Calories</th>
													<th>Protein</th>
													<th>Fat</th>
													<th>Carbs</th>
												</tr>
											</thead>
											<tbody>
											<tr>
												<td>{this.state.user.dietInfo.calories}cal</td>
												<td>{this.state.user.dietInfo.protein}g</td>
												<td>{this.state.user.dietInfo.fat}g</td>
												<td>{this.state.user.dietInfo.carbs}g</td>
											</tr>
											</tbody>
									</table>
							  )
									: (null)
							  }
							  </div>
							  <div></div>
						  </div>
					  </div>
			  </div>
			  )
		}
			return(
			 	<div>
					 <Navigation />
						<div className="home-wrapper">
							<div className="home-feed">
							<h1>Home Page</h1>
							</div>
							<div className="tables-container">
								<div></div>
								<div></div>
							</div>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home)

