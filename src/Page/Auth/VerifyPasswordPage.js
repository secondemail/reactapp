import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Form, InputGroup, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Flip, ToastContainer } from 'react-toastify';
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { verifyPassword } from '../../redux/actions/authAction';
import notify from '../../hook/useNotifaction';
import PinIcon from '@mui/icons-material/Pin';
import { CircularProgress, TextField } from '@mui/material';
const VerifyPasswordPage = () => {

/* ================ FORM VALIDATION ================ */
    const { Formik } = formik;
    const schema = yup.object().shape({
        resetCode: yup.string().required('هذا الحقل مطلوب'),
    });
/* ================ resetCode ================ */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loadingFormik, setLoadingFormik] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const sendCode = async (values) => {
        if (!navigator.onLine) {
            notify("تأكد من الاتصال بالانترنت", "error")
            return
        }
        setIsPress(true);
        setLoadingFormik(true);
        await dispatch(verifyPassword(values))
        setLoadingFormik(false);
    }
    useEffect(() => {
        if (loadingFormik === false) {
            if (resF) {
                setIsPress(false);
                if (resF.data.status === "Success") {
                    notify("كود التفعيل صحيح", "success")
                    setTimeout(() => {
                        navigate("/user/reset-password")
                    }, 1500);
                }
                if (resF.data.status === "fail") {
                    notify("الكود خاطئ او انتهت صلاحيته", "error")
                }
                setLoadingFormik(true)
            }
        }
    }, [loadingFormik]);
    const resF = useSelector(state => state.authReducer.verifyPassword);
/* ================================================ */
    return (
        <Container style={{ minHeight: "690px" }}>
        <Formik
            validationSchema={schema}
            onSubmit={sendCode}
            initialValues={{
                resetCode:"",
            }}
        >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Row className=" py-5 d-flex justify-content-center">
                    <label className="mx-auto title-login text-center mb-4">أدخل الكود</label>
                    <Form.Group className='d-flex flex-column ' as={Col} md="4" controlId="validationFormikEmail">
                        <PinIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            id="input-with-sx2"
                            label="الكود"
                            variant="standard"
                            fullWidth
                            helperText={errors.resetCode}
                            error={!!errors.resetCode}
                            onChange={handleChange}
                            value={values.resetCode}
                            name="resetCode"
                            aria-describedby="inputGroupPrepend"
                            type="text"
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
export default VerifyPasswordPage