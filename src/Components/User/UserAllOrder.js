import React, { useEffect, useState } from 'react'
import { Button, Col, Row,Spinner } from 'react-bootstrap'
import UserAllOrderItem from './UserAllOrderItem'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserOrders } from '../../redux/actions/userAction'

const UserAllOrder = () => {
    const dispatch = useDispatch();
    if (localStorage.getItem("user")) {
        var userName = JSON.parse(localStorage.getItem("user")).name;
    }
/* ================ GET ALL USER ORDERS ================ */
    const[loading, setLoading] = useState(true);
    const[allOrders, setAllOrders] = useState([]);
    const[allPrice, setAllPrice] = useState(0);
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
                var sum = 0;
                setAllOrders(res.data);
                res.data.map(i => i.totalOrderPrice).forEach(x => { sum += x });
                setAllPrice(sum);
            }
        }
    }, [loading]);

    const res = useSelector(state => state.userReducer.userOrders);
    
/* ==================================================== */
    
    return (
        <div style={{ minHeight: '670px' }}>
            <div className="admin-content-text pb-4">اهلا { userName }</div>
            <Row className='justify-content-between'>
                {
                    !loading ? res.data ? allOrders.map((order, index) => <UserAllOrderItem key={index} order={order} />) : (<h3>لم يتم اضافة منتجات</h3>)
                        :
                        (<div style={{paddingTop:"30vh"}} className="d-flex justify-content-center"><Spinner  animation="border" role="status"></Spinner></div>)
                }
            </Row>
                {
                res.data ?
                    (
                        <Row className='pt-5'>
                            <Button disabled>
                                إجمالي المبلغ: {allPrice >0 ? allPrice :null} جنية
                            </Button>
                        </Row>
                    ):null
                }
        </div>
    )
}

export default UserAllOrder
