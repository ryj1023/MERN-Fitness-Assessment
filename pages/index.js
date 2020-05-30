import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Table, Card, CardBody } from 'reactstrap'
import axios from 'axios'
import { getFeaturedRecipeList } from '../client/app/actions/async-actions'
import Link from 'next/link'
import $ from 'jquery'
import get from 'lodash.get'
const Home = ({ getFeaturedRecipeList, foodRecipes, foodList }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        if (!user) {
            setUser(() => JSON.parse(localStorage.getItem('user')))
        }
        getFeaturedRecipeList(JSON.parse(localStorage.getItem('user')) || {})
        $('#welcome-text')
            .delay(500)
            .animate({ opacity: 1 }, 500)
    }, [])
    const recipes = get(foodRecipes, 'recipes') || []
    return (
        <Container className="mt-2">
            <h1 id="welcome-text">
                Welcome
                {user ? `, ${user.userName}` : ''}!
            </h1>
            <Row>
                <div className="col col-12 mb-2">
                    <div className="card w-100">
                        <CardBody>
                            {user && user.dietInfo ? (
                                <>
                                    <h5 className="mb-3">
                                        Daily Nutrient Intake Goals
                                    </h5>
                                    <Table
                                        dark
                                        className="table table-dark food-chart-table"
                                    >
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    Calories (Kcal)
                                                </th>
                                                <th scope="col">
                                                    Protein (Gs)
                                                </th>
                                                <th scope="col">Fat (Gs)</th>
                                                <th scope="col">Carbs (Gs)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {user.dietInfo.calories}
                                                </td>
                                                <td>{user.dietInfo.protein}</td>
                                                <td>{user.dietInfo.fat}</td>
                                                <td>{user.dietInfo.carbs}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </>
                            ) : (
                                <Col sm="12" className="d-flex">
                                    <h5 className="mr-2">
                                        No diet information yet.
                                    </h5>
                                    {!user && (
                                        <Link href="sign-up">
                                            <a className="text-decoration-none">
                                                Sign up now
                                            </a>
                                        </Link>
                                    )}
                                </Col>
                            )}
                        </CardBody>
                    </div>
                    <Row>
                        <Col sm="12">
                            {/* <Workouts workoutData={this.state.user} /> */}
                        </Col>
                    </Row>
                </div>
                {recipes.length > 0 && (
                    <div className="col col-12">
                        <Card>
                            <CardBody>
                                <Container>
                                    <Row>
                                        <Col sm="12">
                                            <h5 className="mb-3">
                                                Featured Recipes
                                            </h5>
                                        </Col>
                                        {foodRecipes.recipes.reduce(
                                            (acc, recipe, index) => {
                                                if (index < 6) {
                                                    acc.push(
                                                        <Col
                                                            key={
                                                                recipe.recipe_id
                                                            }
                                                            sm="12"
                                                            md="6"
                                                            lg="4"
                                                            className="d-flex align-items-center justify-content-center mb-2"
                                                        >
                                                            <div className="text-center">
                                                                <a
                                                                    target="_blank"
                                                                    href={
                                                                        recipe.source_url
                                                                    }
                                                                >
                                                                    <img
                                                                        className="w-100"
                                                                        src={
                                                                            recipe.image_url
                                                                        }
                                                                    />
                                                                </a>
                                                                <p className="mt-2 mb-0">
                                                                    {
                                                                        recipe.title
                                                                    }
                                                                </p>
                                                                <a
                                                                    target="_blank"
                                                                    className="small"
                                                                    href={
                                                                        recipe.publisher_url
                                                                    }
                                                                >
                                                                    {
                                                                        recipe.publisher
                                                                    }
                                                                </a>
                                                            </div>
                                                        </Col>
                                                    )
                                                }
                                                return acc
                                            },
                                            []
                                        )}
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </div>
                )}
            </Row>
            <style jsx>{`
                // .col :global(.card) {
                //     min-height: 300px;
                // }
                #welcome-text {
                    opacity: 0;
                }
                tbody > tr {
                    background: #bfbdbd;
                }
                thead {
                    background: #454545;
                }
                tbody > :global(tr:nth-child(2n + 1)) {
                    background: #bfbdbd;
                }
                thead,
                tbody > :global(tr:nth-child(2n)) {
                    background: #454545;
                }
                tbody :global(tr:nth-child(2n + 1) td) {
                    color: black;
                }
                th,
                tbody :global(tr:nth-child(2n) td) {
                    color: white;
                }
                img {
                    max-height: 200px;
                    max-width: 200px;
                    width: auto;
                    height: auto;
                }
            `}</style>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        foodRecipes: state.foodRecipes,
        foodList: state.foodList,
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getFeaturedRecipeList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home)
