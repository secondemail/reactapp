import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Form, InputGroup, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Flip, ToastContainer } from 'react-toastify';
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetPassword } from '../../redux/actions/authAction';
import notify from '../../hook/useNotifaction';
import LockResetIcon from '@mui/icons-material/LockReset';
import { CircularProgress, TextField } from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';
const RsetPasswordPage = () => {
/* ================ FORM VALIDATION ================ */
    const { Formik } = formik;
    const schema = yup.object().shape({
        confermPassword: yup.string().required('هذا الحقل مطلوب').oneOf([yup.ref('newPassword'), null], 'كلمة السر غير مطابقة'),
        newPassword: yup.string().required('هذا الحقل مطلوب').min(6, 'كلمة السر يجب الا تقل عن 6 احرف'),
    });
/* ================ LOGIN ================ */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loadingFormik, setLoadingFormik] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const resetPass = async (values) => {
        if (!navigator.onLine) {
            notify("تأكد من الاتصال بالانترنت", "error")
            return
        }
        setIsPress(true);
        setLoadingFormik(true);
        await dispatch(resetPassword({
            email: localStorage.getItem("user-email"),
            newPassword: values.newPassword
        }))
        setLoadingFormik(false);
    }
    useEffect(() => {
        if (loadingFormik === false) {
            if (resF) {
                setIsPress(false);
                if (resF.status === 200) {
                    notify("تم تغير كلمة السر بنجاح", "success")
                    setTimeout(() => {
                        navigate("/login")
                    }, 1500);
                } else {
                    notify("من فضلك اطلب كود جديد", "error")
                }
                setLoadingFormik(true)
            }
        }
    }, [loadingFormik]);
    const resF = useSelector(state => state.authReducer.resetPassword);
/* ================================================ */
    return (
        <Container style={{ minHeight: "690px" }}>
        <Formik
            validationSchema={schema}
            onSubmit={resetPass}
            initialValues={{
                newPassword:"",
                confermPassword:""
            }}
        >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Row className=" py-5 d-flex justify-content-center">
                    <label className="mx-auto title-login text-center mb-4">تغيير كلمة السر</label>
                    <Form.Group className='d-flex flex-column mb-3' as={Col} md="4" controlId="validationFormikNewPassword">
                        <InputGroup hasValidation>
                            <LockPersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="input-with-sx3"
                                label="كلمة السر"
                                variant="standard"
                                fullWidth
                                helperText={errors.newPassword}
                                error={!!errors.newPassword}
                                onChange={handleChange}
                                value={values.newPassword}
                                name="newPassword"
                                aria-describedby="inputGroupPrepend"
                                type="password"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='d-flex flex-column' as={Col} md="4" controlId="validationFormikConfermPassword">
                        <InputGroup hasValidation>
                            <LockResetIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="input-with-sx4"
                                label="تأكيد كلمة السر"
                                variant="standard"
                                fullWidth
                                helperText={errors.confermPassword}
                                error={!!errors.confermPassword}
                                onChange={handleChange}
                                value={values.confermPassword}
                                name="confermPassword"
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
                                    <Button className="btn-login mx-auto w-100" type="submit">تسجيل البيانات</Button>
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


export default RsetPasswordPage