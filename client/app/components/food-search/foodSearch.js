import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './FoodSearch.css';
import { getFoodSearchKeyword, getFoodNutritionFacts, getUserData } from '../../actions/async-actions';
import { updatedFoodChart } from '../../actions';
import SmartTable from '../SmartTable';
import { Container, Row, Col, Table, Form, FormGroup, Label, FormText, Input, UncontrolledCollapse, Button, CardBody, Card, Collapse } from 'reactstrap';
// import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
import { IoIosArrowDropup, IoIosArrowDropdown  } from 'react-icons/io';

class DietSearchContainer extends Component {

  state = {
      foodTextInput: null,
      showNutrientFacts: false,
      selectedFoodName: null,
      userData: null,
      pageNumber: 1,
      selectedPage: 1,
      updatedUserData: null,
      selectedFood: {},
      currentPage: 1,
      collapse: false,
    }
  
  

  
  
  setInput(foodTextInput){
		this.setState({
      foodTextInput,
      counter: this.state.counter + 1,
    })
  }

  componentDidMount() {
    this.setState({
      userData: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null,
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
    console.log('selectedPage', this.state.selectedPage)
    this.setState({
      selectedPage: this.getSelectedPage(e.target.name, e.target.id)
    })
  }

  setStateForSelectedFoodFacts(selectedFoodFacts) {
    this.setState({
      selectedFoodFacts, 
    })
  }

  showNutrientFacts() {
    const selectedFoodFacts = [];
    const microNutrients = [];
    const nutritionFactUnits = this.props.nutritionFacts.reduce((acc, data) => {
      selectedFoodFacts.push(data);
      if ((data.name.includes('Energy') && data.unit === 'kcal') || data.name.includes('Protein') || data.name.includes('lipid') || data.name.includes('Carbohydrate')){
       acc.push(`${data.value}${data.unit}`)
      } else {
        microNutrients.push({name: data.name, value: `${data.value}${data.unit}`});
      }
      return acc;
    }, []);
    return (
      <>
        <Row className='w-80 m-auto'>
         <Col >
          <SmartTable width="w-100" title={this.state.selectedFoodName} titleHeader={true} tableData={nutritionFactUnits} tableHeaders={['Calories', 'Protein (grams)', 'Fat (grams)', 'Carbs (grams)']} />
         </Col>
         </Row>
         <Row className="m-auto" style={{ width: '95%', maxHeight: '300px'}}>
          <Col className="micronutrient-collapse-container w-50">
              <Card className="h-100 mb-3">
                <CardBody className="h-100 m-auto p-0">
                  <a color="primary" onClick={() => this.setState({ collapse: !this.state.collapse })} id="toggler" style={{ marginBottom: '1rem' }}>
                    { this.state.collapse ? <IoIosArrowDropup className="mb-1"/> : <IoIosArrowDropdown className="mb-1"/> }
                    Micronutrients
                  </a>
                    <Collapse isOpen={this.state.collapse} className="row m-auto" style={{ height: '90%', width: '80%'}} ref={this.dropdownRef} toggler="#toggler">
                      <Table className="w-100" style={{ display: 'inline-block', overflow: 'scroll' }} dark>
                      <thead></thead>
                      <tbody>
                        <tr>
                          <th>Micronutrient</th>
                          <th>Value</th>
                        </tr>
                        {microNutrients.map((record, index) => {
                          return (
                            <tr key={index}>
                              <td>{record.name}</td>
                              <td>{record.value}</td>
                            </tr>
                          )
                        })}
                        </tbody>
                      </Table>
                      {/* <SmartTable width="w-100"  tableData={microNutrients.map(record => record.value)} tableHeaders={microNutrients.map(record => record.name)} /> */}
                    </Collapse>
                </CardBody>
              </Card>
            </Col>
            <style jsx>{`
              .micronutrient-collapse-container {
                height: 45%;
              }
            `}</style>
            <Col>
             <Button onClick={this.backToFoodResults.bind(this)} className='btn btn-sm btn-dark m-2'>Back</Button>
             {/* <Button className='btn btn-dark float-right' onClick={() => this.addToUsersFoodList(this.state.selectedFoodName, [...selectedFoodFacts])}>Add To Daily Food Intake</Button> */}
             <Button className='btn btn-sm btn-dark m-2' onClick={async () => await this.props.addSelectedFoodToFoodList(this.state.selectedFoodName, selectedFoodFacts, this.state.userData)}>Add To Food Intake</Button>
           </Col>
         </Row>     
         <Row className='w-80 m-auto align-bottom'>
           
        </Row>
      </>
    )
  }
  showFoodList() {
    const getSelectedPage = (targetName, id) => {
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

    const itemRender = (current, type, element) => {
      const activeColorBackground = this.state.selectedPage === current ? '#E8E7E7' : '#6c757d'
      const activeColor = this.state.selectedPage === current ? '#6c757d' : 'white'
      switch (type) {
        case 'page':  {
          return <Button style={{backgroundColor: activeColorBackground, color: activeColor }} key={current} name={current} onClick={()=> this.setState({
            selectedPage: getSelectedPage(current, undefined)
          })}>{current}</Button>
        }
        case 'prev': {
          return <Button key={current} disabled={this.state.pageNumber === 1} name={current} onClick={()=> this.setState({
            selectedPage: getSelectedPage('prev', undefined)
          })}>{'Prev'}</Button>
        }
        case 'next': {
          return <Button key={current} disabled={(this.props.foodList.length - (this.state.pageNumber * 10)) < 10} name={current} onClick={()=> this.setState({
            selectedPage: getSelectedPage('next-page', 'next')
          })}>{'Next'}</Button>
        }
        case 'jump-prev': {
          return <Button key={current} name={current}>{'...'}</Button>
        }
        case 'jump-next': {
          return <Button key={current} name={current}>{'...'}</Button>
        }
        default:
        return element;
      }
    }
    const FoodList = this.props.foodList.reduce((acc, food, index) => {
      const pageRange = this.state.selectedPage === 1 ? 1 : this.state.selectedPage * 10 - 9;
      let foodName = food.foodName.toUpperCase();
      if (foodName.includes('UPC')) {
        foodName = foodName.slice(0, foodName.indexOf(', UPC'))
      } else if (foodName.includes('GTIN')) {
        foodName = foodName.slice(0, foodName.indexOf(', GTIN'))
      }
      const { foodID, manufacturer } = food;
      if (index + 1 >= pageRange && acc.length < 10) {
        acc.push(<li className="list-group-item" key={index} id={foodID} onClick={this.showFoodNutrients.bind(this, {foodID, foodName})}><b>{foodName}</b>
        <br />
        {manufacturer === 'none' ? 'manufacturer unavailable' : manufacturer}
        </li>);
      }
      return acc;
      }, []);
    return (
      <>
          <Row className="pre-scrollable">
              <ul className="h-100 w-100">
                {FoodList}
              </ul>            
          </Row>
           <Row className='m-auto'>
           <div className='m-auto w-100' style={{display: 'inherit'}}>
              <div className='m-auto'>
                {this.props.foodList.length > 10 ?
                  <Pagination
                  defaultPageSize={10}
                  pageSize={10}
                  total={this.props.foodList.length}
                  itemRender={itemRender}
                  className='mt-3'
                  onChange={(page) => this.setState({ selectedPage: page})}
                  current={this.state.selectedPage}
                /> : (null)
                }
                  <style jsx>{`
                    :global(.list-group-item) {
                      cursor: pointer !important;
                      font-size: 0.9rem;
                    }
                    div :global(.m-auto) {
                      width: 80%
                    }
                    :global(.rc-pagination) {
                      width:100%;
                      list-style: none;
                      padding:0;
                    }
                    :global(.rc-pagination-item) {
                      display: inline;
                      margin: 1px;
                    }
                    div :global(.rc-pagination-next, .rc-pagination-prev, .rc-pagination-jump-prev, .rc-pagination-jump-next) {
                      display: inline;
                      margin: 1px;
                    }
                    div :global(.rc-pagination-prev a:after, .rc-pagination-next a:after {
                      margin-top: 0px;
                    }
                    div :global(.rc-pagination-prev) {
                      display: none;
                    }
                      )
                  `}</style>
                  </div>
                </div>
           </Row> 
      </>
    );
  }
  
  render() {
    const FoodSearchForm = () => (
                <Row> 
                  <Col className='w-80 pt-4 pb-4'>
                      <Form className='text-center m-auto' inline onSubmit={(e)=> this.onSubmit(e)}>
                        <FormGroup className='m-auto'>
                          <Input type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/> 
                          <Button>Search</Button>
                        </FormGroup>
                      </Form>
                    </Col>
                    <style jsx global>{`
                    .pre-scrollable {
                      min-height: 75%;
                      width: 80%;
                      margin: auto;
                    }`
            }</style>
                  </Row>

   )

    return (
      <Container fluid style={{ height: '20vh'}}/*className="h-90"*/>
          {FoodSearchForm()}
          {(`${this.props.foodList}`.length > 0) ? (this.state.showNutrientFacts  ? this.showNutrientFacts() : this.showFoodList()) : (<h1 className="default-search-text">Start your search for your favorite foods</h1>)}
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

const mapDispatchToProps = dispatch => bindActionCreators({ getFoodSearchKeyword, getFoodNutritionFacts, updatedFoodChart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DietSearchContainer)
