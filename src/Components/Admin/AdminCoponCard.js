import React, { useEffect, useState } from 'react'
import { Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import deleteicon from '../../images/delete.png'
import editicon from '../../images/edit.png'
import { useDispatch } from 'react-redux';
import { deleteCopon } from '../../redux/actions/coponAction';


const AdminCoponCard = ({ copon }) => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    const dateString = copon.expire;
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString("en-US", options)
    }

    const handelDelete = async () => {
        setLoading(true);
        await dispatch(deleteCopon(copon._id));
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
                <Modal.Body><div className='font'>هل انت متاكد من عملية الحذف للكوبون</div></Modal.Body>
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
                    <div className="p-2"> الكوبون: </div>
                </Col>
                <Col xs="4" className="d-flex d-flex justify-content-end">
                    <div className="d-flex p-2">
                        <div className="d-flex mx-2">
                            <img
                                alt=""
                                className="ms-1 mt-2"
                                src={editicon}
                                height="17px"
                                width="15px"
                            />
                            <Link to={`/admin/edit-copon/${copon._id}`} style={{ textDecoration: "none" }}>
                                <p className="item-delete-edit"> تعديل</p>
                            </Link>
                        </div>
                        <div onClick={handleShow} style={{cursor:"pointer"}} className="d-flex ">
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
                            fontSize: "25px",
                        }}>
                        {copon.name}
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
                        نسبة الخصم:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        %{copon.discount}
                    </div>
                        
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        تاريخ الانتهاء:{" "}
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {formatDate(dateString)}
                    </div>

                </Col>
            </Row>
        </div>
    )
}

export default AdminCoponCard
