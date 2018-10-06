import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../client/app/layouts/default';
import { getFoodSearchKeyword, getFoodNutritionFacts, saveToUsersFoodList, getUserData } from '../client/app/actions/async-actions';
import FoodChart from '../client/app/components/FoodChart/FoodChart';
import FoodSearch from '../client/app/components/food-search/FoodSearch';
import { updatedFoodChart } from '../client/app/actions';
import App from '../client/app/components/app/App';
import { Container, Row, Col } from 'reactstrap';

class DietSearchContainer extends Component {
  state = {
    foodTextInput: null,
    showNutrientFacts: false,
    selectedFoodName: null,
    dailyDietInfo: '',
    pageNumber: 1,
    selectedPage: 1,
    updatedUserData: null,
    selectedFood: {}
  }

  addSelectedFoodToFoodList(selectedFoodName, selectedFoodFacts) {
    const userDietSummary = Object.keys(this.props.updatedUserFoodList.updatedUserData).length > 0 ? this.props.updatedUserFoodList.updatedUserData : JSON.parse(localStorage.getItem('user')).userDietSummary;
    this.props.updatedFoodChart(userDietSummary, { foodName: selectedFoodName, foodFacts: selectedFoodFacts })
  }

  componentDidMount() {
    this.setState({
      dailyDietInfo: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).dietInfo : null,
    })
  }

  render () {
    return (
      <Layout>
         <Container fluid className="m-2 h-100">
          <Row className="h-100">
              <Col className="border bg-white m-1">
                <FoodChart/>
              </Col>
              <Col className="border  bg-white m-1">
                <FoodSearch addSelectedFoodToFoodList={(selectedFoodName, selectedFoodFacts) => this.addSelectedFoodToFoodList(selectedFoodName, selectedFoodFacts)}/>
              </Col>
          </Row>
        </Container>
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

export default App(connect(mapStateToProps, mapDispatchToProps)(DietSearchContainer))
