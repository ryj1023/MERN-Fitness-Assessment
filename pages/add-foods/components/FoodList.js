import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'

import { Col, Button } from 'reactstrap'
import Pagination from 'rc-pagination'

const FoodList = ({ foodList, showFoodNutrients }) => {
    const [pageNumber, setPageNumber] = useState(0)
    const [selectedPage, setSelectedPage] = useState(1)
    const getSelectedPage = (targetName, id) => {
        if (Number.isNaN(Number(targetName))) {
            const newPageNumber =
                targetName === 'next-page' || id === 'next'
                    ? pageNumber + 1
                    : pageNumber - 1
            setPageNumber(newPageNumber)
            return newPageNumber
        } else {
            setPageNumber(Number(targetName))
            return Number(targetName)
        }
    }

    const itemRender = (current, type, element) => {
        switch (type) {
            case 'page': {
                return (
                    <Button
                        color="primary"
                        className="mx-1 pagination-btn"
                        key={current}
                        name={current}
                        onClick={() =>
                            setSelectedPage(getSelectedPage(current, undefined))
                        }
                    >
                        {current}
                    </Button>
                )
            }
            case 'prev': {
                return (
                    <Button
                        color="primary"
                        className="pagination-btn"
                        key={current}
                        disabled={pageNumber === 1}
                        name={current}
                        onClick={() =>
                            setSelectedPage(getSelectedPage('prev', undefined))
                        }
                    >
                        Prev
                    </Button>
                )
            }
            case 'next': {
                return (
                    <Button
                        color="primary"
                        className="pagination-btn ml-1"
                        key={current}
                        disabled={foodList.length - pageNumber * 10 < 10}
                        name={current}
                        onClick={() =>
                            setSelectedPage(
                                getSelectedPage('next-page', 'next')
                            )
                        }
                    >
                        Next
                    </Button>
                )
            }
            case 'jump-prev': {
                return (
                    <Button
                        color="primary"
                        className="pagination-btn mx-1"
                        key={current}
                        name={current}
                    >
                        ...
                    </Button>
                )
            }
            case 'jump-next': {
                return (
                    <Button
                        color="primary"
                        className="pagination-btn mx-1"
                        key={current}
                        name={current}
                    >
                        ...
                    </Button>
                )
            }
            default:
                return element
        }
    }
    const FoodList = foodList.reduce((acc, food, index) => {
        const pageRange = selectedPage === 1 ? 1 : selectedPage * 10 - 9
        let foodName = food.foodName.toUpperCase()
        if (foodName.includes('UPC')) {
            foodName = foodName.slice(0, foodName.indexOf(', UPC'))
        } else if (foodName.includes('GTIN')) {
            foodName = foodName.slice(0, foodName.indexOf(', GTIN'))
        }
        const { foodID, manufacturer } = food
        if (index + 1 >= pageRange && acc.length < 10) {
            acc.push(
                <li
                    className="list-group-item"
                    key={index}
                    id={foodID}
                    // onClick={() => showFoodNutrients({ foodID, foodName })}
                    onClick={() =>
                        showFoodNutrients({ foodID, foodName, ...food })
                    }
                >
                    <b>{foodName}</b>
                    <br />
                    {manufacturer === 'none'
                        ? 'manufacturer unavailable'
                        : manufacturer}
                </li>
            )
        }
        return acc
    }, [])
    return (
        <>
            <Col sm="12" lg="10" className="m-auto">
                <ul className="h-100 w-100 p-0">{FoodList}</ul>
            </Col>
            <Col sm="12" lg="10" className="m-auto">
                {foodList.length > 10 ? (
                    <Pagination
                        showLessItems
                        defaultPageSize={10}
                        pageSize={10}
                        total={foodList.length}
                        itemRender={itemRender}
                        className="mt-3 p-0"
                        onChange={page => setSelectedPage(page)}
                        current={selectedPage}
                    />
                ) : null}
            </Col>
        </>
    )
}
export default FoodList
