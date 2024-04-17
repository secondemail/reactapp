import React,{useEffect, useState} from 'react'
import { Row,Col, Button, Spinner } from 'react-bootstrap'
import notify from './../../hook/useNotifaction';
import { Flip, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {  getAddress, updateAddress } from '../../redux/actions/userAction';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserEditAddress = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(true);
    const [isPressed, setIsPressed] = useState(false);
    const [addressName, setAddressName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const onChangeAddressName = (e) => {
        setAddressName(e.target.value)
    }
    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const onChangeCity = (e) => {
        setCity(e.target.value)
    }
    const onChangePostalCode = (e) => {
        setPostalCode(e.target.value)
    }
    useEffect(() => {
        const getd = async () => {
            setLoading(true);
            await dispatch(getAddress());
            setLoading(false);
        }
        getd();
    }, []);
    const res = useSelector(state => state.userReducer.allAddress);
    useEffect(() => {
        if (loading === false) {
            if (res) {
                var address = res.data.filter((address) => address._id === id)
                setAddressName(address[0].alias);
                setAddress(address[0].details);
                setPhone(address[0].phone);
                setCity(address[0].city);
                setPostalCode(address[0].postalCode);
            }
        }
    }, [loading]);

    const handelSubmit = async() => {
        if (!navigator.onLine) {
            notify("هناك مشكله فى الاتصال بالانترنت", "warn")
            return;
        }
        if (addressName === "") {
            notify("من فضلك ادخل اسم العنوان", "error")
            return;
        }
        if (address === "") {
            notify("من فضلك ادخل العنوان", "error")
            return;
        }
        if (phone === "") {
            notify("من فضلك ادخل رقم الهاتف", "error")
            return;
        }
        if (city === "") {
            notify("من فضلك ادخل المدينة", "error")
            return;
        }
        if (postalCode === "") {
            notify("من فضلك ادخل رقم البريد", "error")
            return;
        }
        setIsPressed(true);
        setLoadingUpdate(true);
        await dispatch(updateAddress(id,{
            alias: addressName,
            details: address,
            phone: phone,
            city: city,
            postalCode: postalCode
        }));
        setLoadingUpdate(false);
    }
    useEffect(() => {
        if (loadingUpdate === false) {
            if (resUpdate) {
                if (resUpdate.status === 200) {
                    notify("تم تعديل العنوان بنجاح", "success");
                    setTimeout(() => {
                        window.location.href="/user/addresses";
                    }, 1500);
                } else {
                    notify("هناك مشكله فى عملية التعديل", "error");
                    setIsPressed(false);
                }
            }
        }
    }, [loadingUpdate])
    const resUpdate = useSelector(state => state.userReducer.updateAddress); 
    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-2">اضافة عنوان جديد</div>
                <Col sm="8">
                    <input
                        value={addressName}
                        onChange={onChangeAddressName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="تسمية العنوان مثلا(المنزل - العمل)"
                    />
                    <textarea
                        value={address}
                        onChange={onChangeAddress}
                        className="input-form-area p-2 mt-3"
                        rows="4"
                        cols="50"
                        placeholder="العنوان بالتفصيل"
                    />
                    <input
                        value={phone}
                        onChange={onChangePhone}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="رقم الهاتف"
                    />
                    <input
                        value={city}
                        onChange={onChangeCity}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="المدينة"
                    />
                    <input
                        value={postalCode}
                        onChange={onChangePostalCode}
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="رقم البريد"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    {
                        isPressed ?
                            (
                                <Button className='d-inline mt-2 btn-save' variant="primary" disabled>
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
                            :
                            (
                                <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ التعديل</button>
                            )
                    }
                </Col>
            </Row>
            <ToastContainer autoClose={1500} theme="colored" transition={Flip} />
        </div>
    )
}

export default UserEditAddress
