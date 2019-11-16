import React, { Component } from 'react';
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFoodSearchKeyword, getFoodNutritionFacts } from '../../client/app/actions/async-actions';
import { updatedFoodChart, getDailyDietGoals } from '../../client/app/actions';
import SmartTable from '../../client/app/components/SmartTable';
import RecipesModal from '../../client/app/components/RecipesModal'
import { Container, Row, Col, Table, Form, FormGroup, Label, FormText, Input, Modal, ModalHeader, ModalBody, UncontrolledCollapse, Button, CardBody, Card, CardFooter, Collapse } from 'reactstrap';
import Pagination from 'rc-pagination';
import axios from 'axios';
import Link from 'next/link'
import get from 'lodash.get'
import moment from 'moment'

// TODO: turn dropdown into modal

const getMacroQuantity = (foodFacts, macroId) => {
  const foundMacroData = foodFacts.find(food => food.nutrient_id === macroId) || {}
  const [measure] = foundMacroData.measures || [{measure: { value: 'N/A' }}]
  return Number(measure.value)
}

const getMacroMeasure = (foodFacts, macroId) => {
  const foundMacroData = foodFacts.find(food => food.nutrient_id === macroId) || {}
  return foundMacroData.unit
}

class AddFoods extends Component {

  state = {
      foodTextInput: null,
      showNutrientFacts: false,
      selectedFoodName: null,
      userData: null,
      pageNumber: 1,
      selectedPage: 1,
      microutrientsModalOpen: false,
      recipesModalOpen: false,
      selectedFoodFacts: [],
      microNutrients: [],
      nutritionFactUnits: [],
      customFoodFacts: [],
      customMicroNutrients: [],
      customNutritionFactUnits: [],
      servingSize: '',
      foodId: null,
    }
  
  setInput(foodTextInput){
		this.setState({
      foodTextInput,
      counter: this.state.counter + 1,
    })
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
    this.setState({
      userData
    })
    if (userData) {
      this.props.getDailyDietGoals(userData.dietInfo)
    }
    
  }

