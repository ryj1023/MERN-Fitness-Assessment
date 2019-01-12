import React, { Component } from 'react';
import { Button } from 'reactstrap';

const SelectedFoodChart = (props) => (
      <>
            <tr>
               <td>{props.foodData.foodName}</td>
               <td>{props.foodData.foodFacts.Energy}</td>
               <td>{props.foodData.foodFacts.Protein}</td>
               <td>{props.foodData.foodFacts['Total lipid (fat)']}</td>
               <td>{props.foodData.foodFacts['Carbohydrate, by difference']}</td>
               <td>
                  <div style={{display: 'inline'}}>
                     <Button size="sm" onClick={() => props.onRemove(props.foodData)}>Remove</Button>
                  </div>
               </td>
            </tr>
         </>
        )

export default SelectedFoodChart;