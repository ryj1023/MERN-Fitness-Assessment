import React, { Suspense, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import { getUserData } from '../client/app/actions/async-actions';
import { updatedFoodChart, getDailyDietGoals } from '../client/app/actions';
import FoodChart from '../client/app/components/food-chart/FoodChart';
import FoodSearch from '../client/app/components/food-search/FoodSearch';
import App from '../client/app/components/app/App';


class DietSearchContainer extends Component {

  state = {
    loading: true
  }

  async addSelectedFoodToFoodList(selectedFoodName, selectedFoodFacts, userData) {
    const encodedURI = window.encodeURI(`/api/save-food-items`);
    try {
        const res = await axios.post(encodedURI, {
            userDietSummary: { foodName: selectedFoodName, foodFacts: selectedFoodFacts },
                email: userData.email
        })
        this.props.getUserData(res.data.user.userDietSummary)
        localStorage.setItem('user', JSON.stringify(res.data[0].user));
    } catch (err) {
      console.log('err', err)
    }
  }


 getUpdatedFoodChart(userData) {
    this.props.store.dispatch(updatedFoodChart(userData.userDietSummary))
    this.props.store.dispatch(getDailyDietGoals(userData.dietInfo))
    localStorage.setItem('user', JSON.stringify(userData));
  }

  async componentDidMount () {
    if (this.props.updatedUserFoodList.foodList.length === 0) {
      if (JSON.parse(localStorage.getItem('user'))) {
        try {
          const encodedURI = window.encodeURI(`/api/user-data`)
          const res = await axios.get(encodedURI, { params: {email: JSON.parse(localStorage.getItem('user')).email}})
          console.log('res', res)
          this.getUpdatedFoodChart(res.data[0].user)
          this.setState({ loading: false,
          userName: res.data[0].user.userName })
        } catch (err) {
          console.log('err', err)
        }
      } else {
        this.setState({ loading: false })
      }
    } 
    this.setState({ loading: false })

  }

  render () {
    return (
        <Container fluid className="h-100">
          <Row className="h-100">
              <Col className="border bg-white col-12 col-md-5 h-100">
                <FoodChart getUpdatedFoodChart={(userData) => this.getUpdatedFoodChart(userData)} foodChartLoading={this.state.loading} userName={this.state.userName} userFoodList={this.props.updatedUserFoodList.foodList} {...this.props}/>
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
		foodList: state.foodList,
    updatedUserFoodList: state.updatedUserFoodList,
    dailyDietGoals: state.dailyDietGoals
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ getUserData, updatedFoodChart, getDailyDietGoals }, dispatch);

export default App(connect(mapStateToProps, mapDispatchToProps)(DietSearchContainer))
