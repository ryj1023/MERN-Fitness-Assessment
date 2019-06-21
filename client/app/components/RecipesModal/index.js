import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import axios from 'axios'

const RecipesModal = ({ recipesModalOpen, foodTextInput, onClose }) => {
    const [recipeList, setRecipeList] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [noResults, setNoResults] = useState(false)
    console.log('foodTextInput', foodTextInput)
    useEffect(() => {
        if (recipesModalOpen) {
            setIsLoading(true)
            axios
                .post(`/api/get-recipe-list`, {
                    foodKey: foodTextInput,
                })
                .then(res => {
                    setIsLoading(false)
                    if (res.data.count === 0) {
                        setNoResults(true)
                    }
                    setRecipeList(res.data.recipes)
                })
                .catch(err => {
                    setNoResults(true)
                    console.log('err', err)
                })
        }
    }, [recipesModalOpen])
    return (
        <Modal isOpen={recipesModalOpen} toggle={() => onClose(false)}>
            <ModalHeader
                className="border-0 pb-0"
                toggle={() => onClose(false)}
            >
                Related Recipes
            </ModalHeader>
            <ModalBody>
                {isLoading && <p>loading...</p>}
                {noResults && (
                    <div>
                        <p>
                            Sorry there were no recipes for your current search.
                        </p>
                    </div>
                )}
                {!isLoading &&
                    recipeList &&
                    recipeList.map((recipe, index) => {
                        return (
                            <div
                                key={index}
                                className="d-flex justify-content-between my-2"
                            >
                                <div className="w-50">
                                    <img
                                        className="w-100"
                                        src={recipe.image_url}
                                    />
                                    <a
                                        className="mt-1"
                                        href={recipe.publisher_url}
                                    >
                                        {recipe.publisher}
                                    </a>
                                </div>
                                <div className="w-50 text-center">
                                    <p>{recipe.title}</p>
                                    <a href={recipe.source_url} target="_blank">
                                        See Recipe
                                    </a>
                                </div>
                            </div>
                        )
                    })}
            </ModalBody>
        </Modal>
    )
}

export default RecipesModal
