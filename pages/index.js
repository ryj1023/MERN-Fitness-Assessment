import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Table, Card, CardBody } from 'reactstrap'
import axios from 'axios'
import { getFeaturedRecipeList } from '../client/app/actions/async-actions'

const Home = ({ getFeaturedRecipeList, foodRecipes }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        if (!user) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        // getFeaturedRecipeList()
    }, [])
    return (
        <Container fluid className="mt-2">
            <Row>
                <div className="col col-12 col-md-6">
                    <Card>
                        <CardBody>
                            <h1>
                                Welcome
                                {user ? `, ${user.userName}` : ''}!
                            </h1>
                            {/* <p className="font-weight-bold">Featured Recipes</p>
                            <Container>
                                <Row>
                                    {foodRecipes &&
                                        foodRecipes.recipes.reduce(
                                            (acc, recipe, index) => {
                                                if (index + 1 < 5) {
                                                    acc.push(
                                                        <Col
                                                            key={
                                                                recipe.recipe_id
                                                            }
                                                            sm="6"
                                                        >
                                                            <p>
                                                                {recipe.title}
                                                            </p>
                                                            <div className="d-flex">
                                                                <a
                                                                    target="_blank"
                                                                    href={
                                                                        recipe.source_url
                                                                    }
                                                                >
                                                                    <img
                                                                        className="w-100"
                                                                        style={{
                                                                            maxHeight:
                                                                                '200px',
                                                                        }}
                                                                        src={
                                                                            recipe.image_url
                                                                        }
                                                                    />
                                                                </a>
                                                                <a
                                                                    target="_blank"
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
                            </Container> */}
                        </CardBody>
                    </Card>
                </div>
                <div className="col col-12 col-md-6">
                    <div className="card w-100">
                        <CardBody>
                            {user && user.dietInfo ? (
                                <>
                                    <h5>Daily Nutrient Intake Goals</h5>
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
                                <Col sm="12">
                                    <h2>No diet info yet</h2>
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
            </Row>
            <style jsx>{`
                .col :global(.card) {
                    min-height: 300px;
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
    bindActionCreators({ getFeaturedRecipeList }, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
