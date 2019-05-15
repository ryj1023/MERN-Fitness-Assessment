import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { saveUserData, saveToUsersFoodList } from '../../actions/async-actions';
import { updatedFoodChart } from '../../actions';
import SelectedFoodChart from './SelectedFoodChart';
// import './food-chart.css';
import styles from './styles.js'
import axios from 'axios';
import { Container, Row, Col, Table, Form, Button, Card, CardHeader, CardBody } from 'reactstrap';
import SmartTable from '../SmartTable'; 

class FoodChart extends Component {

  displayUpdatedFoodData (dietSummary) {
    const totals = {
      calories: 0,
      protein: 0, 
      fat: 0,
      carbs: 0
    }
      const previewFoodData = dietSummary.map(foodData => {
        return {
          foodName: foodData.foodName,
          foodFacts: foodData.foodFacts.reduce((acc, data) => { 
            if (data.name) {
              if (data.name === 'Protein' || (data.name === 'Energy' && data.unit === 'kcal') || data.name.includes('(fat)') || data.name.includes('Carbohydrate')) {
                acc[data.name] = data.measures[0].value;
              }
          }
          
            return acc;
          }, {})
        }
      })      
      const macroTotals = previewFoodData.reduce((acc, macros, index) => {
        acc.calories += macros.foodFacts.Energy ? Number(macros.foodFacts.Energy) : 0
        acc.protein += macros.foodFacts.Protein ? Number(macros.foodFacts.Protein) : 0
        acc.fat += macros.foodFacts['Total lipid (fat)'] ? Number(macros.foodFacts['Total lipid (fat)']) : 0
        acc.carbs += macros.foodFacts['Carbohydrate, by difference'] ? Number(macros.foodFacts['Carbohydrate, by difference']) : 0
        return acc;
      }, totals);

      return { previewFoodData, macroTotals}
  }



    async removeSelectedFood(selectedFood, userName) {
      try {
        const encodedURI = window.encodeURI(`/api/remove-food-item`);
        const res = await axios.post(encodedURI, 
           {
              foodName: selectedFood.foodName, 
              userName
            }
          )
          this.props.getUpdatedFoodChart(res.data.user)
      } catch (err) {
        console.log('err', err)
      }
    }

  render() {
    const { dailyDietGoals } = this.props;
    if (this.props.userFoodList.length > 0) {
     const { previewFoodData, macroTotals } = this.displayUpdatedFoodData(this.props.userFoodList) 
     const savedFoodTableData = previewFoodData.map((foodObject, index) => <SelectedFoodChart foodData={foodObject} key={index} onRemove={async (selected) => await this.removeSelectedFood(selected, this.props.userName)}/>)
     const selectedMacrosOverGoal = Object.keys(dailyDietGoals).filter(key => dailyDietGoals[key] < macroTotals[key])
     const macroTotalStatus = (selectedTotal, dailyTotal) => {
       if (!dailyTotal || !selectedTotal) {
         return ''
       } else if (dailyTotal > selectedTotal) {
         return 'under-total'
       } else if (dailyTotal < selectedTotal) {
         return 'over-total'
       }
       return ''
     }
     const DietGoalsTableData = [this.props.dailyDietGoals.calories, this.props.dailyDietGoals.protein, this.props.dailyDietGoals.fat, this.props.dailyDietGoals.carbs]
     return (
      <>
          <Card className='m-auto'>
            <CardBody>
              <h5>Daily Nutrient Intake Goals</h5>
                <Table className={`mb-2`} dark>
                  <thead>
                      <tr>
                      {['Calories', 'Protein (grams)', 'Fat (grams)', 'Carbs (grams)'].map((header, index) => <th key={index}>{header}</th>)}
                      </tr>
                  </thead>
                  <tbody>
                  <tr>
                      {DietGoalsTableData.map((data, index) => <td key={index}>{data}</td>)}
                  </tr>
                  </tbody>
              </Table>
            </CardBody>
            <style jsx>{styles}</style>
          </Card>
          <div className='food-chart'>
            <Card className='mt-2'>
              <CardBody>
                <h5>Selected Foods</h5>
                <table className="table table-dark table-responsive food-chart-table">
                  <thead>
                    <tr>
                      <th>Food Name</th>
                      <th>Calories</th>
                      <th>Protein (grams)</th>
                      <th>Fat (grams)</th>
                      <th>Carbs (grams)</th>
                      <th>Remove Food</th>
                    </tr>
                  </thead>
                  <tbody>
                      {savedFoodTableData}
                    <tr className={`totals-row ${selectedMacrosOverGoal.length > 0 ? 'totals-row-over' : 'totals-row-under'}`}>
                      <td>Totals<div className='d-inline-block float-right'><span className='under-label m-1 p-1'>Under Goal</span><span className='over-label m-1 p-1'>Over Goal</span></div></td>
                      <td className={`${macroTotalStatus(macroTotals.calories, dailyDietGoals.calories)}`}>{macroTotals.calories}</td>
                      <td className={`${macroTotalStatus(macroTotals.protein, dailyDietGoals.protein)}`}>{macroTotals.protein.toFixed(2)}</td>
                      <td className={`${macroTotalStatus(macroTotals.fat, dailyDietGoals.fat)}`}>{macroTotals.fat.toFixed(2)}</td>
                      <td className={`${macroTotalStatus(macroTotals.carbs, dailyDietGoals.carbs)}`}>{macroTotals.carbs.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
            <style jsx>{styles}</style>
          </div>
        </>
    );
  } else if (this.props.foodChartLoading) {
    return <p>loading...</p>
  } else return (
    <Container>
      <Row>
        <h1>Daily Nutrient Intake</h1>
        <h3>No current daily intake available</h3>
      </Row>
    </Container>
  );
  }
}

const mapStateToProps = (state) => {
	return {
		clientDietInfo: state.clientInfo,
		foodList: state.foodList,
    nutritionFacts: state.nutritionFacts,
    savedFoodData: state.savedFoodData
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ saveUserData, updatedFoodChart }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FoodChart)