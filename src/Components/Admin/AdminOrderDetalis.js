import React, { useEffect, useState } from 'react'
import { Row,Col,Spinner,Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneOrder, orderDelivered, orderPayed } from '../../redux/actions/userAction';
import notify from './../../hook/useNotifaction';
import { ToastContainer, Flip } from 'react-toastify';

const AdminOrderDetalis = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
/* =============== get one order details =============== */
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            await dispatch(getOneOrder(id));
            setLoading(false);
        };
        getData();
    }, []);
    const res = useSelector(state => state.userReducer.oneOrder);
/* =============== order deliver =============== */
    const [loadingDeliver, setLoadingDeliver] = useState(true);
    const [isPressedDeliver, setIsPressedDeliver] = useState(false);
    const handelOrderDeliver = async () => {
        setIsPressedDeliver(true);
        setLoadingDeliver(true);
        await dispatch(orderDelivered(id));
        setLoadingDeliver(false);
    }
    useEffect(() => {
        if (loading === false) {
            if (resDeliver) {
                if (resDeliver.status === 200) {
                    notify("تم التعديل بنجاح", "success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }
        }
    }, [loadingDeliver]);
    const resDeliver = useSelector(state => state.userReducer.orderDeliver);

/* =============== order pay =============== */
    const [loadingPay, setLoadingPay] = useState(true);
    const [isPressedPay, setIsPressedPay] = useState(false);
    const handelOrderPay = async () => {
        setIsPressedPay(true);
        setLoadingPay(true);
        await dispatch(orderPayed(id));
        setLoadingPay(false);
    }
    useEffect(() => {
        if (loading === false) {
            if (resPay) {
                if (resPay.status === 200) {
                    notify("تم التعديل بنجاح", "success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);;
                }
            }
        }
    }, [loadingPay]);
    const resPay = useSelector(state => state.userReducer.orderPay);

/* ============================== */

    return (
        <div style={{ minHeight: '670px' }}>
            {
                loading ?
                    (<div style={{paddingTop:"30vh"}} className="d-flex justify-content-center"><Spinner  animation="border" role="status"></Spinner></div>) :
                    (
                        <div>
                            <div className='admin-content-text'>تفاصيل الطلب رقم#{ res&&res.data?res.data.id:"" }</div>
                            <Row style={{height:"unset",paddingBottom:"10px"}} className="justify-content-center mt-4 user-data">
                                <Col xs="12" className=" d-flex">
                                    <div className="admin-content-text py-2">تفاصيل العنوان</div>
                                </Col>
                                <Col xs="12" className="d-flex">
                                    <div
                                        style={{
                                            color: "#555550",
                                            fontFamily: "Almarai",
                                            fontSize: "16px",
                                        }}>
                                        العنوان:
                                    </div>

                                    <div
                                        style={{
                                            color: "#979797",
                                            fontFamily: "Almarai",
                                            fontSize: "16px",
                                        }}
                                        className="mx-2">
                                        {res&&res.data&&res.data.shippingAddress?res.data.shippingAddress.details:""}
                                    </div>
                                </Col>

                                <Col xs="12" className="d-flex">
                                    <div
                                        style={{
                                            color: "#555550",
                                            fontFamily: "Almarai",
                                            fontSize: "16px",
                                        }}>
                                        رقم الهاتف:
                                    </div>

                                    <div
                                        style={{
                                            color: "#979797",
                                            fontFamily: "Almarai",
                                            fontSize: "16px",
                                        }}
                                        className="mx-2">
                                        { res&&res.data&&res.data.shippingAddress?res.data.shippingAddress.phone:"" }
                                    </div>
                                </Col>
                                <Col xs="12" className="d-flex">
                                    <div
                                        style={{
                                            color: "#555550",
                                            fontFamily: "Almarai",
                                            fontSize: "16px",
                                        }}>
                                        الايميل:
                                    </div>

                                    <div
                                        style={{
                                            color: "#979797",
                                            fontFamily: "Almarai",
                                            fontSize: "16px",
                                        }}
                                        className="mx-2">
                                        { res&&res.data&&res.data.user?res.data.user.email:"" }
                                    </div>
                                </Col>
                                <div className="admin-content-text py-2">تفاصيل المنتجات</div>
                                {
                                    res && res.data && res.data.cartItems ? res.data.cartItems.map((itemOrder, index) => <div key={index} className=" d-inline px-4">
                                        <div>
                                            اسم المنتج: {itemOrder.product.title}
                                        </div>
                                    </div> ):null
                                }
                                <div className=" d-inline px-4 text-center fw-bold  p-3 ">
                                    المجموع : { res&&res.data?res.data.totalOrderPrice:"" } جنيه
                                </div>
                                <div className="d-flex mt-2 justify-content-center">
                                    {
                                        !isPressedDeliver ?
                                            res && res.data ?
                                                res.data.isDelivered === true ?
                                                    (<button className="btn btn-secondary px-3 d-inline mx-2" disabled>تم التوصيل</button>)
                                                    :
                                                    (<button onClick={handelOrderDeliver} className="btn-a px-3 d-inline mx-2 ">تم التوصيل</button>)
                                            : null
                                        :
                                        (
                                            <Button className='btn-a px-3 d-inline mx-2' variant="primary" disabled>
                                                انتظر
                                                <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        )
                                    }
                                    {
                                        !isPressedPay ?
                                            res && res.data ?
                                                res.data.isPaid === true ?
                                                    (<button className="btn btn-secondary px-3 d-inline mx-2" disabled>تم الدفع</button>)
                                                    :
                                                    (<button onClick={handelOrderPay} className="btn-a px-3 d-inline mx-2 ">تم الدفع</button>)
                                            : null
                                        :
                                        (
                                            <Button className='btn-a px-3 d-inline mx-2' variant="primary" disabled>
                                                انتظر
                                                <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        )
                                    }
                                </div>
                            </Row>
                        </div>
                    )
            }
            <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />
        </div>
    )
}

export default AdminOrderDetalis
