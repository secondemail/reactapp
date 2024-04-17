import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Pagination from '../../Components/Uitily/Pagination'
import UserAllAddress from '../../Components/User/UserAllAddress'
import UserSideBar from '../../Components/User/UserSideBar'
const UserAllAddresPage = () => {
    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <UserSideBar />
                </Col>

                <Col lg="9">
                    <UserAllAddress />
                </Col>
            </Row>
        </Container>
    )
}

export default UserAllAddresPage
