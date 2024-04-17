import React, { useEffect, useState } from 'react'
import { Row,Spinner } from 'react-bootstrap'
import AdminAllOrdersItem from './AdminAllOrdersItem'
import { getAllUserOrders } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const AdminAllOrders = () => {
    const dispatch = useDispatch();
/* ================ GET ALL ORDERS ================ */
    const[loading, setLoading] = useState(true);
    const[allOrders, setAllOrders] = useState([]);
    useEffect(() => {
        const getOrders = async () => {
            setLoading(true);
            await dispatch(getAllUserOrders());
            setLoading(false)
        };
        getOrders();
    }, []);
    useEffect(() => {
        if (loading === false) {
            if (res && res.data) {
                setAllOrders(res.data)
            }
        }
    }, [loading]);

    const res = useSelector(state => state.userReducer.userOrders);
    
/* ==================================================== */
    return (
        <div style={{ minHeight: '670px' }}>
            <div className='admin-content-text'>ادارة جميع الطلبات</div>
            <Row className='justify-content-start'>
                {
                    loading ? (<div style={{paddingTop:"30vh"}} className="d-flex justify-content-center"><Spinner  animation="border" role="status"></Spinner></div>):
                        res.data.length > 0 ?  allOrders.map((order, index) => <AdminAllOrdersItem key={index} order={order} />):<h3>لا يوجد طلبات حتى الان</h3>
                }
            </Row>
        </div>
    )
}

export default AdminAllOrders
