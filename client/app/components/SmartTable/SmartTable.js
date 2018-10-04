import { Table } from 'reactstrap';

const TableHeader = (props) => {
   return (
      <Table>
         <thead className="thead-dark">
            <tr>
               {props.tableHeaders.map(header => <th>{header}</th>)}
            </tr>
         </thead>
         <tbody>
         <tr>
            {/* <th scope="row">{props.rowNumber}</th> */}
            {props.tableData.map(header => <td>{header}</td>)}
         </tr>
         </tbody>
      </Table>
   )
}

export default TableHeader;