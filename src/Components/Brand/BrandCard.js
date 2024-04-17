import React from 'react'
import { Col,Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BrandCard = ({ img, id }) => {
    return (
        <div className="m-2 d-flex justify-content-center">
        <Card
          className="my-1"
          style={{
            width: "150px",
            height: "120px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#FFFFFF",
          }}>
          <Link to={`/products/brand/${id}`}>
            <Card.Img style={{ height: "120px" }} src={img} />
          </Link>
        </Card>
      </div>
    )
}

export default BrandCard
