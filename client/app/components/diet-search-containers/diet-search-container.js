import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './diet-search-container.css';
import { getFoodSearchKeyword, getFoodNutritionFacts, saveToUsersFoodList, getUserData } from '../../actions/async-actions';
import { updatedFoodChart } from '../../actions'
import Navigation from '../navigations/navigation';
import FoodChart from '../food-display/food-chart';
import axios from 'axios';

class DietSearchContainer extends Component {

	constructor(props){
		super(props)
		this.state = {
      foodTextInput: null,
      showNutrientFacts: false,
      selectedFoodName: null,
      dailyDietInfo: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).dietInfo : null,
      pageNumber: 1,
      selectedPage: 1,
      updatedUserData: null,
      selectedFood: {}
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

  showFoodNutrients(selectedFood) {
    this.props.getFoodNutritionFacts(selectedFood.foodID);
    this.setState({
      showNutrientFacts: true,
      selectedFoodName: selectedFood.foodName
    })
  }

  backToFoodResults() {
    this.setState({
      showNutrientFacts: false,
    })
  }

  getSelectedPage(targetName, id) {
    if (Number.isNaN(Number(targetName))) {
      const newPageNumber = (targetName === 'next-page' || id === 'next') ? this.state.pageNumber + 1 : this.state.pageNumber - 1;
      this.setState({
        pageNumber: newPageNumber
      })
      return newPageNumber;
    } else {
        this.setState({
          pageNumber: Number(targetName)
        })
      return Number(targetName);
    }
  }

  changeFoodPage(e) {
    e.preventDefault();
    this.setState({
      selectedPage: this.getSelectedPage(e.target.name, e.target.id)
    })
  }

  setStateForSelectedFoodFacts(selectedFoodFacts) {
    this.setState({
      selectedFoodFacts, 
    })
  }

  async addToUsersFoodList (selectedFoodFacts) {
    // this.setState({
    //   selectedFood: { foodName: this.state.selectedFoodName, foodFacts: selectedFoodFacts }
    // })
    const userDietSummary = Object.keys(this.props.updatedUserFoodList.updatedUserData).length > 0 ? this.props.updatedUserFoodList.updatedUserData : JSON.parse(localStorage.getItem('user')).userDietSummary;
    this.props.updatedFoodChart(userDietSummary, { foodName: this.state.selectedFoodName, foodFacts: selectedFoodFacts })
    // saveToUsersFoodList(this.state.selectedFoodName, selectedFoodFacts, JSON.parse(localStorage.getItem('user')))
    // const updatedUserData = await axios.get('/api/user-data', {
    //   params: {
    //     email: JSON.parse(localStorage.getItem('user')).email,
    //   } 
    // });
    // console.log('updatedUserData from component', updatedUserData.data[0].user)
    // this.setState({
    //   updatedUserData: updatedUserData.data[0].user,
    // })
    // this.props.updatedFoodChart(this.state.updatedUserData)
    // localStorage.setItem('user', JSON.stringify(this.state.updatedUserData));
  }
  
  render() {
    const selectedFoodFacts = [];
    // showing selected food nutrient facts
    if (this.state.showNutrientFacts === true) {
     const nutritionFactUnit = this.props.nutritionFacts.map((data, index) => {
       selectedFoodFacts.push(data);
       if ((data.name.includes('Energy') && data.unit === 'kcal') || data.name.includes('Protein') || data.name.includes('lipid') || data.name.includes('Carbohydrate')){
        return <td key={index}>{data.value}{data.unit}</td>
       } 
     });
     // this.setStateForSelectedFoodFacts([...selectedFoodFacts]);
     return (
      <div>
        <Navigation />
        <div className="food-search-wrapper"> 
          <FoodChart updatedUserData={this.state.updatedUserData} selectedFood={this.state.selectedFood}/>  
          <div className="diet-search-container">
          <nav className='food-search-nav'> 
                  <h1 className='nav-heading'>Search Foods for macrconutrients</h1>
                      <form className="food-search-form" onSubmit={(e)=> this.onSubmit(e)}>
                        <input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/> 
                        <button className='food-search-button'>Search</button>
                      </form>
                </nav>
                <p>{this.state.selectedFoodName}</p>
                    <table className="table nutrients-per-cup-table">
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
                    <button className='add-food-button' onClick={async () => await this.addToUsersFoodList(selectedFoodFacts)}>Add To Daily Food Intake</button>
                  </div>
        </div>
      </div>
     </div>
     )
    }
    if (`${this.props.foodList}`.length > 0) {
      // showing food list
      const FoodList = this.props.foodList.reduce((acc, food, index) => {
        const pageRange = this.state.selectedPage === 1 ? 1 : this.state.selectedPage * 10 - 9;
        let foodName = food.foodName.toUpperCase();
        if (foodName.includes('UPC')) {
          foodName = foodName.slice(0, foodName.indexOf(', UPC'))
        } else if (foodName.includes('GTIN')) {
          foodName = foodName.slice(0, foodName.indexOf(', GTIN'))
        }
        const { foodID } = food;
        if (index + 1 >= pageRange && acc.length < 10) {
          acc.push(<li className="list-group-item" key={index} id={foodID} onClick={this.showFoodNutrients.bind(this, {foodID, foodName})}>{foodName}</li>);
        }
        return acc;
        }, []);
        const remainingRecords = this.props.foodList.slice(this.state.selectedPage);
        const pageRange = remainingRecords.length >= 10 ? 10 : 1;
        const foodListPageNumbers = [...Array(pageRange)].map((_, index) => {
          if (pageRange === 1) return null;
          const isActive = (this.state.selectedPage === index + 1) ? 'active' : '';
            return <li key={index + 1} className={`page-item ${isActive}`}><a className="page-link" key={index + 1} name={index + 1} onClick={(e)=> this.changeFoodPage(e)} href="#">{index + 1}</a></li>
        })
      return (
        <div>
          <Navigation /> 
            <div className="food-search-wrapper">
            <FoodChart updatedUserData={this.state.updatedUserData} selectedFood={this.state.selectedFood} />
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
                    {
                         this.state.pageNumber > 1 ? 
                         (
                          <li className="page-item" name='previous-page' onClick={(e) => this.changeFoodPage(e)}>
                            <a className="page-link" name='previous-page' href="#" aria-label="Previous">
                              <span name='previous-page' aria-hidden="true">&laquo;</span>
                              <span name='previous-page' className="sr-only">Previous</span>
                            </a>
                        </li>
                         ) : (null)
                       }
                       {foodListPageNumbers}
                       {
                        (this.state.pageNumber !== 10 && pageRange !== 1) ? (
                          <li className="page-item" name='next-page' onClick={(e) => this.changeFoodPage(e)}>
                            <a className="page-link" name='next-page' href="#" aria-label="Next">
                              <span name='next-page' id='next' aria-hidden="true">&raquo;</span>
                              <span className="sr-only" name='next-page'>Next</span>
                            </a>
                          </li>
                        ) : (null)
                       }
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
      <FoodChart updatedUserData={this.state.updatedUserData} selectedFood={this.state.selectedFood}/>  
        <div className="diet-search-container">
          <nav className='food-search-nav'> 
            <h1 className='nav-heading'>Search Foods for macrconutrients</h1>
                <form className="food-search-form" onSubmit={(e)=> this.onSubmit(e)}>
                  <input className="input-box-one" type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/> 
                  <button className='food-search-button'>Search</button>
                </form>
            </nav>
            <h1 className="default-search-text">Start your search for your favorite foods</h1>
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
    updatedUserFoodList: state.updatedUserFoodList
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ getFoodSearchKeyword, getFoodNutritionFacts, saveToUsersFoodList, updatedFoodChart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DietSearchContainer)
