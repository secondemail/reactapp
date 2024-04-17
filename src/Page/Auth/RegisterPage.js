import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Form, InputGroup, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Flip, ToastContainer } from 'react-toastify';
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, loginUser } from '../../redux/actions/authAction';
import notify from '../../hook/useNotifaction';
import { CircularProgress, TextField } from '@mui/material';
import MailLockIcon from '@mui/icons-material/MailLock';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import BadgeIcon from '@mui/icons-material/Badge';
import LockResetIcon from '@mui/icons-material/LockReset';
import ContactsIcon from '@mui/icons-material/Contacts';
const RegisterPage = () => {
/* ================ FORM VALIDATION ================ */
    const { Formik } = formik;
    const schema = yup.object().shape({
        name: yup.string().required('هذا الحقل مطلوب'),
        email: yup.string().email('من فضلك ادخل ايميل صحيح').required('هذا الحقل مطلوب'),
        password: yup.string().required('هذا الحقل مطلوب').min(6, 'كلمة السر يجب الا تقل عن 6 احرف'),
        passwordConfirm: yup.string().required('هذا الحقل مطلوب').oneOf([yup.ref('password'), null], 'كلمة السر غير مطابقة'),
        phone: yup.string().required('هذا الحقل مطلوب').matches(/^01[0125][0-9]{8}$/gm, 'ادخل رقم صحيح')
    });
/* ================ LOGIN ================ */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loadingFormik, setLoadingFormik] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const login = async (values) => {
        if (!navigator.onLine) {
            notify("تأكد من الاتصال بالانترنت", "error")
            return;
        }
        setIsPress(true);
        setLoadingFormik(true);
        await dispatch(createNewUser(values))
        setLoadingFormik(false);
    }
    useEffect(() => {
        if (loadingFormik === false) {
            if (resF) {
                setIsPress(false);
                if (resF.data.token) {
                    localStorage.setItem("token", resF.data.token)
                    notify("تم تسجيل الحساب بنجاح", "success")
                    setTimeout(() => {
                        navigate('/login')
                    }, 1500);
                }
                setLoadingFormik(true)
            }
        }
    }, [loadingFormik]);
    const resF = useSelector(state => state.authReducer.createUser);
/* ================================================ */
    return (
        <Container style={{ minHeight: "690px" }}>
        <Formik
            validationSchema={schema}
            onSubmit={login}
            initialValues={{
                name:"",
                email:"",
                password:"",
                passwordConfirm:"",
                phone:"",
            }}
        >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Row className=" py-5 d-flex justify-content-center">
                    <label className="mx-auto title-login text-center mb-4">تسجيل حساب جديد</label>
                    <Form.Group className='d-flex flex-column mb-3' as={Col} md="4" controlId="validationFormikName">
                        <InputGroup hasValidation>
                            <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="input-with-sx"
                                label="الاسم"
                                variant="standard"
                                fullWidth
                                helperText={errors.name}
                                error={!!errors.name}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                aria-describedby="inputGroupPrepend"
                                type="text"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='d-flex flex-column mb-3' as={Col} md="4" controlId="validationFormikEmail">
                        <InputGroup hasValidation>
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
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='d-flex flex-column mb-3' as={Col} md="4" controlId="validationFormikPassword">
                        <InputGroup hasValidation>
                            <LockPersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="input-with-sx3"
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
                    <Form.Group className='d-flex flex-column mb-3' as={Col} md="4" controlId="validationFormikPasswordConfirm">
                        <InputGroup hasValidation>
                            <LockResetIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="input-with-sx4"
                                label="تأكيد كلمة السر"
                                variant="standard"
                                fullWidth
                                helperText={errors.passwordConfirm}
                                error={!!errors.passwordConfirm}
                                onChange={handleChange}
                                value={values.passwordConfirm}
                                name="passwordConfirm"
                                aria-describedby="inputGroupPrepend"
                                type="password"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='d-flex flex-column mb-3' as={Col} md="4" controlId="validationFormikPhone">
                        <InputGroup hasValidation>
                            <ContactsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="input-with-sx5"
                                label="رقم الهاتف"
                                variant="standard"
                                fullWidth
                                helperText={errors.phone}
                                error={!!errors.phone}
                                onChange={handleChange}
                                value={values.phone}
                                name="phone"
                                aria-describedby="inputGroupPrepend"
                                type="text"
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
                                    <Button className="btn-login mx-auto w-100" type="submit">تسجيل الحساب</Button>
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
            <Link to="/login" style={{ textDecoration: 'none' }}>
                <span style={{ cursor: "pointer" }} className="text-danger">
                    لديك حساب ؟{" "}
                    اضغط هنا
                </span>
            </Link>
        </div>

        <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />
        </Container>
    )
}

export default RegisterPage
