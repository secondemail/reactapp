import React from 'react'
import { Row, Col } from 'react-bootstrap'
import UserAllOrderCard from './UserAllOrderCard'
const UserAllOrderItem = ({ order }) => {
    return (
        <div className="user-order mt-2">
            <Row>
                <div className="py-2 order-title">طلب رقم #{ order.id }</div>
            </Row>
            {
                order.cartItems.map((item, index) => {
                    return <UserAllOrderCard key={index} item={item} />
                })
            }
            <Row className="d-flex justify-content-between py-3">
                <Col>
                    <div>
                        <div> الحالة :</div>
                        {
                            !order.isDelivered ? (<div className="d-inline mx-2 stat">قيد التنفيذ</div>):(<div className="d-inline mx-2 stat"> تم التوصيل بنجاح </div>)
                        }
                    </div>
                    <div>
                        <div>حاله الدفع :</div>
                        {
                            !order.isPaid ? (<div className="d-inline mx-2 stat">غير مدفوع ({order.paymentMethodType==="cash"?"كاش":"فيزا"})</div>):(<div className="d-inline mx-2 stat"> تم الدفع بنجاح ({order.paymentMethodType==="cash"?"كاش":"فيزا"})</div>)
                        }
                    </div>
                </Col>
                <Col className="d-flex justify-content-end">
                    <div>
                        <div className="barnd-text">{order.totalOrderPrice} جنيه</div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserAllOrderItem
