import { Table } from 'reactstrap';

const TableHeader = (props) => {
   return (
       <>
        <Table className='smart-table table-responsive mb-2' dark>
            <thead>
                {props.titleHeader && 
                    <tr>
                        <th className="text-center" colSpan={props.tableHeaders.length}>{props.title}</th>
                    </tr>
                }
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
        <style jsx global>{`
            .smart-table {
                max-width: ${props.width};
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
              
        `}</style>
      </>
   )
}

export default TableHeader;