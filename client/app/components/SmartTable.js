import { Table } from 'reactstrap';

const TableHeader = (props) => {
   return (
       <>
        <Table className='smart-table mb-2' dark>
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
        <style jsx>{`
            .smart-table {
                max-width: ${props.width};
                margin: auto;
            }
        `}</style>
      </>
   )
}

export default TableHeader;