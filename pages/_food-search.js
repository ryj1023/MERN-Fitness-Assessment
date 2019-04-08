import React, { Component, useState } from 'react';
import _ from 'lodash'
import ReactDOM from "react-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import './FoodSearch.css';
import { getFoodSearchKeyword, getFoodNutritionFacts, getUserData } from '../client/app/actions/async-actions';
import { updatedFoodChart } from '../client/app/actions';
import SmartTable from '../client/app/components/SmartTable';
import App from '../client/app/components/app/App';
import { Container, Row, Col, Table, Form, FormGroup, Label, FormText, Input, Modal, ModalHeader, ModalBody, UncontrolledCollapse, Button, CardBody, Card, CardFooter, Collapse } from 'reactstrap';
// import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
import { IoIosArrowDropup, IoIosArrowDropdown  } from 'react-icons/io';
import Router from 'next/router'
import axios from 'axios'


const showNutrientFacts = (props, modalOptions, customMicroNutrientOptions, customFoodFactOptions, customNutritionalFactUnitOptions, selectedFoodFactOptions, microNutrientOptions, nutritionFactUnitOptions, servingSizeOptions, selectedFoodNameOptions, userDataOptions, showNutrientFactsOptions) => {
   const { servingSize } = servingSizeOptions;
   const [ modalOpen, setModalOpen ] = modalOptions
   const [customMicroNutrients] = customMicroNutrientOptions;
   const [microNutrients] = microNutrientOptions;
   const [customFoodFacts] = customFoodFactOptions;
   const [selectedFoodFacts] = selectedFoodFactOptions;
   const [customNutritionFactUnits] = customNutritionalFactUnitOptions;
   const [nutritionFactUnits] = nutritionFactUnitOptions;
   const [selectedFoodName] = selectedFoodNameOptions;
   const updatedMicroNutrients = servingSize !== ''  ? customMicroNutrients : microNutrients
   const updatedSelectedFoodFacts = servingSize !== ''  ? customFoodFacts : selectedFoodFacts
   const updatedNutritionFactUnits = servingSize !== '' ? customNutritionFactUnits : nutritionFactUnits
   const [userData] = userDataOptions;
   const [setShowNutrientFacts] = showNutrientFactsOptions;
    return (
      <>
        <Row className=''> 
         <Col className='m-auto' xs='12' lg='10'>
         <Card>
           <CardBody>
             <h5>Macronutrients</h5>
            <SmartTable 
               // updateServingSize={(servingSize) => this.updateServingSize(servingSize)} 
              responsive={false} 
              id={'food-search'} 
              width="100%" 
              title={selectedFoodName} 
              titleHeader={true} 
              servingType={props.nutritionFacts[0] && props.nutritionFacts[0].measures[0].label ? props.nutritionFacts[0].measures[0].label : null} 
              tableData={updatedNutritionFactUnits} 
              tableHeaders={['Calories', 'Protein (grams)', 'Fat (grams)', 'Carbs (grams)', 'Serving Size']} />
            <div>
              <Button onClick={() => {
                 setShowNutrientFacts(false)
                 setServingSize('')
              }} className='btn btn-dark ml-0 mr-1 mt-1 mb-1'>Back</Button>
              {/* <Button className='btn btn-dark m-1' onClick={async () => await addSelectedFoodToFoodList(selectedFoodName, updatedSelectedFoodFacts, userData)}>Add To Food Intake</Button> */}
              <Button className='btn btn-dark m-1' onClick={() => setModalOpen(!modalOpen)}>Show Micronutrients</Button>
            </div>
           </CardBody>
         </Card>
            <div className='text-center'>
                <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                  <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Micronutrients</ModalHeader>
                  <ModalBody>
                    <Table className="w-100 themed-table " style={{ overflow: 'scroll' }} dark>
                      <thead></thead>
                      <tbody>
                        <tr>
                          <th>Micronutrient</th>
                          <th>Value</th>
                        </tr>
                        {updatedMicroNutrients.map((record, index) => {
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
         </Row>     
      </>
    )
}

const showFoodList = (props, modalOptions, customMicroNutrients, customFoodFacts, customNutritionalFactUnits, selectedFoodFacts, microNutrients, nutritionFactUnits, servingSize, selectedFoodName, userData, showNutrientFacts) => {
   if (props.showNutrientFacts) {
         return showNutrientFacts(props, modalOptions, customMicroNutrients, customFoodFacts, customNutritionalFactUnits, selectedFoodFacts, microNutrients, nutritionFactUnits, servingSize, selectedFoodName, userData, showNutrientFacts)
   } else {
      return
   }
}

const FoodSearch = (props) => {
   // const { modalOpen, customMicroNutrients, customFoodFacts, customNutritionFactUnits } = this.state
   const [modalOpen, setModalOpen] = useState(false)
   const [customMicroNutrients, setCustomMicroNutrients] = useState([])
   const [customFoodFacts, setCustomFoodFacts] = useState([])
   const [customNutritionFactUnits, setCustomNutritionFactUnits] = useState([])
   const [selectedFoodFacts, setSelectedFoodFacts] = useState([])
   const [microNutrients, setMicroNutrients] = useState([])
   const [servingSize, setServingSize] = useState('')
   const [nutritionFactUnits, setNutritionFactUnits] = useState([])
   const [selectedFoodName, setSelectedFoodName] = useState(null)
   const [userData, setUserData] = useState(null)
   const [showNutrientFacts, setShowNutrientFacts] = useState(false)
   return (
      <>
         <Container fluid  className="food-search-container" /* style={{ height: '20vh'}} className="h-90"*/>
            <Row id='search'> 
                  <Col className='w-80 pt-4 pb-4'>
                      <Form className='text-center m-auto' inline onSubmit={(e)=> this.onSubmit(e)}>
                        <FormGroup className='m-auto'>
                          <Input type="text" onChange={(e)=>this.setInput(e.target.value)} placeholder="please enter food item"/> 
                          <a className='btn ml-1' href='#search' onClick={(e)=> this.onSubmit(e)}>Search</a>
                        </FormGroup>
                      </Form>
                    </Col>
               </Row>
               {
                  (props.foodList || {}).length > 0 ? 
                     showFoodList(
                        props, 
                        [modalOpen, setModalOpen], 
                        [customMicroNutrients, setCustomMicroNutrients], 
                        [customFoodFacts, setCustomFoodFacts], 
                        [customNutritionFactUnits, setCustomNutritionFactUnits],
                        [selectedFoodFacts, setSelectedFoodFacts],
                        [microNutrients, setMicroNutrients],
                        [nutritionFactUnits, setNutritionFactUnits],
                        [servingSize, setServingSize],
                        [selectedFoodName, setSelectedFoodName],
                        [userData, setUserData],
                        [showNutrientFacts, setShowNutrientFacts]
                     )
                     :
                     <Card className='w-75 m-auto'>
                        <CardBody>
                        <h1 className='pt-2 pl-2 pr-2'>Find your favorite foods!</h1>
                        <p className='p-2'>Search for specific foods by name or UPC code to get all the necessary nutrition information you need to reach your goals.</p>
                        </CardBody>
                     </Card>
               }
            {/* {(`${this.props.foodList}`.length > 0) ? (this.state.showNutrientFacts  ? this.showNutrientFacts() : this.showFoodList()) : (this.defaultLayout())} */}
        </Container>
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
          button {
            background: #454545 !important; 
          }
          .btn:disabled  {
            background: #454545 !important; 
          }
          .rc-pagination-disabled {
            opacity: .65;
            background: #454545 !important; 
          }
          .rc-pagination-next, .rc-pagination-prev, .rc-pagination-jump-prev, .rc-pagination-jump-next, .rc-pagination-disabled, .rc-pagination-item {
            display: inline-block;
            margin: 1px;
            border-radius: 4px
          }
          .list-group-item:hover {
            background: #ccc;
            cursor: pointer;
          }
          .btn {
            background: #454545;
            color: white;
          }
          .btn-dark:hover {
            color: white;
            background: #23272b !important;
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
      </>
   )
}
const mapStateToProps = (state) => {
	return {
		clientDietInfo: state.clientInfo,
		foodList: state.foodList,
    nutritionFacts: state.nutritionFacts,
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({ getFoodSearchKeyword, getFoodNutritionFacts, updatedFoodChart, getUserData }, dispatch);
export default App(connect(mapStateToProps, mapDispatchToProps)(FoodSearch))