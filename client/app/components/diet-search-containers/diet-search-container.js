import React, { Component } from 'react';
import './diet-search-container.css';
import { getFoodNutritionFacts } from '../../actions/async-actions';

class DietSearchContainer extends Component {

	constructor(props){
		super(props)
		this.state = {
      foodTextInput: null,
      counter: 0,
      showNutrientFacts: false,
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
      showNutrientFacts: false,
    })
    this.props.onAdd(this.state.foodTextInput);
  }

  onItemClick(selectedFood) {
    this.props.dispatch(getFoodNutritionFacts(selectedFood.foodID));
    this.setState({
      showNutrientFacts: true,
    })
  }

  render() {
    if (this.state.showNutrientFacts === true) {
      console.log('this.props.foodList', this.props.foodList )
     const nutritionFactUnit = this.props.nutritionFacts.map((data, index) => {
       if ((data.name.includes('Energy') && data.unit === 'kcal')|| data.name.includes('Protein') || data.name.includes('lipid') || data.name.includes('Carbohydrate')){
        return <td key={index}>{data.value}{data.unit}</td>
       } 
     });
     return (
      <div className="diet-search-container">
        <form onSubmit={(e)=> this.onSubmit(e)}>
          <h1>{this.props.searchHeading}</h1>
          <input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/>
          <button className='search-button'>Search Foods</button>
          <table className='nutrition-facts-table'>
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
                {nutritionFactUnit}
              </tr>
            </tbody>
          </table>
        </form>
     </div>
     )
    }
    if (this.props.foodList) {
      const FoodList = this.props.foodList.map((food, index) => {
        let foodName = food.foodName.toUpperCase();
        if (foodName.includes('UPC')) {
          foodName = foodName.slice(0, foodName.indexOf(', UPC'))
        } else if (foodName.includes('GTIN')) {
          foodName = foodName.slice(0, foodName.indexOf(', GTIN'))
        }
        const { foodID } = food;
          return <li key={index} id={foodID} onClick={this.onItemClick.bind(this, {foodID})}>{foodName}</li>;
        });
      return (
        <div className="diet-search-container">
          <form onSubmit={(e)=> this.onSubmit(e)}>
            <h1>{this.props.searchHeading}</h1>
            <input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/>
            <button className='search-button'>Search Foods</button>
            <ul className='food-list'>
              {FoodList}
            </ul>
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