import React, { useState, useEffect, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap'
import { updatedFoodChart, getDailyDietGoals } from '../../client/app/actions'
import FoodChart from '../../client/app/components/food-chart/FoodChart'

import Link from 'next/link'

const getUpdatedFoodChart = (props, userData) => {
    props.updatedFoodChart(userData.userDietSummary)
    props.getDailyDietGoals(userData.dietInfo)
    localStorage.setItem('user', JSON.stringify(userData))
}

const getUserData = async (props, setIsLoading, setUserName) => {
    if (JSON.parse(localStorage.getItem('user'))) {
        try {
            const encodedURI = window.encodeURI(`/api/user-data`)
            const res = await axios.get(encodedURI, {
                params: {
                    email: JSON.parse(localStorage.getItem('user')).email,
                },
            })
            getUpdatedFoodChart(props, res.data[0].user)
            setIsLoading(false)
            setUserName(res.data[0].user.userName)
        } catch (err) {
            console.log('err', err)
            setIsLoading(false)
        }
    }
    setIsLoading(false)
}

const NutritionCenter = props => {
    const [isLoading, setIsLoading] = useState(true)
    const [userName, setUserName] = useState(null)
    useEffect(() => {
        getUserData(props, setIsLoading, setUserName)
    }, [])
    return (
        <div>
            <Container
                className="nutrition-center-container h-100" /*className={this.state.loading ? "h-100" : ''}*/
            >
                <Row className="h-100">
                    {!isLoading && userName && (
                        <Col lg="10" className="m-auto">
                            <FoodChart
                                getUpdatedFoodChart={userData =>
                                    getUpdatedFoodChart(props, userData)
                                }
                                foodChartLoading={isLoading}
                                userName={userName}
                                userFoodList={
                                    props.updatedUserFoodList.foodList
                                }
                                {...props}
                            />
                        </Col>
                    )}
                    {!isLoading && !userName && (
                        <Col sm="6 m-auto">
                            <Card>
                                <CardBody>
                                    <h5>
                                        You currently do not have an account.
                                        Sign up to use this feature (It's free!)
                                    </h5>
                                    <div className="text-center">
                                        <Link href="sign-up">
                                            <a className="text-decoration-none">
                                                Sign up now
                                            </a>
                                        </Link>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
            <style jsx>{`
                div {
                    padding: 10px;
                }
            `}</style>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        foodList: state.foodList,
        updatedUserFoodList: state.updatedUserFoodList,
        dailyDietGoals: state.dailyDietGoals,
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ updatedFoodChart, getDailyDietGoals }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(NutritionCenter)
