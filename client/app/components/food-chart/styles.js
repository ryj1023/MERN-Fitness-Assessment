import css from 'styled-jsx/css'

export default css`    
.food-chart-table {
   max-height: 400px;
   border: 1px solid black;
 }
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
 .totals-row {
   background: green;
 }
 .food-chart-table {
   max-width: 500px;
   margin: auto;
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
   display: block;
   height: 60%;
   overflow-y: scroll;
 }
 .food-chart-container, .food-chart-container > div, .food-chart-container > div > div {
   height: inherit;
 }
`