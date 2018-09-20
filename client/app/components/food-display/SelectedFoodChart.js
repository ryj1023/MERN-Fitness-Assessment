import React, { Component } from 'react';

const SelectedFoodChart = (props) => (
         <tr>
            <td>{props.foodData.foodName}</td>
            <td>{props.foodData.foodFacts.Energy}</td>
            <td>{props.foodData.foodFacts.Protein}</td>
            <td>{props.foodData.foodFacts['Total lipid (fat)']}</td>
            <td>{props.foodData.foodFacts['Carbohydrate, by difference']}</td>
            <td>
               <div style={{display: 'inline'}}>
                  <button className="btn btn-danger" onClick={() => props.onRemove(props.foodData)}>Remove</button>
               </div>
            </td>
         </tr>
        )

export default SelectedFoodChart;