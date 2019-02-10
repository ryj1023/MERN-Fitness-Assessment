import css from 'styled-jsx/css'
export default css`
body, .home-wrapper {
   height: 100vh;
 }
 h1{
   font-size: 20px;
   color: black;
 }
 
 .container-wrapper{
   background-color: #eee;
   /* height: 70vh; */
   display: grid;
   grid-template-rows: 1fr 2fr;
   grid-template-rows: 1fr 3fr;
   margin: 4em;
 }
 
 .tables-container {
   display: grid;
   grid-template-rows: 1fr 1fr;
   grid-gap: 1em;
   margin: 0 0.5em;
 }
 
 .profile-wrapper> div {
   background-color: #eee;
 }
 
 .home-feed {
  background-color: #eee;
 }
 
 .diet-display-table {
   margin: auto;
   border-collapse: collapse;
   border: 1px solid rgba(182, 174, 174, 0.93);
 }
 
 p{
   color: black;
 }
 table, tr, th, td {
   color: black;
   border: 1px solid #ddd;
 }
 
 /* Mobile Layout */
 
 @media screen and (max-width: 900px) {
 
   .container-wrapper {
    grid-template-rows: 1fr 3fr;
  }
  /* .submit-form {
    margin: 0;
  }

  .label-text {
    font-size: 16px;
  }
 
   .heading {
     font-size: 30px;
   }
   .subheading {
     font-size: 22px;
     color: black;
     text-align: center;
     padding-top: 2%;
     position: relative;
     top: 0;
 }
 
 .radio-display {
   height: 170px;
 }
 
 .start-button {
   padding: 5px;
   font-size: 30px;
 } */
 }
 `