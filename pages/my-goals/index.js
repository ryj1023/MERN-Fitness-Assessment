import React, { useState, useEffect, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap'
import { updatedFoodChart, getDailyDietGoals } from '../../client/app/actions'
import SelectedFoodsTable from '../../client/app/components/SelectedFoodsTable'
import Link from 'next/link'
import get from 'lodash.get'
import ThemedTable from '../../client/app/components/ThemedTable';


const getUpdatedFoodChart = (props, userData) => {
    props.updatedFoodChart(userData.selectedFoods)
    props.getDailyDietGoals(userData.dietGoals)
    localStorage.setItem('user', JSON.stringify(userData))
}

const getUserData = async (props, setIsLoading, setUserName) => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
        try {
            const encodedURI = window.encodeURI(`/api/user-data`)
            const res = await axios.get(encodedURI, {
                params: {
                    email: storedUser.email,
                },
            })
            const user = get(res, 'data[0].user') || []
            // props.getDailyDietGoals(user.dietInfo)
            if (Object.keys(user.dietGoals || {}).length > 0) {
                getUpdatedFoodChart(props, user)
            }

            setIsLoading(false)
            setUserName(res.data[0].user.userName)
        } catch (err) {
            console.log('err', err)
            setIsLoading(false)
        }
    }
    setIsLoading(false)
}

const MyGoals = ({ dailyDietGoals, ...props }) => {
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
                        <>
                            {Object.keys(dailyDietGoals).length > 0 && (
                                <Col className="m-auto" lg="10">
                                    <Card className="">
                                        <CardBody>
                                            <div className="d-flex mb-2 justify-content-between">
                                                <h5>
                                                    Daily Nutrient Intake Goals
                                                </h5>
                                                <Link
                                                    href={{
                                                        pathname: '/assessment',
                                                    }}
                                                >
                                                    <a className="btn btn-primary">
                                                        New Goal
                                                    </a>
                                                </Link>
                                            </div>
                                            <ThemedTable>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            Calories (Kcal)
                                                        </th>
                                                        <th scope="col">
                                                            Protein (Gs)
                                                        </th>
                                                        <th scope="col">
                                                            Fat (Gs)
                                                        </th>
                                                        <th scope="col">
                                                            Carbs (Gs)
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            {
                                                                dailyDietGoals.calories
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                dailyDietGoals.protein
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                dailyDietGoals.fats
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                dailyDietGoals.carbs
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </ThemedTable>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )}

                            <Col lg="10" className="m-auto">
                                <SelectedFoodsTable
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
                        </>
                    )}
                    {!isLoading && !userName && (
                        <Col sm="6 m-auto">
                            <Card>
                                <CardBody>
                                    <h5>
                                        You currently do not have an account.
                                        Sign up to use this feature (It's free!)
                                    </h5>
                                    <div className="text-center d-flex justify-content-between">
                                        <Link href="sign-up">
                                            <a className="text-decoration-none">
                                                Sign up now
                                            </a>
                                        </Link>
                                        <Link href="add-foods">
                                            <a className="text-decoration-none">
                                                Search Foods
                                            </a>
                                        </Link>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
            {/* <style jsx>{styles}</style> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(MyGoals)
