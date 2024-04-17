import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllProducts from '../../Components/Admin/AdminAllProducts'
import Pagination from '../../Components/Uitily/Pagination'
import AdminOrderDetalis from '../../Components/Admin/AdminOrderDetalis'
import AdminAddBrand from '../../Components/Admin/AdminAddBrand'
import UserSideBar from '../../Components/User/UserSideBar'
import UserAllOrder from '../../Components/User/UserAllOrder'
import UserFavoriteProduct from '../../Components/User/UserFavoriteProduct'
const UserFavoriteProductsPage = () => {
    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <UserSideBar />
                </Col>

                <Col lg="9" >
                    <UserFavoriteProduct />
                </Col>
            </Row>
        </Container>
    )
}

export default UserFavoriteProductsPage
