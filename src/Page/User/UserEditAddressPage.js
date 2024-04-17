import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Pagination from '../../Components/Uitily/Pagination'
import UserSideBar from '../../Components/User/UserSideBar'
import UserAddAddress from '../../Components/User/UserAddAddress';
import UserEditAddress from '../../Components/User/UserEditAddress';
const UserEditAddressPage = () => {
    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <UserSideBar />
                </Col>

                <Col lg="9">
                    <UserEditAddress />
                </Col>
            </Row>
        </Container>
    )
}
export default UserEditAddressPage
