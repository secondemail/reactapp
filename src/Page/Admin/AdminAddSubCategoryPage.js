import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllProducts from '../../Components/Admin/AdminAllProducts'
import Pagination from '../../Components/Uitily/Pagination'
import AdminAddSubCategory from '../../Components/Admin/AdminAddSubCategory'
const AdminAddSubCategoryPage = () => {
    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <AdminSideBar />
                </Col>

                <Col lg="9">
                     <AdminAddSubCategory />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAddSubCategoryPage
