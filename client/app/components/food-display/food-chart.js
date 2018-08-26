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

  saveDietData(e, updatedUserFoodList) {
    e.preventDefault();
    if (this.state.isLoggedIn) {
      saveToUsersFoodList(updatedUserFoodList, JSON.parse(localStorage.getItem('user')))
      const updatedStorageData = this.state.userLocalStorageData;
      updatedStorageData.userDietSummary = updatedUserFoodList
      localStorage.setItem('user', JSON.stringify(updatedStorageData));
      this.setState({
        savedFoodList: true,
      })
    //   const encodedURI = window.encodeURI(`/api/save`);
    //   axios.post(encodedURI, {
    //   userData: this.props.clientDietInfo.clientInfo,
    //   userName: this.state.user,
    //   email: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).email : null,
    //   }).then(res => {
    //       alert('Info Saved!')
    //       this.setState({
    //         showSaveButton: false,
    //       })
    //   }).catch(err => {
    //     alert('There was an error saving your Info. Please try again.')
    //   });
    // } else {
    //   localStorage.setItem('submittedUserMetrics', JSON.stringify(this.props.clientDietInfo.clientInfo))
    //   this.setState({
    //     showSignInMessage: true,
    //   })
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

  render() {
    if (Object.keys(this.state.dailyDietInfo).length > 0 && this.state.dailyDietInfo.calories !== null) {
     const allSavedFoodData = this.displayUpdatedFoodData(this.updateUserData())
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
            <table className="table">
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

            <table className="table">
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
              </tbody>
            </table>
            <form onSubmit={(e)=> this.saveDietData(e, this.updateUserData())}>
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
    updatedUserFoodList: Object.keys(state.updatedUserFoodList).length > 0 ? state.updatedUserFoodList.updatedUserData : {}
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ saveUserData, updatedFoodChart }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FoodChart)