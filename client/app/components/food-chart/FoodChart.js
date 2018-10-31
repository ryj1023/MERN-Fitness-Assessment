import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { saveUserData, saveToUsersFoodList } from '../../actions/async-actions';
import { updatedFoodChart } from '../../actions';
import SelectedFoodChart from './SelectedFoodChart';
import './food-chart.css';
import axios from 'axios';
import { Container, Row, Col, Table, Form, Button } from 'reactstrap';
import SmartTable from '../SmartTable'; 

class FoodChart extends Component {

  displayUpdatedFoodData (dietSummary) {
    const totals = {
      calories: 0,
      protein: 0, 
      fats: 0,
      carbs: 0
    }
      const previewFoodData = dietSummary.map(foodData => {
        return {
          foodName: foodData.foodName,
          foodFacts: foodData.foodFacts.reduce((acc, data) => { 
            if (data.name) {
              if (data.name === 'Protein' || (data.name === 'Energy' && data.unit === 'kcal') || data.name.includes('(fat)') || data.name.includes('Carbohydrate')) {
                acc[data.name] = data.value;
              }
          }
            return acc;
          }, {})
        }
      })
      
      const macroTotals = previewFoodData.reduce((acc, macros, index) => {
        acc.calories += Number(macros.foodFacts.Energy)
        acc.protein += Number(macros.foodFacts.Protein)
        acc.fats += Number(macros.foodFacts['Total lipid (fat)'])
        acc.carbs += Number(macros.foodFacts['Carbohydrate, by difference'])
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
          console.log('res', res)
      } catch (err) {
        console.log('err', err)
      }
    }

  render() {
    if (this.props.userFoodList.length > 0) {
     const { previewFoodData, macroTotals } = this.displayUpdatedFoodData(this.props.userFoodList)
     const savedFoodTableData = previewFoodData.map((foodObject, index) => <SelectedFoodChart foodData={foodObject} key={index} onRemove={async (selected) => await this.removeSelectedFood(selected, this.props.userName)}/>)
    return (
       <Container className='bg-white food-chart-container'>
        <Row>
          <Col>
            <SmartTable titleHeader={true} title={'Daily Nutrient Intake Goal'} tableHeaders={['Calories', 'Protein (grams)', 'Fat (grams)', 'Carbs (grams)']} tableData={[this.props.dailyDietGoals.calories, this.props.dailyDietGoals.protein, this.props.dailyDietGoals.fat, this.props.dailyDietGoals.carbs]}/>
                <Row className='food-chart'>
                  <Table dark size="sm" className="food-chart-table">
                    <thead>
                      <tr>
                          <th className="text-center" colSpan="6">Selected Foods</th>
                      </tr>
                    </thead>
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
                      <tr>
                        <td>Totals</td>
                        <td>{macroTotals.calories.toFixed(2)}</td>
                        <td>{macroTotals.protein.toFixed(2)}</td>
                        <td>{macroTotals.fats.toFixed(2)}</td>
                        <td>{macroTotals.carbs.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </Table>
                  
                </Row>
            </Col>
          </Row>
          <style jsx global>{`
              .table, tr, th, td {
                color: white;
                font-size: 0.7rem !important;
              }
              .food-chart {
                height: 60%;
              }
              .food-chart > table {
                height: 100%;
              }
              .food-chart > div {
                height: 100%;
              }
              .food-chart-table {
                display: block;
                height: 60%;
                overflow-y: scroll;
              }
              .food-chart-container, .food-chart-container > div, .food-chart-container > div > div {
                height: inherit;
              }
            `}            
            </style>
        </Container>
      
    );
  } else if (this.props.foodChartLoading) {
    return <h1>loading...</h1>
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