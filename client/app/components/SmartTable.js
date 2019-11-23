import { Component } from 'react'
import { Table } from 'reactstrap'

class TableHeader extends Component {
    render() {
        const {
            responsive,
            id,
            servingType,
            updateServingSize,
            tableData,
        } = this.props
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
                            {this.props.tableHeaders.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* <th scope="row">{props.rowNumber}</th> */}
                            {tableData &&
                                tableData.map((data, index) => {
                                    if (index === tableData.length - 1) {
                                        return (
                                            <td key={index}>
                                                <input
                                                    type="number"
                                                    onChange={e =>
                                                        updateServingSize(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={data}
                                                    id="servingSize"
                                                    name="servingSize"
                                                    min="0"
                                                    max="100"
                                                />
                                                <span>
                                                    {servingType
                                                        ? `${servingType}(s)`
                                                        : 'N/A'}
                                                </span>
                                            </td>
                                        )
                                    }
                                    return <td key={index}>{data}</td>
                                })}
                        </tr>
                    </tbody>
                </Table>
                <style jsx global>{`
                 #${id} {
                     max-width: ${this.props.width};
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
}

export default TableHeader
