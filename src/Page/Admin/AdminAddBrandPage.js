import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAddBrand from '../../Components/Admin/AdminAddBrand'
const AdminAddBrandPage = () => {
    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <AdminSideBar />
                </Col>

                <Col lg="9">
                    <AdminAddBrand />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAddBrandPage
