import React from 'react'
import { Row, Col } from 'react-bootstrap'
import mobile from '../../images/mobile.png'
const UserAllOrderCard = ({ item }) => {
    return (
        <div className='border-bottom pt-3'>
            <Row className="d-flex mb-2">
                <Col xs="3" md="2" className="d-flex justify-content-start">
                    <img width="50px" height="50px" className='rounded-circle' src={item.product.imageCover} alt="sdksjd" />
                </Col>
                <Col xs="8" md="6">
                    <div className="d-inline pt-2 cat-title">
                        {item.product.title}
                    </div>
                    <div className="mt-3">
                        <div className="cat-text  d-inline">الكميه:</div>
                        <span>
                            {item.count}
                        </span>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserAllOrderCard
