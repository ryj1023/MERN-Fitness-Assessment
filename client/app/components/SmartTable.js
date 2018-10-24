import { Table } from 'reactstrap';

const TableHeader = (props) => {
   return (
      <Table dark size="small">
         {props.titleHeader ? (
            <thead>
               <tr>
                  <th colSpan={props.tableHeaders.length}>{props.title}</th>
               </tr>
            </thead>
        )
         :
         (null)
         }
         <thead>
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