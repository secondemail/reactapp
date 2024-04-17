import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import UserSideBar from '../../Components/User/UserSideBar'
import UserAddAddress from '../../Components/User/UserAddAddress';
const UserAddAddressPage = () => {
    return (
        <Container >
            <Row className='py-5' >
                <Col lg="3">
                    <UserSideBar />
                </Col>

                <Col lg="9">
                    <UserAddAddress />
                </Col>
            </Row>
        </Container>
    )
}
export default UserAddAddressPage
