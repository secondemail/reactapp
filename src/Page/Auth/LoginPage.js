import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Form, InputGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Flip, ToastContainer } from 'react-toastify';
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authAction';
import notify from '../../hook/useNotifaction';
import { CircularProgress, TextField } from '@mui/material';
import MailLockIcon from '@mui/icons-material/MailLock';
import LockPersonIcon from '@mui/icons-material/LockPerson';


const LoginPage = () => {
/* ================ FORM VALIDATION ================ */
    const { Formik } = formik;
    const schema = yup.object().shape({
        email: yup.string().email('من فضلك ادخل ايميل صحيح').required('هذا الحقل مطلوب'),
        password: yup.string().required('هذا الحقل مطلوب'),
    });
/* ================ LOGIN ================ */
    const dispatch = useDispatch();
    const [loadingFormik, setLoadingFormik] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const login = async (values) => {
        if (!navigator.onLine) {
            notify("تأكد من الاتصال بالانترنت", "error")
            return;
        }
        setIsPress(true);
        setLoadingFormik(true);
        await dispatch(loginUser(values))
        setLoadingFormik(false);
    }
    useEffect(() => {
        if (loadingFormik === false) {
            if (resF) {
                setIsPress(false);
                if (resF.status === 500) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    notify("كلمة السر او الايميل خطا", "error")
                }
                if (resF.status === 400) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    notify("من فضلك تأكد من البيانات", "error")
                }
                if (resF.status === 200 && resF.data.token) {
                    setIsPress(true);
                    localStorage.setItem("token", resF.data.token)
                    localStorage.setItem("user", JSON.stringify(resF.data.data))
                    notify("تم تسجيل الدخول بنجاح", "success")
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 1500);
                } else {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                }
                setLoadingFormik(true)
            }
        }
    }, [loadingFormik]);
    const resF = useSelector(state => state.authReducer.loginUser);
/* ================================================ */
    return (
        <Container style={{ minHeight: "690px" }}>
            <Formik
                validationSchema={schema}
                onSubmit={login}
                initialValues={{
                    email:"",
                    password:""
                }}
            >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className=" py-5 d-flex justify-content-center">
                        <label className="mx-auto title-login text-center mb-4">تسجيل الدخول</label>
                        <Form.Group className='d-flex flex-column mb-3' as={Col} md="4" controlId="validationFormikEmail2">
                            <InputGroup hasValidation>
                                <MailLockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="input-with-sx"
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
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className='d-flex flex-column' as={Col} md="4" controlId="validationFormikPassword">
                            <InputGroup hasValidation>
                                <LockPersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="input-with-sx2"
                                    label="كلمة السر"
                                    variant="standard"
                                    fullWidth
                                    helperText={errors.password}
                                    error={!!errors.password}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    aria-describedby="inputGroupPrepend"
                                    type="password"
                                />
                            </InputGroup>
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
                                        <Button className="btn-login mx-auto w-100" type="submit">تسجيل الدخول</Button>
                                        
                                    )
                            }
                        </Form.Group>
                    </Row>
                </Form>
            )}
            </Formik>
            <div className='mt-4'>
                <Link to="/user/forget-password" style={{ textDecoration: 'none', color: 'red' }}>
                    هل نسيت كلمه السر
                </Link>
            </div>
            <br/>
            <div>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <span style={{ cursor: "pointer" }} className="text-danger">
                ليس لديك حساب ؟{" "}
                        اضغط هنا
                    </span>
                </Link>
            </div>

            <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />
        </Container>
    )
}

export default LoginPage
