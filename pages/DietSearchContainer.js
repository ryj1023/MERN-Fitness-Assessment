import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../client/app/layouts/default';
import { getFoodSearchKeyword, getFoodNutritionFacts, saveToUsersFoodList, getUserData } from '../client/app/actions/async-actions';
import FoodChart from '../client/app/components/FoodChart/FoodChart';
import FoodSearch from '../client/app/components/food-search/FoodSearch';
import { updatedFoodChart } from '../client/app/actions'

class DietSearchContainer extends Component {
  state = {
    foodTextInput: null,
    showNutrientFacts: false,
    selectedFoodName: null,
    dailyDietInfo: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).dietInfo : null,
    pageNumber: 1,
    selectedPage: 1,
    updatedUserData: null,
    selectedFood: {}
  }

  addSelectedFoodToFoodList(selectedFoodName, selectedFoodFacts) {
    const userDietSummary = Object.keys(this.props.updatedUserFoodList.updatedUserData).length > 0 ? this.props.updatedUserFoodList.updatedUserData : JSON.parse(localStorage.getItem('user')).userDietSummary;
    this.props.updatedFoodChart(userDietSummary, { foodName: selectedFoodName, foodFacts: selectedFoodFacts })
  }

  render () {
    return (
      <Layout>
         <div className="container-fluid">
          <div className="row no-gutters mt-2">
            <div className="col mr-1">
              <FoodChart/>
            </div>
            <div className="col ml-1">
              <FoodSearch addSelectedFoodToFoodList={(selectedFoodName, selectedFoodFacts) => this.addSelectedFoodToFoodList(selectedFoodName, selectedFoodFacts)}/>
            </div>
          </div>
        </div>
        <style jsx>{
          `.col{
            background-color: #eee
          }
          `}
        </style>
      </Layout>
    )
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
