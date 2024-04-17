import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAddress } from '../../redux/actions/userAction';
import { createCashOrder, createOrderCARD, getCart } from '../../redux/actions/cartAction';
import notify from './../../hook/useNotifaction';
import { Flip, ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const ChoosePayMethoud = () => {
    const dispatch = useDispatch();
/* ======== GET ALL ADDRESSS ======== */
    const [loading, setLoading] = useState(true);
    const [addressData, setAddressData] = useState([]);

    useEffect(() => {
        const getAllAddress = async () => {
            setLoading(true)
            await dispatch(getAddress());
            setLoading(false)
        }
        getAllAddress();
    }, []);
    const res = useSelector(state => state.userReducer.allAddress);
    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.status === "success") {
                    {
                        setAddressData(res.data);
                    }
                }
            }
        }
    }, [loading])
/* ======== GET ONE ADDRESSS ======== */
    const [addressID, setAddressID] = useState("0");
    const [addressOneData, setAddressOneData] = useState([]);
    const handelChangeAddress = (e) => {
        setAddressID(e.target.value)
    }
    useEffect(() => {
        if (addressID !== "0") {
            setAddressOneData ( addressData.filter((address) => address._id === addressID))
        }
    }, [addressID])

/* ======== GET Cart ID ======== */
    const [loadingCartId, setLoadingCartId] = useState(true);
    const [cartId, setCartId] = useState([]);
    useEffect(() => {
        try {
            const getData = async () => {
                setLoadingCartId(true);
                await dispatch(getCart());
                setLoadingCartId(false);
            }
            getData();
        } catch (error) {}
    }, []);
    useEffect(() => {
        if (loadingCartId === false) {
            if (resCartId&&resCartId.status==="success") {
                setCartId(resCartId.data._id)
            }
        }
    }, [loadingCartId]);
    const resCartId = useSelector(state => state.cartReducer.allCart);
    
/* ======== createOrderCash ======== */
const [loadingCreateCash, setLoadingCreateCash] = useState(true);
const [loadingCreateCard, setLoadingCreateCard] = useState(true);
const [pressOrder, setPressOrder] = useState(false);
const [method, setMehod] = useState("");
    const chooseMethod = () => {
        if (method === "1") {
            handelCreateOrderCARD();
        } else if (method === "2") {
            createOrderCash()
        } else {
            notify("من فضلك اختر طريقة دفع", "warn")
        }
    }

    const handelCreateOrderCARD = async () => {
        if (addressID != 0) {
            setLoadingCreateCard(true)
            await dispatch(createOrderCARD(cartId, {
                shippingAddress: {
                    details: addressData.details,
                    phone: addressData.phone,
                    city: addressData.city,
                    postalCode: addressData.postalCode
                }
            }))
            setLoadingCreateCard(false)
        } else {
            notify("من فضلك اختر عنوان", "error")
            setPressOrder(false)
        }
    }
    useEffect(() => {
        if (loadingCreateCard === false) {
            if (resCard) {
                console.log(resCard)
                if (resCard.status === "success") {
                    if (resCard.session.url) {
                        window.open(resCard.session.url)
                    }
                } else {
                    notify("مشكلة في اضافة الطلب", "error");
                    setPressOrder(false)
                }
            }
        }
    }, [loadingCreateCard]);
    const resCard = useSelector(state => state.cartReducer.createOrderCard);






    const createOrderCash = async () => {
        setPressOrder(true);
        if (addressID != 0) {
            setLoadingCreateCash(true);
            await dispatch(createCashOrder(cartId, {
                shippingAddress: {
                    details: addressData[0].details,
                    phone: addressData[0].phone,
                    city: addressData[0].city,
                    postalCode: addressData[0].postalCode
                }
            }));
            setLoadingCreateCash(false);
        } else {
            notify("من فضلك اختر عنوان", "error")
            setPressOrder(false)
        }
    }
    useEffect(() => {
        if (loadingCreateCash === false) {
            if (resCash) {
                if (resCash.status === "success") {
                    notify("تم اضافة الطلب بنجاح", "success");
                    setTimeout(() => {
                        window.location.href="/user/allorders";
                    }, 1500);
                } else {
                    notify("مشكلة في اضافة الطلب", "error");
                    setPressOrder(false)
                }
            }
        }
    }, [loadingCreateCash]);
    const resCash = useSelector(state => state.cartReducer.createCash);
/* ========  ======== */
    
    return (
        <div>
            <div className="admin-content-text pt-5">اختر طريقة الدفع</div>
            <div className="user-address-card my-3 px-3 pb-3">
                <Row className="d-flex justify-content-between ">
                    <Col xs="12" className="my-2">
                        <input
                            onChange={(e)=>setMehod(e.target.value)}
                            name="group"
                            id="group1"
                            type="radio"
                            value="1"
                            className="mt-2"
                        />
                        <label className="mx-2" htmlFor="group1">
                            الدفع عن طريق البطاقه الائتمانية
                        </label>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs="12" className="d-flex">
                        <input
                            onChange={(e)=>setMehod(e.target.value)}
                            name="group"
                            id="group2"
                            type="radio"
                            value="2"
                            className="mt-2"
                        />
                        <label className="mx-2" htmlFor="group2">
                            الدفع عند الاستلام
                        </label>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs="4" className="d-flex">
                        <select  onChange={handelChangeAddress} name="address" id="address" className="select mt-1 px-2 "  >
                            <option value="0">اختر عنوان للشحن</option>
                            {
                                addressData ? addressData.map((item, index) => <option key={index} value={item._id}>{ item.alias }</option>):null
                            }
                        </select>
                    </Col>
                </Row>
            </div>


            <Row>
                <Col xs="12" className="d-flex justify-content-end">
                    <div className="product-price d-inline   border">{resCartId && resCartId.status==="success" ? resCartId.data.totalAfterDiscount ? resCartId.data.totalAfterDiscount : resCartId.data.totalCartPrice : 0} جنية</div>
                    {
                        pressOrder ?
                            (
                                <CircularProgress />
                            ) :
                            (
                                <div onClick={chooseMethod} className="product-cart-add px-3 pt-2 d-inline me-2"> اتمام الشراء</div>
                            )
                    }
                </Col>
            </Row>
            <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />
        </div>
    )
}

export default ChoosePayMethoud
