import React, { Component } from 'react';
import { connect } from 'react-redux';
import './food-chart.css';

class FoodChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      dailyDietInfo: this.getState(),
    }
  }

  getState() {
    if (JSON.parse(localStorage.getItem('user'))) {
      return JSON.parse(localStorage.getItem('user')).dietInfo
    } else if (this.props.clientDietInfo){
      return this.props.clientDietInfo.clientInfo ? this.props.clientDietInfo.clientInfo : null;
    } 
    return null
  }

  render() {
    if (this.state.dailyDietInfo !== null) {
    return (
       <div className="food-chart-container">
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
        </div>
    );
  }
  return (
    <div className="food-chart-container">
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

export default connect(mapStateToProps)(FoodChart)