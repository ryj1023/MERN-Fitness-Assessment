import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Table, Card, CardBody } from 'reactstrap'

class Home extends Component {
    state = {
        user: null,
    }

    componentDidMount() {
        const cachedUser = localStorage
            ? JSON.parse(localStorage.getItem('user'))
            : this.state.user
        this.setState({
            user: cachedUser,
        })
    }

    render() {
        return (
            <Container fluid className="mt-2">
                <Row>
                    <div className="col col-12 col-md-6">
                        <Card>
                            <CardBody>
                                <h1>
                                    Welcome
                                    {this.state.user
                                        ? `, ${this.state.user.userName}`
                                        : ''}
                                    !
                                </h1>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col col-12 col-md-6">
                        <div className="card w-100">
                            <CardBody>
                                {this.state.user && this.state.user.dietInfo ? (
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
                                                            this.state.user
                                                                .dietInfo
                                                                .calories
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            this.state.user
                                                                .dietInfo
                                                                .protein
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            this.state.user
                                                                .dietInfo.fat
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            this.state.user
                                                                .dietInfo.carbs
                                                        }
                                                    </td>
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
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapDispatchToProps)(Home)
