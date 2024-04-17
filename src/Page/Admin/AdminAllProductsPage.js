import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllProducts from '../../Components/Admin/AdminAllProducts'
import Pagination from '../../Components/Uitily/Pagination'
import ViewProductAdminHook from './../../hook/admin/view-product-admin-hook';
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsPage } from './../../redux/actions/productsAction';

const AdminAllProductsPage = () => {
    const dispatch = useDispatch();
    const [items, pagination,onPress,loading] = ViewProductAdminHook();
    if (pagination)
        var pageCount = pagination;
    else 
        pageCount = 0;
    

    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <AdminSideBar />
                </Col>
                    <Col lg="9">
                        {
                            !loading ?
                                (
                                        <AdminAllProducts products={items} />
                                ) :
                                (<div className='d-flex justify-content-center' style={{paddingTop:"30vh"}}><Spinner  animation="border" role="status"></Spinner></div>)
                        }
                        {
                            pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={onPress} />) : null
                        }
                    </Col>
            </Row>
        </Container>
    )
}

export default AdminAllProductsPage
