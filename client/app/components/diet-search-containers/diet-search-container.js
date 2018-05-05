import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './diet-search-container.css';
import { getFoodSearchKeyword, getFoodNutritionFacts } from '../../actions/async-actions';
import Navigation from '../navigations/navigation';
import FoodChart from '../food-display/food-chart';

class DietSearchContainer extends Component {

	constructor(props){
		super(props)
		this.state = {
      foodTextInput: null,
      showNutrientFacts: false,
      selectedFood: null,
      dailyDietInfo: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).dietInfo : null,
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
      showNutrientFacts: false,
    })
    this.props.getFoodSearchKeyword(this.state.foodTextInput)
  }

  onItemClick(selectedFood) {
    this.props.getFoodNutritionFacts(selectedFood.foodID);
    this.setState({
      showNutrientFacts: true,
      selectedFood: selectedFood.foodName
    })
  }

  backToFoodResults() {
    this.setState({
      showNutrientFacts: false,
    })
  }

  render() {
    if (this.state.showNutrientFacts === true) {
     const nutritionFactUnit = this.props.nutritionFacts.map((data, index) => {
       if ((data.name.includes('Energy') && data.unit === 'kcal')|| data.name.includes('Protein') || data.name.includes('lipid') || data.name.includes('Carbohydrate')){
        return <td key={index}>{data.value}{data.unit}</td>
       } 
     });
     return (
      <div>
        <Navigation />
        <div className="food-search-wrapper"> 
          <FoodChart />     
          <div className="diet-search-container">
            <form onSubmit={(e)=> this.onSubmit(e)}>
              <h1>{this.props.searchHeading}</h1>
              <p>{this.state.selectedFood}</p>
              <h2>Nutrients Per Cup</h2>
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
              <button onClick={this.backToFoodResults.bind(this)} className='back-button'>Back to Food Results</button>
            </form>
        </div>
      </div>
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
          return <li key={index} id={foodID} onClick={this.onItemClick.bind(this, {foodID, foodName})}>{foodName}</li>;
        });
      return (
        <div>
          <Navigation /> 
            <div className="food-search-wrapper">
            <FoodChart />  
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
            </div>
         </div>
      );
    } 
    return (
      <div>
      <Navigation /> 
      <FoodChart />  
        <div className="diet-search-container">
          <form onSubmit={(e)=> this.onSubmit(e)}>
            <h1>{this.props.searchHeading}</h1>
            <input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/>
            <button className='search-button'>Search Foods</button>
          </form>
        </div>
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

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ getFoodSearchKeyword, getFoodNutritionFacts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DietSearchContainer)
