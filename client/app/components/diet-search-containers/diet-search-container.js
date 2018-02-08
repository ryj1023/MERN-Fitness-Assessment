import React, { Component } from 'react';
import './diet-search-container.css';
import { getFoodNutritionFacts } from '../../actions/async-actions';

class DietSearchContainer extends Component {

	constructor(props){
		super(props)
		this.state = {
      foodTextInput: null,
      counter: 0,
		}
  }
  
  setInput(foodTextInput){
		this.setState({
      foodTextInput,
      counter: this.state.counter + 1,
    })
  }
  
  onSubmit(e){
    e.preventDefault();
    this.setState({
      counter: this.state.counter + 1,
    })
    this.props.onAdd(this.state.foodTextInput);
  }

  onItemClick(clickedFoodItem) {
    this.props.dispatch(getFoodNutritionFacts(clickedFoodItem.food))
  }

  render() {
    if (this.props.foodList) {
      const FoodList = this.props.foodList.map((food, index) => {
          return <li key={index} onClick={this.onItemClick.bind(this, {food})}>{food}</li>;
        });
      return (
        <div className="diet-search-container">
          <form onSubmit={(e)=> this.onSubmit(e)}>
            <h1>{this.props.searchHeading}</h1>
            <ul>
              {FoodList}
            </ul>
            <input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/>
            <button className='search-button'>Search Foods</button>
          </form>
         </div>
      );
    } 
    return (
    	<div className="diet-search-container">
        <form onSubmit={(e)=> this.onSubmit(e)}>
          <h1>{this.props.searchHeading}</h1>
          <input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/>
          <button className='search-button'>Search Foods</button>
        </form>
       </div>
    );
  }
}

export default DietSearchContainer;