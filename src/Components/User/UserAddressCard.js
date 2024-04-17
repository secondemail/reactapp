import React, { useState } from 'react'
import { Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import deleteicon from '../../images/delete.png'
import { useDispatch } from 'react-redux';
import { deleteAddress } from '../../redux/actions/userAction';
const UserAddressCard = ({address}) => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    const handelDelete = async () => {
        setLoading(true);
        await dispatch(deleteAddress(address._id));
        setTimeout(() => {
            setShow(false);
            window.location.reload();
        }, 1500);
    }
    return (
        <div className="user-address-card my-3 px-2">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title> <div className='font'>تاكيد الحذف</div></Modal.Title>
                </Modal.Header>
                <Modal.Body><div className='font'>هل انت متاكد من عملية الحذف للعنوان</div></Modal.Body>
                <Modal.Footer>
                    {
                        loading === true ?
                            (
                                <Button variant="primary" disabled>
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
                                <>
                                    <Button className='font' variant="success" onClick={handleClose}>
                                        تراجع
                                    </Button>
                                    <Button className='font' variant="dark" onClick={handelDelete}>
                                        حذف
                                    </Button>
                                </>
                            )
                    }

                </Modal.Footer>
            </Modal>
            <Row className="d-flex justify-content-between  ">
                <Col xs="1">
                    <div className="p-2">{ address.alias }</div>
                </Col>
                <Col xs="4" className="d-flex d-flex justify-content-end">
                    <div className="d-flex p-2">
                        <div className="d-flex mx-2">
                            <img
                                alt=""
                                className="ms-1 mt-2"
                                src={deleteicon}
                                height="17px"
                                width="15px"
                            />
                            <Link to={`/user/edit-address/${address._id}`} style={{ textDecoration: "none" }}>
                                <p className="item-delete-edit"> تعديل</p>
                            </Link>
                        </div>
                        <div onClick={handleShow} className="d-flex ">
                            <img
                                alt=""
                                className="ms-1 mt-2"
                                src={deleteicon}
                                height="17px"
                                width="15px"
                            />
                            <p className="item-delete-edit"> ازاله</p>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xs="12">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "14px",
                        }}>
                        {address.details}
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        رقم الهاتف:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {address.phone}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserAddressCard
