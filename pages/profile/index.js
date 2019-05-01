import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import { connect } from 'react-redux';
import Link from 'next/link';
import App from '../../client/app/components/app';
import '../../client/app/styles/profile.css';
import Router from 'next/router'


const Profile = (props) => {
   const [userName, getUserName] = useState(null)
   const [dailyDietGoals, getDailyDietGoals] = useState(null)
   useEffect(() => {
      if (JSON.parse(localStorage.getItem('user'))) {
         getUserName(JSON.parse(localStorage.getItem('user')).userName)
         getDailyDietGoals(JSON.parse(localStorage.getItem('user')).dietInfo)
      } else {
         Router.push('/login')
      }
   }, [])
   return (
         <Container fluid>
               <Row>
                  {
                     dailyDietGoals && dailyDietGoals.calories ? 
                  (
                     <h1>calories: {dailyDietGoals.calories}</h1>
                  ) : (
                     <Col sm='12'>
                           <p>You haven't done your fitness assessment yet</p>
                           <h3>Take the assessment <Link href='./assessment'><a>here</a></Link> to get your new goals</h3>
                     </Col>
                  )
                  }
               </Row>
         </Container>
   ) 
}

export default App(connect()(Profile))

