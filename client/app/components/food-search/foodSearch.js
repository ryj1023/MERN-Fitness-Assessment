import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './FoodSearch.css';
import { getFoodSearchKeyword, getFoodNutritionFacts, saveToUsersFoodList, getUserData } from '../../actions/async-actions';
import { updatedFoodChart } from '../../actions';
import SmartTable from '../SmartTable/SmartTable';
import { Container, Row, Col, Table, Form, FormGroup, Label, FormText, Input, Button } from 'reactstrap';


class DietSearchContainer extends Component {
  
  state = {
    foodTextInput: null,
    showNutrientFacts: false,
    selectedFoodName: null,
    dailyDietInfo: null,
    pageNumber: 1,
    selectedPage: 1,
    updatedUserData: null,
    selectedFood: {}
  }
  
  setInput(foodTextInput){
		this.setState({
      foodTextInput,
      counter: this.state.counter + 1,
    })
  }

  componentDidMount() {
    this.setState({
      dailyDietInfo: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).dietInfo : null,
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

  async addToUsersFoodList (foodName, selectedFoodFacts) {
    this.props.addSelectedFoodToFoodList(foodName, selectedFoodFacts)

    // const userDietSummary = Object.keys(this.props.updatedUserFoodList.updatedUserData).length > 0 ? this.props.updatedUserFoodList.updatedUserData : JSON.parse(localStorage.getItem('user')).userDietSummary;
    // this.props.updatedFoodChart(userDietSummary, { foodName: this.state.selectedFoodName, foodFacts: selectedFoodFacts })
  }

  showNutrientFacts() {
    const selectedFoodFacts = [];
    const tableHeaders = ['Calories', 'Protein (grams)', 'Fat (grams)', 'Carbs (grams)']
    const nutritionFactUnits = this.props.nutritionFacts.reduce((acc, data) => {
      selectedFoodFacts.push(data);
      if ((data.name.includes('Energy') && data.unit === 'kcal') || data.name.includes('Protein') || data.name.includes('lipid') || data.name.includes('Carbohydrate')){
       acc.push(`${data.value}${data.unit}`)
      } 
      return acc;
    }, []);
    // this.setStateForSelectedFoodFacts([...selectedFoodFacts]);
    return (
      <>
       <Row>
         <Col>
          <p className="selected-food-name">{this.state.selectedFoodName}</p>
         </Col>
        </Row>
        <Row className='w-80 m-auto'>
         <Col >
          <SmartTable width="w-100" tableData={nutritionFactUnits} tableHeaders={tableHeaders} />
         </Col>
         </Row>
         <Row className='w-80 m-auto align-bottom'>
           <Col>
             <Button onClick={this.backToFoodResults.bind(this)} className='btn btn-dark float-left'>Back to Food Results</Button>
             <Button className='btn btn-dark float-right' onClick={() => this.addToUsersFoodList(this.state.selectedFoodName, [...selectedFoodFacts])}>Add To Daily Food Intake</Button>
           </Col>
        </Row>
      </>
    )
  }

  showFoodList() {
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
      <>
              <Row className="pre-scrollable">
                <ul className="list-group">
                  {FoodList}
                </ul>
              </Row>
              
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
      </>
    );
  }
  
  render() {
    const FoodSearchForm = () => (
                <Row> 
                  <Col className='w-50 pt-4 pb-4'>
                      <Form className='text-center m-auto' inline onSubmit={(e)=> this.onSubmit(e)}>
                        <FormGroup>
                          <Input type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/> 
                          <Button>Search</Button>
                        </FormGroup>
                      </Form>
                    </Col>
                    <style jsx global>{`
                    .pre-scrollable {
                      min-height: 450px;
                    }`
            }</style>
                  </Row>

   )

    return (
      <Container fluid className="h-100">
          {FoodSearchForm()}
          {(`${this.props.foodList}`.length > 0) ? (this.state.showNutrientFacts  ? this.showNutrientFacts() : this.showFoodList()) : (      <h1 className="default-search-text">Start your search for your favorite foods</h1>)}
      </Container>
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
