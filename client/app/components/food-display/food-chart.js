import React, { Component } from 'react';
import './food-chart.css'

class FoodChart extends Component {
  render() {
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
                <td>{this.props.dailyCalories}cal</td>
                <td>{this.props.dailyProtein}g</td>
                <td>{this.props.dailyCarbs}g</td>
                <td>{this.props.dailyFats}g</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}

export default FoodChart;