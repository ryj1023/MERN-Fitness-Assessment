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
// import { saveUserData } from '../../client/app/actions/async-actions'
import calculateFitnessInput from '../../client/app/calculations/calculate-fitness-input'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'

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
    const [userData, setUserData] = useState(null)
    const [modal, openModal] = useState(false)
    const [dietGoals, setDietGoals] = useState(null)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user')))
        if (dietGoals) {
            openModal(true)
        }
    }, [dietGoals])
    const saveDietGoals = dietGoals => {
        const { email } = userData
        const encodedURI = window.encodeURI(`/api/save`)
        axios
            .post(encodedURI, {
                dietGoals,
                email,
            })
            .then(res => {
                console.log('res.data', res.data.user)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                alert('Your diet goals have been updated!')
                setUpdateSuccess(true)
            })
            .catch(err => {
                console.log('err', err)
                alert('There was a problem with saving your diet goals')
            })
    }
    const getFormType = () => {
        switch (form) {
            case 'bmr':
                return <BMRForm />
            case 'macros':
                return (
                    <MacrosForm
                        submitMacros={dietGoals => setDietGoals(dietGoals)}
                        calories={calories}
                    />
                )
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
                    {dietGoals && (
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
                                            <th>Fats</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{dietGoals.calories}</td>
                                            <td>{dietGoals.protein}</td>
                                            <td>{dietGoals.carbs}</td>
                                            <td>{dietGoals.fats}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </ModalBody>
                            <div className="d-flex m-3">
                                {!userData && (
                                    <span className="text-nowrap">
                                        <Link
                                            href={{
                                                pathname: 'sign-up',
                                                query: {
                                                    calories:
                                                        dietGoals.calories,
                                                    protein: dietGoals.protein,
                                                    carbs: dietGoals.carbs,
                                                    fats: dietGoals.fats,
                                                },
                                            }}
                                        >
                                            <a>Sign up now</a>
                                        </Link>{' '}
                                        to save your diet goals.
                                    </span>
                                )}
                                <div className="d-flex justify-content-between w-100">
                                    {userData && (
                                        <Button
                                            disabled={updateSuccess}
                                            color="primary"
                                            onClick={() =>
                                                saveDietGoals(dietGoals)
                                            }
                                        >
                                            Save Diet Data
                                        </Button>
                                    )}
                                    {updateSuccess && (
                                        <Link href={{ pathname: '/my-goals' }}>
                                            <a className="ml-2 btn btn-primary">
                                                My Goals
                                            </a>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </Modal>
                    )}
                </div>
            </Container>
            {/* <style jsx>{styles}</style> */}
            <style jsx>{`body, .home-wrapper {
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
 

 
 @media screen and (max-width: 900px) {
 
   .container-wrapper {
    grid-template-rows: 1fr 3fr;
  }`}</style>
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
        calories: query.calories || null,
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ gatherFitnessInfo }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Assessment)
