import React, { Component } from 'react'
import { Button } from 'reactstrap'

const SelectedFoodChart = props => {
    return (
        <>
            <tr>
                <td>{props.foodData.foodName}</td>
                <td>
                    {props.foodData.foodFacts.Energy
                        ? props.foodData.foodFacts.Energy
                        : '0'}
                </td>
                <td>
                    {props.foodData.foodFacts.Protein
                        ? props.foodData.foodFacts.Protein
                        : '0'}
                </td>
                <td>
                    {props.foodData.foodFacts['Total lipid (fat)']
                        ? props.foodData.foodFacts['Total lipid (fat)']
                        : '0'}
                </td>
                <td>
                    {props.foodData.foodFacts['Carbohydrate, by difference']
                        ? props.foodData.foodFacts[
                              'Carbohydrate, by difference'
                          ]
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
