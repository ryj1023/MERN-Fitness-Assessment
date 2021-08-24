import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Form, Input } from 'reactstrap'
import Link from 'next/link'
import get from 'lodash/get'
import { getFoodSearchKeyword } from '../../../client/app/actions/async-actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RecipesModal from './RecipesModal'

const FoodSearchForm = ({ foodList, getFoodSearchKeyword }) => {
    const [foodTextInput, setFoodTextInput] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const onSubmit = e => {
        e.preventDefault()
        getFoodSearchKeyword(foodTextInput)
    }
    return (
        <>
            <div className="mb-2 mb-md-0 d-flex align-items-center">
                <Link href="/my-goals">
                    <a className="text-decoration-none btn btn-link pl-0">
                        My Goals
                    </a>
                </Link>
                {/* {foodTextInput && foodList.length > 0 && (
                    <button
                        onClick={() => setModalIsOpen(true)}
                        className="btn btn-link text-decoration-none"
                    >
                        See Recipes
                    </button>
                )} */}
            </div>
            <Form
                className="text-center d-block"
                inline
                onSubmit={e => onSubmit(e)}
            >
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <Input
                            type="text"
                            onChange={e => {
                                e.persist()
                                setFoodTextInput(e.target.value)
                            }}
                            placeholder="please enter food item"
                        />
                        <button
                            className="btn ml-1 btn btn-primary"
                            href="#search"
                            onClick={e => onSubmit(e)}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </Form>
            <RecipesModal
                foodTextInput={foodTextInput}
                recipesModalOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
            />
        </>
    )
}

const mapStateToProps = state => {
    return {
        foodList: state.foodList,
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getFoodSearchKeyword,
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(FoodSearchForm)