  async onSubmit(e){
    e.preventDefault();
    this.setState({
      showNutrientFacts: false,
    })
    this.props.getFoodSearchKeyword(this.state.foodTextInput)

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.selectedFoodFacts !== nextProps.nutritionFacts) {
      return {
        selectedFoodFacts: nextProps.nutritionFacts
      }
    }
     return null
  }

  componentDidUpdate(prevProps, prevState) {
    const selectedFoodFacts = [];
    const nutritionFactUnits = [];
    const microNutrients = [];
    if (this.state.selectedFoodFacts !== prevState.selectedFoodFacts) {
      const nutritionFactUnits = this.props.nutritionFacts.reduce((acc, data) => {
        selectedFoodFacts.push(data);
        if ((data.name.includes('Energy') && data.unit === 'kcal') || data.name.includes('Protein') || data.name.includes('lipid') || data.name.includes('Carbohydrate')){
          acc.push(`${data.measures[0].value}${data.unit}`)
        } else {
          microNutrients.push({name: data.name, value: `${data.measures[0].value}`, unit: data.unit});
        }
        return acc;
      }, []);
      if (this.props.nutritionFacts[0]) {
        nutritionFactUnits.push(`${this.props.nutritionFacts[0].measures[0].qty}`)
      }
      this.setState({ selectedFoodFacts: this.state.selectedFoodFacts, microNutrients, nutritionFactUnits })
    }
  }

  showFoodNutrients(selectedFood) {
    this.props.getFoodNutritionFacts(selectedFood.foodID, this.state.foodTextInput);
    this.setState({
      showNutrientFacts: true,
      selectedFoodName: selectedFood.foodName,
      foodId: selectedFood.foodID
    })
  }

  backToFoodResults() {
    this.setState({
      showNutrientFacts: false,
      servingSize: '',
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

//   user: {
//     userName: String,
//     email: String,
//     password: String,
//     date: Date,
//     servingSize: {
//         qty: Number,
//         measure: String,
//     },
//     dietGoal: {
//         calories: Number,
//         protein: Number,
//         fat: Number,
//         carbs: Number,
//     },
//     selectedFoods: Array,
//     workouts: [String],
// }

  async addSelectedFoodToFoodList(selectedFoodFacts, servingType) {
    const { selectedFoodName, userData, foodId } = this.state;
    const qty = get(this.props.nutritionFacts[0], 'measures[0].qty') || 1
    const servingSize = this.state.servingSize === '' ? qty : Number(this.state.servingSize)

    const selectedFoods = {
      foodName: selectedFoodName,
      foodId,
      date: moment().format('YYYY/MM/DD'),
      servingSize: {
        qty: servingSize,
        type: servingType,
      },
      macroNutrients: {
        calories: {
          qty: getMacroQuantity(selectedFoodFacts, '208'),
          measure: getMacroMeasure(selectedFoodFacts, '208')
        },
        carbohydrates: {
          qty: getMacroQuantity(selectedFoodFacts, '205'),
          measure: getMacroMeasure(selectedFoodFacts, '205')
        },
        protein: {
          qty: getMacroQuantity(selectedFoodFacts, '203'),
          measure: getMacroMeasure(selectedFoodFacts, '203')
        },
        fats: {
          qty: getMacroQuantity(selectedFoodFacts, '204'),
          measure: getMacroMeasure(selectedFoodFacts, '204')
        },
      }
    }

    
   
   const encodedURI = window.encodeURI(`/api/save-food-items`);
   const storedDietGoals = get(JSON.parse(localStorage.getItem('user')), 'dietGoals') || {}
   if (Object.keys(storedDietGoals).length === 0) {
     alert('You must take the assessment before you can add food intake to your list.')
   } else {
       try {
       const res = await axios.post(encodedURI, {
        selectedFoods,
          email: userData.email
       }).then((res => {
         console.log('res', res)
         //  this.props.getUserData(res.data.user.userDietSummary)
       localStorage.setItem('user', JSON.stringify(res.data.user));
       if (res.status === 201) {
         alert('Added to daily intake list!')
       }
       }))
       .catch((err) => {
         console.log('err', err)
       })
      
   } catch (err) {
     console.log('err', err)
   }
   }

  }

 updateServingSize(servingSize) {
   const { selectedFoodFacts, microNutrients } = this.state;
   const updatedSelectedFoodFacts = _.cloneDeep([...selectedFoodFacts])
   if (parseFloat(servingSize) === parseFloat(this.props.nutritionFacts[0].measures[0].qty) || servingSize === '') {
     this.setState({
      customFoodFacts: [], customMicroNutrients: [], customNutritionFactUnits: [], servingSize
     })
   }
    updatedSelectedFoodFacts.forEach(foodFact => {
      foodFact.measures[0].value = String(parseFloat(foodFact.measures[0].value) * servingSize)
      foodFact.measures[0].qty = parseFloat(servingSize);
    })
    const customMicroNutrients = microNutrients.map(micro => {
      return { ...micro, value: String(parseFloat(micro.value) * parseFloat(servingSize)) }
    })
    const customNutritionFactUnits = this.props.nutritionFacts.reduce((acc, data) => {
      if ((data.name.includes('Energy') && data.unit === 'kcal') || data.name.includes('Protein') || data.name.includes('lipid') || data.name.includes('Carbohydrate')){
        acc.push(`${parseFloat(data.measures[0].value) * parseFloat(servingSize)}${data.unit}`)
      }
      return acc;
    }, []);
    if (this.props.nutritionFacts[0]) {
      customNutritionFactUnits.push(`${this.props.nutritionFacts[0].measures[0].qty}`)
    }
  this.setState({ customMicroNutrients, customNutritionFactUnits, customFoodFacts: updatedSelectedFoodFacts, servingSize })
 }

  showNutrientFacts() {
    const { micronutrientsModalOpen, customMicroNutrients, customFoodFacts, customNutritionFactUnits } = this.state
    const microNutrients = this.state.servingSize !== ''  ? customMicroNutrients : this.state.microNutrients
    const selectedFoodFacts = this.state.servingSize !== ''  ? customFoodFacts : this.state.selectedFoodFacts
    const nutritionFactUnits = this.state.servingSize !== '' ? customNutritionFactUnits : this.state.nutritionFactUnits
    const servingType = this.props.nutritionFacts[0] && this.props.nutritionFacts[0].measures[0].label ? this.props.nutritionFacts[0].measures[0].label : null
    console.log('this.state.nutritionFactUnits', this.state.nutritionFactUnits)
    console.log('selectedFoodFacts', selectedFoodFacts)
    return (
      <>
         <Col className='m-auto' xs='12' lg='10'>
         <Card>
           <CardBody>
             <h5>Macronutrients</h5>
            <SmartTable updateServingSize={(servingSize) => this.updateServingSize(servingSize)} 
              responsive={false} 
              id={'food-search'} 
              width="100%" 
              title={this.state.selectedFoodName} 
              titleHeader={true} 
              servingType={servingType} 
              tableData={nutritionFactUnits} 
              tableHeaders={['Calories', 'Protein (grams)', 'Fat (grams)', 'Carbs (grams)', 'Serving Size']} />
            <div className='d-flex justify-content-sm-start d-flex justify-content-between'>
              <Button onClick={this.backToFoodResults.bind(this)} className='btn btn-dark btn-sm ml-0 mr-1 mt-1 mb-1'>Back</Button>
              <Button className='btn btn-sm btn-dark m-1' onClick={async () => await this.addSelectedFoodToFoodList(selectedFoodFacts, servingType)}>Add to food intake</Button>
              <Button className='btn btn-sm btn-dark m-1' onClick={() => this.setState({ micronutrientsModalOpen: !micronutrientsModalOpen })}>Show micronutrients</Button>
            </div>
           </CardBody>
         </Card>
            <div className='text-center'>
                <Modal isOpen={micronutrientsModalOpen} toggle={() => this.setState({ micronutrientsModalOpen: !micronutrientsModalOpen })}>
                  <ModalHeader toggle={() => this.setState({ micronutrientsModalOpen: !micronutrientsModalOpen })}>Micronutrients</ModalHeader>
                  <ModalBody>
                    <Table className="w-100 themed-table " style={{ overflow: 'scroll' }} dark>
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
                              <td>{record.value}{record.unit}</td>
                            </tr>
                          )
                        })}
                        </tbody>
                    </Table>
                  </ModalBody>                 
                </Modal>
                <style jsx='true'>{`
                  thead, tbody :global(tr:nth-child(2n + 1))  {
                      background: #454545;
                    }
                  tr:nth-child(2n) {
                      background: #bfbdbd;
                      color: black;
                    }
                    `}</style>
              </div>
           </Col>
      </>
    )
  }

  defaultLayout() {
    return <Col sm='12' lg='10' className='m-auto'>
        <Card className='m-auto'>
        <CardBody>
          <h1 className='pt-2 pl-2 pr-2'>Find your favorite foods!</h1>
          <p className='p-2'>Search for specific foods by name or UPC code to get all the necessary nutrition information you need to reach your goals.</p>
        </CardBody>
      </Card>
    </Col>

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
      const { selectedPage, pageNumber } = this.state;
      const { foodList } = this.props
      const activeColorBackground = selectedPage === current ? '#E8E7E7' : '#6c757d'
      const activeColor = selectedPage === current ? '#6c757d' : 'white'
      switch (type) {
        case 'page':  {
          return <Button color='primary' className="mx-1 pagination-btn" /*style={{backgroundColor: activeColorBackground, color: activeColor }}*/ key={current} name={current} onClick={()=> this.setState({
            selectedPage: getSelectedPage(current, undefined)
          })}>{current}</Button>
        }
        case 'prev': {
          return <Button color='primary' className="pagination-btn" key={current} disabled={pageNumber === 1} name={current} onClick={()=> this.setState({
            selectedPage: getSelectedPage('prev', undefined)
          })}>Prev</Button>
        }
        case 'next': {
          return <Button color='primary' className="pagination-btn ml-1" key={current} disabled={(foodList.length - (pageNumber * 10)) < 10} name={current} onClick={()=> this.setState({
            selectedPage: getSelectedPage('next-page', 'next')
          })}>Next</Button>
        }
        case 'jump-prev': {
          return <Button color='primary' className="pagination-btn mx-1" key={current} name={current}>...</Button>
        }
        case 'jump-next': {
          return <Button color='primary' className="pagination-btn mx-1" key={current} name={current}>...</Button>
        }
        default:
        return element;
      }
    }
    const FoodList = this.props.foodList.reduce((acc, food, index) => {
      const { selectedPage } = this.state;
      const pageRange = selectedPage === 1 ? 1 : selectedPage * 10 - 9;
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
          <Col sm='12' lg='10' className='m-auto'>
               <ul className="h-100 w-100 p-0">
                {FoodList}
              </ul> 
          </Col>       
           <Col sm='12' lg='10' className='m-auto'>
                {this.props.foodList.length > 10 ?
                  <Pagination
                    showLessItems
                    defaultPageSize={10}
                    pageSize={10}
                    total={this.props.foodList.length}
                    itemRender={itemRender}
                    className='mt-3 p-0'
                    onChange={(page) => this.setState({ selectedPage: page})}
                    current={this.state.selectedPage}
                  /> : (null)
                }
         </Col>
      </>
    );
  }
  
  render() {
    const { foodList } = this.props
    const { recipesModalOpen, foodTextInput } = this.state;
    const FoodSearchForm = () => (
                  <Col sm='12' lg='10' className='pt-4 d-block mx-auto d-sm-flex justify-content-between mb-2'>
                     <div className='mb-2 mb-md-0 d-flex align-items-center'>
                        <Link href='/my-goals'><a className='text-decoration-none btn btn-link pl-0'>My Goals</a></Link>
                        {foodTextInput && foodList.length > 0 && <button onClick={() => this.setState({ recipesModalOpen: true })} className='btn btn-link text-decoration-none'>See Recipes</button>}
                     </div>
                     <Form className='text-center d-block' inline onSubmit={(e)=> this.onSubmit(e)}>
                        <div className='d-flex justify-content-between'>
                           <div className='d-flex'>
                              <Input type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/> 
                              <button className='btn ml-1 btn btn-primary' href='#search' onClick={(e)=> this.onSubmit(e)}>Search</button>
                           </div>                         
                        </div>
                     </Form>
                </Col>
   )

    return (
      <div>
        <div className="container-fluid food-search-container">
          <Row>
          {FoodSearchForm()}
            {(`${this.props.foodList}`.length > 0) ? (this.state.showNutrientFacts  ? this.showNutrientFacts() : this.showFoodList()) : (this.defaultLayout())}
          </Row>
      <RecipesModal foodTextInput={foodTextInput} recipesModalOpen={recipesModalOpen} onClose={() => this.setState({ recipesModalOpen: false })}/>
        </div>
        <style jsx='true'>{`
          .themed-table {
            margin: auto;
          }
          th, tbody :global(tr:nth-child(2n))  {
              background: #454545;
            }
          .themed-table :global(tr:nth-child(2n + 1)) {
              background: #bfbdbd;
              color: black;
            }
          th {
              color: white;
          }
          .food-search-container {
            margin: 10px 0;
          }
          .default-layout-container {
            background: white;
            border: 1px solid black;
            border-radius: 6px;
          }
     
          .btn:disabled  {
            background: #454545 !important; 
          }
          div :global(.rc-pagination-disabled > button) {
            opacity: .65;
            background: #454545 !important; 
          }
          div :global(.rc-pagination-next, .rc-pagination-prev, .rc-pagination-jump-prev, .rc-pagination-jump-next, .rc-pagination-disabled, .rc-pagination-item) {
            display: inline-block;
            border-radius: 4px
          }
          div :global(.rc-pagination-item-active > button) {
            color: white !important;
            background: #5a6268 !important;
          }
          div :global(.list-group-item:hover) {
            background: #f5f5f5;
            cursor: pointer;
          }
        
          .pre-scrollable {
            min-height: 75%;
            width: 80%;
            margin: auto;
          }
          .default-layout-container p {
            color: black;
          }
          .micronutrient-collapse-container {
            height: 45%;
          }
          .close {
            background: #fff !important;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		clientDietInfo: state.clientInfo,
		foodList: state.foodList,
      nutritionFacts: state.nutritionFacts,
      dailyDietGoals: state.dailyDietGoals,
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ getFoodSearchKeyword, getFoodNutritionFacts, updatedFoodChart, getDailyDietGoals }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddFoods)