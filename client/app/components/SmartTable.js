import { Table } from 'reactstrap';

const TableHeader = (props) => {
   return (
       <>
        <Table dark size="small">
            {props.titleHeader ? (
                <thead>
                <tr>
                    <th className="text-center" colSpan={props.tableHeaders.length}>{props.title}</th>
                </tr>
                </thead>
            )
            :
            (null)
            }
            <thead>
                <tr>
                {props.tableHeaders.map((header, index) => <th key={index}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
            <tr>
                {/* <th scope="row">{props.rowNumber}</th> */}
                {props.tableData.map((header, index) => <td key={index}>{header}</td>)}
            </tr>
            </tbody>
        </Table>
      </>
   )
}

export default TableHeader;