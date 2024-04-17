import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAddCategory from '../../Components/Admin/AdminAddCategory'
const AdminAddCategoryPage = () => {
    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <AdminSideBar />
                </Col>

                <Col lg="9">
                    <AdminAddCategory />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAddCategoryPage
