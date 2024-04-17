import React, { useEffect, useState } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCoponToCart, deleteAllCart } from '../../redux/actions/cartAction'
import { Flip, ToastContainer } from 'react-toastify'
import notify from './../../hook/useNotifaction';

const CartCheckout = ({ cartPrice }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const [isPressD, setIsPressD] = useState(false);
    const [loadingC, setLoadingC] = useState(true);
    const [copon, setCopon] = useState("");
    const handelDeleteAll = async () => {
        setIsPressD(true);
        setLoading(true)
        await dispatch(deleteAllCart());
        setLoading(false)
    }
    useEffect(() => {
        if (loading === false) {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }, [loading])

    const handelCopon = async () => {
        if (copon === "") {
            notify("لم يتم اضافة الكوبون", "error");
            return;
        }
        setIsPress(true);
        setLoadingC(true);
        await dispatch(addCoponToCart({couponName:copon.toUpperCase()}));
        setLoadingC(false)
    }
    useEffect(() => {
        if (loadingC === false) {
            if (res) {
                console.log(res)
                if (res.status === 400) {
                    setIsPress(false)
                    notify("كوبون غير صحيح او منتهي الصلاحية", "warn");
                    return;
                } else {
                    notify("تم تطبيق الكوبون بنجاح", "success")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }
        }
    }, [loadingC]);
    const res = useSelector(state => state.cartReducer.addCopon);
    return (
        <Row className="my-1 d-flex justify-content-center pt-3">
            {
                cartPrice.totalCartPrice > 0 ?
                    (
                        <Col xs="12" className="d-flex  flex-column  ">
                            <div className="d-flex  ">
                                <input
                                    value={copon}
                                    onChange={(e)=>setCopon(e.target.value)}
                                    className="copon-input d-inline text-center "
                                    placeholder="كود الخصم"
                                />
                                {
                                    !isPress ?
                                        (<button onClick={handelCopon} className="copon-btn d-inline ">تطبيق</button>)
                                        :
                                        (
                                            <Button className="copon-btn d-inline " variant="primary" disabled>
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
                            <div className="product-price d-inline w-100 my-3  border">{cartPrice.totalCartPrice || 0} جنية</div>
                            <div className="product-price d-inline w-100 my-3  border">{cartPrice.totalAfterDiscount || 0} جنية</div>
                            <Link
                                to="/order/paymethoud"
                                style={{ textDecoration: "none" }}
                                className="product-cart-add  d-inline ">
                                <button className="product-cart-add w-100 px-2"> اتمام الشراء</button>
                            </Link>
                            
                            {
                                !isPressD ?
                                    (
                                        <button onClick={handelDeleteAll} className="product-cart-add w-100 mt-2 px-2">تفريغ العربة</button>
                                    )
                                    :
                                    (
                                        <Button className="product-cart-add w-100 mt-2 px-2 " variant="primary" disabled>
                                            تفريغ العربة
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
                            
                        </Col>
                    )
                    :null
            }
            <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />
        </Row>
    )
}

export default CartCheckout
