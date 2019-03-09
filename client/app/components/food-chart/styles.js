import css from 'styled-jsx/css'

export default css`    
 .food-chart-column {
   margin: 10px 0;
 }
 tbody > tr {
   background: #bfbdbd;
 }
 thead  {
   background: #454545;
 }
 tbody > :global(tr:nth-child(2n + 1)) {
   background: #bfbdbd;
 }
 thead, tbody > :global(tr:nth-child(2n))  {
   background: #454545;
 }
 tbody :global(tr:nth-child(2n + 1) td) {
    color: black;
 }
 th, tbody :global(tr:nth-child(2n) td) {
   color: white;
}
 .under-total {
   background: #03c303;
 }

 .over-total {
  background: #d40808;
 }

 .totals-row td {
   font-weight: bold;
 }
 .under-label, .over-label {
   background: blue;
   border-radius: 2px;
 }
 .under-label {
   background: #03c303;
 }
 .over-label {
  background: #d40808
 }
 .table, tr, th, td {
   font-size: 0.7rem !important;
 }
 .food-chart {
   height: 60%;
 }
 .food-chart > table {
   height: 100%;
 }
 .food-chart > div {
   height: 100%;
 }
 .food-chart-table {
   margin: auto;
   max-height: 400px;
   height: 60%;
   overflow-y: scroll;
 }
 .food-chart-container, .food-chart-container > div, .food-chart-container > div > div {
   height: inherit;
 }
`