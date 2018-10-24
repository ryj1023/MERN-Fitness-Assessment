import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../client/app/layouts/default';
import { getFoodSearchKeyword, getFoodNutritionFacts, saveToUsersFoodList, getUserData } from '../client/app/actions/async-actions';
import FoodChart from '../client/app/components/food-chart/FoodChart';
import FoodSearch from '../client/app/components/food-search/FoodSearch';
import { updatedFoodChart } from '../client/app/actions';
import App from '../client/app/components/app/App';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

class DietSearchContainer extends Component {

  async addSelectedFoodToFoodList(selectedFoodName, selectedFoodFacts, userData) {
    //await this.props.saveToUsersFoodList({ foodName: selectedFoodName, foodFacts: selectedFoodFacts }, userData)
    const encodedURI = window.encodeURI(`/api/save-food-items`);
    try {
        const res = await axios.post(encodedURI, {
            userDietSummary: { foodName: selectedFoodName, foodFacts: selectedFoodFacts },
                email: userData.email
        })
        this.props.getUserData(userData)
        // updatedFoodChart(res.data.user.userDietSummary)
    } catch (err) {
      console.log('err', err)
        // return (dispatch) => dispatch({type: ERROR_SAVING_FOOD_DATA, payload: 'Sorry we could not save your data.'})
    }
  }

  render () {
    return (
        <Container fluid className="h-100">
        {console.log('updatedUserFoodList', this.props.updatedUserFoodList)}
        <Row className="h-100">
            <Col className="border bg-white col-12 col-md-5">
              <FoodChart/>
            </Col>
            <Col className="border bg-white col-12 col-md-7">
              <FoodSearch addSelectedFoodToFoodList={async (selectedFoodName, selectedFoodFacts, userData) => await this.addSelectedFoodToFoodList(selectedFoodName, selectedFoodFacts, userData)}/>
            </Col>
        </Row>
      </Container>
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

const mapDispatchToProps = dispatch => bindActionCreators({ getFoodSearchKeyword, getUserData, getFoodNutritionFacts, saveToUsersFoodList, updatedFoodChart }, dispatch);

export default App(connect(mapStateToProps, mapDispatchToProps)(DietSearchContainer))
