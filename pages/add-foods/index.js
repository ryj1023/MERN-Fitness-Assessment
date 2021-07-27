import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import FoodList from './components/FoodList'
import NutrientFacts from './components/NutrientFacts'
import FoodSearchForm from './components/FoodSearchForm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { getFoodNutritionFacts } from '../../client/app/actions/async-actions'
import {
    updatedFoodChart,
    getDailyDietGoals,
    getFoodNutritionFacts,
} from '../../client/app/actions'
import { Container, Row, Col, CardBody, Card } from 'reactstrap'
import axios from 'axios'
import Link from 'next/link'
import get from 'lodash.get'
import moment from 'moment'

const AddFoods = ({ foodList, nutritionFacts, getFoodNutritionFacts }) => {
    const [state, setState] = useState({
        foodTextInput: null,
        showNutrientFacts: false,
        selectedFoodName: null,
        foodId: null,
        pageNumber: 0,
        selectedPage: 1,
    })
    const {
        foodTextInput,
        showNutrientFacts,
        selectedFoodName,
        foodId,
        selectedPage,
        pageNumber,
    } = state

    const DefaultLayout = () => {
        return (
            <Col sm="12" lg="10" className="m-auto">
                <Card className="m-auto">
                    <CardBody>
                        <h1 className="pt-2 pl-2 pr-2">
                            Find your favorite foods!
                        </h1>
                        <p className="p-2">
                            Search for specific foods by name or UPC code to get
                            all the necessary nutrition information you need to
                            reach your goals.
                        </p>
                    </CardBody>
                </Card>
            </Col>
        )
    }

    const backToFoodResults = () => {
        setState((...prevState) => ({
            ...prevState,
            showNutrientFacts: false,
            servingSize: '',
        }))
    }

    const showFoodNutrients = selectedFood => {
        // getFoodNutritionFacts(selectedFood.foodID, foodTextInput)
        getFoodNutritionFacts(selectedFood?.foodNutrients)
        setState(prevState => ({
            ...prevState,
            showNutrientFacts: true,
            selectedFoodName: selectedFood.foodName,
            foodId: selectedFood.foodID,
        }))
    }

    return (
        <div>
            <div className="container-fluid food-search-container">
                <Row>
                    <Col
                        sm="12"
                        lg="10"
                        className="pt-4 d-block mx-auto d-sm-flex justify-content-between mb-2"
                    >
                        <FoodSearchForm />
                    </Col>
                    {`${foodList}`.length > 0 ? (
                        showNutrientFacts ? (
                            <Col className="m-auto" xs="12" lg="10">
                                <NutrientFacts
                                    // {...state}
                                    selectedFoodName={selectedFoodName}
                                    foodId={foodId}
                                    nutritionFacts={nutritionFacts}
                                    backToFoodResults={() =>
                                        backToFoodResults()
                                    }
                                />
                            </Col>
                        ) : (
                            <FoodList
                                foodList={foodList}
                                selectedPage={selectedPage}
                                pageNumber={pageNumber}
                                showFoodNutrients={data => {
                                    showFoodNutrients(data)
                                }}
                            />
                        )
                    ) : (
                        DefaultLayout()
                    )}
                </Row>
            </div>
            <style jsx="true">{`
                .themed-table {
                    margin: auto;
                }
                th,
                tbody :global(tr:nth-child(2n)) {
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

                .btn:disabled {
                    background: #454545 !important;
                }
                div :global(.rc-pagination-disabled > button) {
                    opacity: 0.65;
                    background: #454545 !important;
                }
                div
                    :global(.rc-pagination-next, .rc-pagination-prev, .rc-pagination-jump-prev, .rc-pagination-jump-next, .rc-pagination-disabled, .rc-pagination-item) {
                    display: inline-block;
                    border-radius: 4px;
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
    )
}

const mapStateToProps = state => {
    return {
        clientDietInfo: state.clientInfo,
        foodList: state.foodList,
        nutritionFacts: state.nutritionFacts,
        dailyDietGoals: state.dailyDietGoals,
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getFoodNutritionFacts,
            updatedFoodChart,
            getDailyDietGoals,
        },
        dispatch
    )
export default connect(mapStateToProps, mapDispatchToProps)(AddFoods)
