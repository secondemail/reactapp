import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllProducts from '../../Components/Admin/AdminAllProducts'
import Pagination from '../../Components/Uitily/Pagination'
import AdminOrderDetalis from '../../Components/Admin/AdminOrderDetalis'
const AdminOrderDetalisPage = () => {
    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <AdminSideBar />
                </Col>
                <Col lg="9">
                    <AdminOrderDetalis />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminOrderDetalisPage
