import React from 'react'
import { Table } from 'reactstrap'

const NutrientFactsTable = props => {
    const { responsive, id, tableData, updateServingSize } = props
    return (
        <>
            <Table
                id={id}
                className={`smart-table ${
                    responsive ? 'table-responsive' : ''
                } mb-2`}
                dark
            >
                <thead>
                    <tr>
                        <th>Calories</th>
                        <th>Protein</th>
                        <th>Fat (grams)</th>
                        <th>Carbohydrates (grams)</th>
                        <th>Serving Size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* <th scope="row">{props.rowNumber}</th> */}
                        <td>
                            {tableData?.calories?.qty}
                            {tableData?.protein?.calories}
                        </td>
                        <td>
                            {tableData?.protein?.qty}
                            {tableData?.protein?.measure}
                        </td>
                        <td>
                            {tableData?.fats?.qty}
                            {tableData?.fats?.measure}
                        </td>
                        <td>
                            {tableData?.carbohydrates?.qty}
                            {tableData?.carbohydrates?.measure}
                        </td>
                        <td>
                            <input
                                type="number"
                                onChange={e =>
                                    updateServingSize(e.target.value)
                                }
                                placeholder={1}
                                id="servingSize"
                                name="servingSize"
                                min="0"
                                max="100"
                            />
                            {/* <span>
                                {servingType ? `${servingType}(s)` : 'N/A'}
                            </span> */}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <style jsx global>{`
                 #${id} {
                     max-width: ${props.width};
                 }
                 .smart-table {
                     margin: auto;
                 }
                 th, tbody :global(tr:nth-child(2n))  {
                     background: #454545;
                   }
                 .smart-table :global(tr:nth-child(2n + 1)) {
                     background: #bfbdbd;
                     color: black;
                   }
                   .smart-table :global(tr:nth-child(2n + 1)) > td {
                       color: black
                   }
                   th {
                       color: white;
                   }
                   @media only screen and (max-width: 576px) {
                     .smart-table {
                       display: block;
                       overflow-x: auto;
                     }
             `}</style>
        </>
    )
}

export default NutrientFactsTable
