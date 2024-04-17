import React, { useEffect, useState } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import { Flip, ToastContainer } from 'react-toastify';
import avatar from '../../images/avatar.png'
import AddBrandHook from './../../hook/brand/add-brand-hook';
const AdminAddBrand = () => {

    const [,name,loading,isPress,handelSubmit,,onChangeName, widgetRef, isPressed,images] =AddBrandHook();
    
    const [imagesBtn, setImagesBtn] = useState(false);
    const handelImageUpload = () => {
        widgetRef.current.open();
    }
    useEffect(() => {
        if (images.length > 0) {
            setImagesBtn(true);
        } else {
            setImagesBtn(false);
        }
    }, [images])
    
    return (
        <div style={{ minHeight: '670px' }}>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">اضف ماركه جديده</div>
                <Col sm="8">
                    <div className="text-form pb-2">صوره الماركه</div>
                    <div>
                        {
                            imagesBtn ?
                                (<button style={{cursor:"not-allowed"}} className='btn-save d-inline mt-2' >تم رفع صوره الماركه</button>)
                                :
                                (<button className='btn-save d-inline mt-2' onClick={handelImageUpload}>رفع صوره الماركه</button>)
                        }
                    </div>
                    <input
                        type="text"
                        value={name}
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم الماركه"
                        onChange={onChangeName}
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
                                <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ التعديلات</button>
                            )
                    }
                </Col>
            </Row>

            <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />
        </div>
    )
}

export default AdminAddBrand
