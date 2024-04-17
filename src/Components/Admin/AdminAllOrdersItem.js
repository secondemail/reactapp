import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import mobile from '../../images/mobile.png'
const AdminAllOrdersItem = ({ order }) => {
    return (
        <Col sm="12">
            <Link to={`/admin/orders/${order._id}`} className="cart-item-body my-2 px-1 d-flex" style={{ textDecoration: "none" }}>

                <div className="w-100 px-3">
                    
                    <Row className="justify-content-between">
                        <Col sm="12" className=" d-flex flex-row justify-content-between">
                            <div className="d-inline pt-2 cat-text">طلب رقم #{ order.id }</div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-2">
                        <Col sm="12" className=" d-flex flex-row justify-content-start">
                            <div className="d-inline pt-2 cat-title">
                                اسم العميل: {order.user.name}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-2">
                        <Col sm="12" className=" d-flex flex-row justify-content-start">
                            <div className="d-inline pt-2 cat-title">
                                ايميل العميل: {order.user.email}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-2">
                        <Col sm="12" className=" d-flex flex-row justify-content-start">
                            <div className="d-inline pt-2 cat-title">
                                رقم العميل: {order.user.phone}
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-between pt-3">
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
                                    !order.isPaid ? (<div className="d-inline mx-2 stat">غير مدفوع ({order.paymentMethodType==="cash"?"كاش":""})</div>):(<div className="d-inline mx-2 stat"> تم الدفع بنجاح ({order.paymentMethodType==="cash"?"كاش":""})</div>)
                                }
                            </div>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <div className="d-inline pt-2 barnd-text">{order.totalOrderPrice} جنية</div>
                        </Col>
                    </Row>

                </div>
            </Link>
        </Col>
    )
}

export default AdminAllOrdersItem
