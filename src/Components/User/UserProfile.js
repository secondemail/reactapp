import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Spinner } from 'react-bootstrap'
import deleteicon from '../../images/delete.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../../redux/actions/userAction';
import notify from './../../hook/useNotifaction';
import { Flip, ToastContainer } from 'react-toastify';
const UserProfile = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [isPressed, setIsPressed] = useState(false);
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmNewPass, setConfirmPass] = useState("");
    const onChangeOldPass = (e) => {
        setOldPass(e.target.value);
    }
    const onChangeNewPass = (e) => {
        setNewPass(e.target.value);
    }
    const onChangeConfirmNewPass = (e) => {
        setConfirmPass(e.target.value);
    }
    const handelSubmit = async() => {
        if (oldPass === "" || newPass === "" || confirmNewPass === "") {
            notify("من فضلك اكمل البيانات", "error")
            return
        }
        if (newPass!== confirmNewPass) {
            notify("كلمة السر غير متطابقه ", "error")
            return
        }
        setIsPressed(true)
        setLoading(true);
        await dispatch(updateUserPassword({ currentPassword: oldPass, password: newPass, passwordConfirm: confirmNewPass }));
        setLoading(false);
    }
    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                notify("تم تعديل كلمة المرور بنجاح", "success")
                localStorage.setItem("token", res.data.token)
                setIsPressed(false)
                setOldPass("");
                setNewPass("");
                setConfirmPass("");
            } else {
                setIsPressed(false)
                notify("هناك مشكله فى عملية التعديل منفضلك تأكد من البيانات", "error")
            }
        }
    }, [loading]);
    const res = useSelector(state => state.userReducer.updateUserPass);
    
    return (
        <div style={{ minHeight: '670px' }}>
            <div className="admin-content-text">الصفحه الشخصية</div>
            <div className="user-address-card my-3 px-2 py-3">
                <Row className="d-flex justify-content-between pt-2">
                    <Col xs="6" className="d-flex">
                        <div className="p-2">الاسم:</div>
                        <div className="p-1 item-delete-edit">{ userData.name }</div>
                    </Col>
                    <Col xs="6" className="d-flex justify-content-end">
                        <div className="d-flex mx-2">
                            <Link to={`/user/edit-user/${userData._id}`} style={{ textDecoration: "none" }}>
                                <p className="item-delete-edit"> تعديل</p>
                            </Link>
                        </div>
                    </Col>
                </Row>

                <Row className="">
                    <Col xs="12" className="d-flex">
                        <div className="p-2">رقم الهاتف:</div>
                        <div className="p-1 item-delete-edit">{ userData.phone }</div>
                    </Col>
                </Row>
                <Row className="">
                    <Col xs="12" className="d-flex">
                        <div className="p-2">الايميل:</div>
                        <div className="p-1 item-delete-edit">{ userData.email }</div>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col xs="10" sm="8" md="6" className="">
                        <div className="admin-content-text">تغير كملة المرور</div>
                        <input
                            value={oldPass}
                            onChange={onChangeOldPass}
                            type="password"
                            className="input-form d-block mt-1 px-3"
                            placeholder="ادخل كلمة المرور القديمة"
                        />
                        <input
                            value={newPass}
                            onChange={onChangeNewPass}
                            type="password"
                            className="input-form d-block mt-3 px-3"
                            placeholder="ادخل كلمة المرور الجديده"
                        />
                        <input
                            value={confirmNewPass}
                            onChange={onChangeConfirmNewPass}
                            type="password"
                            className="input-form d-block mt-3 px-3"
                            placeholder="تأكيد كلمة المرور الجديده"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs="10" sm="8" md="6" className="d-flex justify-content-end ">
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
                                <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ كلمة السر</button>
                            )
                    }
                    </Col>
                </Row>
            </div>
            <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />
        </div>
    )
}

export default UserProfile
