import React from 'react'
import { Table } from 'reactstrap'

const ThemedTable = ({ id, width, children, responsive }) => {
    return (
        <>
            <Table
                id={id}
                className={`themed-table ${
                    responsive ? 'table-responsive' : ''
                } mb-2`}
                dark
            >
                {children}
            </Table>
            <style jsx global>{`
       #${id} {
           max-width: ${width};
       }
       .themed-table {
           margin: auto;
       }
       th, tbody :global(tr:nth-child(2n))  {
           background: #454545;
         }
       .themed-table :global(tr:nth-child(2n + 1)) {
           background: #bfbdbd;
           color: black;
         }
         .themed-table :global(tr:nth-child(2n + 1)) > td {
             color: black
         }
         th {
             color: white;
         }
         @media only screen and (max-width: 576px) {
           .themed-table {
             display: block;
             overflow-x: auto;
           }
   `}</style>
        </>
    )
}

export default ThemedTable
