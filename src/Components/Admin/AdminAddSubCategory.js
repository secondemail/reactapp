import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Spinner } from 'react-bootstrap'

import { Flip, ToastContainer } from 'react-toastify';
import addSubcategoryhook from './../../hook/subcategory/add-subcategory-hook';

const AdminAddSubCategory = () => {
    const [id, name, loading, category, subcategory, handelChange, handelSubmit, onChangeName,isPressed] = addSubcategoryhook();

    return (
        <div style={{ minHeight: '670px' }}>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">اضافه تصنيف فرعي جديد</div>
                <Col sm="8">
                    <input
                        value={name}
                        onChange={onChangeName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم التصنيف الفرعي"
                    />
                    <select name="category" id="cat" className="select mt-3 px-2 " onChange={handelChange}>
                        <option value="0">اختر تصنيف رئيسي</option>
                        {
                            category.data ? (category.data.map(item => {
                                return (<option key={item._id} value={item._id}>{item.name}</option>)
                            })) : null
                        }
                    </select>
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

export default AdminAddSubCategory
