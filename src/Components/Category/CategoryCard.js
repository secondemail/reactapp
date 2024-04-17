import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CategoryCard = ({ background, img, title,id }) => {
    return (
        <div className="m-2 d-flex justify-content-center">
            <div>
                <Link to={`/products/category/${id}`}>
                    <img alt="zcv" src={img} className="categoty-card-img" />
                    <p className="categoty-card-text my-2">{title}</p>
                </Link>
            </div>
        </div>
    )
}

export default CategoryCard
