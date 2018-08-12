import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './diet-search-container.css';
import { getFoodSearchKeyword, getFoodNutritionFacts } from '../../actions/async-actions';
import Navigation from '../navigations/navigation';
import FoodChart from '../food-display/food-chart';
import { saveUserData } from '../../actions/async-actions';

class DietSearchContainer extends Component {

	constructor(props){
		super(props)
		this.state = {
      foodTextInput: null,
      showNutrientFacts: false,
      selectedFood: null,
      dailyDietInfo: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).dietInfo : null,
      pageNumber: 1,
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
  changeFoodPage(e) {
    e.preventDefault();
    if (Number.isNaN(Number(e.target.name))) {
      const newPageNumber = (e.target.name === 'next-page' || e.target.id === 'next') ? this.state.pageNumber + 1 : this.state.pageNumber - 1; 
      console.log('newPageNumber', newPageNumber)
        this.setState({
          pageNumber: newPageNumber
        })
        this.props.getFoodSearchKeyword(this.state.foodTextInput, newPageNumber)
    } else {
    this.setState({
      pageNumber: Number(e.target.name)
    })
    this.props.getFoodSearchKeyword(this.state.foodTextInput, this.state.pageNumber)
    console.log('page number', this.state.pageNumber)
    }
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
          <nav className='food-search-nav'> 
                  <h1 className='nav-heading'>Search Foods for macrconutrients</h1>
                      <form className="food-search-form" onSubmit={(e)=> this.onSubmit(e)}>
                        <input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/> 
                        <button className='food-search-button'>Search</button>
                      </form>
                </nav>
                <p>{this.state.selectedFood}</p>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                              <th colSpan="4" className='table-header-text'>Nutrients Per Cup</th>
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
                            {nutritionFactUnit}
                          </tr>
                        </tbody>
                    </table>
                  <div className='diet-search-button-div'>
                    <button onClick={this.backToFoodResults.bind(this)} className='back-button'>Back to Food Results</button>
                    <button className='add-food-button'>Add To Daily Food Intake</button>
                  </div>
        </div>
      </div>
     </div>
     )
    }
    if (`${this.props.foodList}`.length > 0) {
      const FoodList = this.props.foodList.map((food, index) => {
        let foodName = food.foodName.toUpperCase();
        if (foodName.includes('UPC')) {
          foodName = foodName.slice(0, foodName.indexOf(', UPC'))
        } else if (foodName.includes('GTIN')) {
          foodName = foodName.slice(0, foodName.indexOf(', GTIN'))
        }
        const { foodID } = food;
          return <li className="list-group-item" key={index} id={foodID} onClick={this.onItemClick.bind(this, {foodID, foodName})}>{foodName}</li>;
        });
        const foodListPageNumbers = this.props.foodList.map((food, index) => {
          return <li className="page-item"><a className="page-link" key={index} name={index + 1} onClick={(e)=> this.changeFoodPage(e)}href="#">{index + 1}</a></li>
        })
      return (
        <div>
          <Navigation /> 
            <div className="food-search-wrapper">
            <FoodChart />
              <div className="diet-search-container">
                <nav className='food-search-nav'> 
                  <h1 className='nav-heading'>Search Foods for macrconutrients</h1>
                      <form className="food-search-form" onSubmit={(e)=> this.onSubmit(e)}>
                        <input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/> 
                        <button className='food-search-button'>Search</button>
                      </form>
                </nav>
                <form className="food-search-form" onSubmit={(e)=> this.onSubmit(e)}>
                  <ul className="list-group">
                    {FoodList}
                  </ul>
                </form>
                <div className="pagination-div">
                  <nav className="pagination-nav">
                    <ul className="pagination">
                      <li className="page-item" name='previous-page' onClick={(e) => this.changeFoodPage(e)}>
                        <a className="page-link" name='previous-page' href="#" aria-label="Previous">
                          <span name='previous-page' aria-hidden="true">&laquo;</span>
                          <span name='previous-page' className="sr-only">Previous</span>
                        </a>
                      </li>
                       {foodListPageNumbers}
                        <li className="page-item" name='next-page' onClick={(e) => this.changeFoodPage(e)}>
                          <a className="page-link" name='next-page' href="#" aria-label="Next">
                            <span name='next-page' id='next' aria-hidden="true">&raquo;</span>
                            <span className="sr-only" name='next-page'>Next</span>
                          </a>
                        </li>
                    </ul>
                </nav>
              </div>
              </div>
            </div>
        </div>
      );
    } 
    return (
      <div>
      <Navigation /> 
      <div className="food-search-wrapper">
      <FoodChart />  
        <div className="diet-search-container">
          <nav className='food-search-nav'> 
            <h1 className='nav-heading'>Search Foods for macrconutrients</h1>
                <form className="food-search-form" onSubmit={(e)=> this.onSubmit(e)}>
                  <input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/> 
                  <button className='food-search-button'>Search</button>
                </form>
            </nav>
          </div>
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

const mapDispatchToProps = dispatch => bindActionCreators({ getFoodSearchKeyword, getFoodNutritionFacts, saveUserData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DietSearchContainer)
