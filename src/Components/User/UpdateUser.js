import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Form, InputGroup, Button } from 'react-bootstrap'
import { Flip, ToastContainer } from 'react-toastify';
import { updateUser } from '../../redux/actions/userAction';
import notify from './../../hook/useNotifaction';
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, TextField } from '@mui/material';
import MailLockIcon from '@mui/icons-material/MailLock';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactsIcon from '@mui/icons-material/Contacts';

const UpdateUser = () => {
  /* ================ FORM VALIDATION ================ */
    const { Formik } = formik;
    const schema = yup.object().shape({
        name: yup.string().required('هذا الحقل مطلوب'),
        phone: yup.string().required('هذا الحقل مطلوب').matches(/^01[0125][0-9]{8}$/gm, 'ادخل رقم صحيح'),
        email: yup.string().email('من فضلك ادخل ايميل صحيح').required('هذا الحقل مطلوب'),
    });
      const [isPress, setIsPress] = useState(false);
      const userData = JSON.parse(localStorage.getItem('user'));
      const dispatch = useDispatch();
      const [loading, setLoading] = useState(true);

  const updateUserData = async (values) => {
      setIsPress(true);
      let body;
      if (userData.email === values.email) {
        body = {
          name:values.name,
          phone:values.phone
        }
      } else {
          body = {
            name:values.name,
            phone:values.phone,
            email:values.email
          }
        }
    setLoading(true)
    await dispatch(updateUser(body));
    setLoading(false)
  }
  useEffect(() => {
    if (loading === false) {
      if (res ) {
        localStorage.setItem('user', JSON.stringify(res.data.data.user));
        notify("تم تعديل البيانات بنجاح", "success")
        setTimeout(() => {
          window.location.href="/user/profile"
        }, 1500);
      } 
    }
  }, [loading])
  const res = useSelector(state => state.userReducer.updateuser);
  
  return (

        <Container style={{ minHeight: "690px" }}>
        <Formik
            validationSchema={schema}
            onSubmit={updateUserData}
            initialValues={{
                name:userData.name,
                phone:userData.phone,
                email:userData.email,
            }}
        >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Row className=" py-5 d-flex justify-content-center">
                    <label className="mx-auto title-login text-center mb-4">تعديل بيانات المستخدم</label>
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
                                    <Button className="btn-login mx-auto w-100" type="submit">حفظ التعديل</Button>
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

export default UpdateUser
