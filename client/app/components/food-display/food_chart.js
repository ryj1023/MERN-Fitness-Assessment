import React, { Component } from 'react';
import './food_chart.css'

class FoodChart extends Component {
  render() {
    return (
    	<div className="food-chart-container">
     		<p>Calories:{this.props.dailyCalories}cal</p>
            <p>Protein:{this.props.dailyProtein}g</p>
            <p>Carbohydrates:{this.props.dailyCarbs}g</p>
            <p>Fats:{this.props.dailyFats}g</p>
     	</div>
    );
  }
}

export default FoodChart;