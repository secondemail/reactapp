import React, { useEffect, useState } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserAddressCard from './UserAddressCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress } from '../../redux/actions/userAction'

const UserAllAddress = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllAddress = async () => {
            setLoading(true)
            await dispatch(getAddress());
            setLoading(false)
        }
        getAllAddress();
    }, []);
    
    const res = useSelector(state => state.userReducer.allAddress);

    
    return (
        <div style={{ minHeight: '670px' }}>
            <div className="admin-content-text pb-4">دفتر العنوانين</div>
            {
                !loading ?
                    res && res.data ? (res.data.map((item, index) => <UserAddressCard key={index} address={item} />)) : <h3>jskdjsdk</h3>
                    :
                    (
                        <div style={{display:"flex",justifyContent:"center",paddingTop:"50px",paddingBottom:"50px"}} >
                            <Spinner animation="border" variant="primary" />
                        </div>
                    )
            }
            

            <Row className="justify-content-center">
                <Col sm="5" className="d-flex justify-content-center">
                    <Link to="/user/add-address" style={{ textDecoration: "none" }}>
                        <button className="btn-add-address px-3">اضافه عنوان جديد</button>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

export default UserAllAddress
