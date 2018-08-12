import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { saveUserData } from '../../actions/async-actions';
import './food-chart.css';
import axios from 'axios';

class FoodChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      dailyDietInfo: this.getStateForDietInfo(),
      user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : '',
      hideSaveButton: (this.getStateForDietInfo()) ? true : false,
      isLoggedIn: JSON.parse(localStorage.getItem('user')) ? true : false,
      showSignInMessage: false,
    }
  }

  getStateForDietInfo() {
    if (Object.keys(this.props.clientDietInfo).length > 0) {
      return this.props.clientDietInfo.clientInfo;
    } else if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).dietInfo.calories !== null){
      return JSON.parse(localStorage.getItem('user')).dietInfo
    } 
    return {};
  }

  saveDietData(e) {
    e.preventDefault();
    if (this.state.isLoggedIn) {
      const encodedURI = window.encodeURI(`/api/save`);
      axios.post(encodedURI, {
      userData: this.props.clientDietInfo.clientInfo,
      userName: this.state.user,
      email: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).email : null,
      }).then(res => {
          alert('Info Saved!')
          this.setState({
            showSaveButton: false,
          })
      }).catch(err => {
        alert('There was an error saving your Info. Please try again.')
      });
    } else {
      localStorage.setItem('submittedUserMetrics', JSON.stringify(this.props.clientDietInfo.clientInfo))
      this.setState({
        showSignInMessage: true,
      })
    }
  }
  
  render() {
    if (this.state.dailyDietInfo && this.state.dailyDietInfo.calories !== null) {
    return (
       <div className="food-chart-container">
        <div className="food-chart-content">
            <table className="table">
              <thead className="thead-dark">
                  <tr>
                    <th colSpan="4" className='table-header-text'>Daily Nutrient Intake</th>
                  </tr>
							</thead>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Calories</th>
                  <th scope="col">Protein (grams)</th>
                  <th scope="col">Fat (grams)</th>
                  <th scope="col">Carbs (grams)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td>{this.state.dailyDietInfo.calories}</td>
                <td>{this.state.dailyDietInfo.protein}</td>
                <td>{this.state.dailyDietInfo.fat}</td>
                <td>{this.state.dailyDietInfo.carbs}</td>
                </tr>
              </tbody>
            </table>

            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
            <form onSubmit={(e)=> this.saveDietData(e)}>
              { 
                (this.state.hideSaveButton && this.props.clientDietInfo.clientInfo) ? <button className="submit-button">Save Diet Info</button> : null
              }
            </form>
            {
              (this.state.showSignInMessage) ? <a><Link to='./sign-up'>Create An Account</Link></a> : null
            }
          </div>
        </div>
    );
  } else return (
    <div className="food-chart-container">
      <h1>Daily Nutrient Intake</h1>
        <h3>No current daily intake available</h3>
    </div>
  );
  }
}

const mapStateToProps = (state) => {
	return {
		clientDietInfo: state.clientInfo,
		foodList: state.foodList,
    nutritionFacts: state.nutritionFacts,
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ saveUserData }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FoodChart)