import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminEditProducts from '../../Components/Admin/AdminEditProducts';
const AdminEditProductsPage = () => {
    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <AdminSideBar />
                </Col>

                <Col lg="9">
                    <AdminEditProducts />
                </Col>
            </Row>
        </Container>
    )
}
export default AdminEditProductsPage