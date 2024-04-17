import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Form, InputGroup, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Flip, ToastContainer } from 'react-toastify';
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword, loginUser } from '../../redux/actions/authAction';
import notify from '../../hook/useNotifaction';
import MailLockIcon from '@mui/icons-material/MailLock';
import { CircularProgress, TextField } from '@mui/material';

const ForgetPasswordPage = () => {
/* ================ FORM VALIDATION ================ */
    const { Formik } = formik;
    const schema = yup.object().shape({
        email: yup.string().email('من فضلك ادخل ايميل صحيح').required('هذا الحقل مطلوب'),
    });
/* ================ LOGIN ================ */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loadingFormik, setLoadingFormik] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const sendCode = async (values) => {
        if (!navigator.onLine) {
            notify("تأكد من الاتصال بالانترنت", "error")
            return
        }
        localStorage.setItem("user-email" ,values.email)
        setIsPress(true);
        setLoadingFormik(true);
        await dispatch(forgetPassword(values))
        setLoadingFormik(false);
    }
    useEffect(() => {
        if (loadingFormik === false) {
            if (resF) {
                setIsPress(false);
                if (resF.data.status === "Success") {
                    notify("تم ارسال الكود للايميل بنجاح", "success")
                    setTimeout(() => {
                        navigate("/user/verify-code")
                    }, 1000);
                }
                if (resF.data.status === "fail") {
                    setIsPress(false);
                    notify("هذا الحساب غير موجود لدينا", "error")
                }
                setLoadingFormik(true)
            }
        }
    }, [loadingFormik]);
    const resF = useSelector(state => state.authReducer.forgetPassword);
/* ================================================ */
    return (
        <Container style={{ minHeight: "690px" }}>
        <Formik
            validationSchema={schema}
            onSubmit={sendCode}
            initialValues={{
                email:"",
            }}
        >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Row className=" py-5 d-flex justify-content-center">
                    <label className="mx-auto title-login text-center mb-4">نسيت كلمة السر</label>
                    <Form.Group className='d-flex flex-column ' as={Col} md="4" controlId="validationFormikEmail">
                        <MailLockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            id="input-with-sx2"
                            label="الايميل"
                            variant="standard"
                            fullWidth
                            helperText={errors.email}
                            error={!!errors.email}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            aria-describedby="inputGroupPrepend"
                            type="email"
                        />
                    </Form.Group>
                </Row>
                <Row className=" d-flex justify-content-center" >
                    <Form.Group className='d-flex flex-column' as={Col} md="4">
                        {
                            isPress ?
                                (
                                    <div className='text-center'>
                                        <CircularProgress />
                                    </div>
                                )
                                :
                                (
                                    <Button className="btn-login mx-auto w-100" type="submit">ارسال الكود</Button>
                                )
                        }
                    </Form.Group>
                </Row>
            </Form>
        )}
        </Formik>
        <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />
        </Container>
    )
}

export default ForgetPasswordPage