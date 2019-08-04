import { useEffect, useState, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Button,
    Card,
    Label,
    FormResponse,
    Modal,
    ModalBody,
    ModalHeader,
    Table,
} from 'reactstrap'
import BMRForm from './components/BMRForm'
import MacrosForm from './components/MacrosForm'
import { gatherFitnessInfo } from '../../client/app/actions'
import { saveUserData } from '../../client/app/actions/async-actions'
import calculateFitnessInput from '../../client/app/calculations/calculate-fitness-input'
import styles from './styles.js'
import Router from 'next/router'

const SelectGoalTypeForm = () => {
    return (
        <div className="m-2">
            <h5>Goal Type</h5>
            <p>
                Select BMR and we'll calcululate your diet goals based on your
                Basal Metablolic Rate, or select Custom to enter your own data.
            </p>
            <div>
                <Button
                    onClick={() =>
                        Router.push({
                            pathname: '/assessment',
                            query: { form: 'bmr' },
                        })
                    }
                    className="mr-1"
                    color="primary"
                >
                    BMR
                </Button>

                <Button
                    onClick={() =>
                        Router.push({
                            pathname: '/assessment',
                            query: { form: 'macros' },
                        })
                    }
                    className="ml-1"
                    color="primary"
                >
                    Custom
                </Button>
            </div>
        </div>
    )
}

const Assessment = props => {
    const { form, calories } = props
    console.log('props', props)
    const [userData, setUserData] = useState(null)
    const [modal, openModal] = useState(false)
    const [fitnessGoals, setFitnessGoals] = useState(null)
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user')))
        if (fitnessGoals) {
            openModal(true)
        }
    }, [fitnessGoals])
    const getFormType = () => {
        switch (form) {
            case 'bmr':
                return <BMRForm />
            case 'macros':
                return <MacrosForm calories={calories} />
            default:
                return <SelectGoalTypeForm />
        }
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Card className="mt-3 p-2">{getFormType()}</Card>
                    </Col>
                </Row>
                <div>
                    {/* <Link color="danger" onClick={() => setModal((prevModalStatus) => !prevModalStatus)}></Link> */}
                    {fitnessGoals && (
                        <Modal isOpen={modal} toggle={() => openModal(false)}>
                            <ModalHeader
                                className="border-0"
                                toggle={() =>
                                    openModal(
                                        prevModalStatus => !prevModalStatus
                                    )
                                }
                            >
                                Your daily diet goals
                            </ModalHeader>
                            <ModalBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Calories</th>
                                            <th>Protein</th>
                                            <th>Carbs</th>
                                            <th>Fat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{fitnessGoals.calories}</td>
                                            <td>{fitnessGoals.protein}</td>
                                            <td>{fitnessGoals.carbs}</td>
                                            <td>{fitnessGoals.fat}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </ModalBody>
                            <div className="d-flex m-3">
                                <span>
                                    <Link
                                        href={{
                                            pathname: 'sign-up',
                                            query: {
                                                calories: fitnessGoals.calories,
                                                protein: fitnessGoals.protein,
                                                carbs: fitnessGoals.carbs,
                                                fat: fitnessGoals.fat,
                                            },
                                        }}
                                    >
                                        <a>Sign up now</a>
                                    </Link>{' '}
                                    to save your diet goals.
                                </span>
                            </div>
                        </Modal>
                    )}
                </div>
            </Container>
            <style jsx>{styles}</style>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        clientDietInfo: state.clientInfo,
    }
}

Assessment.getInitialProps = ({ query }) => {
    return {
        form: query.form || null,
        calories: query.calories || null
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ gatherFitnessInfo, saveUserData }, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Assessment)
