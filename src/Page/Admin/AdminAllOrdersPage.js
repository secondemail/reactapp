import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllOrders from '../../Components/Admin/AdminAllOrders'
import Pagination from '../../Components/Uitily/Pagination'
const AdminAllOrdersPage = () => {
    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <AdminSideBar />
                </Col>

                <Col lg="9">
                    <AdminAllOrders />
                </Col>
            </Row>
        </Container>
    )
}
export default AdminAllOrdersPage
