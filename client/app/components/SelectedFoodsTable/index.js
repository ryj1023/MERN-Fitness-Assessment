import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { updatedFoodChart } from '../../actions'
import styles from './styles.js'
import axios from 'axios'
import {
    Container,
    Row,
    Col,
    Table,
    Form,
    Button,
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap'

class SelectedFoodsTable extends Component {
    displayUpdatedFoodData(dietSummary) {
        const totals = {
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
        }
        const previewFoodData = dietSummary.map(foodData => {
            return {
                foodName: foodData.foodName,
                foodFacts: foodData.macroNutrients,
            }
        })

        const macroTotals = previewFoodData.reduce((acc, macros, index) => {
            acc.calories += macros.foodFacts.calories.qty
                ? Number(macros.foodFacts.calories.qty)
                : 0
            acc.protein += macros.foodFacts.protein.qty
                ? Number(macros.foodFacts.protein.qty)
                : 0
            acc.fat += macros.foodFacts.fats
                ? Number(macros.foodFacts.fats.qty)
                : 0
            acc.carbs += macros.foodFacts.carbohydrates.qty
                ? Number(macros.foodFacts.carbohydrates.qty)
                : 0
            return acc
        }, totals)

        return { previewFoodData, macroTotals }
    }

    async removeSelectedFood(selectedFood, userName) {
        try {
            const encodedURI = window.encodeURI(`/api/remove-food-item`)
            const res = await axios.post(encodedURI, {
                foodName: selectedFood.foodName,
                userName,
            })
            this.props.getUpdatedFoodChart(res.data.user)
        } catch (err) {
            alert('There was a problem removing this item.')
            console.log('err', err)
        }
    }

    render() {
        const {
            dailyDietGoals,
            userFoodList,
            userName,
            foodChartLoading,
            foodList,
        } = this.props

        if (Object.keys(dailyDietGoals).length > 0) {
            const {
                previewFoodData,
                macroTotals,
            } = this.displayUpdatedFoodData(userFoodList)
            const savedFoodTableData = previewFoodData.map(
                (foodObject, index) => (
                    <tr key={index}>
                        <td>{foodObject.foodName}</td>
                        <td>
                            {foodObject.foodFacts.calories.qty
                                ? foodObject.foodFacts.calories.qty
                                : '0'}
                        </td>
                        <td>
                            {foodObject.foodFacts.protein.qty
                                ? foodObject.foodFacts.protein.qty
                                : '0'}
                        </td>
                        <td>
                            {foodObject.foodFacts.fats.qty
                                ? foodObject.foodFacts.fats.qty
                                : '0'}
                        </td>
                        <td>
                            {foodObject.foodFacts.carbohydrates.qty
                                ? foodObject.foodFacts.carbohydrates.qty
                                : '0'}
                        </td>
                        <td>
                            <div style={{ display: 'inline' }}>
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={async selected =>
                                        await this.removeSelectedFood(
                                            foodObject,
                                            userName
                                        )
                                    }
                                >
                                    Remove
                                </Button>
                            </div>
                        </td>
                        <style jsx>{`
                            td :global(.btn-primary) {
                                border-color: white !important;
                            }
                        `}</style>
                    </tr>
                )
            )
            const selectedMacrosOverGoal = Object.keys(dailyDietGoals).filter(
                key => dailyDietGoals[key] < macroTotals[key]
            )
            const macroTotalStatus = (selectedTotal, dailyTotal) => {
                if (!dailyTotal || !selectedTotal) {
                    return ''
                } else if (dailyTotal > selectedTotal) {
                    return 'under-total'
                } else if (dailyTotal < selectedTotal) {
                    return 'over-total'
                }
                return ''
            }

            return (
                <>
                    <div className="food-chart">
                        <Card className="mt-2">
                            <CardBody>
                                {savedFoodTableData.length > 0 ? (
                                    <>
                                        <div className="d-block d-sm-flex justify-content-between">
                                            <h5>Selected Foods</h5>
                                            <div className="d-flex align-items-center mb-2">
                                                <span className="under-label p-2 mr-1 text-white">
                                                    Under Goal
                                                </span>
                                                <span className="over-label p-2 mx-1 text-white">
                                                    Over Goal
                                                </span>
                                                <Link
                                                    href={{
                                                        pathname: '/add-foods',
                                                    }}
                                                >
                                                    <a className="btn ml-2 btn-primary">
                                                        Add Foods
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <table className="table table-dark table-responsive food-chart-table">
                                            <thead>
                                                <tr>
                                                    <th className="align-middle">
                                                        Food Name
                                                    </th>
                                                    <th>Calories (kcal)</th>
                                                    <th>Protein (grams)</th>
                                                    <th>Fat (grams)</th>
                                                    <th>Carbs (grams)</th>
                                                    <th>Remove Food</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {savedFoodTableData}
                                                <tr
                                                    className={`totals-row ${
                                                        selectedMacrosOverGoal.length >
                                                        0
                                                            ? 'totals-row-over'
                                                            : 'totals-row-under'
                                                    }`}
                                                >
                                                    <td>Totals</td>
                                                    <td
                                                        className={`${macroTotalStatus(
                                                            macroTotals.calories,
                                                            dailyDietGoals.calories
                                                        )}`}
                                                    >
                                                        {macroTotals.calories}
                                                    </td>
                                                    <td
                                                        className={`${macroTotalStatus(
                                                            macroTotals.protein,
                                                            dailyDietGoals.protein
                                                        )}`}
                                                    >
                                                        {macroTotals.protein.toFixed(
                                                            2
                                                        )}
                                                    </td>
                                                    <td
                                                        className={`${macroTotalStatus(
                                                            macroTotals.fat,
                                                            dailyDietGoals.fat
                                                        )}`}
                                                    >
                                                        {macroTotals.fat.toFixed(
                                                            2
                                                        )}
                                                    </td>
                                                    <td
                                                        className={`${macroTotalStatus(
                                                            macroTotals.carbs,
                                                            dailyDietGoals.carbs
                                                        )}`}
                                                    >
                                                        {macroTotals.carbs.toFixed(
                                                            2
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </>
                                ) : (
                                    <div>
                                        <h5>You have no foods selected</h5>
                                        <Link href="/add-foods">
                                            <a>Search for foods</a>
                                        </Link>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                        <style jsx>{styles}</style>
                    </div>
                </>
            )
        } else if (foodChartLoading) {
            return <p>loading...</p>
        } else
            return (
                <div className="m-auto">
                    <h5>You have no daily goal set.</h5>
                    <Link href="/assessment">
                        <a className="mb-2">Take the assessment</a>
                    </Link>
                    <br />
                    <Link href="/add-foods">
                        <a>Search for foods</a>
                    </Link>
                </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        dailyDietGoals: state.dailyDietGoals,
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ updatedFoodChart }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SelectedFoodsTable)
