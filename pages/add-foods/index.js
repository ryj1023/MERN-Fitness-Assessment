import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import FoodList from './components/FoodList'
import NutrientFacts from './components/NutrientFacts'
import FoodSearchForm from './components/FoodSearchForm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getFoodNutritionFacts } from '../../client/app/actions/async-actions'
import { updatedFoodChart, getDailyDietGoals } from '../../client/app/actions'
import { Container, Row, Col, CardBody, Card } from 'reactstrap'
import axios from 'axios'
import Link from 'next/link'
import get from 'lodash.get'
import moment from 'moment'

const getMacroQuantity = (foodFacts, macroId) => {
    const foundMacroData =
        foodFacts.find(food => food.nutrient_id === macroId) || {}
    const [measure] = foundMacroData.measures || [{ measure: { value: 'N/A' } }]
    return Number(measure.value)
}

const getMacroMeasure = (foodFacts, macroId) => {
    const foundMacroData =
        foodFacts.find(food => food.nutrient_id === macroId) || {}
    return foundMacroData.unit
}

const AddFoods = ({
    foodList,
    nutritionFacts,
    getDailyDietGoals,
    getFoodNutritionFacts,
}) => {
    const [state, setState] = useState({
        recipesModalOpen: false,
        foodTextInput: null,
        showNutrientFacts: false,
        servingSize: '',
        microNutrients: [],
        selectedFoodFacts: [],
        nutritionFactUnits: [],
        selectedFoodName: null,
        servingSize: '',
        userData: null,
        foodId: null,
        pageNumber: 0,
        selectedPage: 1,
        customMicroNutrients: [],
    })
    const {
        foodTextInput,
        recipesModalOpen,
        showNutrientFacts,
        servingSize,
        selectedFoodName,
        userData,
        foodId,
        selectedPage,
        pageNumber,
        customMicroNutrients,
        microNutrients,
        selectedFoodFacts,
    } = state

    // useEffect(() => {
    //     const userData = JSON.parse(localStorage.getItem('user'))
    //         ? JSON.parse(localStorage.getItem('user'))
    //         : null
    //     if (userData) {
    //         getDailyDietGoals(userData.dietInfo)
    //     }
    //     // if (selectedFoodFacts !== nutritionFacts) {
    //     //     setState(prevState => ({
    //     //         ...prevState,
    //     //         selectedFoodFacts: nutritionFacts,
    //     //     }))
    //     // }
    //     const selectedFoodFacts = []

    //     const microNutrients = []
    //     const nutritionFactUnits = nutritionFacts.reduce((acc, data) => {
    //         selectedFoodFacts.push(data)
    //         if (
    //             (data.name.includes('Energy') && data.unit === 'kcal') ||
    //             data.name.includes('Protein') ||
    //             data.name.includes('lipid') ||
    //             data.name.includes('Carbohydrate')
    //         ) {
    //             acc.push(`${data.measures[0].value}${data.unit}`)
    //         } else {
    //             microNutrients.push({
    //                 name: data.name,
    //                 value: `${data.measures[0].value}`,
    //                 unit: data.unit,
    //             })
    //         }
    //         return acc
    //     }, [])
    //     if (nutritionFacts[0]) {
    //         nutritionFactUnits.push(`${nutritionFacts[0].measures[0].qty}`)
    //     }

    //     setState(prevState => ({
    //         ...prevState,
    //         selectedFoodFacts,
    //         microNutrients,
    //         nutritionFactUnits,
    //         userData,
    //     }))
    // }, [nutritionFacts])

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
    const addSelectedFoodToFoodList = async (
        selectedFoodFacts,
        servingType
    ) => {
        const qty = get(nutritionFacts[0], 'measures[0].qty') || 1
        const servingSize = servingSize === '' ? qty : Number(servingSize)

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
                    measure: getMacroMeasure(selectedFoodFacts, '208'),
                },
                carbohydrates: {
                    qty: getMacroQuantity(selectedFoodFacts, '205'),
                    measure: getMacroMeasure(selectedFoodFacts, '205'),
                },
                protein: {
                    qty: getMacroQuantity(selectedFoodFacts, '203'),
                    measure: getMacroMeasure(selectedFoodFacts, '203'),
                },
                fats: {
                    qty: getMacroQuantity(selectedFoodFacts, '204'),
                    measure: getMacroMeasure(selectedFoodFacts, '204'),
                },
            },
        }

        const encodedURI = window.encodeURI(`/api/save-food-items`)
        const storedDietGoals =
            get(JSON.parse(localStorage.getItem('user')), 'dietGoals') || {}
        if (Object.keys(storedDietGoals).length === 0) {
            alert(
                'You must take the assessment before you can add food intake to your list.'
            )
        } else {
            try {
                const res = await axios
                    .post(encodedURI, {
                        selectedFoods,
                        email: userData.email,
                    })
                    .then(res => {
                        console.log('res', res)
                        //  this.props.getUserData(res.data.user.userDietSummary)
                        localStorage.setItem(
                            'user',
                            JSON.stringify(res.data.user)
                        )
                        if (res.status === 201) {
                            alert('Added to daily intake list!')
                        }
                    })
                    .catch(err => {
                        console.log('err', err)
                    })
            } catch (err) {
                console.log('err', err)
            }
        }
    }

    const backToFoodResults = () => {
        setState((...prevState) => ({
            ...prevState,
            showNutrientFacts: false,
            servingSize: '',
        }))
    }

    // const updateServingSize = servingSize => {
    //     const updatedSelectedFoodFacts = _.cloneDeep([...selectedFoodFacts])
    //     if (
    //         parseFloat(servingSize) ===
    //             parseFloat(nutritionFacts[0].measures[0].qty) ||
    //         servingSize === ''
    //     ) {
    //         setState(prevState => ({
    //             ...prevState,
    //             customFoodFacts: [],
    //             customMicroNutrients: [],
    //             customNutritionFactUnits: [],
    //             servingSize,
    //         }))
    //     }
    //     updatedSelectedFoodFacts.forEach(foodFact => {
    //         foodFact.measures[0].value = String(
    //             parseFloat(foodFact.measures[0].value) * servingSize
    //         )
    //         foodFact.measures[0].qty = parseFloat(servingSize)
    //     })
    //     const customMicroNutrients = microNutrients.map(micro => {
    //         return {
    //             ...micro,
    //             value: String(
    //                 parseFloat(micro.value) * parseFloat(servingSize)
    //             ),
    //         }
    //     })
    //     const customNutritionFactUnits = this.props.nutritionFacts.reduce(
    //         (acc, data) => {
    //             if (
    //                 (data.name.includes('Energy') && data.unit === 'kcal') ||
    //                 data.name.includes('Protein') ||
    //                 data.name.includes('lipid') ||
    //                 data.name.includes('Carbohydrate')
    //             ) {
    //                 acc.push(
    //                     `${parseFloat(data.measures[0].value) *
    //                         parseFloat(servingSize)}${data.unit}`
    //                 )
    //             }
    //             return acc
    //         },
    //         []
    //     )
    //     if (nutritionFacts[0]) {
    //         customNutritionFactUnits.push(
    //             `${nutritionFacts[0].measures[0].qty}`
    //         )
    //     }
    //     setState(prevState => ({
    //         ...prevState,
    //         customMicroNutrients,
    //         customNutritionFactUnits,
    //         customFoodFacts: updatedSelectedFoodFacts,
    //         servingSize,
    //     }))
    // }

    // const onSubmit = e => {
    //     e.preventDefault()
    //     setState(prevState => ({
    //         ...prevState,
    //         showNutrientFacts: false,
    //     }))
    //     getFoodSearchKeyword(foodTextInput)
    // }

    const showFoodNutrients = selectedFood => {
        getFoodNutritionFacts(selectedFood.foodID, foodTextInput)
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddFoods)
