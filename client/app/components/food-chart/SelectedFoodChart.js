import React, { Component } from 'react'
import { Button } from 'reactstrap'

const SelectedFoodChart = props => {
    return (
        <>
            <tr>
                <td>{props.foodData.foodName}</td>
                <td>
                    {props.foodData.foodFacts.calories.qty
                        ? props.foodData.foodFacts.calories.qty
                        : '0'}
                </td>
                <td>
                    {props.foodData.foodFacts.protein.qty
                        ? props.foodData.foodFacts.protein.qty
                        : '0'}
                </td>
                <td>
                    {props.foodData.foodFacts.fats.qty
                        ? props.foodData.foodFacts.fats.qty
                        : '0'}
                </td>
                <td>
                    {props.foodData.foodFacts.carbohydrates.qty
                        ? props.foodData.foodFacts.carbohydrates.qty
                        : '0'}
                </td>
                <td>
                    <div style={{ display: 'inline' }}>
                        <Button
                            color="primary"
                            size="sm"
                            onClick={() => props.onRemove(props.foodData)}
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
        </>
    )
}

export default SelectedFoodChart
