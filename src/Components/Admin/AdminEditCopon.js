import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import notify from './../../hook/useNotifaction';
import { addCopon, getCopons, updateCopon } from '../../redux/actions/coponAction';
import { ToastContainer, Flip } from 'react-toastify';
import { useParams } from 'react-router-dom';

const AdminEditCopon = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(true);
    const [isPressed, setIsPressed] = useState(false);
    const dateRef = useRef();
    const [coponName, setCoponName] = useState("");
    const [copondate, setCoponDate] = useState("");
    const [coponDiscount, setCoponDiscount] = useState("");
    const onChangeCoponName = (e) => setCoponName(e.target.value);
    const onChangeCoponDate = (e) => setCoponDate(e.target.value);
    const onChangeCoponDiscount = (e) => setCoponDiscount(e.target.value);

    useEffect(() => {
        const getd = async () => {
            setLoading(true);
            await dispatch(getCopons());
            setLoading(false);
        }
        getd();
    }, []);

    const res = useSelector(state => state.coponReducer.allCopon); 
    
    useEffect(() => {
        if (loading === false) {
            if (res) {
                var copo = res.data.filter((copon) => copon._id === id)
                setCoponName(copo[0].name)
                setCoponDiscount(copo[0].discount)
                const dateString = copo[0].expire;
                const formatDate = (dateString) => {
                    const options = { year: "numeric", month: "numeric", day: "numeric" }
                    return new Date(dateString).toLocaleDateString("en-US", options)
                }
                setCoponDate(formatDate(dateString));
            }
        }
    }, [loading]);
    
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
        setLoadingUpdate(true);
        setIsPressed(true);
        await dispatch(updateCopon(id, { name: coponName, expire: copondate, discount: coponDiscount }));
        setIsPressed(false);
        setLoadingUpdate(false);
    }
    useEffect(() => {
        if (loadingUpdate === false) {
            if (resUpdate) {
                if (resUpdate.status === 200) {
                    notify("تم تعديل الكوبون بنجاح", "success");
                    setTimeout(() => {
                        window.location.href="/admin/add-copon";
                    }, 1000);
                }
            }
        }
    }, [loadingUpdate])
    const resUpdate = useSelector(state => state.coponReducer.updateCopons); 
    

    return (
        <>
            {
                !loading ?
                    (
                        <Container style={{height:"100vh"}}>
                            <Row className="justify-content-center pt-3 ">
                                <div className="admin-content-text text-center ">اضف كوبون جديد</div>
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

                            <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />
                        </Container>
                    )
                    :
                    (
                        <div className='over'>
                            <Spinner animation="border" variant="info" />
                        </div>
                    )
            }
        </>
    )
}

export default AdminEditCopon
