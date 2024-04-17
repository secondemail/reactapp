import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAddCopon from '../../Components/Admin/AdminAddCopon'
const AdminAddCoponPage = () => {
    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <AdminSideBar />
                </Col>

                <Col lg="9">
                    <AdminAddCopon/>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAddCoponPage
