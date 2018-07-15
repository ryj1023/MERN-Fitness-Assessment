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
    if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).dietInfo.calories !== null) {
      return JSON.parse(localStorage.getItem('user')).dietInfo
    } else if (this.props.clientDietInfo){
      return this.props.clientDietInfo.clientInfo ? this.props.clientDietInfo.clientInfo : undefined;
    } 
    return undefined;
  }

  saveDietData(e) {
    e.preventDefault();
    console.log('submittedData', JSON.parse(localStorage.getItem('user')));
    if (this.state.isLoggedIn) {
      const encodedURI = window.encodeURI(`/api/save`);
      axios.post(encodedURI, {
      userData: this.props.clientDietInfo.clientInfo,
      userName: this.state.user,
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
          <h1 className='food-chart-heading'>Daily Nutrient Intake</h1>
          <table className="food-chart-table">
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
                  <td>{this.state.dailyDietInfo.calories}cal</td>
                  <td>{this.state.dailyDietInfo.protein}g</td>
                  <td>{this.state.dailyDietInfo.fat}g</td>
                  <td>{this.state.dailyDietInfo.carbs}g</td>
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