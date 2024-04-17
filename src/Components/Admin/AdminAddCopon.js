import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import notify from './../../hook/useNotifaction';
import { addCopon, getCopons } from '../../redux/actions/coponAction';
import { ToastContainer, Flip } from 'react-toastify';
import AdminCoponCard from './AdminCoponCard';

const AdminAddCopon = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loadingCopon, setLoadingCopon] = useState(true);
    const [isPressed, setIsPressed] = useState(false);
    const dateRef = useRef();
    const [coponName, setCoponName] = useState("");
    const [copondate, setCoponDate] = useState("");
    const [coponDiscount, setCoponDiscount] = useState("");
    const onChangeCoponName = (e) => setCoponName(e.target.value);
    const onChangeCoponDate = (e) => setCoponDate(e.target.value);
    const onChangeCoponDiscount = (e) => setCoponDiscount(e.target.value);

const handleSubmit = async (e) => {
    e.preventDefault();
        if (!navigator.onLine) {
            notify("هناك مشكله فى الاتصال بالانترنت", "warn")
            return;
        }
        if (coponName === "") {
            notify("من فضلك ادخل اسم الكوبون", "warn")
            return;
        }
        if (copondate === "") {
            notify("من فضلك ادخل تاريخ الانتهاء", "warn")
            return;
        }
        if (coponDiscount === "") {
            notify("من فضلك ادخل نسبة الخصم", "warn")
            return;
        }
        setIsPressed(true)
        setLoading(true)
        await dispatch(addCopon({name:coponName.toUpperCase(), expire:copondate, discount:coponDiscount}))
        setLoading(false)
    }
    const res = useSelector(state => state.coponReducer.copon);
    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.status === 201) {
                    notify("تم اضافة الكوبون بنجاح", "success")
                    setCoponName('')
                    setCoponDate('')
                    setCoponDiscount('')
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                } else if (res.status === 400) {
                    setIsPressed(false);
                    notify("هذا الكوبون موجود من قبل", "warn");
                } else {
                    setIsPressed(false);
                    notify("هناك مشكلة في عملية الاضافة", "error");
                }
            }
        }
    }, [loading]);

    useEffect(() => {
        const getData = async () => {
            setLoadingCopon(true);
            await dispatch(getCopons());
            setLoadingCopon(false);
        }
        getData();
    }, []);
    const resAllCopon = useSelector(state => state.coponReducer.allCopon);

    return (
        <div style={{ minHeight: '670px' }}>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">اضف كوبون جديد</div>
                <Col sm="8">
                    <input
                        value={coponName}
                        onChange={onChangeCoponName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم الكوبون"
                    />
                    <input
                        value={copondate}
                        onChange={onChangeCoponDate}
                        ref={dateRef}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="تاريخ الانتهاء"
                        onFocus={()=>dateRef.current.type="date"}
                        onBlur={()=>dateRef.current.type="text"}
                    />
                    <input
                        value={coponDiscount}
                        onChange={onChangeCoponDiscount}
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="نسبة خصم الكوبون"
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
                                <button onClick={handleSubmit} className="btn-save d-inline mt-2 ">حفظ الكوبون</button>
                            )
                    }
                </Col>
            </Row>

            {
                !loadingCopon ?
                        resAllCopon && resAllCopon.data ?
                        resAllCopon.data.map((item, index) => {
                            return <AdminCoponCard key={index} copon={item} />
                        })
                        :null
                    :
                    (
                        <div style={{display:"flex",justifyContent:"center",paddingTop:"50px"}} >
                            <Spinner animation="border" variant="primary" />
                        </div>
                    )
            }
            
            <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />
        </div>
    )
}

export default AdminAddCopon
