import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Table, Card, CardBody } from 'reactstrap'
import { getFeaturedRecipeList } from '../client/app/actions/async-actions'
import { getDailyDietGoals } from '../client/app/actions'
import Link from 'next/link'
import $ from 'jquery'
import ThemedTable from '../client/app/components/ThemedTable'
import get from 'lodash.get'

const Home = ({ getFeaturedRecipeList, foodRecipes }) => {
    const [user, setUser] = useState(null)
    const [isLoadingUser, setIsLoadingUser] = useState(true)

    useEffect(() => {
        if (!user) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        // getFeaturedRecipeList(JSON.parse(localStorage.getItem('user')) || {})
        getFeaturedRecipeList()
        $('#welcome-text')
            .delay(500)
            .animate({ opacity: 1 }, 500)
        setIsLoadingUser(false)
    }, [])
    const fats = get(user, 'dietGoals.fats') || null
    const calories = get(user, 'dietGoals.calories') || null
    const protein = get(user, 'dietGoals.protein') || null
    const carbs = get(user, 'dietGoals.carbs') || null
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
                            {isLoadingUser && <>loading...</>}
                            {user && user.dietGoals && !isLoadingUser ? (
                                <>
                                    <h5 className="mb-3">
                                        Daily Nutrient Intake Goals
                                    </h5>
                                    <ThemedTable id="food-goals">
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
                                                <td>{calories}</td>
                                                <td>{protein}</td>
                                                <td>{fats}</td>
                                                <td>{carbs}</td>
                                            </tr>
                                        </tbody>
                                    </ThemedTable>
                                </>
                            ) : (
                                <Col sm="12" className="text-center">
                                    <h5 className="mr-2">
                                        No diet information yet.
                                    </h5>
                                    <div>
                                        {!user && (
                                            <Link href="sign-up">
                                                <a className="text-decoration-none mr-2">
                                                    Sign up
                                                </a>
                                            </Link>
                                        )}
                                        {!user && (
                                            <Link href="login">
                                                <a className="text-decoration-none mr-2">
                                                    Log In
                                                </a>
                                            </Link>
                                        )}
                                        {!user && (
                                            <Link href="assessment">
                                                <a className="text-decoration-none">
                                                    Take the diet assessment
                                                </a>
                                            </Link>
                                        )}
                                    </div>
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
                {console.log('recipes', recipes)}
                {recipes.length > 0 && !isLoadingUser && (
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
                                                            key={recipe.id}
                                                            sm="12"
                                                            md="6"
                                                            lg="4"
                                                            className="d-flex align-items-center justify-content-center mb-2"
                                                        >
                                                            <div className="text-center">
                                                                <a
                                                                    target="_blank"
                                                                    href={
                                                                        recipe.spoonacularSourceUrl
                                                                    }
                                                                >
                                                                    <img
                                                                        className="w-100"
                                                                        src={
                                                                            recipe.image
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
                                                                        recipe.sourceUrl
                                                                    }
                                                                >
                                                                    {
                                                                        recipe.sourceName
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
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getFeaturedRecipeList, getDailyDietGoals }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home)
