import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import AddCategoryHook from '../../hook/category/add-category-hook'
import { Flip, ToastContainer } from 'react-toastify';
const AdminAddCategory = () => {

    const [,name,loading,isPress,handelSubmit,,onChangeName, widgetRef, isPressed,images] =AddCategoryHook();

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
                <div className="admin-content-text pb-4">اضافه تصنيف جديد</div>
                <Col sm="8">
                    <div className="text-form pb-2">صوره التصنيف</div>
                    <div>
                        {
                            imagesBtn ?
                                (<button style={{cursor:"not-allowed"}} className='btn-primary d-inline mt-2' >تم رفع صوره للتصنيف</button>)
                                :
                                (<button className='btn-save d-inline mt-2' onClick={handelImageUpload}>رفع صوره للتصنيف</button>)
                        }
                    </div>

                    <input
                        onChange={onChangeName}
                        value={name}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم التصنيف"
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

export default AdminAddCategory
