import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
// import SmartTable from '../../../client/app/components/SmartTable'
import {
    getDailyDietGoals,
    updateNutritionFactsByServing,
} from '../../../client/app/actions'
import useInitialState from '../../../client/app/customHooks/useInitialState'

import {
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    CardBody,
    Card,
} from 'reactstrap'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import get from 'lodash/get'
import moment from 'moment'
import NutrientFactsTable from './NutrientFactsTable'

const getMacroQuantity = (foodFacts, macroId) => {
    const foundMacroData =
        foodFacts.find(food => food.nutrientNumber === macroId) || {}

    // const [measure] = foundMacroData.value || [{ measure: { value: 'N/A' } }]
    return foundMacroData ? Number(foundMacroData.value) : 'N/A'
}

const getMacroMeasure = (foodFacts, macroId) => {
    const foundMacroData =
        foodFacts.find(food => food.nutrientNumber === macroId) || {}
    return foundMacroData.unitName.toLowerCase()
}

const NutrientFacts = ({
    nutritionFacts,
    selectedFoodName,
    backToFoodResults,
    foodId,
    updateNutritionFactsByServing,
    getDailyDietGoals,
}) => {
    const [modalIsOpen, setModalIsOpen] = useState(null)
    const [selectedFoodFacts, setSelectedFoodFacts] = useState([])

    const [userData, setUserData] = useState(null)
    const [servingSize, setServingSize] = useState('')
    const [customMicroNutrients, setCustomMicroNutrients] = useState([])
    const [customFoodFacts, setCustomFoodFacts] = useState([])
    const [customNutritionFactUnits, setCustomNutritionFactUnits] = useState([])
    const [initialState] = useInitialState(nutritionFacts)

    const addSelectedFoodToFoodList = async () => {
        const selectedFoods = {
            foodName: selectedFoodName,
            foodId,
            date: moment().format('YYYY/MM/DD'),
            // servingSize: {
            //     qty: _servingSize,
            //     type: servingType,
            // },
            macroNutrients: {
                calories: {
                    qty: getMacroQuantity(nutritionFacts, '208'),
                    measure: getMacroMeasure(nutritionFacts, '208'),
                },
                carbohydrates: {
                    qty: getMacroQuantity(nutritionFacts, '205'),
                    measure: getMacroMeasure(nutritionFacts, '205'),
                },
                protein: {
                    qty: getMacroQuantity(nutritionFacts, '203'),
                    measure: getMacroMeasure(nutritionFacts, '203'),
                },
                fats: {
                    qty: getMacroQuantity(nutritionFacts, '204'),
                    measure: getMacroMeasure(nutritionFacts, '204'),
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
                const res = await axios.post(encodedURI, {
                    selectedFoods,
                    email: userData.email,
                })
                if (res) {
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    if (res.status === 201) {
                        alert('Added to daily intake list!')
                    }
                }
            } catch (err) {
                console.log('err', err)
            }
        }
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
            ? JSON.parse(localStorage.getItem('user'))
            : null
        if (userData) {
            getDailyDietGoals(userData.dietInfo)
        }

        setUserData(userData)
    }, [nutritionFacts])

    const microNutrients = []

    const nutritionFactUnits = nutritionFacts.reduce((acc, data) => {
        if (data.nutrientName.includes('Energy')) {
            acc['calories'] = {
                qty: data.value,
                measure: data.unitName,
            }
        } else if (data.nutrientName.includes('Protein')) {
            acc['protein'] = {
                qty: data.value,
                measure: data.unitName,
            }
        } else if (data.nutrientName.includes('lipid')) {
            acc['fats'] = {
                qty: data.value,
                measure: data.unitName,
            }
        } else if (data.nutrientName.includes('Carbohydrate')) {
            acc['carbohydrates'] = {
                qty: data.value,
                measure: data.unitName,
            }
        } else {
            microNutrients.push({
                name: data.nutrientName,
                value: `${data.value}`,
                unit: data.unitName,
            })
        }
        return acc
    }, {})

    return (
        <>
            <Card>
                <CardBody>
                    <h5>Macronutrients</h5>
                    <NutrientFactsTable
                        width="100%"
                        id="food-search"
                        tableData={nutritionFactUnits}
                        responsive={false}
                        title={selectedFoodName}
                        updateServingSize={servingSize => {
                            // updateServingSize(servingSize)
                            updateNutritionFactsByServing(
                                nutritionFacts,
                                servingSize,
                                initialState
                            )
                        }}
                    />

                    {/* <SmartTable
                        // updateServingSize={servingSize =>
                        //     updateServingSize(servingSize)
                        // }
                        responsive={false}
                        id={'food-search'}
                        width="100%"
                        title={selectedFoodName}
                        titleHeader={true}
                        // servingType={servingType}
                        tableData={_nutritionFactUnits}
                        tableHeaders={[
                            'Calories',
                            'Protein (grams)',
                            'Fat (grams)',
                            'Carbs (grams)',
                            // 'Serving Size',
                        ]}
                    /> */}
                    <div className="d-flex justify-content-sm-start d-flex justify-content-between">
                        <Button
                            onClick={() => backToFoodResults()}
                            className="btn btn-dark btn-sm ml-0 mr-1 mt-1 mb-1"
                        >
                            Back
                        </Button>
                        <Button
                            className="btn btn-sm btn-dark m-1"
                            onClick={async () =>
                                await addSelectedFoodToFoodList()
                            }
                        >
                            Add to food intake
                        </Button>
                        <Button
                            className="btn btn-sm btn-dark m-1"
                            onClick={() => setModalIsOpen(modalIsOpen => true)}
                        >
                            Show micronutrients
                        </Button>
                    </div>
                </CardBody>
            </Card>
            <div className="text-center">
                <Modal
                    isOpen={modalIsOpen}
                    toggle={() => setModalIsOpen(modalIsOpen => !modalIsOpen)}
                >
                    <ModalHeader
                        toggle={() =>
                            setModalIsOpen(modalIsOpen => !modalIsOpen)
                        }
                    >
                        Micronutrients
                    </ModalHeader>
                    <ModalBody>
                        <Table
                            className="w-100 themed-table "
                            style={{ overflow: 'scroll' }}
                            dark
                        >
                            <thead />
                            <tbody>
                                <tr>
                                    <th>Micronutrient</th>
                                    <th>Value</th>
                                </tr>
                                {microNutrients &&
                                    microNutrients.map((record, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{record.name}</td>
                                                <td>
                                                    {record.value}
                                                    {record.unit}
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </Table>
                    </ModalBody>
                </Modal>
                <style jsx="true">{`
                    thead,
                    tbody :global(tr:nth-child(2n + 1)) {
                        background: #454545;
                    }
                    tr:nth-child(2n) {
                        background: #bfbdbd;
                        color: black;
                    }
                `}</style>
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getDailyDietGoals,
            updateNutritionFactsByServing,
        },
        dispatch
    )

const mapStateToProps = state => {
    return {
        nutritionFacts: state.nutritionFacts,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NutrientFacts)
