import React,{useEffect, useState} from 'react'
import { Row,Col, Button, Spinner } from 'react-bootstrap'
import notify from './../../hook/useNotifaction';
import { Flip, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../redux/actions/userAction';
import { useSelector } from 'react-redux';

const UserAddAddress = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
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

    const handelSubmit = async () => {
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
        setLoading(true);
        await dispatch(addAddress({
            alias: addressName,
            details: address,
            phone: phone,
            city: city,
            postalCode: postalCode
        }));
        setLoading(false);
    }

    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.status === 200) {
                    notify("تم اضافة العنوان بنجاح", "success");
                    setTimeout(() => {
                        window.location.href="/user/addresses"
                    }, 1500);
                } else {
                    setIsPressed(false);
                    notify("هناك مشكله فى عملية الاضافة", "error")
                }
            }
        }
    }, [loading])

    const res = useSelector(state => state.userReducer.addAddress);
    
    
    return (
        <div style={{ minHeight: '670px' }}>
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
                                <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">إضافة عنوان</button>
                            )
                    }
                </Col>
            </Row>
            <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />
        </div>
    )
}

export default UserAddAddress
