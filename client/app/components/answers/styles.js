import css from 'styled-jsx/css'

export default css`
.input-box-one, .input-box-two {
   background-color: rgba(182, 174, 174, 0.93);
   height: 42px;
   width: 32%;
   margin: 2%;
   position: relative;
   /*top: -5em;*/
   border-radius: 10px;
   border-style: solid;
   border-color: #454545;

}
.input-box-one::placeholder, .input-box-two::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
   color: #454545;
   opacity: 1; /* Firefox */
}

.input-box-one:-ms-input-placeholder .input-box-two:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color: #454545;
}

.input-box-one::-ms-input-placeholder .input-box-two::-ms-input-placeholder { /* Microsoft Edge */
   color: #454545;
}
.submit{
   position: relative;
   top: 8px;
  text-align: center;
   cursor: pointer;
   -webkit-transition-duration: 0.4s;
   transition-duration: 0.4s;
   border: none;
   color: white;
   background-color: #454545;
   border-radius: 10px;
   font-size: 32px;
   margin-top: 2%;
   border-style: solid;
   border-color: #FFFFFF;
}
.submit:hover {
 background-color: #FFFFFF;
 color: black;
 border-style: solid;
 border-color: #454545;
}
.start-button{
  background-color: #454545;
   color: #FFFFFF;
   border-radius: 10px;
   font-size: 35px;
   cursor: pointer;
   padding: 16px 32px;
   text-align: center;
}
.start-button:hover{
    background-color: white;
     color: black;
     border-style: solid;
     border-color: #454545;
}
.calculate-answers{
  background-color: #232323;
   color: #FFFFFF;
   border-radius: 10px;
   font-size: 25px;
   cursor: pointer;
   padding: 16px 32px;
   text-align: center;
   margin-top: 15%;
}
.calculate-answers:hover{
  background-color: #FFFFFF;
   color: black;
   border-style: solid;
   border-color: #454545;
}
.option{
   vertical-align: middle;
   /* float: left; */
}
.answer{
   text-align: left;
   position: relative;
   width: 45%;
   margin: auto;
   /* top: -4em;    */
}
form{
   margin: auto;
  text-align: center;
}
.answer-text{
   color: #454545;
   font-size: 17px;
   margin: 2px;
}

.two-input-submit {
  width: 80%;
  max-width: 800px;
}

.option {
   width: auto;
}
.submit-form {
   width: auto;
   margin: 0;
}

@media screen and (max-width: 500px) {
   .submit-form {
       width: auto;
   }

   .answer {
       width: 70%;
   }

}
`