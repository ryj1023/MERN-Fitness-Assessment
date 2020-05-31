import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import SmartTable from '../../../client/app/components/SmartTable'
import { getDailyDietGoals } from '../../../client/app/actions'
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

const NutrientFacts = ({
    nutritionFactUnits: units,
    nutritionFacts,
    selectedFoodName,
    backToFoodResults,
    foodId,
}) => {
    const [modalIsOpen, setModalIsOpen] = useState(null)
    const [selectedFoodFacts, setSelectedFoodFacts] = useState([])
    const [nutritionFactUnits, setNutritionFactUnits] = useState([])
    const [microNutrients, setMicroNutrients] = useState([])
    const [userData, setUserData] = useState(null)
    const [servingSize, setServingSize] = useState('')
    const [customMicroNutrients, setCustomMicroNutrients] = useState([])
    const [customFoodFacts, setCustomFoodFacts] = useState([])
    const [customNutritionFactUnits, setCustomNutritionFactUnits] = useState([])
    const addSelectedFoodToFoodList = async (
        selectedFoodFacts,
        servingType
    ) => {
        const qty = get(nutritionFacts[0], 'measures[0].qty') || 1
        const _servingSize = servingSize === '' ? qty : Number(servingSize)
        const selectedFoods = {
            foodName: selectedFoodName,
            foodId,
            date: moment().format('YYYY/MM/DD'),
            servingSize: {
                qty: _servingSize,
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

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
            ? JSON.parse(localStorage.getItem('user'))
            : null
        if (userData) {
            getDailyDietGoals(userData.dietInfo)
        }
        if (selectedFoodFacts !== nutritionFacts) {
            setSelectedFoodFacts(nutritionFacts)
        }
        const _selectedFoodFacts = []
        const _microNutrients = []
        const _nutritionFactUnits = nutritionFacts.reduce((acc, data) => {
            _selectedFoodFacts.push(data)
            if (
                (data.name.includes('Energy') && data.unit === 'kcal') ||
                data.name.includes('Protein') ||
                data.name.includes('lipid') ||
                data.name.includes('Carbohydrate')
            ) {
                acc.push(`${data.measures[0].value}${data.unit}`)
            } else {
                _microNutrients.push({
                    name: data.name,
                    value: `${data.measures[0].value}`,
                    unit: data.unit,
                })
            }
            return acc
        }, [])
        setNutritionFactUnits(_nutritionFactUnits)
        if (nutritionFacts[0]) {
            setNutritionFactUnits([
                ..._nutritionFactUnits,
                `${nutritionFacts[0].measures[0].qty}`,
            ])
        }
        setSelectedFoodFacts(_selectedFoodFacts)
        setMicroNutrients(_microNutrients)
        setUserData(userData)
    }, [nutritionFacts])
    const _microNutrients =
        servingSize !== '' ? customMicroNutrients : microNutrients
    const _selectedFoodFacts =
        servingSize !== '' ? customFoodFacts : selectedFoodFacts
    const _nutritionFactUnits =
        servingSize !== '' ? customNutritionFactUnits : nutritionFactUnits
    const servingType =
        nutritionFacts[0] && nutritionFacts[0].measures[0].label
            ? nutritionFacts[0].measures[0].label
            : null
    const updateServingSize = servingSize => {
        const updatedSelectedFoodFacts = _.cloneDeep([...selectedFoodFacts])
        if (
            parseFloat(servingSize) ===
                parseFloat(nutritionFacts[0].measures[0].qty) ||
            servingSize === ''
        ) {
            setCustomFoodFacts([])
            setCustomMicroNutrients([])
            setCustomNutritionFactUnits([])
            setServingSize(servingSize)
        }
        updatedSelectedFoodFacts.forEach(foodFact => {
            foodFact.measures[0].value = String(
                parseFloat(foodFact.measures[0].value) * servingSize
            )
            foodFact.measures[0].qty = parseFloat(servingSize)
        })
        const _customMicroNutrients = microNutrients.map(micro => {
            return {
                ...micro,
                value: String(
                    parseFloat(micro.value) * parseFloat(servingSize)
                ),
            }
        })
        const _customNutritionFactUnits = nutritionFacts.reduce((acc, data) => {
            if (
                (data.name.includes('Energy') && data.unit === 'kcal') ||
                data.name.includes('Protein') ||
                data.name.includes('lipid') ||
                data.name.includes('Carbohydrate')
            ) {
                acc.push(
                    `${parseFloat(data.measures[0].value) *
                        parseFloat(servingSize)}${data.unit}`
                )
            }
            return acc
        }, [])
        if (nutritionFacts[0]) {
            _customNutritionFactUnits.push(
                `${nutritionFacts[0].measures[0].qty}`
            )
        }
        setCustomFoodFacts(updatedSelectedFoodFacts)
        setCustomMicroNutrients(_customMicroNutrients)
        setCustomNutritionFactUnits(_customNutritionFactUnits)
        setServingSize(servingSize)
    }
    return (
        <>
            <Card>
                <CardBody>
                    <h5>Macronutrients</h5>
                    <SmartTable
                        updateServingSize={servingSize =>
                            updateServingSize(servingSize)
                        }
                        responsive={false}
                        id={'food-search'}
                        width="100%"
                        title={selectedFoodName}
                        titleHeader={true}
                        servingType={servingType}
                        tableData={_nutritionFactUnits}
                        tableHeaders={[
                            'Calories',
                            'Protein (grams)',
                            'Fat (grams)',
                            'Carbs (grams)',
                            'Serving Size',
                        ]}
                    />
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
                                await addSelectedFoodToFoodList(
                                    _selectedFoodFacts,
                                    servingType
                                )
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
                                {_microNutrients &&
                                    _microNutrients.map((record, index) => {
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
        },
        dispatch
    )

const mapStateToProps = state => {
    return {
        nutritionFacts: state.nutritionFacts,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NutrientFacts)
