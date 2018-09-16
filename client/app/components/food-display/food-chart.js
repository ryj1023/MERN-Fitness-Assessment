import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { saveUserData, saveToUsersFoodList } from '../../actions/async-actions';
import { updatedFoodChart } from '../../actions/index';
import './food-chart.css';
import axios from 'axios';

class FoodChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      dailyDietInfo: this.getStateForDietInfo(),
      userLocalStorageData: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {},
      // user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : '',
      hideSaveButton: (this.getStateForDietInfo()) ? true : false,
      isLoggedIn: JSON.parse(localStorage.getItem('user')) ? true : false,
      showSignInMessage: false,
      user: this.props.updatedUserData ? this.props.updatedUserData : (JSON.parse(localStorage.getItem('user')) || null),
      savedFoodList: false,
      err: null,
    }
  }

  getStateForDietInfo() {
    if (Object.keys(this.props.clientDietInfo).length > 0) {
      return this.props.clientDietInfo.clientInfo;
    } else if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).dietInfo.calories !== null){
      return JSON.parse(localStorage.getItem('user')).dietInfo
    } 
    return {};
  }

  async saveDietData(e, updatedUserFoodList) {
    e.preventDefault();
    if (this.state.isLoggedIn) {
      // saveToUsersFoodList(updatedUserFoodList, JSON.parse(localStorage.getItem('user')))
        const encodedURI = window.encodeURI(`/api/save-food-items`);
        try {
            const res = await axios.post(encodedURI, {
                userDietSummary: updatedUserFoodList,
                    email: JSON.parse(localStorage.getItem('user')).email
            })
          } catch (err) {
            this.setState({ err: 'Could not save food item.' })
          }
      const updatedStorageData = this.state.userLocalStorageData;
      updatedStorageData.userDietSummary = updatedUserFoodList
      localStorage.setItem('user', JSON.stringify(updatedStorageData));
      this.setState({
        savedFoodList: true,
      })
    }
  }

  componentDidMount () {
    if (this.state.savedFoodList) {
    const encodedURI = window.encodeURI(`/api/user-data`)
     axios.get(encodedURI, {
            params: {
                email: JSON.parse(localStorage.getItem('user')).email
              }, 
        })
        .then((response) => {
          console.log('response', response)
            // setState({
            //     use
            //   })
            });
    }
  }

  displayUpdatedFoodData (dietSummary) {
    console.log('updatedUserFoodList', this.props.updatedUserFoodList)
    //  TODO: add detail object to parent object
    const allSavedFoodData = {};
    if (dietSummary) {
      // if (Object.keys(this.props.selectedFood).length > 0) {
      //   console.log('this.props.selectedFood', this.props.selectedFood)
      //   dietSummary.push(this.props.selectedFood)
      // }
      allSavedFoodData.previewData = dietSummary.map(foodData => {
        return {
          foodName: foodData.foodName,
          foodFacts: foodData.foodFacts.reduce((acc, data) => { 
            if (data.name === 'Protein' || (data.name === 'Energy' && data.unit === 'kcal') || data.name.includes('(fat)') || data.name.includes('Carbohydrate')) {
              acc[data.name] = data.value;
            }
            return acc;
          }, {})
        }
      })
    }

    return allSavedFoodData;
  }

  updateUserData() {
   if (Object.keys(this.props.updatedUserFoodList).length > 0) {
     return this.props.updatedUserFoodList
   } else if (this.state.user) {
     return this.state.user.userDietSummary
   }
   return null;
  }

    getMacroTotals(foodData) {
      const totals = {
        calories: 0,
        protein: 0, 
        fats: 0,
        carbs: 0
      }

      return foodData.reduce((acc, macros, index) => {
        acc.calories += Number(macros.foodFacts.Energy)
        acc.protein += Number(macros.foodFacts.Protein)
        acc.fats += Number(macros.foodFacts['Total lipid (fat)'])
        acc.carbs += Number(macros.foodFacts['Carbohydrate, by difference'])
        return acc;
      }, totals);
    }

  render() {
    if (Object.keys(this.state.dailyDietInfo).length > 0 && this.state.dailyDietInfo.calories !== null) {
     const allSavedFoodData = this.displayUpdatedFoodData(this.updateUserData())
     const macroTotals = this.getMacroTotals(allSavedFoodData.previewData)
     const savedFoodTableData = allSavedFoodData.previewData.map((foodObject, index) => {
       return (
        <tr key={index}>
          <td>{foodObject.foodName}</td>
          <td>{foodObject.foodFacts.Energy}</td>
          <td>{foodObject.foodFacts.Protein}</td>
          <td>{foodObject.foodFacts['Total lipid (fat)']}</td>
          <td>{foodObject.foodFacts['Carbohydrate, by difference']}</td>
        </tr>
       )
     })
    return (
    

     
       <div className="food-chart-container">
        <div className="food-chart-content">
        <table className="table intake-goals">
                <thead className="thead-dark">
                    <tr>
                      <th colSpan="4" className='table-header-text'>Daily Nutrient Intake Goal</th>
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
                    <td>{this.state.dailyDietInfo.calories}</td>
                    <td>{this.state.dailyDietInfo.protein}</td>
                    <td>{this.state.dailyDietInfo.fat}</td>
                    <td>{this.state.dailyDietInfo.carbs}</td>
                  </tr>
                </tbody>
              </table>
            <table className="table selected-foods">
              <thead className="thead-dark">
                <tr>
                    <th colSpan="5" className='table-header-text'>Selected Foods</th>
                </tr>
              </thead>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Food Name</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Protein (grams)</th>
                  <th scope="col">Fat (grams)</th>
                  <th scope="col">Carbs (grams)</th>
                </tr>
              </thead>
              <tbody>
                  {savedFoodTableData}
                <tr>
                  <td>Totals</td>
                  <td>{macroTotals.calories.toFixed(2)}</td>
                  <td>{macroTotals.protein.toFixed(2)}</td>
                  <td>{macroTotals.fats.toFixed(2)}</td>
                  <td>{macroTotals.carbs.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <form onSubmit={async (e)=> await this.saveDietData(e, this.updateUserData())}>
               <button className="submit-button">Save Diet Info</button>
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
    updatedUserFoodList: Object.keys(state.updatedUserFoodList).length > 0 ? state.updatedUserFoodList.updatedUserData : {},
    savedFoodData: state.savedFoodData
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ saveUserData, updatedFoodChart }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FoodChart)